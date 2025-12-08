<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
    <div
      v-for="product in foodsSnacks"
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
          <span class="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
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

const foodsSnacks = ref([
  {
    id: 1,
    name: 'ប៉ុំផ្លែអាយ (Num Plae Ai)',
    price: 1,
    image: 'https://media.sabay.com/media/import-der/2017/04/plae-ay-4.jpeg',
    tag: 'Traditional'
  },
  {
    id: 2,
    name: 'ប៉ុំសប្បន្តូរ (Num Sang Khya)',
    price: 125,
    image: 'https://s3.ams.com.kh/infotainment/2022/09/275974036_3135300316789425_7666231020865074972_n-1024x575.png',
    tag: 'Premium'
  },
  {
    id: 3,
    name: 'ប៉ុំអាកោតុង (Num Ansom)',
    price: 45,
    image: 'https://numnek.wordpress.com/wp-content/uploads/2018/03/12_hlsu.jpg?w=640',
    tag: 'Popular'
  },
  {
    id: 4,
    name: 'នំបញ្ចុក (Num Banh Chok)',
    price: 3,
    image: 'https://i.ytimg.com/vi/8M7f7vSs-_Y/hq720.jpg',
    tag: 'Fresh'
  },
  {
    id: 5,
    name: 'នំគ្រូប (Num Krok)',
    price: 2,
    image: 'https://image.freshnewsasia.com/2020/id-022/fn-2020-09-17-12-00-46-0.jpg',
    tag: 'Hot'
  },
  {
    id: 6,
    name: 'នំចេក (Num Chek)',
    price: 1.5,
    image: 'https://i.ytimg.com/vi/oAnIPFLZafA/hq720.jpg',
    tag: 'Sweet'
  },
  {
    id: 7,
    name: 'ក្រឡាន់ (Kralan)',
    price: 2,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyLtekMhv-hP9JYyI8cEqaeJHg6OQU4fTBw&s',
    tag: 'Traditional'
  },
  {
    id: 8,
    name: 'នំអន្សម (Num Ansom)',
    price: 2.5,
    image: 'https://cdn.sabay.com/cdn/media.sabay.com/media/sabay-news/Sport-News/International-Sports/soccer/Soccer54/Soccer144/Soccer148/Roth_1/Roth_12D/Pumsen/pumsen4/pumsen5/pumsen9/pumsen10/pumsen11/pumsen12/pumsen13/pumsen14/pumsen15/pumsen16/pumsen17/pumsen29/pumsen30/pumsen31/pumsen32/pumsen33/pumsen34/pumsen35/Pumsen36/Pumsen37/pumsen38/pumsen39/pumsen40/6149a44747190_1632216120_medium.jpg',
    tag: 'Festival'
  },
]);
</script>
