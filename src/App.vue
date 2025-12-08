<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <NavigationBar />

  <RouterView />
</template>

<style>
/* Global font for the whole app */
body {
  font-family: 'Roboto', 'Condiment', 'Poppins', 'Inter', sans-serif;
}
</style>
