git <template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <h3 class="px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
            All Users ({{ users.length }})
          </h3>
          <span class="text-[10px] font-black uppercase text-indigo-400">
            Showing {{ filteredUsers.length }}
          </span>
        </div>
        <div class="flex flex-col w-full gap-3 md:flex-row md:items-center md:w-auto">
          <div class="relative w-full md:w-64">
            <input
              v-model="search"
              type="text"
              placeholder="Search by name or email"
              class="w-full px-4 py-2 text-sm text-white transition-colors border bg-slate-800 border-slate-700 rounded-xl focus:border-indigo-500 focus:outline-none"
            />
            <button
              v-if="search"
              class="absolute text-[9px] font-black uppercase text-slate-400 right-3 top-1/2 -translate-y-1/2 hover:text-white"
              @click="clearSearch"
            >
              Clear
            </button>
          </div>
          <select
            v-model="sortKey"
            class="px-4 py-2 text-sm font-black uppercase transition-colors border bg-slate-800 border-slate-700 rounded-xl text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="created_at">Newest</option>
            <option value="name">Name</option>
            <option value="orders">Orders</option>
            <option value="spent">Total Spent</option>
          </select>
          <button
            class="px-4 py-2 text-[10px] font-black uppercase transition-colors bg-indigo-600/20 border border-indigo-600/40 text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="loading"
            @click="refreshUsers"
          >
            Refresh
          </button>
        </div>
      </div>

      <div
        v-if="userError"
        class="flex items-center justify-between gap-3 p-4 text-sm font-medium border text-amber-200 bg-amber-500/10 border-amber-500/40 rounded-2xl"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="mb-2 text-base font-bold text-red-300">
              ❌ Unable to load users from profiles table
            </p>
            <p class="mb-3 text-red-200">{{ userError }}</p>
            <p class="text-xs text-red-300">
              This is likely due to Row Level Security (RLS) policies blocking admin access to the
              profiles table.
            </p>
          </div>
          <button
            class="text-[10px] font-black uppercase text-red-200 underline whitespace-nowrap"
            @click="refreshUsers"
          >
            Retry
          </button>
        </div>
        <div class="p-4 border bg-slate-900/50 rounded-xl border-slate-700">
          <p class="mb-2 text-xs font-bold text-slate-300">🔧 Quick Fix:</p>
          <ol class="space-y-1 text-xs list-decimal list-inside text-slate-400">
            <li>Go to Supabase Dashboard → SQL Editor</li>
            <li>
              Run the script:
              <code class="px-2 py-1 text-indigo-300 rounded bg-slate-800"
                >scripts/sql/profiles-admin-access.sql</code
              >
            </li>
            <li>Click Retry above</li>
          </ol>
        </div>
      </div>

      <div
        v-else-if="usersDerivedFromOrders"
        class="flex items-center justify-between gap-3 p-4 text-sm font-medium text-indigo-200 border bg-indigo-500/10 border-indigo-500/40 rounded-2xl"
      >
        <span>
          Showing users derived from recent orders. To list all users, ensure the Supabase
          `profiles` table has data and that admin RLS allows selecting all profiles.
        </span>
        <button
          class="text-[10px] font-black uppercase text-indigo-200 underline"
          @click="refreshUsers"
        >
          Retry
        </button>
      </div>

      <div v-if="loading" class="grid gap-4">
        <div
          v-for="n in 3"
          :key="n"
          class="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 animate-pulse"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-700"></div>
              <div class="space-y-2">
                <div class="w-32 h-3 rounded bg-slate-700"></div>
                <div class="w-24 h-3 rounded bg-slate-800"></div>
              </div>
            </div>
            <div class="w-20 h-3 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="filteredUsers.length === 0"
        class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
      >
        {{ search ? 'No users match your search.' : 'No users found.' }}
      </div>

      <div v-else class="grid gap-4">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex flex-col gap-4 md:flex-row md:items-center md:gap-8 group hover:border-indigo-500/30 transition-all cursor-pointer"
          @click="openUserModal(user)"
        >
          <div class="flex items-center gap-6">
            <div
              class="flex items-center justify-center text-xl font-black text-white bg-gradient-to-br from-indigo-500 to-purple-600 w-14 h-14 rounded-2xl"
            >
              {{ getInitial(user) }}
            </div>
            <div class="space-y-1">
              <h4 class="text-lg font-bold text-white">
                {{ getDisplayName(user) }}
              </h4>
              <p class="text-xs font-medium text-slate-400">
                {{ user.email || 'No email available' }}
              </p>
              <div class="flex flex-wrap gap-3 text-[10px] font-black uppercase text-slate-500">
                <span>Joined: {{ new Date(user.created_at).toLocaleDateString() }}</span>
                <span
                  class="px-2 py-1 rounded-full text-[9px] font-black"
                  :class="
                    user.role
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40'
                      : 'bg-slate-700/40 text-slate-300 border border-slate-600'
                  "
                >
                  {{ user.role ? `Role: ${user.role}` : 'Role: n/a' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-8 md:ml-auto">
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
                {{ selectedUser ? getInitial(selectedUser) : '?' }}
              </div>
              <div>
                <h3 class="text-xl font-black text-white">
                  {{ selectedUser ? getDisplayName(selectedUser) : 'Unknown User' }}
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
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../../supabase'
import AdminLayout from './AdminLayout.vue'
import { useAdminData } from '../../composables/useAdminData'
import type { User, Order } from '../../composables/useAdminData'

const { users, loading, fetchData, fetchUsers, getUserStats, userError, usersDerivedFromOrders } =
  useAdminData()

const showUserModal = ref(false)
const selectedUser = ref<User | null>(null)
const userOrders = ref<Order[]>([])
const search = ref('')
const sortKey = ref<'created_at' | 'name' | 'orders' | 'spent'>('created_at')

const filteredUsers = computed(() => {
  const term = search.value.trim().toLowerCase()
  const list = users.value.filter((u) => {
    const name = (u.full_name || '').toLowerCase()
    const email = (u.email || '').toLowerCase()
    return term ? name.includes(term) || email.includes(term) : true
  })

  return [...list].sort((a, b) => {
    if (sortKey.value === 'name') {
      const nameA = (a.full_name || a.email || '').toLowerCase()
      const nameB = (b.full_name || b.email || '').toLowerCase()
      return nameA.localeCompare(nameB)
    }

    if (sortKey.value === 'orders') {
      return getUserStats(b.email).totalOrders - getUserStats(a.email).totalOrders
    }

    if (sortKey.value === 'spent') {
      return getUserStats(b.email).totalSpent - getUserStats(a.email).totalSpent
    }

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
})

const getDisplayName = (user: User) => user.full_name?.trim() || user.email || 'Unknown User'
const getInitial = (user: User) => getDisplayName(user).charAt(0).toUpperCase()

const refreshUsers = async () => {
  await fetchData()
  await fetchUsers()
}

const clearSearch = () => {
  search.value = ''
}

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

onMounted(async () => {
  await refreshUsers()
})
</script>
