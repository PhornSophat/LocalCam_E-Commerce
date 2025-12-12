<template>
  <div class="flex justify-center w-full bg-white p-6">

    <!-- Whole testimonial switches -->
    <transition name="fade" mode="out-in">
      <div :key="'content-' + currentIndex" class="flex flex-col justify-center lg:items-center lg:flex-row gap-10">

        <!-- IMAGE TRANSITION -->
        <div class="w-3/7 max-lg:w-full overflow-hidden">
          <transition name="slide-img" mode="out-in">
            <img
              :key="'img-' + currentIndex"
              :src="testimonials[currentIndex].image"
              class="rounded-xl shadow-lg w-full object-cover"
            />
          </transition>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="w-full lg:w-1/2 space-y-6">
          <p class="text-5xl font-serif">“</p>

          <!-- Stars -->
          <div class="flex text-yellow-400 text-xl">
            <span v-for="n in testimonials[currentIndex].rating" :key="n">★</span>
          </div>

          <!-- Review -->
          <p class="text-gray-700 text-base">
            {{ testimonials[currentIndex].review }}
          </p>

          <hr class="border-gray-300" />

          <!-- Name -->
          <p class="font-semibold text-lg">
            {{ testimonials[currentIndex].name }},
            <span class="font-normal text-gray-500">
              {{ testimonials[currentIndex].location }}
            </span>
          </p>

          <!-- Controls -->
          <div class="flex items-center gap-4 pt-4">
            <button
              @click="prev"
              class="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
            >←</button>

            <button
              @click="next"
              class="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
            >→</button>

            <p class="ml-auto text-sm text-gray-500">
              {{ currentIndex + 1 }}/{{ testimonials.length }}
            </p>
          </div>

        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  testimonials: { type: Array, required: true }
});

const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.testimonials.length;
};

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.testimonials.length) %
    props.testimonials.length;
};
</script>

<style>
/* CONTENT FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* IMAGE SLIDE LEFT → RIGHT */
.slide-img-enter-active,
.slide-img-leave-active {
  position: absolute;
  transition: all 10s ease;
}

.slide-img-enter-from {
  opacity: 0;
  transform: translateX(-60px); /* SLIDE FROM LEFT */
}

.slide-img-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-img-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-img-leave-to {
  opacity: 0;
  transform: translateX(60px); /* SLIDE TO RIGHT */
}
</style>
