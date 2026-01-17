<template>
  <AdminLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4">
      <div class="bg-[#1E293B] p-8 rounded-[2rem] border border-slate-800">
        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">Revenue</p>
        <h2 class="text-3xl font-black text-white">${{ stats.revenue.toFixed(2) }}</h2>
      </div>
      <div class="bg-[#1E293B] p-8 rounded-[2rem] border border-slate-800">
        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">Active Orders</p>
        <h2 class="text-3xl font-black text-amber-500">{{ stats.pending }}</h2>
      </div>
      <div class="bg-[#1E293B] p-8 rounded-[2rem] border border-slate-800">
        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">Total Users</p>
        <h2 class="text-3xl font-black text-indigo-400">{{ users.length }}</h2>
      </div>
      <div class="bg-[#1E293B] p-8 rounded-[2rem] border border-slate-800">
        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">Stock Health</p>
        <h2
          class="text-3xl font-black"
          :class="stats.lowStockCount > 0 ? 'text-red-500' : 'text-emerald-500'"
        >
          {{ stats.health }}%
        </h2>
        <div class="w-full h-1 mt-4 overflow-hidden rounded-full bg-slate-800">
          <div
            class="h-full transition-all duration-1000 bg-indigo-500"
            :style="{ width: stats.health + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Low Stock Alert -->
    <div v-if="lowStockItems.length > 0" class="mb-12">
      <div class="flex items-center gap-2 px-2 mb-4">
        <span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        <h3 class="text-[10px] font-black uppercase text-red-400 tracking-[0.2em]">
          Restock Priority
        </h3>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in lowStockItems"
          :key="item.id"
          class="flex items-center justify-between p-4 border bg-red-500/5 border-red-500/20 rounded-3xl"
        >
          <div class="flex items-center gap-3">
            <img :src="item.image_url" class="object-cover w-10 h-10 rounded-xl grayscale" />
            <div>
              <p class="text-xs font-bold text-white">{{ item.name }}</p>
              <p class="text-[9px] font-black text-red-500 uppercase">{{ item.stock }} Left</p>
            </div>
          </div>
          <router-link to="/admin/products">
            <button class="text-[9px] font-black text-red-400 hover:underline">EDIT</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Recent Orders Section -->
    <div class="space-y-4">
      <h3 class="px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
        Recent Orders
      </h3>
      <div
        v-if="orders.length === 0"
        class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
      >
        No orders found yet.
      </div>
      <div
        v-for="order in orders.slice(0, 5)"
        :key="order.id"
        class="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between group hover:border-indigo-500/30 transition-all"
      >
        <div class="flex items-center gap-6">
          <div class="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-xl">
            📦
          </div>
          <div>
            <h4 class="text-lg font-bold text-white">{{ order.customer_name }}</h4>
            <p class="max-w-xs text-xs font-medium truncate text-slate-500">
              Order ID: {{ order.id }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-8 mt-4 md:mt-0">
          <div class="text-right">
            <p class="text-2xl font-black text-white">${{ order.total_price }}</p>
            <p class="text-[9px] font-black text-slate-500 uppercase">
              {{ new Date(order.created_at).toLocaleDateString() }}
            </p>
          </div>
          <button
            v-if="order.status === 'pending'"
            @click="updateOrderStatus(order.id, 'shipped')"
            class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
          >
            Ship Item
          </button>
          <span v-else class="text-emerald-500 text-[10px] font-black uppercase">Completed</span>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import AdminLayout from './AdminLayout.vue'
import { useAdminData } from '../../composables/useAdminData'

const { orders, users, stats, lowStockItems, fetchData, updateOrderStatus } = useAdminData()

onMounted(() => {
  fetchData()
})
</script>
