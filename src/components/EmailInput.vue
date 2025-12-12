<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <!-- Input -->
      <input
        type="email"
        v-model="email"
        placeholder="Enter your Email Address"
        class="bg-transparent outline-none text-white placeholder:text-gray-300 w-full"
      />

      <!-- Arrow Icon -->
      <button @click="submitEmail" class="ml-4">
      <ArrowLongRightIcon
        alt="Go to exploration our products"
        class="ml-3 w-6 h-6 text-white 
                transition-all duration-300 
                group-hover:translate-x-2 
                hover:text-black 
                active:translate-x-2"
        />

      </button>
    </div>

    <!-- Underline -->
    <div class="border-b border-[#A6A6A6] mt-2"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'

const email = ref("");

const submitEmail = () => {
  console.log("Submitted:", email.value);
};
</script>

<style scoped>
/* Matching your background color feel */
:host {
  background-color: #726a60;
}
</style>
