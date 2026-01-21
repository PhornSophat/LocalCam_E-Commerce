<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { cartState } from '../store'
import { toast } from '../utils/toast'

// Reactive states
const quantity = ref(1)
const expandedSection = ref<string | null>(null)
const mainImage = ref('')
const product = ref<any>(null)
const reviews = ref<any[]>([])
const similarProducts = ref<any[]>([])
const loading = ref(true)

// Route slug
const route = useRoute()
const router = useRouter()
const slug = ref(route.params.slug as string)

// Fetch product by slug from Supabase
const fetchProduct = async () => {
  loading.value = true
  try {
    // Try to find by slug first
    let { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('slug', slug.value)
      .single()

    // If no slug match, try to match by generated slug from name
    if (error || !data) {
      const { data: allProducts } = await supabase.from('products').select('*, categories(name)')

      if (allProducts) {
        const found = allProducts.find((p) => {
          const generatedSlug = p.name.toLowerCase().replace(/\s+/g, '-')
          return generatedSlug === slug.value
        })
        data = found || null
      }
    }

    if (data) {
      product.value = data
      mainImage.value = data.image_url || data.image || ''

      // Fetch reviews for this product
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', data.id)
        .order('created_at', { ascending: false })

      reviews.value = reviewsData || []

      // Fetch similar products
      const { data: similarData } = await supabase
        .from('products')
        .select('*')
        .neq('id', data.id)
        .limit(3)

      similarProducts.value = similarData || []
    } else {
      product.value = null
    }
  } catch (err) {
    console.error('Error fetching product:', err)
    product.value = null
  } finally {
    loading.value = false
  }
}

// Watch for route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug as string
    fetchProduct()
  },
)

// Lifecycle
onMounted(fetchProduct)

// Thumbnail swap - not used for now since we only have one image
const selectThumbnail = (imageUrl: string) => {
  mainImage.value = imageUrl
}

// Quantity & Cart
const incrementQuantity = () => {
  quantity.value++
}
const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--
}
const addToCart = () => {
  if (!product.value) return

  if (product.value.stock < quantity.value) {
    toast.error(`Only ${product.value.stock} items available in stock`)
    return
  }

  // Check if product already in cart
  const existingItem = cartState.items.find((item) => item.id === product.value.id)

  if (existingItem) {
    // Update quantity
    const newQty = existingItem.qty + quantity.value
    if (newQty > product.value.stock) {
      toast.error(`Cannot add more. Only ${product.value.stock} items available`)
      return
    }
    existingItem.qty = newQty
    toast.success(`Updated quantity to ${newQty}`)
  } else {
    // Add new item
    cartState.items.push({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      qty: quantity.value,
      image_url: product.value.image_url || product.value.image,
      stock: product.value.stock,
    })
    toast.success(`Added ${quantity.value} x ${product.value.name} to cart`)
  }

  quantity.value = 1
}

