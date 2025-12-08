<script setup lang="ts">
  import HeaderPage from './views/HeaderPage.vue'
  import FooterPage from './views/FooterPage.vue'
  import { RouterView } from 'vue-router'
// import { RouterLink, RouterView } from 'vue-router'
// import ShopPageView from './views/ShopPageview.vue';
</script>

<template>

      <HeaderPage />

  <RouterView />

      <FooterPage />


</template>
