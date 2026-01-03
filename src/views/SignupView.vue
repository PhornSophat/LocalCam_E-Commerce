<script lang="ts">
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      newsletter: false,
      passwordStrength: 0,
      strengthText: 'Use 8+ characters with a mix of letters, numbers & symbols',
      strengthColor: '#ddd'
    }
  },
  watch: {
    password(newPassword) {
      this.calculatePasswordStrength(newPassword)
    }
  },
  methods: {
    calculatePasswordStrength(password) {
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
    handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      if (!this.termsAccepted) {
        alert('Please accept the terms and conditions')
        return
      }
      console.log('Sign up:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        newsletter: this.newsletter
      })
    },
    handleGoogleSignup() {
      console.log('Google signup')
    },
    handleFacebookSignup() {
      console.log('Facebook signup')
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F1EEE5]">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-5 py-5">
        <div class="flex justify-center items-center">
          <img src="../assets/black-weblogo.png" alt="logo" class="w-20" />
          <div class="text-2xl font-semibold tracking-wide text-gray-800">
            LocalCam
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center px-5 py-10">
      <div class="grid md:grid-cols-2 max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Visual Side -->
        <div class="hidden md:flex bg-[url('/home/soksim/Documents/Year4_Project/LocalCam_E-Commerce/src/assets/face-tower-bayon-870x580.webp')] bg-cover bg-center bg-no-repeat  p-16 flex-col justify-center items-center text-white relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-2/5 left-3/10 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
            <div class="absolute bottom-3/10 right-3/10 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
          </div>
          <div class="relative z-10 text-center flex flex-col items-center">
            <div class="w-40 mb-8"><img src="../assets/whitelogoWeb.png" alt="logo"></div>
            <h2 class="text-3xl font-semibold mb-4">Join Our LocalCam</h2>
            <p class="text-base leading-relaxed opacity-90 mb-6">
              Create your account and start transforming your space with our curated collection of modern home decor.
            </p>

            <div class="text-left mt-8">
              <div class="flex items-center gap-3 mb-4 text-sm">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                <span>Exclusive access to new collections</span>
              </div>
              <div class="flex items-center gap-3 mb-4 text-sm">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                <span>Save favorites to your wishlist</span>
              </div>
              <div class="flex items-center gap-3 mb-4 text-sm">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                <span>Track orders and delivery</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                <span>Get personalized recommendations</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Side -->
        <div class="p-12 md:p-16 flex flex-col justify-center">
          <div class="mb-8">
            <h1 class="text-3xl font-semibold mb-2 text-gray-800">Create Account</h1>
            <p class="text-sm text-gray-600">Join us and start your decor journey</p>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="firstname" class="block mb-2 text-sm text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  v-model="firstName"
                  placeholder="John"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
                >
              </div>
              <div class="mb-4">
                <label for="lastname" class="block mb-2 text-sm text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  v-model="lastName"
                  placeholder="Doe"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
                >
              </div>
            </div>

            <div class="mb-4">
              <label for="email" class="block mb-2 text-sm text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="your@email.com"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
              >
            </div>

            <div class="mb-4">
              <label for="phone" class="block mb-2 text-sm text-gray-700 font-medium">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                v-model="phone"
                placeholder="+1 (555) 123-4567"
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
              >
            </div>

            <div class="mb-4">
              <label for="password" class="block mb-2 text-sm text-gray-700 font-medium">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Create a strong password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
              >
              <div class="mt-2">
                <div class="h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    class="h-full transition-all duration-300"
                    :style="{ width: passwordStrength + '%', backgroundColor: strengthColor }"
                  ></div>
                </div>
                <div class="text-xs" :style="{ color: strengthColor }">{{ strengthText }}</div>
              </div>
            </div>

            <div class="mb-4">
              <label for="confirm-password" class="block mb-2 text-sm text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="Re-enter your password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
              >
            </div>

            <div class="flex items-start gap-2 mb-6">
              <input
                type="checkbox"
                id="terms"
                v-model="termsAccepted"
                required
                class="w-4 h-4 cursor-pointer mt-0.5 shrink-0"
              >
              <label for="terms" class="text-xs text-gray-700 leading-relaxed cursor-pointer">
                I agree to the <a href="#" class="text-gray-800 underline font-medium">Terms of Service</a> and <a href="#" class="text-gray-800 underline font-medium">Privacy Policy</a>
              </label>
            </div>

            <div class="flex items-start gap-2 mb-6">
              <input
                type="checkbox"
                id="newsletter"
                v-model="newsletter"
                class="w-4 h-4 cursor-pointer mt-0.5 shrink-0"
              >
              <label for="newsletter" class="text-xs text-gray-700 leading-relaxed cursor-pointer">
                Send me exclusive offers, design inspiration, and decor tips
              </label>
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-gray-800 text-white rounded-md cursor-pointer text-base font-semibold hover:bg-gray-600 transition-colors mb-5"
              :disabled="!termsAccepted"
              :class="{ 'opacity-50 cursor-not-allowed': !termsAccepted }"
            >
              Create Account
            </button>
          </form>

          <div class="flex items-center my-6 text-gray-400 text-sm">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="px-4">or sign up with</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <div class="flex flex-col gap-3 mb-6">
            <button
              @click="handleGoogleSignup"
              class="w-full py-3 border border-gray-300 bg-white rounded-md cursor-pointer text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-800 hover:bg-gray-50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.59.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Sign up with Google
            </button>
            <button
              @click="handleFacebookSignup"
              class="w-full py-3 border border-gray-300 bg-white rounded-md cursor-pointer text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-800 hover:bg-gray-50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </button>
          </div>

          <div class="text-center text-sm text-gray-600">
            Already have an account? <a href="#" @click.prevent="$router.push('/login')" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Sign In</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
