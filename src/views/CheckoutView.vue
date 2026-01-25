<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { cartState } from '@/store'
import { toast } from '@/utils/toast'

const router = useRouter()

const shippingForm = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
})

const paymentMethod = ref('cod')
const isProcessing = ref(false)
const isLoadingProfile = ref(false)

const subtotal = computed(() =>
  cartState.items.reduce((sum, item) => sum + item.price * item.qty, 0),
)
const tax = computed(() => subtotal.value * 0.1)
const shipping = computed(() => (subtotal.value >= 50 ? 0 : 5.00))
const total = computed(() => subtotal.value + tax.value + shipping.value)

// Load user profile data on mount
onMounted(async () => {
  isLoadingProfile.value = true
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      // Pre-fill email from auth
      shippingForm.value.email = session.user.email || ''

      // Try to get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        shippingForm.value.fullName = profile.full_name || ''
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
  } finally {
    isLoadingProfile.value = false
  }
})

const placeOrder = async () => {
  // Validation
  if (!shippingForm.value.fullName || !shippingForm.value.email) {
    toast.warning('Please enter your name and email')
    return
  }

  if (!shippingForm.value.address) {
    toast.warning('Please enter your delivery address')
    return
  }

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    toast.error('Please log in to complete your order')
    router.push({ path: '/login', query: { redirect: '/checkout' } })
    return
  }

  isProcessing.value = true

  try {
    // Create order
    const orderData = {
      customer_name: shippingForm.value.fullName,
      total_price: total.value,
      status: 'pending',
      phone: shippingForm.value.phone || 'None',
      items_summary: cartState.items.map((i) => `${i.name} (x${i.qty})`).join(', '),
      payment_method: paymentMethod.value,
      email: shippingForm.value.email,
      user_id: session.user.id,
    }

    const { error: orderError } = await supabase.from('orders').insert([orderData])
    if (orderError) throw orderError

    // Update stock for each product
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

    // Clear cart and show success
    cartState.items = []
    toast.success('Order placed successfully! 🎉')

    setTimeout(() => {
      router.push('/shop')
    }, 2000)
  } catch (err: any) {
    console.error('Order error:', err)
    toast.error('Failed to place order: ' + err.message)
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100 font-Poppins">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-4xl font-black text-gray-900">Checkout</h1>
        <p class="text-gray-600">Complete your order</p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Checkout Form -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Shipping Information -->
          <div class="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 class="mb-6 text-2xl font-black text-gray-900">Delivery Information</h2>

            <div class="space-y-4">
              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700">Full Name *</label>
                <input
                  v-model="shippingForm.fullName"
                  type="text"
                  :disabled="isLoadingProfile"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700">Email *</label>
                <input
                  v-model="shippingForm.email"
                  type="email"
                  :disabled="isLoadingProfile"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700">Phone (optional)</label>
                <input
                  v-model="shippingForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="+855 12 345 678"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700">Delivery Address *</label>
                <textarea
                  v-model="shippingForm.address"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Street address, building, floor, city, province..."
                ></textarea>
                <p class="mt-1 text-xs text-gray-500">Enter your complete delivery address</p>
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700"
                  >Delivery Notes (optional)</label
                >
                <textarea
                  v-model="shippingForm.notes"
                  rows="2"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Any special instructions for delivery..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 class="mb-6 text-2xl font-black text-gray-900">Payment Method</h2>

            <div class="space-y-3">
              <label
                class="flex items-center p-4 transition border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'"
              >
                <input type="radio" v-model="paymentMethod" value="card" class="mr-3" />
                <span class="font-bold">Credit/Debit Card</span>
              </label>

              <label
                class="flex items-center p-4 transition border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-200'"
              >
                <input type="radio" v-model="paymentMethod" value="paypal" class="mr-3" />
                <span class="font-bold">PayPal</span>
              </label>

              <label
                class="flex items-center p-4 transition border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'"
              >
                <input type="radio" v-model="paymentMethod" value="cod" class="mr-3" />
                <span class="font-bold">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="sticky p-6 bg-white border border-gray-200 shadow-lg rounded-2xl top-24">
            <h2 class="mb-6 text-2xl font-black text-gray-900">Order Summary</h2>

            <!-- Order Items -->
            <div class="mb-6 space-y-3 overflow-y-auto max-h-64">
              <div v-for="item in cartState.items" :key="item.id" class="flex gap-3">
                <img
                  :src="item.image_url || item.image"
                  :alt="item.name"
                  class="object-cover w-16 h-16 rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-bold text-gray-900 truncate">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600">Qty: {{ item.qty }}</p>
                  <p class="text-sm font-bold text-gray-900">
                    ${{ (item.price * item.qty).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 mb-6 space-y-3 border-t">
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
              @click="placeOrder"
              :disabled="isProcessing"
              class="w-full py-4 font-bold text-white transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isProcessing ? 'Processing...' : 'Place Order' }}
            </button>

            <button
              @click="router.push('/cart')"
              class="w-full py-3 mt-3 font-bold text-gray-700 transition border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
