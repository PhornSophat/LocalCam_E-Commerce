<template>
  <div class="flex max-md:flex-col items-center justify-center max-w-full mx-auto overflow-hidden">
    <!-- Image Side -->
    <div class="w-1/2 h-[600px] max-md:w-full flex items-center justify-center">
      <img
        :src="categories[currentIndex].image"
        :alt="categories[currentIndex].name"
        class="w-3/5 max-md:w-11/12 max-lg:h-8/12 h-10/12 object-cover transition-all duration-500 rounded-br-3xl rounded-tl-3xl"
      />
    </div>

    <!-- Categories Side -->
    <div class="w-1/2 max-md:w-full flex flex-col gap-4 max-md:px-[7vw] pt-4 max-md:pt-0">
      <h2 class="font-light text-xs text-[#A3A2A2]">Click to explore more</h2>
      <div class="flex flex-col gap-8">
        <p
          v-for="(cat, idx) in categories"
          :key="cat.name"
          @click="currentIndex = idx"
          :class="idx === currentIndex ? 'font-extrabold text-6xl underline' : 'text-[#767064]'"
          class="text-4xl hover:cursor-pointer"
        >
          {{ cat.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";

export default {
  name: "Carousel",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const currentIndex = ref(0);

    return { currentIndex };
  },
};
</script>

<style scoped>
/* img {
  transition: opacity 0.5s ease-in-out;
} */
</style>
