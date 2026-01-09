<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <NavigationBar v-if="!route.meta.hideNav" />
  <RouterView />
  <Footer v-if="!route.meta.hideFooter" />
</template>

<style>
body {
  font-family: 'Roboto', 'Condiment', 'Poppins', 'Inter', sans-serif;
}
</style>
