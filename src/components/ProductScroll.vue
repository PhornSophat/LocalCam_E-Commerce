<template>
  <div class="w-full relative">

    <!-- Scroll container -->
    <div 
      ref="scrollContainer"
      class="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4"
      @scroll="handleScroll"
    >
      <ProductCart
        v-for="(item, index) in products"
        :key="index"
        :img="item.img"
        :category="item.category"
        :title="item.title"
        :price="item.price"
        :index="index"
      />
    </div>
    <div class="flex items-center gap-x-4">
      <!-- Left Arrow -->
      <button 
        @click="scrollLeft"
        class="bg-white p-3 shadow rounded-2xl text-4xl"
      >←</button>

      <!-- Right Arrow -->
      <button 
        @click="scrollRight"
        class=" bg-white p-3 shadow rounded-2xl text-4xl"
      >→</button>

      <!-- Progress Line -->
      <div class="mt-4 w-lg h-[4px] bg-gray-300 rounded">
        <div 
          class="h-full bg-black rounded transition-all duration-300"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import ProductCart from "./ProductCart.vue";

export default {
  components: { ProductCart },

  props: {
    products: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const scrollContainer = ref(null);
    const progress = ref(0);

    const handleScroll = () => {
      const el = scrollContainer.value;
      const maxScroll = el.scrollWidth - el.clientWidth;
      progress.value = (el.scrollLeft / maxScroll) * 100;
    };

    const scrollRight = () => {
      const el = scrollContainer.value;
      const cardWidth = 420 + 24;
      el.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
    };

    const scrollLeft = () => {
      const el = scrollContainer.value;
      const cardWidth = 420 + 24;
      el.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
    };

    return {
      scrollContainer,
      progress,
      handleScroll,
      scrollLeft,
      scrollRight
    };
  }
};
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
