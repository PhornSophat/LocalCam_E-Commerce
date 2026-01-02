<template>
  <div class="flex items-center justify-center max-w-full mx-auto overflow-hidden max-md:flex-col">
    <!-- Image Side -->
    <div class="w-1/2 h-[600px] max-md:w-full flex items-center justify-center">
      <img
        :src="categories[currentIndex].image"
        :alt="categories[currentIndex].name"
        class="object-cover w-3/5 transition-all duration-500 max-md:w-11/12 max-lg:h-8/12 h-10/12 rounded-br-3xl rounded-tl-3xl"
      />
    </div>

    <!-- Categories Side -->
    <div class="w-1/2 max-md:w-full flex flex-col gap-4 max-md:px-[7vw] pt-4 max-md:pt-0">
      <h2 class="font-light text-xs text-[#A3A2A2]">Click to explore more</h2>

      <div class="flex flex-col gap-8">
        <p
          v-for="(cat, idx) in categories"
          :key="cat.name"
          @click="handleCategoryClick(idx, cat.route)"
          :class="idx === currentIndex
            ? 'font-extrabold text-6xl underline'
            : 'text-[#767064]'"
          class="text-4xl hover:cursor-pointer"
        >
          {{ cat.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { PropType } from "vue";

interface Category {
  name: string;
  image: string;
  route: string;
}

export default {
  name: "Carousel",
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  setup() {
    const currentIndex = ref(0);
    const router = useRouter();

    const handleCategoryClick = (index: number, route?: string) => {
      currentIndex.value = index; // update image first

      if (!route) return;

      setTimeout(() => {
        router.push(route);
      }, 700); // delay in ms (match CSS transition)
    };


    return {
      currentIndex,
      handleCategoryClick,
    };
  },
};

</script>
