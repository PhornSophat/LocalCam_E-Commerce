<template>
  <nav
    :class="{ 'bg-white shadow-lg': isScrolled }"
    class="fixed top-0 z-50 w-full transition-all duration-300"
  >
    <div class="w-full px-[7vw] py-4">
      <div class="flex items-center justify-between h-16">

        <div class="flex items-center shrink-0">
          <router-link
            to="/"
            :class="{ 'text-white': !isScrolled, 'text-[#806E53]': isScrolled }"
            class="flex items-center text-3xl max-[930px]:text-2xl font-bold hover:text-[#A08A6F] transition font-Poppins"
          >
            <img
              :src="isScrolled ? logoScrolled : whiteLogoWeb"
              alt="LocalCam Logo"
              class="w-16 h-16"
            />
            LocalCam
          </router-link>
        </div>

        <div class="relative flex-1">
          <transition name="nav-fade" mode="out-in">

            <div
              v-if="!isSearchOpen"
              key="menu"
              class="items-center justify-end hidden ml-10 space-x-4 md:flex"
            >
              <router-link to="/" :class="linkClass">HOME</router-link>
              <router-link to="/about" :class="linkClass">ABOUT</router-link>
              <router-link to="/shop" :class="linkClass">SHOP</router-link>
              <router-link to="/contact-us" :class="linkClass">CONTACT US</router-link>

              <div class="h-6 mx-2 border-l border-gray-300"></div>

              <button
                @click="openSearch"
                :class="iconClass"
                class="px-4 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
                </svg>
              </button>

              <router-link to="/cart" :class="iconClass" class="relative px-4 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13l-4-8M17 13l1.5 7M5 21h14"/>
                </svg>
                <span 
                  v-if="totalItems > 0" 
                  class="absolute top-0 right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2"
                  :class="isScrolled ? 'border-white' : 'border-[#806E53]'"
                >
                  {{ totalItems }}
                </span>
              </router-link>
            </div>

            <div
              v-else
              key="search"
              class="flex justify-center w-full"
            >
              <div class="relative w-full max-w-xl px-4 md:px-0">

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products, locations..."
                  autofocus
                  class="w-full px-6 py-3 rounded-full border border-gray-300
                         focus:ring-2 focus:ring-[#806E53] focus:outline-none transition"
                />

                <button
                  @click="closeSearch"
                  class="absolute right-8 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-[#806E53]"
                >
                  ✕
                </button>

                <div
                  v-if="filteredSuggestions.length"
                  class="absolute z-50 w-full mt-3 bg-white border shadow-lg rounded-2xl"
                >
                  <div
                    v-for="item in filteredSuggestions"
                    :key="item"
                    @click="selectSuggestion(item)"
                    class="px-6 py-3 transition cursor-pointer hover:bg-gray-50"
                  >
                    🔍 {{ item }}
                  </div>
                </div>

              </div>
            </div>

          </transition>
        </div>

        <div class="flex items-center space-x-2 md:hidden">

          <button
            @click="openSearch"
            :class="iconClass"
            class="p-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
            </svg>
          </button>

          <button
            @click="isMenuOpen = !isMenuOpen"
            :class="{ 'text-white': !isScrolled, 'text-gray-600': isScrolled }"
            class="p-2 transition"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

        </div>
      </div>
    </div>

    <div v-if="isMenuOpen && !isSearchOpen" class="bg-white shadow-inner md:hidden">
      <router-link to="/" class="block px-4 py-3">Home</router-link>
      <router-link to="/about" class="block px-4 py-3">About</router-link>
      <router-link to="/shop" class="block px-4 py-3">Shop</router-link>
      <router-link to="/contact-us" class="block px-4 py-3">Contact</router-link>
      <router-link to="/cart" class="block px-4 py-3 font-bold text-amber-700">Cart ({{ totalItems }})</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import logoScrolled from '../assets/black-weblogo.png';
import whiteLogoWeb from '../assets/whitelogoWeb.png';
import { cartState } from '../store'; // Import the store

export default defineComponent({
  name: 'NavigationBar',
  setup() {
    const isMenuOpen = ref(false);
    const isSearchOpen = ref(false);
    const isScrolled = ref(false);
    const searchQuery = ref('');

    // Computed total items count for the badge
    const totalItems = computed(() => {
      return cartState.items.reduce((sum, item) => sum + item.qty, 0);
    });

    const suggestions = [
      'Angkor Wat Tour',
      'Phnom Penh City',
      'Siem Reap Travel',
      'Local Handicrafts',
      'Photography Spots',
      'Food Experiences',
    ];

    const filteredSuggestions = computed(() =>
      searchQuery.value
        ? suggestions.filter(item =>
            item.toLowerCase().includes(searchQuery.value.toLowerCase())
          )
        : []
    );

    const openSearch = () => {
      isSearchOpen.value = true;
      isMenuOpen.value = false;
      searchQuery.value = '';
    };

    const closeSearch = () => {
      isSearchOpen.value = false;
      searchQuery.value = '';
    };

    const selectSuggestion = (item: string) => {
      searchQuery.value = item;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    onMounted(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const linkClass = computed(() =>
      `${isScrolled.value ? 'text-gray-600' : 'text-white'}
       hover:bg-[#806E53] hover:text-white px-3 py-2 rounded-md text-lg transition`
    );

    const iconClass = computed(() =>
      isScrolled.value
        ? 'text-black hover:text-[#806E53]'
        : 'text-white hover:text-[#A08A6F]'
    );

    return {
      isMenuOpen,
      isSearchOpen,
      isScrolled,
      searchQuery,
      filteredSuggestions,
      openSearch,
      closeSearch,
      selectSuggestion,
      linkClass,
      iconClass,
      logoScrolled,
      whiteLogoWeb,
      totalItems, // Return totalItems so template can use it
    };
  },
});
</script>

<style scoped>
.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: all 0.35s ease;
}

.nav-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.nav-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>