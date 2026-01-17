<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import { toast } from '../utils/toast'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('profile')
const loading = ref(false)
const user = ref<any>(null)
const profile = ref<any>(null)
const orders = ref<any[]>([])
const reviews = ref<any[]>([])
const wishlist = ref<any[]>([])
const editMode = ref(false)

// Form for profile editing
const editForm = ref({
  first_name: '',
  last_name: '',
})

// Fetch user profile and related data
const fetchUserData = async () => {
  loading.value = true
  try {
    // Get current user
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
      router.push('/login')
      return
    }

    user.value = currentUser

    // Fetch profile from database
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single()

    if (profileData) {
      profile.value = profileData
      editForm.value = {
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
      }
    }

    // Fetch user's orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })

    orders.value = ordersData || []

    // Fetch user's reviews
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })

    reviews.value = reviewsData || []

    // Fetch user's wishlist
    const { data: wishlistData } = await supabase
      .from('wishlist')
      .select('*, products(*)')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })

    wishlist.value = wishlistData || []
  } catch (error) {
    console.error('Error fetching user data:', error)
  } finally {
    loading.value = false
  }
}

// Update profile
const updateProfile = async () => {
  if (!user.value) return

  try {
    loading.value = true
    const { error } = await supabase.from('profiles').update(editForm.value).eq('id', user.value.id)

    if (error) throw error

    profile.value = { ...profile.value, ...editForm.value }
    editMode.value = false
    toast.success('Profile updated successfully!')
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.error('Failed to update profile')
  } finally {
    loading.value = false
  }
}

// Logout
const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

// Computed properties
const totalSpent = computed(() => {
  return orders.value.reduce((sum, order) => sum + (order.total || 0), 0)
})

