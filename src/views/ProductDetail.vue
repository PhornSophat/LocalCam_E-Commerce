<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

// Reactive states
const quantity = ref(1)
const expandedSection = ref<string | null>(null)
const mainImage = ref('')
const product = ref<Product | null>(null)
const reviews = ref<Review[]>([])
const similarProducts = ref<SimilarProduct[]>([])

// Route slug
const route = useRoute()
const slug = ref(route.params.slug as string)

// Product Interfaces
interface Product {
  id: number
  slug: string
  name: string
  category: string
  priceMin: number
  priceMax: number
  description: string
  image: string
  thumbnails: string[]
  details: string[]
  shoppingInfo: string
  overview: string
}

interface Review {
  id: number
  rating: number
  title: string
  text: string
  author: string
  location: string
}

interface SimilarProduct {
  id: number
  name: string
  description: string
  price: number
  image: string
}

// Mock database
const productsDB: Product[] = [
  {
    id: 1,
    slug: 'palm-sugar-cambodia',
    name: 'Palm Sugar Cambodia',
    category: 'Sugar',
    priceMin: 1.25,
    priceMax: 5,
    description: 'Palm sugar in Cambodia is a natural sweetener made from the sap of palm trees.',
    image: '/src/assets/Palm-Sugar-cambodia.webp',
    thumbnails: [
      '/src/assets/510sKRPLmCL.webp',
      '/src/assets/depositphotos_146093645-stock-photo-bowls-of-coconut-sugar.webp',
      '/src/assets/weee--2165385=s360-c=cv-autoaws.webp'
    ],
    details: [
      'Made by boiling palm tree sap into blocks or powder.',
      'Has a natural caramel-like sweetness.',
      'Important traditional product for rural families.',
      'Costs about $1.25–$5 per kg in Cambodia.'
    ],
    shoppingInfo: 'Free shipping on orders over $50. Available in stock. Ships within 3-5 business days.',
    overview: 'Palm sugar is a traditional Cambodian sweetener with a rich caramel flavor. It\'s commonly used in Southeast Asian cuisine and is known for its lower glycemic index compared to refined sugar.'
  },
  {
    id: 2,
    slug: 'krama',
    name: 'Krama',
    category: 'Textiles',
    priceMin: 5,
    priceMax: 5,
    description: 'Traditional Cambodian scarf used for multiple purposes.',
    image: '/src/assets/1. Krama.jpg',
    thumbnails: ['/src/assets/1. Krama.jpg'],
    details: ['Handwoven cotton scarf.', 'Multi-purpose: headscarf, belt, baby carrier.'],
    shoppingInfo: 'Ships within 2-4 business days.',
    overview: 'The krama is an iconic Cambodian textile used for fashion and everyday life.'
  },
  {
    id: 3,
    slug: 'cambodian-silk',
    name: 'Cambodian Silk',
    category: 'Textiles',
    priceMin: 7,
    priceMax: 7,
    description: 'Used for scarves, clothing, decor, and gifts.',
    image: '/src/assets/2. Cambodian Silk.jpg',
    thumbnails: ['/src/assets/2. Cambodian Silk.jpg'],
    details: ['High-quality handwoven silk.', 'Used for traditional clothing and gifts.'],
    shoppingInfo: 'Ships within 3-5 business days.',
    overview: 'Cambodian silk is famous for its softness, shine, and cultural value.'
  }
]

// Fetch product by slug
const fetchProduct = () => {
  const p = productsDB.find(p => p.slug === slug.value)
  if (p) {
    product.value = p
    mainImage.value = p.image

    // Mock reviews
    reviews.value = [
      { id: 1, rating: 5, title: 'Amazing Product!', text: 'Loved it, highly recommend.', author: 'Sokha R.', location: 'Phnom Penh' },
      { id: 2, rating: 4, title: 'Good Quality', text: 'It worked as expected.', author: 'Vicheka S.', location: 'Siem Reap' }
    ]

    // Similar products excluding current
    similarProducts.value = productsDB
      .filter(p => p.slug !== slug.value)
      .map(p => ({ id: p.id, name: p.name, description: p.description, price: p.priceMin, image: p.image }))
  } else {
    product.value = null
  }
}

// Watch for route changes
watch(() => route.params.slug, (newSlug) => {
  slug.value = newSlug as string
  fetchProduct()
})

// Lifecycle
onMounted(fetchProduct)

// Thumbnail swap
const selectThumbnail = (index: number) => {
  if (!product.value) return
  if (product.value.thumbnails[index]) {
    const temp = product.value.image
    product.value.image = product.value.thumbnails[index]
    product.value.thumbnails[index] = temp
    mainImage.value = product.value.image
  }
}

// Quantity & Cart
const incrementQuantity = () => { quantity.value++ }
const decrementQuantity = () => { if (quantity.value > 1) quantity.value-- }
const addToCart = () => { if(product.value) console.log(`Added ${quantity.value} of ${product.value.name} to cart`) }

