<template>
  <div class="relative w-full h-screen overflow-hidden">
    <div
    class="flex h-full transition-transform duration-700 ease-in-out"
    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
    <div v-for="(image, index) in images" :key="index" class="w-full shrink-0 h-full">
      <img
      :src="image"
      :alt="`Slide image ${index + 1}`"
      class="w-full h-full object-cover"
    />
    </div>
  </div>

  <div class="absolute inset-0 bg-[#806E53] opacity-35 z-10"></div>

  <!-- Previous / Next Buttons -->
  <button
    @click="prevSlide(); restartTimerOnInteraction();"
    class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white hover:text-gray-900 p-3 rounded-full transition duration-300 backdrop-blur-sm z-20"
    aria-label="Previous Slide"
  >
    <!-- Left Arrow -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>

  <button
    @click="nextSlide(); restartTimerOnInteraction();"
    class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white hover:text-gray-900 p-3 rounded-full transition duration-300 backdrop-blur-sm z-20"
    aria-label="Next Slide"
  >
    <!-- Right Arrow -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
  </button>

  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
    <span
      v-for="(image, index) in images"
      :key="index"
      @click="goToSlide(index)"
      class="h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
      :class="{
          // Active (Wider and Black)
          'bg-black w-12': currentIndex === index,
          // Inactive (Smaller and Dark Gray)
          'bg-white w-4 hover:bg-gray-200': currentIndex !== index,
      }"
      :aria-label="`Go to slide ${index + 1}`"
    ></span>
  </div>

  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, defineComponent } from "vue";
// Enforcing the full, correct path to resolve the truncation issue reported in the error log.
import home1 from "../assets/home3.jpg";
import home2 from "../assets/homePage.jpg";
import home3 from "../assets/homePage2.jpg";

export default defineComponent({
name: "Slider",
setup() {
const images = ref([home1, home2, home3]);
const currentIndex = ref(0);

let slideInterval = null;
const slideDuration = 4000; // Slide changes every 4 seconds

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevSlide = () => {
  // Logic for backward looping: (current - 1 + length) % length
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// --- Auto-Play Functions ---

const startSlide = () => {
  if (slideInterval) return;
  slideInterval = window.setInterval(nextSlide, slideDuration);
};

const pauseSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const goToSlide = (index) => {
  // Manual navigation resets the timer to give the user control
  pauseSlide();
  currentIndex.value = index;
  startSlide();
};

// Pause auto-play immediately when the user interacts, then restart after a short delay
const restartTimerOnInteraction = () => {
  pauseSlide();
  // Restart the timer after 3 seconds of inactivity
  window.setTimeout(startSlide, 3000);
};

// Lifecycle Hooks for cleanup
onMounted(startSlide);
onUnmounted(pauseSlide);

return {
  images,
  currentIndex,
  nextSlide,
  prevSlide,
  goToSlide,
  restartTimerOnInteraction,
};
},
});
</script>

<style scoped>
/* No custom CSS needed thanks to Tailwind, but the scoped block is kept for potential future use */
</style>
