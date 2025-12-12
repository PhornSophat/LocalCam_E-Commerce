
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <NavigationBar />

  <RouterView />
  
  <Footer />
</template>

<style>
/* Global font for the whole app */
body {
  font-family: 'Roboto', 'Condiment', 'Poppins', 'Inter', sans-serif;
}
</style>
