<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
          All Users ({{ users.length }})
        </h3>
      </div>

      <div
        v-if="users.length === 0"
        class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
      >
        No users found.
      </div>

      <div class="grid gap-4">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer"
          @click="openUserModal(user)"
        >
          <div class="flex items-center gap-6">
            <div
              class="flex items-center justify-center text-xl font-black text-white bg-gradient-to-br from-indigo-500 to-purple-600 w-14 h-14 rounded-2xl"
            >
              {{ (user.full_name || user.email || '?')[0].toUpperCase() }}
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">
                {{ user.full_name || 'Unknown User' }}
              </h4>
              <p class="text-xs font-medium text-slate-500">{{ user.email }}</p>
              <p class="text-[9px] font-black text-slate-600 uppercase mt-1">
                Joined: {{ new Date(user.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-8 mt-4 md:mt-0">
            <div class="text-right">
              <p class="text-lg font-black text-indigo-400">
                {{ getUserStats(user.email).totalOrders }} Orders
              </p>
              <p class="text-[10px] font-black text-slate-500 uppercase">
                ${{ getUserStats(user.email).totalSpent.toFixed(2) }} Total
              </p>
            </div>
            <button
              class="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Orders Modal -->
    <Teleport to="body">
      <div
        v-if="showUserModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="closeUserModal"
      >
        <div
          class="bg-[#1E293B] w-full max-w-3xl max-h-[80vh] rounded-[2.5rem] border border-slate-700 overflow-hidden"
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-8 border-b border-slate-700">
            <div class="flex items-center gap-4">
              <div
                class="flex items-center justify-center text-xl font-black text-white bg-gradient-to-br from-indigo-500 to-purple-600 w-14 h-14 rounded-2xl"
              >
                {{ (selectedUser?.full_name || selectedUser?.email || '?')[0].toUpperCase() }}
              </div>
              <div>
                <h3 class="text-xl font-black text-white">
                  {{ selectedUser?.full_name || 'Unknown User' }}
                </h3>
                <p class="text-sm text-slate-400">{{ selectedUser?.email }}</p>
              </div>
            </div>
            <button
              @click="closeUserModal"
              class="p-2 transition-colors rounded-full hover:bg-slate-700"
            >
              <svg
                class="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- User Stats -->
          <div class="grid grid-cols-3 gap-4 p-6 border-b border-slate-700">
            <div class="p-4 text-center bg-[#0F172A] rounded-2xl">
              <p class="text-[10px] font-black text-slate-500 uppercase">Total Orders</p>
              <p class="text-2xl font-black text-indigo-400">{{ userOrders.length }}</p>
            </div>
            <div class="p-4 text-center bg-[#0F172A] rounded-2xl">
              <p class="text-[10px] font-black text-slate-500 uppercase">Total Spent</p>
              <p class="text-2xl font-black text-emerald-400">
                ${{ userOrders.reduce((sum, o) => sum + Number(o.total_price || 0), 0).toFixed(2) }}
              </p>
            </div>
            <div class="p-4 text-center bg-[#0F172A] rounded-2xl">
              <p class="text-[10px] font-black text-slate-500 uppercase">Member Since</p>
              <p class="text-lg font-black text-white">
                {{ new Date(selectedUser?.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <!-- Orders List -->
          <div class="p-6 overflow-y-auto max-h-96">
            <h4 class="mb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              Order History
            </h4>

            <div
              v-if="userOrders.length === 0"
              class="p-10 text-center border border-dashed text-slate-500 rounded-2xl border-slate-700"
            >
              No orders found for this user.
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="order in userOrders"
                :key="order.id"
                class="bg-[#0F172A] p-4 rounded-2xl border border-slate-700 flex items-center justify-between"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-xl"
                    :class="{
                      'bg-amber-500/20 text-amber-500': order.status === 'pending',
                      'bg-blue-500/20 text-blue-500': order.status === 'shipped',
                      'bg-emerald-500/20 text-emerald-500': order.status === 'delivered',
                      'bg-red-500/20 text-red-500': order.status === 'cancelled',
                    }"
                  >
                    <span v-if="order.status === 'pending'">⏳</span>
                    <span v-else-if="order.status === 'shipped'">🚚</span>
                    <span v-else-if="order.status === 'delivered'">✅</span>
                    <span v-else>❌</span>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">Order #{{ order.id }}</p>
                    <p class="text-[9px] font-black text-slate-500 uppercase">
                      {{ new Date(order.created_at).toLocaleString() }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-black text-white">${{ order.total_price }}</p>
                  <p
                    class="text-[9px] font-black uppercase"
                    :class="{
                      'text-amber-500': order.status === 'pending',
                      'text-blue-500': order.status === 'shipped',
                      'text-emerald-500': order.status === 'delivered',
                      'text-red-500': order.status === 'cancelled',
                    }"
                  >
                    {{ order.status }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import AdminLayout from './AdminLayout.vue'
import { useAdminData } from '../../composables/useAdminData'
import type { User, Order } from '../../composables/useAdminData'

const { users, fetchData, fetchUsers, getUserStats } = useAdminData()

const showUserModal = ref(false)
const selectedUser = ref<User | null>(null)
const userOrders = ref<Order[]>([])

const openUserModal = async (user: User) => {
  selectedUser.value = user
  showUserModal.value = true

  try {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false })

    userOrders.value = data || []
  } catch (error) {
    console.error('Error fetching user orders:', error)
  }
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
  userOrders.value = []
}

onMounted(() => {
  fetchData()
  fetchUsers()
})
</script>