const totalOrders = computed(() => orders.value.length)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0)
  return (sum / reviews.value.length).toFixed(1)
})

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-Poppins">
    <!-- Header -->
    <header class="mt-20 bg-white border-b border-slate-200">
      <div class="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-black text-gray-900">
              {{ profile?.first_name }} {{ profile?.last_name || user?.email || 'My Account' }}
            </h1>
            <p class="mt-1 text-sm text-gray-600">Welcome back to your profile!</p>
          </div>
          <button
            @click="handleLogout"
            class="px-6 py-3 font-bold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div v-if="loading" class="py-12 text-center">
        <div class="inline-block animate-spin">⏳</div>
        <p class="mt-2 text-gray-600">Loading your profile...</p>
      </div>

      <!-- Stats Cards -->
      <div v-else class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        <div class="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <div class="text-sm font-bold tracking-wider text-gray-600 uppercase">Total Orders</div>
          <div class="mt-2 text-3xl font-black text-gray-900">{{ totalOrders }}</div>
        </div>
        <div class="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <div class="text-sm font-bold tracking-wider text-gray-600 uppercase">Total Spent</div>
          <div class="mt-2 text-3xl font-black text-gray-900">${{ totalSpent.toFixed(2) }}</div>
        </div>
        <div class="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <div class="text-sm font-bold tracking-wider text-gray-600 uppercase">Reviews Left</div>
          <div class="mt-2 text-3xl font-black text-gray-900">{{ reviews.length }}</div>
        </div>
        <div class="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <div class="text-sm font-bold tracking-wider text-gray-600 uppercase">Avg Rating</div>
          <div class="mt-2 text-3xl font-black text-gray-900">⭐ {{ averageRating }}</div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex gap-2 mb-6 bg-white border-b rounded-t-lg border-slate-200">
        <button
          @click="activeTab = 'profile'"
          :class="[
            'px-6 py-4 font-bold transition-all border-b-2',
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900',
          ]"
        >
          👤 Profile Information
        </button>
        <button
          @click="activeTab = 'orders'"
          :class="[
            'px-6 py-4 font-bold transition-all border-b-2',
            activeTab === 'orders'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900',
          ]"
        >
          🛒 Order History
        </button>
        <button
          @click="activeTab = 'reviews'"
          :class="[
            'px-6 py-4 font-bold transition-all border-b-2',
            activeTab === 'reviews'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900',
          ]"
        >
          ⭐ My Reviews
        </button>
        <button
          @click="activeTab = 'wishlist'"
          :class="[
            'px-6 py-4 font-bold transition-all border-b-2',
            activeTab === 'wishlist'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900',
          ]"
        >
          ❤️ Wishlist
        </button>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="p-8 bg-white rounded-b-lg shadow-sm">
        <div class="flex items-start justify-between mb-6">
          <h2 class="text-2xl font-black">Personal Information</h2>
          <button
            v-if="!editMode"
            @click="editMode = true"
            class="px-4 py-2 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            ✏️ Edit Profile
          </button>
          <div v-else class="flex gap-2">
            <button
              @click="editMode = false"
              class="px-4 py-2 font-bold text-gray-900 transition bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              @click="updateProfile"
              class="px-4 py-2 font-bold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Email (Read-only) -->
          <div>
            <label class="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
            <input
              :value="user?.email"
              disabled
              type="email"
              class="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>

          <!-- First Name -->
          <div>
            <label class="block mb-2 text-sm font-bold text-gray-700">First Name</label>
            <input
              v-model="editForm.first_name"
              :disabled="!editMode"
              type="text"
              placeholder="Enter your first name"
              class="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block mb-2 text-sm font-bold text-gray-700">Last Name</label>
            <input
              v-model="editForm.last_name"
              :disabled="!editMode"
              type="text"
              placeholder="Enter your last name"
              class="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <!-- Account Info -->
        <div class="pt-8 mt-8 border-t border-gray-200">
          <h3 class="mb-4 text-lg font-bold">Account Information</h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="p-4 rounded-lg bg-gray-50">
              <p class="text-xs font-bold tracking-wider text-gray-600 uppercase">Member Since</p>
              <p class="mt-1 font-bold text-gray-900">
                {{ new Date(user?.created_at).toLocaleDateString() }}
              </p>
            </div>
            <div class="p-4 rounded-lg bg-gray-50">
              <p class="text-xs font-bold tracking-wider text-gray-600 uppercase">Account Status</p>
              <p class="mt-1 font-bold text-green-600">✅ Active</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="p-8 bg-white rounded-b-lg shadow-sm">
        <h2 class="mb-6 text-2xl font-black">Order History</h2>

        <div v-if="orders.length === 0" class="py-12 text-center">
          <p class="mb-4 text-2xl">📦</p>
          <p class="mb-4 text-gray-600">You haven't placed any orders yet.</p>
          <router-link
            to="/shop"
            class="inline-block px-6 py-3 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="order in orders"
            :key="order.id"
            class="p-6 transition border rounded-lg border-slate-200 hover:shadow-md"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm text-gray-600">Order #{{ order.id }}</p>
                <p class="text-lg font-bold text-gray-900">{{ order.customer_name }}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-black text-gray-900">
                  ${{ order.total_price?.toFixed(2) || '0.00' }}
                </p>
                <span
                  :class="[
                    'inline-block px-3 py-1 rounded-full text-xs font-bold mt-2',
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800',
                  ]"
                >
                  {{ order.status?.toUpperCase() }}
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              Placed on {{ new Date(order.created_at).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'" class="p-8 bg-white rounded-b-lg shadow-sm">
        <h2 class="mb-6 text-2xl font-black">My Reviews</h2>

        <div v-if="reviews.length === 0" class="py-12 text-center">
          <p class="mb-4 text-2xl">⭐</p>
          <p class="mb-4 text-gray-600">You haven't left any reviews yet.</p>
          <router-link
            to="/shop"
            class="inline-block px-6 py-3 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Shop Products & Leave Reviews
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="p-6 transition border rounded-lg border-slate-200 hover:shadow-md"
          >
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-bold text-gray-900">{{ review.title }}</h3>
              <span class="text-lg">{{ '⭐'.repeat(review.rating) }}</span>
            </div>
            <p class="mb-2 text-gray-600">{{ review.comment }}</p>
            <p class="text-xs text-gray-500">
              Reviewed on {{ new Date(review.created_at).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- Wishlist Tab -->
      <div v-if="activeTab === 'wishlist'" class="p-8 bg-white rounded-b-lg shadow-sm">
        <h2 class="mb-6 text-2xl font-black">My Wishlist</h2>

        <div v-if="wishlist.length === 0" class="py-12 text-center">
          <p class="mb-4 text-2xl">❤️</p>
          <p class="mb-4 text-gray-600">Your wishlist is empty.</p>
          <router-link
            to="/shop"
            class="inline-block px-6 py-3 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Explore Products
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in wishlist"
            :key="item.id"
            class="overflow-hidden transition border rounded-lg border-slate-200 hover:shadow-md"
          >
            <img
              v-if="item.products?.image_url"
              :src="item.products.image_url"
              :alt="item.products.name"
              class="object-cover w-full h-48"
            />
            <div class="p-4">
              <h3 class="mb-2 font-bold text-gray-900">{{ item.products?.name }}</h3>
              <p class="mb-4 text-lg font-black text-gray-900">${{ item.products?.price }}</p>
              <router-link
                :to="`/products/${item.products?.slug}`"
                class="block px-4 py-2 font-bold text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                View Product
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