// Expandable sections
const toggleSection = (section: string) => {
  expandedSection.value = expandedSection.value === section ? null : section
}

// Scroll effect
const isScrolled = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 100 }
onMounted(() => { handleScroll(); window.addEventListener('scroll', handleScroll) })
onBeforeUnmount(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<template>
  <div :class="{'bg-white': isScrolled}" class="relative min-h-screen bg-[#806E53] pt-20">
    <div class="p-4 md:p-8">
      <div class="max-w-6xl pt-20 mx-auto" v-if="product">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Left Column: Images -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg md:h-96">
              <img :src="mainImage" :alt="product.name" class="object-cover w-full h-full" />
            </div>
            <div class="flex gap-3">
              <div v-for="(thumbnail, index) in product.thumbnails" :key="index"
                   @click="selectThumbnail(index)"
                   class="w-24 h-24 overflow-hidden transition bg-gray-100 border-2 rounded-lg cursor-pointer"
                   :class="product.image === thumbnail ? 'border-black' : 'border-transparent hover:border-gray-300'">
                <img :src="thumbnail" class="object-cover w-full h-full" />
              </div>
            </div>
          </div>

          <!-- Right Column: Product Info -->
          <div class="flex flex-col gap-6">
            <p class="mb-2 text-sm font-medium text-gray-600">{{ product.category }}</p>
            <h1 class="mb-2 text-2xl font-bold text-black md:text-4xl">{{ product.name }}</h1>
            <p class="text-2xl font-bold text-black">${{ product.priceMin.toFixed(2) }}–${{ product.priceMax.toFixed(2) }}</p>

            <div>
              <h3 class="mb-2 text-lg font-bold text-black">Description</h3>
              <p class="text-gray-700">{{ product.description }}</p>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="flex items-center gap-6">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button @click="decrementQuantity" class="px-4 py-2 text-gray-600 transition hover:bg-gray-100">−</button>
                <input v-model.number="quantity" type="number" min="1" class="w-16 text-center border-0 focus:outline-none" />
                <button @click="incrementQuantity" class="px-4 py-2 text-gray-600 transition hover:bg-gray-100">+</button>
              </div>
              <button @click="addToCart" class="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition bg-black rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black">
                ADD TO CART
              </button>
            </div>

            <!-- Expandable Sections -->
            <div class="pt-6 space-y-4 border-t">
              <div class="border rounded-lg" v-for="section in ['details','shopping','overview']" :key="section">
                <button @click="toggleSection(section)" class="flex items-center justify-between w-full p-4 transition hover:bg-gray-50">
                  <span class="text-lg font-bold text-black">{{ section.toUpperCase() }}</span>
                  <svg :class="{ 'rotate-180': expandedSection === section }" class="w-6 h-6 text-gray-600 transition-transform"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                <div v-if="expandedSection === section" class="px-4 py-4 border-t bg-gray-50">
                  <p v-if="section==='shopping'" class="text-gray-700">{{ product.shoppingInfo }}</p>
                  <p v-if="section==='overview'" class="text-gray-700">{{ product.overview }}</p>
                  <ul v-if="section==='details'" class="space-y-2">
                    <li v-for="(detail, index) in product.details" :key="index" class="flex items-start gap-3 text-gray-700">
                      <span class="text-gray-400">·</span>
                      <span>{{ detail }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Reviews -->
        <div class="pt-16 mt-16 border-t">
          <div class="mb-12 text-center">
            <h2 class="inline-block px-8 py-4 text-3xl italic font-light text-center bg-gray-100 rounded-lg md:text-4xl">client reviews</h2>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div v-for="review in reviews" :key="review.id" class="flex flex-col gap-4">
              <div class="flex gap-1">
                <span v-for="i in 5" :key="i" class="text-2xl" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
              </div>
              <h3 class="text-lg font-bold leading-tight text-black">{{ review.title }}</h3>
              <p class="flex-grow leading-relaxed text-gray-700">{{ review.text }}</p>
              <p class="text-sm font-medium text-gray-600">{{ review.author }}, {{ review.location }}</p>
            </div>
          </div>
        </div>

        <!-- Similar Products -->
        <div class="pt-16 mt-20 border-t">
          <div class="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
            <h2 class="text-3xl italic font-light md:text-4xl">similar products</h2>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div v-for="sp in similarProducts" :key="sp.id" class="flex flex-col gap-4 cursor-pointer group">
              <div class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg">
                <img :src="sp.image" :alt="sp.name" class="object-cover w-full h-full transition-transform group-hover:scale-105" />
              </div>
              <h3 class="text-xl font-bold text-black">{{ sp.name }}</h3>
              <p class="flex-grow text-sm font-semibold leading-tight text-gray-700">{{ sp.description }}</p>
              <p class="text-lg font-bold text-black">${{ sp.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-40 text-2xl text-center text-white">Loading product...</div>
    </div>
  </div>
</template>
