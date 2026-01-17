<script lang="ts">
import { supabase } from '../supabase'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      // New toggle states
      showPassword: false,
      showConfirmPassword: false,
      termsAccepted: false,
      passwordStrength: 0,
      strengthText: 'Use 8+ characters with a mix of letters, numbers & symbols',
      strengthColor: '#ddd',
      loading: false,
      errorMessage: '',
    }
  },
  watch: {
    password(newPassword) {
      this.calculatePasswordStrength(newPassword)
    },
  },
  methods: {
    calculatePasswordStrength(password: string) {
      let strength = 0
      if (password.length >= 8) strength += 25
      if (password.length >= 12) strength += 25
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25
      if (/\d/.test(password)) strength += 15
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10

      this.passwordStrength = Math.min(strength, 100)

      if (this.passwordStrength < 40) {
        this.strengthText = 'Weak password'
        this.strengthColor = '#ef4444'
      } else if (this.passwordStrength < 70) {
        this.strengthText = 'Medium strength'
        this.strengthColor = '#f59e0b'
      } else {
        this.strengthText = 'Strong password'
        this.strengthColor = '#22c55e'
      }
    },

    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!'
        return
      }

      this.loading = true
      this.errorMessage = ''

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              first_name: this.firstName,
              last_name: this.lastName,
              phone: this.phone,
              role: 'client',
            },
          },
        })

        if (error) throw error

        if (data.user) {
          alert('Account created! Please check your email for a confirmation link.')
          this.$router.push('/login')
        }
      } catch (error: any) {
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    },

    async handleGoogleSignup() {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) this.errorMessage = error.message
    },

    async handleFacebookSignup() {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'facebook' })
      if (error) this.errorMessage = error.message
    },
  },
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F1EEE5] font-Poppins">
    <header class="bg-white shadow-sm">
      <div class="px-5 py-5 mx-auto max-w-7xl">
        <div class="flex items-center justify-center gap-3">
          <img src="../assets/black-weblogo.png" alt="logo" class="w-16" />
          <div class="text-2xl font-black tracking-tight text-gray-800 uppercase">LocalCam</div>
        </div>
      </div>
    </header>

    <main class="flex items-center justify-center flex-1 px-5 py-10">
      <div
        class="grid w-full max-w-6xl overflow-hidden bg-white shadow-2xl md:grid-cols-2 rounded-2xl"
      >
        <div
          class="relative flex-col items-center justify-center hidden p-16 overflow-hidden text-white md:flex bg-gradient-to-br from-gray-700 to-gray-900"
        >
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          </div>

          <div class="relative z-10 flex flex-col items-center text-center">
            <img src="../assets/whitelogoWeb.png" alt="logo" class="w-32 mb-8" />
            <h2 class="mb-6 text-3xl font-bold tracking-wide uppercase">Join LocalCam</h2>
            <p class="max-w-xs mb-10 text-sm leading-relaxed opacity-80">
              Create your account to start transforming your space with our curated collection of
              artisan home decor.
            </p>

            <div class="w-full max-w-xs space-y-6">
              <div
                class="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-amber-100"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 text-white rounded-full bg-white/10"
                  >01</span
                >
                <span>Exclusive Collection Access</span>
              </div>
              <div
                class="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-amber-100"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 text-white rounded-full bg-white/10"
                  >02</span
                >
                <span>Wishlist Management</span>
              </div>
              <div
                class="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-amber-100"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 text-white rounded-full bg-white/10"
                  >03</span
                >
                <span>Real-time Order Tracking</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center p-10 md:p-16">
          <div class="mb-8">
            <h1 class="mb-2 text-3xl font-black text-gray-900">Create Account</h1>
            <p class="text-sm font-medium text-gray-500">Start your decor journey today</p>
          </div>

          <div
            v-if="errorMessage"
            class="flex items-center gap-3 p-4 mb-6 text-xs font-bold text-red-600 border border-red-100 bg-red-50 rounded-xl"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                  >First Name</label
                >
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="w-full px-4 py-3 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                  >Last Name</label
                >
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="w-full px-4 py-3 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>

            <div>
              <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                >Email Address</label
              >
              <input
                v-model="email"
                type="email"
                placeholder="john@example.com"
                required
                class="w-full px-4 py-3 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div>
              <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                >Phone (Optional)</label
              >
              <input
                v-model="phone"
                type="tel"
                placeholder="+855 000 000"
                class="w-full px-4 py-3 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div class="relative">
              <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                >Password</label
              >
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 characters"
                  required
                  class="w-full px-4 py-3 pr-12 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-gray-800"
                >
                  <svg
                    v-if="!showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-2">
                <div class="h-1 mb-1 overflow-hidden bg-gray-100 rounded-full">
                  <div
                    class="h-full transition-all duration-500"
                    :style="{ width: passwordStrength + '%', backgroundColor: strengthColor }"
                  ></div>
                </div>
                <p class="text-[10px] font-bold" :style="{ color: strengthColor }">
                  {{ strengthText }}
                </p>
              </div>
            </div>

            <div class="relative">
              <label class="block mb-1.5 text-[10px] font-black uppercase text-gray-400"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  required
                  class="w-full px-4 py-3 pr-12 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-gray-800"
                >
                  <svg
                    v-if="!showConfirmPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="pt-2 space-y-3">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="termsAccepted"
                  required
                  class="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800 mt-0.5"
                />
                <span class="text-[11px] text-gray-500 leading-snug"
                  >I accept the
                  <span class="font-bold text-gray-800 underline">Terms of Service</span> and
                  <span class="font-bold text-gray-800 underline">Privacy Policy</span></span
                >
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading || !termsAccepted"
              class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-6"
            >
              <span
                v-if="loading"
                class="w-4 h-4 border-2 rounded-full animate-spin border-white/20 border-t-white"
              ></span>
              {{ loading ? 'Creating Account...' : 'Complete Sign Up' }}
            </button>
          </form>

          <div class="mt-8 text-xs font-medium text-center text-gray-500">
            Member of LocalCam?
            <router-link to="/login" class="ml-1 font-black text-gray-900 hover:underline"
              >Sign In</router-link
            >
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-[#2D2A26] text-white/40 py-8">
      <div
        class="flex flex-col items-center justify-between gap-5 px-5 mx-auto max-w-7xl md:flex-row"
      >
        <div class="text-[10px] font-bold uppercase tracking-widest text-white/20">
          © 2026 LocalCam Artisans
        </div>
        <div class="flex gap-8">
          <a href="#" class="text-[10px] font-bold uppercase hover:text-white transition-colors"
            >Privacy</a
          >
          <a href="#" class="text-[10px] font-bold uppercase hover:text-white transition-colors"
            >Terms</a
          >
          <a href="#" class="text-[10px] font-bold uppercase hover:text-white transition-colors"
            >Help</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>
