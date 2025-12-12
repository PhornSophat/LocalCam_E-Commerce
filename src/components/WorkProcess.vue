<template>
  <div class="w-full bg-white">
    <!-- Top Tabs -->
    <div class="flex">
      <div
        class="flex justify-center w-1/4 py-10 text-5xl font-['Poppins'] hover:cursor-pointer transition-all duration-300 ease-in-out"
        v-for="(pri, idx) in priciple"
        :key="pri.number"
        @click="currentIndex = idx"
        :class="idx === currentIndex ? 'bg-[#767064] text-white' : 'bg-white text-[#A6A6A6]'"
      >
        0{{ pri.number }}
      </div>
    </div>

    <!-- Content -->
    <div class="w-full p-4">
      <transition name="fade" mode="out-in">
        <div :key="currentIndex">
          <div class="w-full p-6">
            <p class="text-3xl font-['Poppins'] font-medium">
              {{ priciple[currentIndex].article }}
            </p>
          </div>

          <div class="w-full p-6">
            <p class="text-base font-['Poppins'] text-[#A1A1A1]">
              {{ priciple[currentIndex].detail }}
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Workprocess",

  props: {
    priciple: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const currentIndex = ref(0);
    return { currentIndex };
  },
};
</script>

<style>
/* Smooth fade + slide animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
