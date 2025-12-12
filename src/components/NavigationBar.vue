<template>
  <!-- Dynamically apply background and shadow only when isScrolled is true -->
  <nav 
    :class="{ 'bg-white shadow-lg': isScrolled }"
    class="fixed w-full top-0 z-50 transition-all duration-300" 
  >
    <div class="w-full px-[7vw] py-4">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo/Brand Section: Text color changes dynamically -->
       <div class="shrink-0 flex items-center">
            <router-link 
        to="/" 
        :class="{ 'text-white': !isScrolled, 'text-[#806E53]': isScrolled }"
        class="flex items-center text-3xl max-[930px]:text-2xl font-bold hover:text-[#A08A6F] transition duration-300 font-Poppins"
      >
        <img 
          :src="isScrolled ? logoScrolled : whiteLogoWeb" 
          alt="LocalCam Logo" 
          class="h-16 w-16 inline-block" 
        />
        LocalCam
      </router-link>
      </div>


        <!-- Desktop Navigation Links (Hidden on Mobile) -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center justify-center space-x-4 ">
            <!-- Link text color changes dynamically -->
            <router-link 
              to="/" 
              :class="{ 'text-white': !isScrolled, 'text-gray-600': isScrolled }"
              class="hover:bg-[#806E53] hover:text-white px-3 py-2 rounded-md text-lg max-[930px]:text-xs font-medium transition duration-300"
            >
              HOME
            </router-link>
            <router-link 
              to="/about" 
              :class="{ 'text-white': !isScrolled, 'text-gray-600': isScrolled }"
              class="hover:bg-[#806E53] hover:text-white px-3 py-2 rounded-md text-lg max-[930px]:text-xs font-medium transition duration-300"
            >
              ABOUT
            </router-link>
            <router-link 
              to="/shop" 
              :class="{ 'text-white': !isScrolled, 'text-gray-600': isScrolled }"
              class="hover:bg-[#806E53] hover:text-white px-3 py-2 rounded-md text-lg max-[930px]:text-xs font-medium transition duration-300"
            >
              SHOP
            </router-link>
            <router-link 
              to="/contact-us" 
              :class="{ 'text-white': !isScrolled, 'text-gray-600': isScrolled }"
              class="hover:bg-[#806E53] hover:text-white px-3 py-2 rounded-md text-lg max-[930px]:text-xs font-medium transition duration-300"
            >
              CONTACT US
            </router-link>

          <!-- divider -->
          <div class="h-6 border-l border-gray-300"></div>

          <!-- Icons -->
          <!-- Search Icon -->
          <button 
            :class="{
              'text-white hover:text-[#A08A6F]': !isScrolled,
              'text-black hover:text-[#806E53]': isScrolled
            }"
            class="transition duration-300 flex justify-center items-center px-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 max-[930px]:h-5 max-[930px]:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
            </svg>
          </button>

          <!-- Cart Icon -->
          <button 
            :class="{
              'text-white hover:text-[#A08A6F]': !isScrolled,
              'text-black hover:text-[#806E53]': isScrolled
            }"
            class="transition duration-300 px-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 max-[930px]:h-5 max-[930px]:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13l-4-8M17 13l1.5 7M5 21h14"/>
            </svg>
          </button>
          </div>
        </div>

        <!-- Mobile Menu Button (Hidden on Desktop) -->
        <div class="md:hidden flex items-center">
          <!-- Button color changes dynamically for visibility on transparent background -->
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            :class="{ 'text-white': !isScrolled, 'text-gray-400 hover:text-gray-500 hover:bg-gray-100': isScrolled }"
            class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#806E53] transition duration-300"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Hamburger Icon (Menu Closed) -->
            <svg v-if="!isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close Icon (Menu Open) -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer (Toggled by Button) -->
    <!-- Always use white background for readability when opened -->
    <div v-if="isMenuOpen" class="md:hidden bg-white pb-3 border-t border-gray-100 shadow-inner">
      <div class="px-2 pt-2 space-y-1 sm:px-3">
        <router-link to="/" @click="isMenuOpen = false" class="text-gray-700 hover:bg-gray-50 hover:text-[#806E53] block px-3 py-2 rounded-md text-base font-medium transition duration-300 ">
          Home
        </router-link>
        <router-link to="/about" @click="isMenuOpen = false" class="text-gray-700 hover:bg-gray-50 hover:text-[#806E53] block px-3 py-2 rounded-md text-base font-medium transition duration-300">
          About
        </router-link>
        <router-link to="/contact-us" @click="isMenuOpen = false" class="text-gray-700 hover:bg-gray-50 hover:text-[#806E53] block px-3 py-2 rounded-md text-base font-medium transition duration-300">
          Contact Us
        </router-link>
        <div class="pt-2">
            <button class="w-full text-left bg-[#806E53] text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#A08A6F] transition duration-300 shadow-md">
              Shop Now
            </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue';
import logoScrolled from '../assets/black-weblogo.png';
import whiteLogoWeb from '../assets/whitelogoWeb.png';

export default defineComponent({
  name: 'NavigationBar',
  setup() {
    const isMenuOpen = ref(false);
    const isScrolled = ref(false); // New state to track scroll position

    // Function to check scroll position and update state
    const handleScroll = () => {
      // Check if scroll position is greater than 10px
      isScrolled.value = window.scrollY > 100;
    };

    // Attach scroll listener when the component is mounted
    onMounted(() => {
      // Set initial state based on current position (useful if user refreshes page while scrolled)
      handleScroll(); 
      window.addEventListener('scroll', handleScroll);
    });

    // Remove scroll listener when the component is unmounted to prevent memory leaks
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isMenuOpen,
      isScrolled, // Expose new state
      logoScrolled,
      whiteLogoWeb,
    };
  },
});
</script>