<template>
  <div
    class="w-[300px] shrink-0 hover:cursor-pointer overflow-hidden group"
    @click="handleClick"
  >
    <p class="text-[#A6A6A6] transition-colors group-hover:text-amber-700">
      //{{ formattedIndex }}
    </p>

    <div class="relative overflow-hidden rounded-2xl">
      <img
        :src="img"
        :alt="title"
        class="w-full h-[420px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      
      <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/5 group-hover:opacity-100"></div>
    </div>

    <div class="mt-3 space-y-1">
      <p class="text-[#A6A6A6] text-sm uppercase tracking-wider">{{ category }}</p>

      <div class="flex flex-col">
        <h3 class="font-bold font-['Poppins'] text-xl text-stone-900 group-hover:text-amber-800 transition-colors">
          {{ title }}
        </h3>
        <p class="font-bold font-['Poppins'] text-xl text-stone-700">
          ${{ price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProductCart",

  props: {
    img: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: "Handicraft"
    },
    title: {
      type: String,
      default: "Product Name"
    },
    price: {
      type: Number,
      default: 0
    },
    route: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const handleClick = () => {
      // Small delay creates a "tactile" feel, allowing the hover state 
      // to fully register before the new view slides in.
      setTimeout(() => {
        router.push(props.route);
      }, 150); 
    };

    // Computes //01, //02, etc. based on index
    const formattedIndex = computed(() => {
      return String(props.index + 1).padStart(2, "0");
    });

    return {
      handleClick,
      formattedIndex
    };
  },
});
</script>

<style scoped>
/* Optional: ensures text doesn't wrap awkwardly during transitions */
h3 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>