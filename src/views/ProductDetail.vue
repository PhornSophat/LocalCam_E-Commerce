<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref(1)
const expandedSection = ref<string | null>(null)

interface Product {
  id: number
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

const product = ref<Product>({
  id: 1,
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
})

const mainImage = ref(product.value.image)

const selectThumbnail = (index: number) => {
  if (product.value.thumbnails[index]) {
    const temp = product.value.image
    product.value.image = product.value.thumbnails[index]
    product.value.thumbnails[index] = temp
    mainImage.value = product.value.image
  }
}

const reviews = ref<Review[]>([
  {
    id: 1,
    rating: 5,
    title: 'RICH, NATURAL, AND SO DELICIOUS — LOVE THIS PALM SUGAR!',
    text: 'It tastes even better than I expected! The sweetness is smooth, the flavor feels pure and natural, and it makes my cooking taste amazing. My family noticed the difference right away.',
    author: 'Sokha R.',
    location: 'Phnom Penh, Cambodia'
  },
  {
    id: 2,
    rating: 4,
    title: 'PURE, AROMATIC, AND PERFECT FOR COOKING — HIGHLY RECOMMEND!',
    text: 'The palm sugar has such a deep, natural flavor. It dissolves easily and adds a warm sweetness to every dish. Friends who tried my desserts said the taste improved a lot.',
    author: 'Vicheka S.',
    location: 'Siem Reap, Cambodia'
  }
])

const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆').join('')
}

const similarProducts = ref<SimilarProduct[]>([
  {
    id: 2,
    name: 'Krama',
    description: 'USED FOR FASHION, HEADSCARF, BELT, OR BABY CARRIER',
    price: 5,
    image: '/src/assets/1. Krama.jpg'
  },
  {
    id: 3,
    name: 'Cambodian Silk',
    description: 'USED FOR SCARVES, CLOTHING, DECOR, AND GIFTS',
    price: 7,
    image: '/src/assets/2. Cambodian Silk.jpg'
  },
  {
    id: 4,
    name: 'Kampot Pepper',
    description: 'USED FOR COOKING, MARINADES, AND SEASONING',
    price: 10,
    image: '/src/assets/9. Kampot Pepper.jpeg'
  }
])

const toggleSection = (section: string) => {
  expandedSection.value = expandedSection.value === section ? null : section
}

