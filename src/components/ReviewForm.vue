<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabase'

interface Props {
  productId: number | string
  productName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  reviewAdded: []
}>()

const showForm = ref(false)
const loading = ref(false)
const user = ref<any>(null)

const formData = ref({
  title: '',
  comment: '',
  rating: 5,
})

// Check if user is logged in
const checkAuth = async () => {
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()
  user.value = currentUser
}

// Submit review
const submitReview = async () => {
  if (!user.value) {
    alert('Please login to leave a review')
    return
  }

  if (!formData.value.title || !formData.value.comment) {
    alert('Please fill in all fields')
    return
  }

  loading.value = true

  try {
    const { error } = await supabase.from('reviews').insert([
      {
        product_id: props.productId,
        user_id: user.value.id,
        title: formData.value.title,
        comment: formData.value.comment,
        rating: formData.value.rating,
      },
    ])

    if (error) throw error

    // Reset form
    formData.value = {
      title: '',
      comment: '',
      rating: 5,
    }
    showForm.value = false
    emit('reviewAdded')
    alert('Review posted successfully!')
  } catch (error) {
    console.error('Error submitting review:', error)
    alert('Failed to post review')
  } finally {
    loading.value = false
  }
}

checkAuth()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
    <h3 class="text-2xl font-black mb-6">Leave a Review</h3>

    <div v-if="!user" class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <p class="text-amber-900 font-bold">
        👤 <router-link to="/login" class="underline">Login</router-link> to leave a review
      </p>
    </div>

    <button
      v-if="!showForm && user"
      @click="showForm = true"
      class="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition mb-6"
    >
      ✍️ Write a Review
    </button>

    <form v-if="showForm && user" @submit.prevent="submitReview" class="space-y-4 mb-6">
      <!-- Rating -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Rating</label>
        <div class="flex gap-2">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            @click="formData.rating = i"
            :class="[
              'text-2xl transition',
              i <= formData.rating ? 'text-yellow-400' : 'text-gray-300',
            ]"
          >
            ⭐
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Review Title</label>
        <input
          v-model="formData.title"
          type="text"
          placeholder="e.g., Excellent quality and fast shipping"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
        <textarea
          v-model="formData.comment"
          placeholder="Share your experience with this product..."
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'Posting...' : 'Post Review' }}
        </button>
        <button
          type="button"
          @click="showForm = false"
          class="px-6 py-2 bg-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
