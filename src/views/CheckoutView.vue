<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { cartState } from '@/store'
import { toast } from '@/utils/toast'

const router = useRouter()

const shippingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  country: '',
  phone: '',
})

const paymentMethod = ref('card')
const isProcessing = ref(false)

const subtotal = computed(() =>
  cartState.items.reduce((sum, item) => sum + item.price * item.qty, 0),
)
const tax = computed(() => subtotal.value * 0.1)
const shipping = computed(() => (subtotal.value >= 50 ? 0 : 5.99))
const total = computed(() => subtotal.value + tax.value + shipping.value)

const placeOrder = async () => {
  // Validation
  if (!shippingForm.value.firstName || !shippingForm.value.lastName || !shippingForm.value.email) {
    toast.warning('Please fill in all required fields')
    return
  }

  if (!shippingForm.value.address || !shippingForm.value.city || !shippingForm.value.country) {
    toast.warning('Please complete your shipping address')
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
      user_id: session.user.id,
      customer_name: `${shippingForm.value.firstName} ${shippingForm.value.lastName}`,
      total_price: total.value,
      items_summary: cartState.items.map((i) => `${i.name} (x${i.qty})`).join(', '),
      status: 'pending',
      shipping_address: `${shippingForm.value.address}, ${shippingForm.value.city}, ${shippingForm.value.country}`,
      phone: shippingForm.value.phone,
      email: shippingForm.value.email,
      payment_method: paymentMethod.value,
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
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 pb-16 font-Poppins">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-black text-gray-900 mb-2">Checkout</h1>
        <p class="text-gray-600">Complete your order</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Shipping Information -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-2xl font-black text-gray-900 mb-6">Shipping Information</h2>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                <input
                  v-model="shippingForm.firstName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="John"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                <input
                  v-model="shippingForm.lastName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
              <input
                v-model="shippingForm.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Address *</label>
              <input
                v-model="shippingForm.address"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="123 Main St"
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">City *</label>
                <input
                  v-model="shippingForm.city"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="New York"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Country *</label>
                <input
                  v-model="shippingForm.country"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="USA"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
              <input
                v-model="shippingForm.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-2xl font-black text-gray-900 mb-6">Payment Method</h2>

            <div class="space-y-3">
              <label
                class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                :class="paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'"
              >
                <input type="radio" v-model="paymentMethod" value="card" class="mr-3" />
                <span class="font-bold">Credit/Debit Card</span>
              </label>

              <label
                class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                :class="paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-200'"
              >
                <input type="radio" v-model="paymentMethod" value="paypal" class="mr-3" />
                <span class="font-bold">PayPal</span>
              </label>

              <label
                class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
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
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
            <h2 class="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

            <!-- Order Items -->
            <div class="space-y-3 mb-6 max-h-64 overflow-y-auto">
              <div v-for="item in cartState.items" :key="item.id" class="flex gap-3">
                <img
                  :src="item.image_url || item.image"
                  :alt="item.name"
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-sm text-gray-900 truncate">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600">Qty: {{ item.qty }}</p>
                  <p class="text-sm font-bold text-gray-900">
                    ${{ (item.price * item.qty).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border-t pt-4 space-y-3 mb-6">
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
              <div class="border-t pt-3 flex justify-between text-xl font-black text-gray-900">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <button
              @click="placeOrder"
              :disabled="isProcessing"
              class="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isProcessing ? 'Processing...' : 'Place Order' }}
            </button>

            <button
              @click="router.push('/cart')"
              class="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
