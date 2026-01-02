<template>
  <div class="min-h-screen bg-linear-to-b from-stone-50 via-white to-stone-50">

    <section class="relative px-4 py-24 overflow-hidden">
      <div class="absolute inset-0 bg-center bg-cover opacity-50" style="background-image: url('https://angkordoors.com/wp-content/uploads/2024/06/angkor-wat-temple_1.webp')"></div>
      <div class="relative z-10 mx-auto text-center max-w-7xl">
        <div class="inline-block mb-6 animate-bounce">
          <img class="w-20 h-20 shadow-2xl rounded-2xl" src="../assets/image.png" alt="Cambodia flag" />
        </div>
        <h1 class="mb-6 text-5xl font-light leading-tight md:text-7xl text-stone-800" style="font-family: 'Brush Script MT', cursive">
          Discover the essence of<br/>Cambodia
        </h1>
        <p class="mb-8 text-2xl font-bold text-stone-700 md:text-3xl">
          through handcrafted wood & craft products
        </p>
        <button class="px-10 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-full shadow-2xl bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 hover:scale-105">
          Explore Collection
        </button>
      </div>
    </section>

    
    <section class="px-4 py-20 bg-linear-to-b from-white to-stone-50">
      <div class="mx-auto max-w-7xl">
        <h2 class="mb-4 text-5xl md:text-6xl text-stone-800" style="font-family: 'Brush Script MT', cursive">
          explore our curated products
        </h2>
        
        <div class="flex flex-wrap gap-4 mb-12">
          <RouterLink 
            v-for="tab in navigationTabs" 
            :key="tab.path"
            :to="tab.path"
            custom
            v-slot="{ isActive, navigate }"
          >
          <button
              @click="navigate"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md',
                isActive 
                ? 'bg-stone-800 text-white scale-105 shadow-lg' 
                : 'bg-white text-stone-600 hover:bg-stone-100 hover:shadow-lg'
              ]"
            >
            {{ tab.name }}
          </button>
        </RouterLink>
      </div>
      
      <div class="min-h-[400px]">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
      
      <div class="flex items-center justify-center gap-3 mt-16">
        <button class="flex items-center justify-center transition-all rounded-full w-11 h-11 bg-stone-200 text-stone-600 hover:bg-stone-300"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
        <button v-for="n in [1, 2, 3]" :key="n" :class="['w-11 h-11 flex items-center justify-center rounded-full font-semibold transition-all', n === 1 ? 'bg-stone-800 text-white' : 'bg-white text-stone-700 hover:bg-stone-100 shadow-sm']">{{ n }}</button>
        <span class="px-2 text-stone-400">•••</span>
        <button class="flex items-center justify-center transition-all rounded-full w-11 h-11 bg-stone-200 text-stone-600 hover:bg-stone-300"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
      </div>
    </div>
  </section>

  <section class="px-4 py-16">
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-4xl font-light md:text-5xl text-stone-800" style="font-family: 'Brush Script MT', cursive">
          Fresh Wood products
        </h2>
        <button class="items-center hidden gap-2 font-semibold md:flex text-stone-600 hover:text-stone-800 group">
          View All
          <svg class="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="product in freshProducts"
          :key="product.id"
          class="relative cursor-pointer group"
        >
          <div class="relative overflow-hidden transition-all duration-500 shadow-lg aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl hover:shadow-2xl " >
            <img :src="product.image" :alt="product.name" class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110" />
            <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"></div>
            <div class="absolute flex flex-col gap-2 transition-all duration-300 translate-x-4 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0">
              <button class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-red-50 text-stone-700 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
              <button class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-green-50 text-stone-700 hover:text-green-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg></button>
            </div>
          </div>
          <div class="px-1 mt-4">
            <h3 class="text-sm font-semibold text-stone-800 mb-1.5 group-hover:text-amber-700 transition-colors">{{ product.name }}</h3>
            <p class="text-base font-bold text-stone-900">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="px-4 py-20 text-white bg-linear-to-br from-stone-800 to-stone-900">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 class="mb-4 text-5xl md:text-6xl text-amber-100" style="font-family: 'Brush Script MT', cursive">still browsing your new one?</h2>
            <p class="max-w-md mb-10 text-lg text-stone-300">Subscribe to our mailing list for arrivals and special offers.</p>
            <button class="px-10 py-4 text-lg font-bold text-white transition-all transform rounded-full bg-linear-to-r from-amber-500 to-orange-600 hover:scale-105">Contact Us</button>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMZfqsaaQXgMCDjhAe7jbZFLKYBAyXmHeQg&s" class="object-cover w-full shadow-2xl rounded-2xl h-80" />
            <img src="https://business-cambodia.com/cms/assets/8f925357-dd64-4974-9fd4-9d0745082b56" class="object-cover w-full mt-8 shadow-2xl rounded-2xl h-80" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

// Define the navigation tabs for the Nested Router
const navigationTabs = [
  { name: 'All', path: '/shop' },
  { name: 'Foods & Snacks', path: '/shop/foods-snacks' },
  { name: 'Instruments Traditional', path: '/shop/instruments' },
  { name: 'Beauty & Home', path: '/shop/beauty-home' },
  { name: 'Delta & Outline', path: '/shop/delta-outline' },
];

const freshProducts = ref([
  { id: 1, name: 'Bamboo Tray', price: 45, image: 'https://img.kwcdn.com/product/fancy/58719d04-5293-49e8-b083-316513685ea0.jpg' },
  { id: 2, name: 'Carbet Bamboo', price: 32, image: 'https://img.lazcdn.com/g/ff/kf/S2525de3bd5c248bab80aabed79eafb56E.jpg_720x720q80.jpg' },
  { id: 3, name: 'Log Canbine', price: 28, image: 'https://static.loghome.com/media/LHD_0308_MAG16_11868_2023-05-15_14-11.jpg' },
  { id: 4, name: 'អង្រុត', price: 55, image: 'https://s3.ams.com.kh/economy/2024/02/Hand3.jpg' },
  { id: 5, name: 'Wood Block Set', price: 38, image: 'https://m.media-amazon.com/images/I/61t7P2bFiTL._AC_UF894,1000_QL80_.jpg' },
]);
</script>

<style scoped>
/* Smooth transition for the dynamic components */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>