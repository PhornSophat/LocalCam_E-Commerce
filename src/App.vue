
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <!-- <NavigationBar /> -->

  <RouterView />
  <!-- <div id="app">
    <router-view />
  </div> -->
</template>

<style>
body {
  font-family: 'Roboto', 'Condiment', 'Poppins', 'Inter', sans-serif;
}
</style>