// Navigate to similar product
const viewSimilarProduct = (prod: any) => {
  const prodSlug = prod.slug || prod.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/products/${prodSlug}`)
}

// Expandable sections
const toggleSection = (section: string) => {
  expandedSection.value = expandedSection.value === section ? null : section
}

// Scroll effect
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}
onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div :class="{ 'bg-white': isScrolled }" class="relative min-h-screen bg-[#806E53] pt-20">
    <div class="p-4 md:p-8">
      <div class="max-w-6xl pt-20 mx-auto" v-if="!loading && product">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Left Column: Images -->
          <div class="flex flex-col gap-4">
            <div
              class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg md:h-96"
            >
              <img :src="mainImage" :alt="product.name" class="object-cover w-full h-full" />
            </div>
          </div>

          <!-- Right Column: Product Info -->
          <div class="flex flex-col gap-6">
            <p class="mb-2 text-sm font-medium text-gray-600">
              {{ product.categories?.name || 'Product' }}
            </p>
            <h1 class="mb-2 text-2xl font-bold text-black md:text-4xl">{{ product.name }}</h1>
            <p class="text-2xl font-bold text-black">${{ product.price }}</p>

            <div>
              <h3 class="mb-2 text-lg font-bold text-black">Description</h3>
              <p class="text-gray-700">{{ product.description || 'No description available.' }}</p>
            </div>

            <!-- Stock Info -->
            <div v-if="product.stock !== undefined">
              <p v-if="product.stock > 0" class="text-sm font-semibold text-green-600">
                ✅ In Stock: {{ product.stock }} available
              </p>
              <p v-else class="text-sm font-semibold text-red-600">❌ Out of Stock</p>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="flex items-center gap-6">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button
                  @click="decrementQuantity"
                  class="px-4 py-2 text-gray-600 transition hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-16 text-center border-0 focus:outline-none"
                />
                <button
                  @click="incrementQuantity"
                  class="px-4 py-2 text-gray-600 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                @click="addToCart"
                :disabled="product.stock <= 0"
                class="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition bg-black rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD TO CART
              </button>
            </div>

            <!-- Expandable Sections -->
            <div class="pt-6 space-y-4 border-t">
              <div class="border rounded-lg">
                <button
                  @click="toggleSection('details')"
                  class="flex items-center justify-between w-full p-4 transition hover:bg-gray-50"
                >
                  <span class="text-lg font-bold text-black">DETAILS</span>
                  <svg
                    :class="{ 'rotate-180': expandedSection === 'details' }"
                    class="w-6 h-6 text-gray-600 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
                <div v-if="expandedSection === 'details'" class="px-4 py-4 border-t bg-gray-50">
                  <p class="mb-2 text-gray-700">
                    <strong>Category:</strong> {{ product.categories?.name || 'N/A' }}
                  </p>
                  <p class="mb-2 text-gray-700">
                    <strong>Stock:</strong> {{ product.stock }} units
                  </p>
                  <p class="text-gray-700">
                    <strong>Added:</strong> {{ new Date(product.created_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Reviews -->
        <div class="pt-16 mt-16 border-t" v-if="reviews.length > 0">
          <div class="mb-12 text-center">
            <h2
              class="inline-block px-8 py-4 text-3xl italic font-light text-center bg-gray-100 rounded-lg md:text-4xl"
            >
              client reviews
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md"
            >
              <div class="flex gap-1">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-2xl"
                  :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  >★</span
                >
              </div>
              <h3 class="text-lg font-bold leading-tight text-black">
                {{ review.title || 'Review' }}
              </h3>
              <p class="flex-grow leading-relaxed text-gray-700">
                {{ review.comment || review.text }}
              </p>
              <p class="text-sm font-medium text-gray-600">{{ review.user_id }}</p>
            </div>
          </div>
        </div>

        <!-- Similar Products -->
        <div class="pt-16 mt-20 border-t" v-if="similarProducts.length > 0">
          <div class="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
            <h2 class="text-3xl italic font-light md:text-4xl">similar products</h2>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div
              v-for="sp in similarProducts"
              :key="sp.id"
              @click="viewSimilarProduct(sp)"
              class="flex flex-col gap-4 cursor-pointer group"
            >
              <div
                class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg"
              >
                <img
                  :src="sp.image_url || sp.image"
                  :alt="sp.name"
                  class="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <h3 class="text-xl font-bold text-black transition-colors group-hover:text-amber-700">
                {{ sp.name }}
              </h3>
              <p class="flex-grow text-sm leading-tight text-gray-700 line-clamp-2">
                {{ sp.description || 'No description' }}
              </p>
              <p class="text-lg font-bold text-black">${{ sp.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="loading" class="py-40 text-2xl text-center text-white">
        Loading product...
      </div>
      <div v-else class="py-40 text-center">
        <p class="mb-4 text-2xl text-white">Product not found</p>
        <button
          @click="router.push('/shop')"
          class="px-6 py-3 font-bold text-white transition bg-black rounded-lg hover:bg-gray-800"
        >
          Back to Shop
        </button>
      </div>
    </div>
  </div>
</template>
