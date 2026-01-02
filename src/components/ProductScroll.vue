<template>
  <div class="relative w-full">
    <div
      ref="scrollContainer"
      class="flex gap-6 py-4 overflow-x-auto scroll-smooth no-scrollbar"
      @scroll="handleScroll"
    >
      <ProductCart
        v-for="(item, index) in products"
        :key="item.slug || index"
        :img="item.img"
        :category="item.category"
        :title="item.title"
        :price="item.price"
        :route="`/products/${item.slug || 'product-' + index}`"
        :index="index"
      />
    </div>

    <div class="flex items-center mt-6 gap-x-6">
      <div class="flex gap-2">
        <button
          @click="scrollLeft"
          class="flex items-center justify-center w-12 h-12 transition-colors bg-white border shadow-sm border-stone-200 rounded-2xl hover:bg-stone-100 active:scale-90"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <button
          @click="scrollRight"
          class="flex items-center justify-center w-12 h-12 transition-colors bg-white border shadow-sm border-stone-200 rounded-2xl hover:bg-stone-100 active:scale-90"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div class="flex-1 max-w-md h-[4px] bg-stone-200 rounded-full overflow-hidden">
        <div
          class="h-full transition-all duration-300 ease-out bg-stone-800"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import ProductCart from "./ProductCart.vue";

export default {
  name: "ProductScroll",
  components: { ProductCart },
  props: {
    products: {
      type: Array as any,
      required: true
    }
  },
  setup() {
    const scrollContainer = ref<HTMLElement | null>(null);
    const progress = ref(0);

    const handleScroll = () => {
      if (!scrollContainer.value) return;
      const el = scrollContainer.value;
      const maxScroll = el.scrollWidth - el.clientWidth;
      progress.value = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    };

    const scrollRight = () => {
      if (!scrollContainer.value) return;
      // Scrolls roughly two cards
      scrollContainer.value.scrollBy({ left: 800, behavior: "smooth" });
    };

    const scrollLeft = () => {
      if (!scrollContainer.value) return;
      scrollContainer.value.scrollBy({ left: -800, behavior: "smooth" });
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

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>