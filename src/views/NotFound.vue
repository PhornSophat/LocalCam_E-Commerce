<template>
  <div
    class="flex flex-col items-center justify-center py-50 px-6 text-center bg-[#ecddb1]"
  >
    <!-- Error Number -->
    <h1
      class="mb-4 font-extrabold text-gray-800 text-9xl animate-bounce"
    >
      404
    </h1>

    <!-- Short message -->
    <p class="mb-6 text-2xl text-gray-700 md:text-3xl">
      Oops! Page not found.
    </p>

    <!-- Description -->
    <p class="max-w-md mb-8 text-gray-500">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>

    <!-- Go Home Button -->
    <router-link
      to="/"
      class="inline-block px-6 py-3 font-semibold transition-all duration-300 rounded-lg hover:shadow-md"
    >
      Go Back Home
    </router-link>

  </div>
</template>

<script setup lang="ts">
// No JS needed for static 404 page
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}
</style>
