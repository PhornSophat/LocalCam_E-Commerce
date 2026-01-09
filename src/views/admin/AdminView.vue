<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const router = useRouter()
const activeTab = ref('dashboard')
const loading = ref(false)

// Data States
const orders = ref<any[]>([])
const products = ref<any[]>([])
const categories = ref<any[]>([])
const users = ref<any[]>([])

// User detail modal
const selectedUser = ref<any>(null)
const userOrders = ref<any[]>([])
const showUserModal = ref(false)

// Form States
const isCreatingCategory = ref(false)
const newCategoryName = ref('')
const editingProduct = ref<number | null>(null)
const productForm = ref({
  name: '',
  price: 0,
  image_url: '',
  category_id: null as number | null,
  stock: 10,
})

// --- FETCH DATA ---
const fetchData = async () => {
  loading.value = true
  try {
    const [ord, prod, cat] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name', { ascending: true }),
    ])
    orders.value = ord.data || []
    products.value = prod.data || []
    categories.value = cat.data || []
  } catch (error) {
    console.error('Error fetching admin data:', error)
  } finally {
    loading.value = false
  }
}

// Fetch users from profiles or auth
const fetchUsers = async () => {
  loading.value = true
  try {
    // Fetch from profiles table (assuming you have one)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      // Fallback: get unique users from orders
      const uniqueUsers = orders.value.reduce((acc: any[], order) => {
        const exists = acc.find((u) => u.email === order.customer_email)
        if (!exists && order.customer_email) {
          acc.push({
            id: order.user_id || order.id,
            email: order.customer_email,
            full_name: order.customer_name,
            created_at: order.created_at,
          })
        }
        return acc
      }, [])
      users.value = uniqueUsers
    } else {
      users.value = data || []
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

// Fetch orders for a specific user
const fetchUserOrders = async (user: any) => {
  selectedUser.value = user
  showUserModal.value = true

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false })

    if (!error) {
      userOrders.value = data || []
    }
  } catch (error) {
    console.error('Error fetching user orders:', error)
  }
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
  userOrders.value = []
}

// Get user stats
const getUserStats = (userEmail: string) => {
  const userOrdersList = orders.value.filter((o) => o.customer_email === userEmail)
  return {
    totalOrders: userOrdersList.length,
    totalSpent: userOrdersList.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
  }
}

// --- STATS ---
const stats = computed(() => {
  const lowLimit = 5
  const lowCount = products.value.filter((p) => p.stock < lowLimit).length
  return {
    revenue: orders.value.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
    pending: orders.value.filter((o) => o.status === 'pending').length,
    lowStockCount: lowCount,
    health:
      products.value.length > 0
        ? Math.round(((products.value.length - lowCount) / products.value.length) * 100)
        : 100,
  }
})

const lowStockItems = computed(() =>
  products.value.filter((p) => p.stock < 5).sort((a, b) => a.stock - b.stock),
)

// --- ACTIONS ---
const updateOrderStatus = async (id: number, status: string) => {
  try {
    await supabase.from('orders').update({ status }).eq('id', id)
    fetchData()
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}

const handleProductSubmit = async () => {
  loading.value = true
  try {
    if (editingProduct.value) {
      await supabase.from('products').update(productForm.value).eq('id', editingProduct.value)
    } else {
      await supabase.from('products').insert([productForm.value])
    }
    resetForm()
    fetchData()
  } catch (error) {
    console.error('Error saving product:', error)
  } finally {
    loading.value = false
  }
}

const handleQuickAddCategory = async () => {
  if (!newCategoryName.value.trim()) return
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: newCategoryName.value }])
      .select()
      .single()

    if (!error && data) {
      categories.value.push(data)
      newCategoryName.value = ''
      isCreatingCategory.value = false
    }
  } catch (error) {
    console.error('Error adding category:', error)
  }
}

