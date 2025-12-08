<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
    <div
      v-for="product in deltaProducts"
      :key="product.id"
      class="group cursor-pointer relative"
    >
      <div class="relative aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors">
            <svg class="w-5 h-5 text-stone-700 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-50 transition-colors">
            <svg class="w-5 h-5 text-stone-700 hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </button>
        </div>

        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-lg">
            {{ product.tag }}
          </span>
        </div>
      </div>

      <div class="mt-4 px-1">
        <h3 class="text-sm font-semibold text-stone-800 mb-1.5 group-hover:text-amber-700 transition-colors">
          {{ product.name }}
        </h3>
        <div class="flex items-center justify-between">
          <p class="text-base font-bold text-stone-900">${{ product.price }}</p>
          <svg class="w-5 h-5 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const deltaProducts = ref([
  {
    id: 1,
    name: 'Wooden Cutting Board',
    price: 42,
    image: 'https://m.media-amazon.com/images/I/61t7P2bFiTL._AC_UF894,1000_QL80_.jpg',
    tag: 'Kitchen'
  },
  {
    id: 2,
    name: 'Bamboo Utensil Set',
    price: 28,
    image: 'https://img.kwcdn.com/product/fancy/58719d04-5293-49e8-b083-316513685ea0.jpg',
    tag: 'Eco'
  },
  {
    id: 3,
    name: 'Wood Serving Platter',
    price: 55,
    image: 'https://img.lazcdn.com/g/ff/kf/S2525de3bd5c248bab80aabed79eafb56E.jpg_720x720q80.jpg',
    tag: 'Premium'
  },
  {
    id: 4,
    name: 'Carved Bowl Set',
    price: 38,
    image: 'https://s3.ams.com.kh/economy/2024/02/Hand3.jpg',
    tag: 'Handmade'
  },
  {
    id: 5,
    name: 'Bamboo Coaster Set',
    price: 15,
    image: 'https://img.kwcdn.com/product/fancy/58719d04-5293-49e8-b083-316513685ea0.jpg',
    tag: 'New'
  },
  {
    id: 6,
    name: 'Wood Salad Bowl',
    price: 48,
    image: 'https://static.loghome.com/media/LHD_0308_MAG16_11868_2023-05-15_14-11.jpg',
    tag: 'Popular'
  },
  {
    id: 7,
    name: 'Knife Block Set',
    price: 85,
    image: 'https://m.media-amazon.com/images/I/61t7P2bFiTL._AC_UF894,1000_QL80_.jpg',
    tag: 'Premium'
  },
  {
    id: 8,
    name: 'Spice Organizer',
    price: 32,
    image: 'https://img.lazcdn.com/g/ff/kf/S2525de3bd5c248bab80aabed79eafb56E.jpg_720x720q80.jpg',
    tag: 'Kitchen'
  },
]);
</script>
