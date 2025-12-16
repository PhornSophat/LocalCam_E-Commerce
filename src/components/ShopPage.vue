<template>
  <div class="min-h-screen bg-linear-to-b from-stone-50 via-white to-stone-50">

    <!-- Hero Section -->
    <section class="relative py-24 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-50" style="background-image: url('https://angkordoors.com/wp-content/uploads/2024/06/angkor-wat-temple_1.webp')"></div>
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-block mb-6 animate-bounce">
          <img class="w-20 h-20 rounded-2xl shadow-2xl" src="../assets/image.png" alt="Cambodia flag" />
        </div>
        <h1 class="text-5xl md:text-7xl font-light text-stone-800 mb-6 leading-tight" style="font-family: 'Brush Script MT', cursive">
          Discover the essence of<br/>Cambodia
        </h1>
        <p class="text-stone-700 font-bold text-2xl md:text-3xl mb-8">
          through handcrafted wood & craft products
        </p>
        <button class="bg-linear-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
          Explore Collection
        </button>
      </div>
    </section>

    <!-- Fresh Wood Products -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-4xl md:text-5xl font-light text-stone-800" style="font-family: 'Brush Script MT', cursive">
            Fresh Wood products
          </h2>
          <button class="hidden md:flex items-center gap-2 text-stone-600 hover:text-stone-800 font-semibold group">
            View All
            <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div
            v-for="product in freshProducts"
            :key="product.id"
            class="group cursor-pointer relative"
            @mouseenter="hoveredProduct = product.id"
            @mouseleave="hoveredProduct = null"
          >
            <div class="relative aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 " >
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

              <div class="absolute bottom-4 left-4 flex items-center gap-1 bg-white/95 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm font-semibold text-stone-800">{{ product.rating }}</span>
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
      </div>
    </section>

    <!-- Featured Products Banner -->
    <section class="py-16 px-4 bg-linear-to-br from-amber-50 via-orange-50 to-stone-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-6xl md:text-7xl font-light text-stone-800 mb-12" style="font-family: 'Brush Script MT', cursive">
          Featured Collection
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left Card -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <div class="p-8">
              <span class="inline-block px-4 py-2 bg-linear-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full mb-6 shadow-lg">
                New Arrival
              </span>
              <h3 class="text-3xl font-bold text-stone-800 mb-4">Food and Snack</h3>
              <p class="text-lg text-stone-600 mb-8 leading-relaxed">
                Taste the tradition of Cambodia with our freshly made Num on Sorm — sweet, authentic, and unforgettable
              </p>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://cdn.sabay.com/cdn/media.sabay.com/media/sabay-news/Sport-News/International-Sports/soccer/Soccer54/Soccer144/Soccer148/Roth_1/Roth_12D/Pumsen/pumsen4/pumsen5/pumsen9/pumsen10/pumsen11/pumsen12/pumsen13/pumsen14/pumsen15/pumsen16/pumsen17/pumsen29/pumsen30/pumsen31/pumsen32/pumsen33/pumsen34/pumsen35/Pumsen36/Pumsen37/pumsen38/pumsen39/pumsen40/6149a44747190_1632216120_medium.jpg"
                  alt="Featured product"
                  class="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <!-- Right Grid -->
          <div class="grid grid-cols-2 gap-6">
            <div
              v-for="(img, idx) in featuredImages"
              :key="idx"
              class="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                :src="img"
                :alt="`Product ${idx + 1}`"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        <!-- Showcase Products -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div
            v-for="product in showcaseProducts"
            :key="product.id"
            class="group cursor-pointer relative"
            @mouseenter="hoveredProduct = product.id"
            @mouseleave="hoveredProduct = null"
          >
            <div class="relative aspect-4/5 bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
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
                <span class="px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                  {{ product.tag }}
                </span>
              </div>
            </div>

            <div class="mt-4 px-1">
              <h3 class="text-lg font-semibold text-stone-800 mb-1.5 group-hover:text-amber-700 transition-colors">
                {{ product.name }}
              </h3>
              <div class="flex items-center justify-between">
                <p class="text-xl font-bold text-stone-900">${{ product.price }}</p>
                <svg class="w-5 h-5 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Explore Products Section with Nested Router -->
    <section class="py-20 px-4 bg-linear-to-b from-white to-stone-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl md:text-6xl mb-4 text-stone-800" style="font-family: 'Brush Script MT', cursive">
          explore our curated
        </h2>
        <h2 class="text-5xl md:text-6xl mb-12 text-stone-800" style="font-family: 'Brush Script MT', cursive">
          products
        </h2>

        <!-- Filter Tabs with Router Links -->
        <div class="flex flex-wrap gap-6 mb-12">
          <RouterLink
            to="/shop"
            custom
            v-slot="{ isActive, navigate }"
          >
            <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md hover:shadow-lg'
              ]"
            >
              All
            </button>
          </RouterLink>

          <RouterLink
            to="/shop/foods-snacks"
            custom
            v-slot="{ isActive, navigate }"
          >
            <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md hover:shadow-lg'
              ]"
            >
              Foods & Snacks
            </button>
          </RouterLink>

          <RouterLink
            to="/shop/instruments"
            custom
            v-slot="{ isActive, navigate }"
          >
            <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md hover:shadow-lg'
              ]"
            >
              Introument Traditional of Khmer
            </button>
          </RouterLink>

          <RouterLink
            to="/shop/beauty-home"
            custom
            v-slot="{ isActive, navigate }"
          >
            <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md hover:shadow-lg'
              ]"
            >
              Beauty & Home
            </button>
          </RouterLink>

          <RouterLink
            to="/shop/delta-outline"
            custom
            v-slot="{ isActive, navigate }"
          >
            <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md hover:shadow-lg'
              ]"
            >
              Delta & Outline
            </button>
          </RouterLink>
        </div>

        <!-- RouterView for nested routes -->
        <RouterView />

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-3 mt-12">
          <button class="w-11 h-11 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-all hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            v-for="num in [1, 2, 3]"
            :key="num"
            :class="[
              'w-11 h-11 flex items-center justify-center rounded-full font-semibold transition-all hover:scale-110',
              num === 1
                ? 'bg-linear-to-r from-stone-800 to-stone-700 text-white shadow-lg'
                : 'bg-white text-stone-700 hover:bg-stone-100 shadow-md'
            ]"
          >
            {{ num }}
          </button>
          <span class="text-stone-400 px-2">•••</span>
          <button
            v-for="num in [8, 9, 10]"
            :key="num"
            class="w-11 h-11 flex items-center justify-center rounded-full bg-white text-stone-700 hover:bg-stone-100 shadow-md transition-all hover:scale-110"
          >
            {{ num }}
          </button>
          <button class="w-11 h-11 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-all hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter/Browse Section -->
    <section class="py-20 px-4 bg-linear-to-br from-stone-800 to-stone-900 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-5xl md:text-6xl mb-4 text-amber-100" style="font-family: 'Brush Script MT', cursive">
              still browsing your
            </h2>
            <h2 class="text-5xl md:text-6xl mb-8 text-amber-100" style="font-family: 'Brush Script MT', cursive">
              new one?
            </h2>
            <p class="text-stone-300 mb-10 text-lg leading-relaxed max-w-md">
              Subscribe to our mailing list to receive information about new arrivals, future events and special offers.
            </p>
            <button class="bg-linear-to-r from-amber-500 to-orange-600 text-white px-10 py-4 text-lg font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              Contact Us
            </button>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMZfqsaaQXgMCDjhAe7jbZFLKYBAyXmHeQg&s"
              alt="Store front"
              class="rounded-2xl w-full h-80 object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <img
              src="https://business-cambodia.com/cms/assets/8f925357-dd64-4974-9fd4-9d0745082b56"
              alt="Wood products display"
              class="rounded-2xl w-full h-80 object-cover shadow-2xl hover:scale-105 transition-transform duration-500 mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hoveredProduct = ref<number | null>(null);

