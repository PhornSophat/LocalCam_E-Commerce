<template>
  <header class="bg-white border-b-2 border-blue-500 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white border-2 border-gray-800 rounded-full flex items-center justify-center">
          <img src="../assets/logo.png" alt="Logo" class="w-8 h-8 object-contain" />
          </div>
          <span class="text-xl font-bold text-gray-800">LocalCam</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="/home" class="text-gray-700 hover:text-gray-900 font-medium transition">
            HOME
          </a>
          <a href="/about" class="text-gray-700 hover:text-gray-900 font-medium transition">
            ABOUT
          </a>
          <a href="/shop" class="text-gray-700 hover:text-gray-900 font-medium transition">
            SHOP
          </a>
          <a href="/contact" class="text-gray-700 hover:text-gray-900 font-medium transition">
            CONTACT US
          </a>
        </nav>

        <!-- Icons -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="w-px h-6 bg-gray-300"></div>
          <button class="text-gray-700 hover:text-gray-900 transition" @click="handleSearch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button class="text-gray-700 hover:text-gray-900 transition" @click="handleCart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-gray-700"
          @click="toggleMobileMenu"
        >
          <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
        <nav class="flex flex-col space-y-3">
          <a href="/home" class="text-gray-700 hover:text-gray-900 font-medium">
            HOME
          </a>
          <a href="/about" class="text-gray-700 hover:text-gray-900 font-medium">
            ABOUT
          </a>
          <a href="/shop" class="text-gray-700 hover:text-gray-900 font-medium">
            SHOP
          </a>
          <a href="/contact" class="text-gray-700 hover:text-gray-900 font-medium">
            CONTACT US
          </a>
          <div class="flex space-x-4 pt-3">
            <button class="text-gray-700 hover:text-gray-900" @click="handleSearch">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button class="text-gray-700 hover:text-gray-900" @click="handleCart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang ="ts">
import { ref } from 'vue';


const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleSearch = () => {
  console.log('Search clicked');
  // Add your search logic here
};

const handleCart = () => {
  console.log('Cart clicked');
  // Add your cart logic here
};
</script>