const addToCart = () => {
  console.log(`Added ${quantity.value} of ${product.value.name} to cart`)
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
import { onMounted, onBeforeUnmount } from 'vue';

const isMenuOpen = ref(false);
const isScrolled = ref(false);

// Check scroll position
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div 
    :class="{'bg-white': isScrolled }"
    class="relative min-h-screen bg-[#806E53]">
    <!-- Main Content -->
    <div class="p-4 md:p-8">
      <div class="max-w-6xl pt-20 mx-auto">
      <!-- Product Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Left Column: Images -->
        <div class="flex flex-col gap-4">
          <!-- Main Image -->
          <div class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg md:h-96">
            <img :src="mainImage" :alt="product.name" class="object-cover w-full h-full" />
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-3">
            <div
              v-for="(thumbnail, index) in product.thumbnails"
              :key="index"
              @click="selectThumbnail(index)"
              class="w-24 h-24 overflow-hidden transition bg-gray-100 border-2 rounded-lg cursor-pointer"
              :class="product.image === thumbnail ? 'border-black' : 'border-transparent hover:border-gray-300'"
            >
              <img :src="thumbnail" :alt="`Thumbnail ${index + 1}`" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        <!-- Right Column: Product Info -->
        <div class="flex flex-col gap-6">
          <!-- Title and Category -->
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600">{{ product.category }}</p>
            <h1 class="mb-2 text-2xl font-bold text-black md:text-4xl">{{ product.name }}</h1>
          </div>

          <!-- Price -->
          <div>
            <p class="text-2xl font-bold text-black">
              ${{ product.priceMin.toFixed(2) }}–${{ product.priceMax.toFixed(2) }} per kilogram
            </p>
          </div>

          <!-- Description -->
          <div>
            <h3 class="mb-2 text-lg font-bold text-black">Description</h3>
            <p class="text-gray-700">{{ product.description }}</p>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="flex items-center gap-6">
            <!-- Quantity Selector -->
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

            <!-- Add to Cart Button -->
            <button
              @click="addToCart"
              class="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition bg-black rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              <span>ADD TO CART</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-10 0h10M9 21a1 1 0 11-2 0 1 1 0 012 0m10 0a1 1 0 11-2 0 1 1 0 012 0" />
              </svg>
            </button>
          </div>

          <!-- Expandable Sections -->
          <div class="pt-6 space-y-4 border-t">
            <!-- Details Section -->
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div
                v-if="expandedSection === 'details'"
                class="px-4 py-4 border-t bg-gray-50"
              >
                <ul class="space-y-2">
                  <li v-for="(detail, index) in product.details" :key="index" class="flex items-start gap-3 text-gray-700">
                    <span class="text-gray-400">·</span>
                    <span>{{ detail }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Shopping Info Section -->
            <div class="border rounded-lg">
              <button
                @click="toggleSection('shopping')"
                class="flex items-center justify-between w-full p-4 transition hover:bg-gray-50"
              >
                <span class="text-lg font-bold text-black">SHOPPING INFO</span>
                <svg
                  :class="{ 'rotate-180': expandedSection === 'shopping' }"
                  class="w-6 h-6 text-gray-600 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div
                v-if="expandedSection === 'shopping'"
                class="px-4 py-4 border-t bg-gray-50"
              >
                <p class="text-gray-700">{{ product.shoppingInfo }}</p>
              </div>
            </div>

            <!-- Overview Section -->
            <div class="border rounded-lg">
              <button
                @click="toggleSection('overview')"
                class="flex items-center justify-between w-full p-4 transition hover:bg-gray-50"
              >
                <span class="text-lg font-bold text-black">OVERVIEW</span>
                <svg
                  :class="{ 'rotate-180': expandedSection === 'overview' }"
                  class="w-6 h-6 text-gray-600 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div
                v-if="expandedSection === 'overview'"
                class="px-4 py-4 border-t bg-gray-50"
              >
                <p class="text-gray-700">{{ product.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Reviews Section -->
      <div class="pt-16 mt-16 border-t">
        <!-- Section Title -->
        <div class="mb-12 text-center">
          <h2 class="inline-block px-8 py-4 text-3xl italic font-light text-center bg-gray-100 rounded-lg md:text-4xl">
            client reviews
          </h2>
        </div>

        <!-- Reviews Grid -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div v-for="review in reviews" :key="review.id" class="flex flex-col gap-4">
            <!-- Star Rating -->
            <div class="flex gap-1">
              <span v-for="i in 5" :key="i" class="text-2xl" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">
                ★
              </span>
            </div>

            <!-- Review Title -->
            <h3 class="text-lg font-bold leading-tight text-black">{{ review.title }}</h3>

            <!-- Review Text -->
            <p class="flex-grow leading-relaxed text-gray-700">{{ review.text }}</p>

            <!-- Reviewer Info -->
            <p class="text-sm font-medium text-gray-600">{{ review.author }}, {{ review.location }}</p>
          </div>
        </div>
      </div>

      <!-- Similar Products Section -->
      <div class="pt-16 mt-20 border-t">
        <!-- Section Header -->
        <div class="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
          <h2 class="text-3xl italic font-light md:text-4xl">similar products</h2>
          <button class="w-full px-6 py-2 font-semibold text-black transition border-2 border-black hover:bg-black hover:text-white md:w-auto">
            VIEW ALL PRODUCTS →
          </button>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div v-for="product in similarProducts" :key="product.id" class="flex flex-col gap-4 cursor-pointer group">
            <!-- Product Image -->
            <div class="flex items-center justify-center h-64 overflow-hidden bg-gray-100 rounded-lg">
              <img :src="product.image" :alt="product.name" class="object-cover w-full h-full transition-transform group-hover:scale-105" />
            </div>

            <!-- Product Name -->
            <h3 class="text-xl font-bold text-black">{{ product.name }}</h3>

            <!-- Product Description -->
            <p class="flex-grow text-sm font-semibold leading-tight text-gray-700">{{ product.description }}</p>

            <!-- Product Price -->
            <p class="text-lg font-bold text-black">${{ product.price }}</p>
          </div>
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="p-12 mt-20 bg-gray-100 rounded-lg md:p-16">
        <div class="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Left: Text Content -->
          <div class="flex flex-col gap-6">
            <h2 class="text-3xl italic font-light leading-tight text-black md:text-5xl lg:text-6xl">
              Ready to refresh your<br />lifestyle with local<br />goodness?
            </h2>
            <button
              class="flex items-center gap-2 px-8 py-3 font-bold text-white transition bg-black w-fit hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              <span>START SHOPPING NOW</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-10 0h10M9 21a1 1 0 11-2 0 1 1 0 012 0m10 0a1 1 0 11-2 0 1 1 0 012 0" />
              </svg>
            </button>
          </div>

          <!-- Right: Images -->
          <div class="flex gap-4">
            <!-- Left Image -->
            <div class="flex-1 h-64 overflow-hidden rounded-3xl md:h-80">
              <img src="/src/assets/image copy 3.png" alt="Store 1" class="object-cover w-full h-full" />
            </div>
            <!-- Right Image -->
            <div class="flex-1 h-64 overflow-hidden rounded-3xl md:h-80">
              <img src="/src/assets/image copy 4.png" alt="Store 2" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
