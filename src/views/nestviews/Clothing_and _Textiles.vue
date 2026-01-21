<template>
  <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
    <div
      v-for="product in deltaProducts"
      :key="product.id"
      class="relative cursor-pointer group"
      @click="viewProductDetail(product)"
    >
      <div class="relative overflow-hidden transition-all duration-500 shadow-lg aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl hover:shadow-2xl">
        <img
          :src="product.image_url || product.image"
          :alt="product.name"
          class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"></div>

        <div class="absolute flex flex-col gap-2 transition-all duration-300 translate-x-4 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0">
          <button class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-red-50">
            <svg class="w-5 h-5 text-stone-700 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <button class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-green-50">
            <svg class="w-5 h-5 text-stone-700 hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </button>
        </div>

        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full shadow-lg">
            {{ product.tag }}
          </span>
        </div>
      </div>

      <div class="px-1 mt-4">
        <h3 class="text-sm font-semibold text-stone-800 mb-1.5 group-hover:text-amber-700 transition-colors">
          {{ product.name }}
        </h3>
        <div class="flex items-center justify-between">
          <p class="text-base font-bold text-stone-900">${{ product.price }}</p>
          <svg class="w-5 h-5 transition-all duration-300 opacity-0 text-stone-400 group-hover:opacity-100 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../supabase';

const router = useRouter();
const deltaProducts = ref<any[]>([]);

const fetchProducts = async () => {
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  deltaProducts.value = data || [];
};

const viewProductDetail = (product: any) => {
  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/products/${slug}`);
};

onMounted(() => {
  fetchProducts();
});
</script>

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
<!-- </script> -->
