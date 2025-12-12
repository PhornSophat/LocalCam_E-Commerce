<template>
  <div class="w-[300px] shrink-0">
    <!-- Product number dynamically -->
    <p class="text-[#A6A6A6]">//{{ formattedIndex }}</p>

    <!-- Product image -->
    <img :src="img" class="w-full h-[420px]" />

    <!-- Category -->
    <p class="text-[#A6A6A6]">{{ category }}</p>

    <!-- Name -->
    <p class="font-bold font-['Poppins'] text-xl">{{ title }}</p>

    <!-- Price -->
    <p class="font-bold font-['Poppins'] text-xl">${{ price }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductCart",

  props: {
    img: String,
    category: String,
    title: String,
    price: Number,
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    formattedIndex() {
      // Add leading zeros if needed (e.g., 1 → 001)
      return String(this.index + 1).padStart(2, "");
    }
  }
};
</script>
