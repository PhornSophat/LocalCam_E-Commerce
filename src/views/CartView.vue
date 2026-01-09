<script setup lang="ts">
import { cartState } from '../store'
import { computed, ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isProcessing = ref(false)
const customerName = ref<string>('')
const orderSuccess = ref(false)

// --- 1. LOGIN REDIRECT LOGIC ---
// We check if the user just logged in and should be here
onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session?.user?.email) {
    // Automatically fill name with email if they are logged in
    const parts = session.user.email.split('@')
    customerName.value = parts[0] || ''
  }
})

const total = computed(() => {
  return cartState.items.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const removeItem = (id: number) => {
  cartState.items = cartState.items.filter((item) => item.id !== id)
}

const updateQty = (id: number, change: number) => {
  const item = cartState.items.find((i) => i.id === id)
  if (item) {
    item.qty += change
    if (item.qty <= 0) removeItem(id)
  }
}

const handleCheckout = async () => {
  // --- AUTHENTICATION CHECK ---
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    alert('Please login to complete your purchase.')
    // Save current path to return here after login
    router.push({ path: '/login', query: { redirect: '/cart' } })
    return
  }

  if (!customerName.value) {
    alert('Please enter a display name for the order!')
    return
  }

  isProcessing.value = true

  try {
    // 1. Save the Order (Authenticated Role)
    const orderData = {
      customer_name: customerName.value,
      total_price: total.value,
      items_summary: cartState.items.map((i) => `${i.name} (x${i.qty})`).join(', '),
      status: 'pending',
      user_id: session.user.id, // Link order to the logged-in user
    }

    const { error: orderError } = await supabase.from('orders').insert([orderData])

    // If you see "RLS Violation" here, run the SQL policy I provided below
    if (orderError) throw orderError

    // 2. Reduce Stock (Authenticated Update)
    for (const item of cartState.items) {
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single()

      if (fetchError) throw fetchError

      if (product) {
        const newStock = product.stock - item.qty
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.id)

        if (updateError) throw updateError
      }
    }

    // 3. Show Success
    orderSuccess.value = true
    cartState.items = []
  } catch (err: any) {
    // Catching policy errors or database mismatches
    alert('Error processing order: ' + err.message)
  } finally {
    isProcessing.value = false
  }
}

const closeSuccess = () => {
  orderSuccess.value = false
  router.push('/shop')
}
</script>

<template>
  <div class="max-w-6xl min-h-screen px-4 py-32 mx-auto font-Poppins">
    <transition name="pop">
      <div v-if="orderSuccess" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
        <div
          class="relative bg-white rounded-[32px] p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
        >
          <div
            class="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-green-600 bg-green-100 rounded-full"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 class="mb-2 text-3xl font-bold text-stone-800">Orkun!</h2>
          <p class="mb-8 text-stone-500">
            Stock updated and order confirmed via your secure account.
          </p>
          <button
            @click="closeSuccess"
            class="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </transition>

    <h1
      class="mb-10 text-4xl font-bold text-stone-800"
      style="font-family: 'Brush Script MT', cursive"
    >
      Your Shopping Cart
    </h1>

    <div v-if="cartState.items.length > 0" class="grid gap-12 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <div
          v-for="item in cartState.items"
          :key="item.id"
          class="flex items-center gap-4 p-4 bg-white border shadow-sm rounded-2xl border-stone-100"
        >
          <img :src="item.image_url" class="object-cover w-20 h-20 rounded-xl" />
          <div class="flex-1">
            <h3 class="font-bold text-stone-800">{{ item.name }}</h3>
            <p class="font-bold text-amber-700">${{ item.price }}</p>
          </div>
          <div class="flex items-center gap-3 px-3 py-1 rounded-full bg-stone-50">
            <button
              @click="updateQty(item.id, -1)"
              class="font-bold text-stone-500 hover:text-stone-900"
            >
              -
            </button>
            <span class="text-sm font-black">{{ item.qty }}</span>
            <button
              @click="updateQty(item.id, 1)"
              class="font-bold text-stone-500 hover:text-stone-900"
            >
              +
            </button>
          </div>
          <button
            @click="removeItem(item.id)"
            class="p-2 transition-colors text-stone-300 hover:text-red-500"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-8 h-fit bg-stone-900 rounded-[32px] text-white shadow-xl sticky top-32">
        <h2 class="pb-4 mb-6 text-xl font-bold border-b border-stone-800">Order Details</h2>
        <div class="mb-6">
          <label class="block mb-2 text-xs font-black tracking-widest uppercase text-stone-500"
            >Order Display Name</label
          >
          <input
            v-model="customerName"
            type="text"
            placeholder="Who is this for?"
            class="w-full p-4 text-white transition-all border-none outline-none bg-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div class="mb-8 space-y-3">
          <div class="flex items-center justify-between text-stone-400">
            <span class="text-sm font-bold">Secure Checkout</span>
            <span class="text-2xl font-black text-amber-500">${{ total }}</span>
          </div>
        </div>
        <button
          @click="handleCheckout"
          :disabled="isProcessing"
          class="w-full py-5 font-black tracking-wide transition-all shadow-lg bg-amber-600 rounded-2xl hover:bg-amber-700 disabled:opacity-50 active:scale-95 shadow-amber-900/20"
        >
          {{ isProcessing ? 'Processing Securely...' : 'Confirm & Purchase' }}
        </button>
        <p class="mt-4 text-[10px] text-center text-stone-500 font-bold uppercase tracking-tighter">
          Requires secure login session
        </p>
      </div>
    </div>

    <div
      v-else-if="!orderSuccess"
      class="py-20 text-center border-2 border-dashed bg-stone-50 rounded-3xl border-stone-200"
    >
      <p class="mb-6 text-xl font-medium text-stone-400">Your basket is currently empty</p>
      <router-link
        to="/shop"
        class="inline-block px-10 py-4 font-black text-white transition-all shadow-xl rounded-2xl bg-amber-600 hover:bg-amber-700 shadow-amber-100"
        >Start Shopping</router-link
      >
    </div>
  </div>
</template>
