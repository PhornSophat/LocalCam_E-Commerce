<template>
  <div class="min-h-screen bg-linear-to-b from-stone-50 via-white to-stone-50">
    <section class="relative px-4 py-24 overflow-hidden">
      <div
        class="absolute inset-0 bg-center bg-cover opacity-50"
        style="
          background-image: url('https://angkordoors.com/wp-content/uploads/2024/06/angkor-wat-temple_1.webp');
        "
      ></div>
      <div class="relative z-10 mx-auto text-center max-w-7xl">
        <div class="inline-block mb-6 animate-bounce">
          <img
            class="w-20 h-20 shadow-2xl rounded-2xl"
            src="../assets/image.png"
            alt="Cambodia flag"
          />
        </div>
        <h1
          class="mb-6 text-5xl font-light leading-tight md:text-7xl text-stone-800"
          style="font-family: 'Brush Script MT', cursive"
        >
          Discover the essence of<br />Cambodia
        </h1>
        <p class="mb-8 text-2xl font-bold text-stone-700 md:text-3xl">
          through handcrafted wood & craft products
        </p>
        <button
          class="px-10 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-full shadow-2xl bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 hover:scale-105"
        >
          Explore Collection
        </button>
      </div>
    </section>

    <section class="px-4 py-20 bg-linear-to-b from-white to-stone-50">
      <div class="mx-auto max-w-7xl">
        <h2
          class="mb-4 text-5xl md:text-6xl text-stone-800"
          style="font-family: 'Brush Script MT', cursive"
        >
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
                  : 'bg-white text-stone-600 hover:bg-stone-100 hover:shadow-lg',
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
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-7xl">
        <div class="flex items-center justify-between mb-12">
          <h2
            class="text-4xl font-light md:text-5xl text-stone-800"
            style="font-family: 'Brush Script MT', cursive"
          >
            Fresh Wood products
          </h2>
          <div v-if="loading" class="text-stone-400 animate-pulse">Loading products...</div>
        </div>

        <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div
            v-for="product in freshProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="viewProductDetail(product)"
          >
            <div
              class="relative overflow-hidden transition-all duration-500 shadow-lg aspect-square bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl hover:shadow-2xl hover:-translate-y-2"
            >
              <img
                :src="product.image_url"
                :alt="product.name"
                class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div
                v-if="product.stock <= 0"
                class="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
              >
                <span
                  class="px-4 py-2 text-xs font-bold text-white uppercase border-2 border-white rounded-lg"
                  >Sold Out</span
                >
              </div>

              <div
                class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"
              ></div>

              <div
                class="absolute flex flex-col gap-2 transition-all duration-300 translate-x-4 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <button
                  class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-red-50 text-stone-700 hover:text-red-500"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <button
                  @click.stop="addToCart(product)"
                  :disabled="product.stock <= 0"
                  class="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-green-50 text-stone-700 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div class="flex items-start justify-between mb-2">
                <h3
                  class="text-sm font-semibold transition-colors text-stone-800 group-hover:text-amber-700 line-clamp-2"
                >
                  {{ product.name }}
                </h3>
                <p class="ml-2 text-base font-bold text-stone-900 whitespace-nowrap">
                  ${{ product.price }}
                </p>
              </div>

              <!-- Rating Stars -->
              <div class="flex items-center gap-1 mb-2">
                <div class="flex text-yellow-400">
                  <span v-for="i in 5" :key="i" class="text-xs">★</span>
                </div>
                <span class="text-[10px] text-stone-500 font-medium"
                  >({{ Math.floor(Math.random() * 50) + 10 }})</span
                >
              </div>

              <p
                v-if="product.stock > 0 && product.stock < 5"
                class="text-[10px] font-bold text-red-500 animate-pulse uppercase"
              >
                Only {{ product.stock }} left!
              </p>
              <p v-else-if="product.stock >= 5" class="text-[10px] text-stone-400 font-medium">
                In Stock: {{ product.stock }}
              </p>
              <p v-else class="text-[10px] text-red-700 font-bold uppercase">Restocking Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-20 text-white bg-linear-to-br from-stone-800 to-stone-900">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2
              class="mb-4 text-5xl md:text-6xl text-amber-100"
              style="font-family: 'Brush Script MT', cursive"
            >
              still browsing your new one?
            </h2>
            <p class="max-w-md mb-10 text-lg text-stone-300">
              Subscribe to our mailing list for arrivals and special offers.
            </p>
            <button
              class="px-10 py-4 text-lg font-bold text-white transition-all transform rounded-full bg-linear-to-r from-amber-500 to-orange-600 hover:scale-105"
            >
              Contact Us
            </button>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMZfqsaaQXgMCDjhAe7jbZFLKYBAyXmHeQg&s"
              class="object-cover w-full shadow-2xl rounded-2xl h-80"
            />
            <img
              src="https://business-cambodia.com/cms/assets/8f925357-dd64-4974-9fd4-9d0745082b56"
              class="object-cover w-full mt-8 shadow-2xl rounded-2xl h-80"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { cartState } from '../store'
import { toast } from '../utils/toast'

const router = useRouter()
const loading = ref(true)
const freshProducts = ref<any[]>([])

const navigationTabs = [
  { name: 'All', path: '/shop' },
  { name: 'Foods & Snacks', path: '/shop/foods-snacks' },
  { name: 'Instruments Traditional', path: '/shop/instruments' },
  { name: 'Beauty & Home', path: '/shop/beauty-home' },
  { name: 'Delta & Outline', path: '/shop/delta-outline' },
]

const fetchProducts = async () => {
  loading.value = true
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    console.error('Error fetching products:', error.message)
  } else {
    freshProducts.value = data
  }
  loading.value = false
}

// Cart logic with Stock Validation
const addToCart = (product: any) => {
  if (product.stock <= 0) {
    toast.error('Sorry, this item is out of stock!')
    return
  }

  const existing = cartState.items.find((i: any) => i.id === product.id)

  if (existing) {
    // Check if adding more would exceed available stock
    if (existing.qty < product.stock) {
      existing.qty++
      toast.success(`${product.name} quantity updated!`)
    } else {
      toast.warning(`Sorry, only ${product.stock} items are available.`)
    }
  } else {
    cartState.items.push({ ...product, qty: 1 })
    toast.success(`${product.name} added to cart!`)
  }
}

// Navigate to product detail page
const viewProductDetail = (product: any) => {
  // Use slug if available, otherwise generate from name
  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/products/${slug}`)
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
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
  0%,
  100% {
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