const deleteProduct = async (id: number) => {
  try {
    await supabase.from('products').delete().eq('id', id)
    fetchData()
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

const resetForm = () => {
  editingProduct.value = null
  productForm.value = {
    name: '',
    price: 0,
    image_url: '',
    category_id: null,
    stock: 10,
  }
}

const editProduct = (item: any) => {
  editingProduct.value = item.id
  productForm.value = { ...item }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

onMounted(() => {
  fetchData()
  fetchUsers()
})
</script>

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
        <button
          @click="activeTab = 'dashboard'"
          :class="
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-800'
          "
          class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
        >
          📊 Dashboard
        </button>

        <button
          @click="activeTab = 'products'"
          :class="
            activeTab === 'products'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-800'
          "
          class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
        >
          📦 Products
        </button>

        <button
          @click="activeTab = 'orders'"
          :class="
            activeTab === 'orders'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-800'
          "
          class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
        >
          🛒 Orders
        </button>

        <button
          @click="
            () => {
              activeTab = 'users'
              fetchUsers()
            }
          "
          :class="
            activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
          "
          class="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl"
        >
          👥 Users
        </button>
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
            <button
              @click="editProduct(item)"
              class="text-[9px] font-black text-red-400 hover:underline"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>

      <!-- Dashboard Tab (Default) -->
      <div v-if="activeTab === 'dashboard'" class="space-y-4">
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
            <div
              class="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-xl"
            >
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

      <!-- Products Tab -->
      <div v-else-if="activeTab === 'products'" class="grid gap-10 lg:grid-cols-12">
        <div
          class="lg:col-span-4 bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-800 h-fit sticky top-10"
        >
          <h3 class="mb-6 text-xl font-black">Add/Edit Product</h3>
          <div class="space-y-4">
            <input
              v-model="productForm.name"
              placeholder="Product Name"
              class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
            />
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model.number="productForm.price"
                type="number"
                placeholder="Price"
                class="bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
              />
              <input
                v-model.number="productForm.stock"
                type="number"
                placeholder="Stock"
                class="bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
              />
            </div>
            <input
              v-model="productForm.image_url"
              placeholder="Image URL"
              class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
            />
            <button
              @click="handleProductSubmit"
              class="w-full py-4 font-black text-white transition-all bg-indigo-600 shadow-lg rounded-2xl active:scale-95"
            >
              {{ editingProduct ? 'Update' : 'Add' }} Product
            </button>
          </div>
        </div>

        <div class="space-y-4 lg:col-span-8">
          <div
            v-for="p in products"
            :key="p.id"
            class="bg-[#1E293B] p-4 rounded-[2rem] border border-slate-800 flex items-center justify-between group transition-all hover:border-slate-600"
          >
            <div class="flex items-center gap-5">
              <img :src="p.image_url" class="object-cover w-16 h-16 rounded-2xl bg-slate-900" />
              <div>
                <h4 class="text-lg font-bold text-white">{{ p.name }}</h4>
                <div class="flex gap-3">
                  <p class="text-[10px] font-black text-slate-500 uppercase">${{ p.price }}</p>
                  <p
                    :class="p.stock < 5 ? 'text-red-500' : 'text-slate-500'"
                    class="text-[10px] font-black uppercase"
                  >
                    Stock: {{ p.stock }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex gap-2 pr-4 transition-all opacity-0 group-hover:opacity-100">
              <button @click="editProduct(p)" class="p-2 text-xs font-bold text-indigo-400">
                Edit
              </button>
              <button @click="deleteProduct(p.id)" class="p-2 text-xs font-bold text-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-else-if="activeTab === 'orders'" class="space-y-4">
        <h3 class="px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
          All Orders
        </h3>
        <div
          v-if="orders.length === 0"
          class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
        >
          No orders found.
        </div>
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between group hover:border-indigo-500/30 transition-all"
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
              @change="(e) => updateOrderStatus(order.id, (e.target as HTMLSelectElement).value)"
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

      <!-- Users Tab -->
      <div v-else-if="activeTab === 'users'" class="space-y-6">
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
            @click="fetchUserOrders(user)"
          >
            <div class="flex items-center gap-6">
              <div
                class="flex items-center justify-center text-xl font-black text-white bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl"
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
    </main>

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
  </div>
</template>