const freshProducts = ref([
  { id: 1, name: 'Bamboo Tray', price: 45, image: 'https://img.kwcdn.com/product/fancy/58719d04-5293-49e8-b083-316513685ea0.jpg', rating: 4.8 },
  { id: 2, name: 'Carbet Bamboo', price: 32, image: 'https://img.lazcdn.com/g/ff/kf/S2525de3bd5c248bab80aabed79eafb56E.jpg_720x720q80.jpg', rating: 4.9 },
  { id: 3, name: 'Log Canbine', price: 28, image: 'https://static.loghome.com/media/LHD_0308_MAG16_11868_2023-05-15_14-11.jpg', rating: 4.7 },
  { id: 4, name: 'អង្រុត', price: 55, image: 'https://s3.ams.com.kh/economy/2024/02/Hand3.jpg', rating: 5.0 },
  { id: 5, name: 'Wood Block Set', price: 38, image: 'https://m.media-amazon.com/images/I/61t7P2bFiTL._AC_UF894,1000_QL80_.jpg', rating: 4.6 },
]);

const showcaseProducts = ref([
  { id: 1, name: 'ប៉ុំផ្លែអាយ', price: 1, image: 'https://media.sabay.com/media/import-der/2017/04/plae-ay-4.jpeg', tag: 'Traditional' },
  { id: 2, name: 'ប៉ុំសប្បន្តូរ', price: 125, image: 'https://s3.ams.com.kh/infotainment/2022/09/275974036_3135300316789425_7666231020865074972_n-1024x575.png', tag: 'Premium' },
  { id: 3, name: 'ប៉ុំអាកោតុង', price: 45, image: 'https://numnek.wordpress.com/wp-content/uploads/2018/03/12_hlsu.jpg?w=640', tag: 'Popular' },
]);

const featuredImages = ref([
  'https://i.ytimg.com/vi/8M7f7vSs-_Y/hq720.jpg',
  'https://image.freshnewsasia.com/2020/id-022/fn-2020-09-17-12-00-46-0.jpg',
  'https://i.ytimg.com/vi/oAnIPFLZafA/hq720.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyLtekMhv-hP9JYyI8cEqaeJHg6OQU4fTBw&s'
]);
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
