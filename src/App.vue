
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->


  <NavigationBar />

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
