<template>
  <div class="flex min-h-screen bg-[#0F172A] font-Poppins text-slate-200">
    <!-- Sidebar Navigation -->
    <aside
      class="w-64 bg-[#1E293B] border-r border-slate-800 flex flex-col p-6 hidden md:flex sticky top-0 h-screen"
    >
      <div class="flex items-center gap-3 px-2 mb-10">
        <div class="flex items-center justify-center w-10 h-10 font-black bg-indigo-600 rounded-xl">
          🔐
        </div>
        <span class="text-xl font-black tracking-tighter">ADMIN</span>
      </div>

      <!-- Admin Navigation -->
      <nav class="flex-1 space-y-2">
        <router-link to="/admin" custom v-slot="{ isActive, navigate }">
          <button
            @click="navigate"
            :class="
              $route.path === '/admin'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-800'
            "
            class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
          >
            📊 Dashboard
          </button>
        </router-link>

        <router-link to="/admin/products" custom v-slot="{ isActive, navigate }">
          <button
            @click="navigate"
            :class="
              $route.path === '/admin/products'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-800'
            "
            class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
          >
            📦 Products
          </button>
        </router-link>

        <router-link to="/admin/orders" custom v-slot="{ isActive, navigate }">
          <button
            @click="navigate"
            :class="
              $route.path === '/admin/orders'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-800'
            "
            class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
          >
            🛒 Orders
          </button>
        </router-link>

        <router-link to="/admin/users" custom v-slot="{ isActive, navigate }">
          <button
            @click="navigate"
            :class="
              $route.path === '/admin/users'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-800'
            "
            class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
          >
            👥 Users
          </button>
        </router-link>
      </nav>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="w-full px-4 py-3 text-sm font-bold text-red-400 transition-all border bg-red-600/10 hover:bg-red-600/20 border-red-500/20 rounded-xl"
      >
        🚪 Logout
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-y-auto md:p-12">
      <!-- Header -->
      <header class="flex items-center justify-between mb-10">
        <h1 class="text-3xl italic font-black">Admin Dashboard</h1>
        <div
          class="bg-emerald-500/10 text-emerald-500 px-4 py-1 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase"
        >
          Live Sync
        </div>
      </header>

      <!-- Content Slot -->
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<script lang="ts">
export default {
  name: 'AdminLayout',
}
</script>
