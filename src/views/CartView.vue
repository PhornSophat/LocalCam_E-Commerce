<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartState } from '../store'
import { toast } from '../utils/toast'
import { supabase } from '../supabase'

const router = useRouter()

// Cart items from global state
const cartItems = computed(() => cartState.items)

// Calculate totals
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const tax = computed(() => subtotal.value * 0.1) // 10% tax
const shipping = computed(() => (subtotal.value > 50 ? 0 : 5))
const total = computed(() => subtotal.value + tax.value + shipping.value)

// Update quantity
const updateQuantity = (item: any, newQty: number) => {
  if (newQty < 1) return
  if (newQty > item.stock) {
    toast.warning(`Only ${item.stock} items available in stock`)
    return
  }
  item.qty = newQty
}

// Remove item
const removeItem = (itemId: number) => {
  const index = cartState.items.findIndex(i => i.id === itemId)
  if (index > -1) {
    const itemName = cartState.items[index].name
    cartState.items.splice(index, 1)
    toast.success(`${itemName} removed from cart`)
  }
}

// Clear cart
const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartState.items = []
    toast.info('Cart cleared')
  }
}

// Proceed to checkout
const proceedToCheckout = async () => {
  if (cartItems.value.length === 0) {
    toast.warning('Your cart is empty')
    return
  }
  
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    toast.warning('Please login to checkout')
    router.push('/login')
    return
  }
  
  router.push('/checkout')
}

</script>

<template>
  <div class="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100 font-Poppins">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-4xl font-black text-gray-900">Shopping Cart</h1>
        <p class="text-gray-600">{{ cartItems.length }} item(s) in your cart</p>
      </div>

      <div v-if="cartItems.length === 0" class="py-20 text-center">
        <div class="mb-6 text-6xl">🛒</div>
        <h2 class="mb-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p class="mb-8 text-gray-600">Add some products to get started</p>
        <button
          @click="router.push('/shop')"
          class="px-8 py-4 font-bold text-white transition bg-black rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Cart Items -->
        <div class="space-y-4 lg:col-span-2">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-6 p-6 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
          >
            <!-- Product Image -->
            <div class="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-100 rounded-xl">
              <img
                :src="item.image_url || item.image"
                :alt="item.name"
                class="object-cover w-full h-full"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h3 class="mb-1 text-lg font-bold text-gray-900 truncate">{{ item.name }}</h3>
              <p class="mb-3 text-sm text-gray-600">Stock: {{ item.stock }} available</p>

              <div class="flex items-center gap-4">
                <!-- Quantity Controls -->
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button
                    @click="updateQuantity(item, item.qty - 1)"
                    class="px-3 py-1 transition hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    :value="item.qty"
                    @change="updateQuantity(item, parseInt(($event.target as HTMLInputElement).value))"
                    type="number"
                    min="1"
                    :max="item.stock"
                    class="w-16 text-center border-0 focus:outline-none"
                  />
                  <button
                    @click="updateQuantity(item, item.qty + 1)"
                    class="px-3 py-1 transition hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <!-- Price -->
                <div class="text-lg font-bold text-gray-900">
                  ${{ (item.price * item.qty).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeItem(item.id)"
              class="self-start text-red-500 transition hover:text-red-700"
              title="Remove item"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <!-- Clear Cart Button -->
          <button
            @click="clearCart"
            class="w-full py-3 font-bold text-red-600 transition rounded-lg hover:bg-red-50"
          >
            Clear Cart
          </button>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="sticky p-6 bg-white border border-gray-200 shadow-lg rounded-2xl top-24">
            <h2 class="mb-6 text-2xl font-black text-gray-900">Order Summary</h2>

            <div class="mb-6 space-y-3">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span class="font-semibold">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span class="font-semibold">
                  {{ shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex justify-between pt-3 text-xl font-black text-gray-900 border-t">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <button
              @click="proceedToCheckout"
              class="w-full py-4 mb-4 font-bold text-white transition bg-black rounded-lg hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>

            <button
              @click="router.push('/shop')"
              class="w-full py-3 font-bold text-gray-700 transition border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>

            <div class="p-4 mt-6 rounded-lg bg-green-50">
              <p class="text-sm font-medium text-green-800">
                {{ shipping === 0 ? '🎉 You have free shipping!' : '📦 Add $' + (50 - subtotal).toFixed(2) + ' more for free shipping' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
        <!-- <p class="mt-4 text-[10px] text-center text-stone-500 font-bold uppercase tracking-tighter">
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
</template> -->
