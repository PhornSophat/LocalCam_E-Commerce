<template>
  <footer class="bg-linear-to-br from-gray-800 via-gray-700 to-gray-900 text-white relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none"> -->
                <!-- <circle cx="12" cy="12" r="8" stroke="white" stroke-width="2" /> -->
                <img src="../assets/logo.png" alt="LocalCam Log classic" class=" h-full object-contain bg-slate-100 rounded-full w-full " />
              <!-- </svg> -->
            </div>
            <span class="text-2xl font-bold">LocalCam </span>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            Discover authentic local goods and cultural treasures. Supporting local artisans and businesses worldwide.
          </p>
          <!-- Social Media Icons -->
          <div class="flex space-x-4">
            <a href="#instagram" class="w-10 h-10 bg-gray-700 hover:bg-linear-to-br hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
            <a href="#facebook" class="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#tiktok" class="w-10 h-10 bg-gray-700 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="#telegram" class="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Quick Links</h3>
          <ul class="space-y-3">
            <li>
              <a href="/home" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/shop" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Shop All
              </a>
            </li>
            <li>
              <a href="/collections" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Collections
              </a>
            </li>
            <li>
              <a href="/blog" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Customer Service</h3>
          <ul class="space-y-3">
            <li>
              <a href="#contact" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#faqs" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                FAQs
              </a>
            </li>
            <li>
              <a href="#shipping" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#returns" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#track" class="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Track Order
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Stay Connected</h3>
          <p class="text-gray-300 text-sm mb-4">
            Get exclusive discounts, cultural inspiration, and early access to new arrivals.
          </p>
          <div class="space-y-3">
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="Your email address"
                @keypress.enter="handleSubscribe"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <button
              @click="handleSubscribe"
              class="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </button>
          </div>
          <p class="text-xs text-gray-400 mt-3">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

          <!-- Copyright -->
          <div class="text-gray-400 text-sm">
            © 2025 LocalCam. All rights reserved.
          </div>

          <!-- Legal Links -->
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#privacy" class="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" class="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#cookies" class="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>

          <!-- Payment Methods -->
          <div class="flex items-center space-x-3">
            <span class="text-gray-400 text-sm mr-2">We accept:</span>
            <div class="flex space-x-2">
              <div class="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                VISA
              </div>
              <div class="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                MC
              </div>
              <div class="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                PP
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

const handleSubscribe = () => {
  if (email.value && email.value.includes('@')) {
    console.log('Subscribed with:', email.value);
    alert(`Thank you for subscribing! We'll send updates to ${email.value}`);
    email.value = '';
  } else {
    alert('Please enter a valid email address');
  }
};
</script>


