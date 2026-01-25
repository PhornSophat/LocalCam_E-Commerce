<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div v-for="i in 8" :key="i" class="animate-pulse">
        <div class="mb-4 bg-gray-200 aspect-square rounded-2xl"></div>
        <div class="h-4 mb-2 bg-gray-200 rounded"></div>
        <div class="w-2/3 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 py-20 text-center rounded-lg bg-red-50">
      <div class="mb-4 text-6xl">⚠️</div>
      <h3 class="mb-4 text-2xl font-bold text-red-900">Unable to Load Products</h3>
      <p class="mb-4 font-mono text-sm text-red-700 break-words">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="px-6 py-3 text-white transition rounded-lg bg-stone-800 hover:bg-stone-900"
      >
        Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else-if="allProducts.length > 0" class="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="relative cursor-pointer group"
        @click="viewProductDetail(product)"
      >
        <div
          class="relative overflow-hidden transition-all duration-500 shadow-lg aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl hover:shadow-2xl"
        >
          <img
            :src="product.image_url || product.image"
            :alt="product.name"
            class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div
            class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"
          ></div>

          <div
            class="absolute flex flex-col gap-2 transition-all duration-300 translate-x-4 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0"
          >
            <button
              class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-red-50"
            >
              <svg
                class="w-5 h-5 text-stone-700 hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-green-50"
            >
              <svg
                class="w-5 h-5 text-stone-700 hover:text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="px-1 mt-4">
          <h3
            class="text-sm font-semibold text-stone-800 mb-1.5 group-hover:text-amber-700 transition-colors"
          >
            {{ product.name }}
          </h3>
          <div class="flex items-center justify-between">
            <p class="text-base font-bold text-stone-900">${{ product.price }}</p>
            <svg
              class="w-5 h-5 transition-all duration-300 opacity-0 text-stone-400 group-hover:opacity-100 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-20 text-center">
      <div class="mb-4 text-6xl">📦</div>
      <h3 class="mb-2 text-2xl font-bold text-gray-900">No Products Available</h3>
      <p class="text-gray-600">Check back soon for new products!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const router = useRouter()
const allProducts = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Supabase Error:', fetchError)
      error.value = `${fetchError.message} (Code: ${fetchError.code})`
      allProducts.value = []
    } else {
      console.log('Products loaded:', data)
      allProducts.value = data || []
    }
  } catch (err) {
    console.error('Exception:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    allProducts.value = []
  } finally {
    loading.value = false
  }
}

const viewProductDetail = (product: any) => {
  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/products/${slug}`)
}

onMounted(() => {
  fetchProducts()
})
</script>
