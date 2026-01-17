<template>
  <AdminLayout>
    <div class="space-y-4">
      <h3 class="px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
        All Orders ({{ orders.length }})
      </h3>
      <div
        v-if="orders.length === 0"
        class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
      >
        No orders found.
      </div>
      <div v-for="order in orders" :key="order.id" @click="showOrderDetails(order.id)">
        <div
          class="bg-[#1E293B] p-6 rounded-4xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer"
        >
          <div class="flex items-center gap-6">
            <div
              class="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-xl"
            >
              📦
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">{{ order.customer_name }}</h4>
              <p class="max-w-xs text-xs font-medium truncate text-slate-500">
                {{ order.customer_email }}
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
            <select
              :value="order.status"
              @change="handleStatusChange(order.id, $event)"
              @click.stop
              class="bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>

  <!-- Order Detail Modal - Completely Outside AdminLayout -->
  <teleport to="body">
    <div
      v-if="hoveredOrderId && selectedOrder"
      class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      style="
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 99999 !important;
        display: flex !important;
      "
      @click="clearHover"
    >
      <div
        class="bg-[#1E293B] border border-indigo-500/30 rounded-3xl p-8 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h4 class="text-xl font-black tracking-wider text-indigo-400 uppercase">Order Details</h4>
          <button
            @click="clearHover"
            class="text-2xl font-bold transition-colors text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <!-- Order Info Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Order ID -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Order ID</span>
              <span class="font-bold text-white">#{{ String(selectedOrder.id) }}</span>
            </div>

            <!-- Status -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Status</span>
              <span
                :class="{
                  'bg-amber-500/20 text-amber-400': selectedOrder.status === 'pending',
                  'bg-blue-500/20 text-blue-400': selectedOrder.status === 'shipped',
                  'bg-emerald-500/20 text-emerald-400': selectedOrder.status === 'delivered',
                  'bg-red-500/20 text-red-400': selectedOrder.status === 'cancelled',
                }"
                class="px-3 py-1 text-xs font-bold rounded-full"
              >
                {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
              </span>
            </div>

            <!-- Customer Name -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Customer</span>
              <span class="font-bold text-white">{{ selectedOrder.customer_name }}</span>
            </div>

            <!-- Email -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Email</span>
              <span class="text-sm text-slate-300">{{ selectedOrder.customer_email }}</span>
            </div>

            <!-- Date -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Date</span>
              <span class="font-bold text-white">
                {{
                  new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }}
              </span>
            </div>

            <!-- Time -->
            <div class="bg-[#0F172A] p-4 rounded-2xl">
              <span class="block mb-2 text-xs font-black uppercase text-slate-400">Time</span>
              <span class="font-bold text-white">
                {{ new Date(selectedOrder.created_at).toLocaleTimeString() }}
              </span>
            </div>
          </div>

          <!-- Order Items Section -->
          <div class="bg-[#0F172A] p-6 rounded-2xl mt-6">
            <h5 class="mb-4 text-sm font-black uppercase text-slate-400">Order Items</h5>
            <div v-if="orderItems.length > 0" class="space-y-3">
              <div
                v-for="item in orderItems"
                :key="item.id"
                class="flex items-center gap-4 p-3 bg-[#1E293B] rounded-xl border border-slate-700"
              >
                <!-- Product Image -->
                <img
                  :src="item.product.image_url"
                  :alt="item.product.name"
                  class="object-cover w-16 h-16 rounded-lg"
                />
                <!-- Product Info -->
                <div class="flex-1">
                  <h6 class="font-bold text-white">{{ item.product.name }}</h6>
                  <p class="text-xs text-slate-400">
                    ${{ item.product.price }} × {{ item.quantity }}
                  </p>
                </div>
                <!-- Subtotal -->
                <div class="text-right">
                  <p class="font-bold text-white">${{ item.product.price * item.quantity }}</p>
                </div>
              </div>
            </div>
            <div v-else class="py-4 text-center text-slate-400">
              <p class="text-sm">Loading items...</p>
            </div>
          </div>

          <!-- Total Section -->
          <div class="p-6 mt-4 border bg-indigo-500/10 border-indigo-500/30 rounded-2xl">
            <div class="flex items-center justify-between">
              <span class="text-lg font-black text-indigo-400 uppercase">Total Amount</span>
              <span class="text-3xl font-black text-white">${{ selectedOrder.total_price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import AdminLayout from './AdminLayout.vue'
import { useAdminData } from '../../composables/useAdminData'
import { supabase } from '../../supabase'

interface OrderItem {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image_url: string
  }
}

const { orders, fetchData, updateOrderStatus } = useAdminData()
const hoveredOrderId = ref<string | null>(null)
const orderItems = ref<OrderItem[]>([])

const selectedOrder = computed(() => {
  if (!hoveredOrderId.value) return null
  const found = orders.value.find((order) => String(order.id) === hoveredOrderId.value)
  console.log('Selected order:', found)
  return found
})

const showOrderDetails = (orderId: number) => {
  console.log('Hovering order:', orderId)
  console.log('Current orders:', orders.value)
  hoveredOrderId.value = String(orderId)
}

const clearHover = () => {
  console.log('Clearing hover')
  hoveredOrderId.value = null
}

const handleStatusChange = async (orderId: number, event: Event) => {
  const select = event.target as HTMLSelectElement
  console.log('Changing status for order', orderId, 'to', select.value)
  await updateOrderStatus(orderId, select.value)
}

const fetchOrderItems = async (orderId: number) => {
  console.log('Fetching items for order:', orderId)
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select(
        `
        id,
        quantity,
        product:product_id (
          id,
          name,
          price,
          image_url
        )
      `,
      )
      .eq('order_id', orderId)

    if (error) {
      console.error('Error fetching order items:', error)
      orderItems.value = []
    } else {
      console.log('Order items:', data)
      orderItems.value = (data || []) as OrderItem[]
    }
  } catch (err) {
    console.error('Error:', err)
    orderItems.value = []
  }
}

watch(hoveredOrderId, (newId) => {
  if (newId) {
    fetchOrderItems(Number(newId))
  } else {
    orderItems.value = []
  }
})

onMounted(async () => {
  console.log('Mounting AdminOrders')
  await fetchData()
  console.log('Orders loaded:', orders.value.length)
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  transform: scale(0.95);
}
</style>
