<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('Login:', {
        email: this.email,
        password: this.password,
        remember: this.remember
      })
    },
    handleGoogleLogin() {
      console.log('Google login')
    },
    handleFacebookLogin() {
      console.log('Facebook login')
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F1EEE5]">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-5 py-3">
        <div class="flex justify-center items-center">
          <img src="../assets/black-weblogo.png" alt="logo" class="w-20" />
          <div class="text-3xl font-semibold tracking-wide text-gray-800">
            LocalCam
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center px-5 py-10">
      <div class="grid md:grid-cols-2 max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Visual Side -->
        <div class="hidden md:flex bg-linear-to-br from-gray-800 to-gray-600 p-16 flex-col justify-center items-center text-white relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/2 left-1/5 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/5 right-1/5 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
          </div>
          <div class="relative z-10 text-center flex flex-col items-center">
            <div class="w-40 mb-8"><img src="../assets/whitelogoWeb.png" alt="logo"></div>
            <h2 class="text-3xl font-semibold mb-4">Welcome Back <br>To <br><span class="text-8xl/30">LocalCam</span></h2>
            <p class="text-base leading-relaxed opacity-90">
              Sign in to access your personalized home decor experience,
              track orders, and manage your wishlist.
            </p>
          </div>
        </div>

        <!-- Form Side -->
        <div class="p-12 md:p-16 flex flex-col justify-center">
          <div class="mb-9">
            <h1 class="text-3xl font-semibold mb-2 text-gray-800">Sign In</h1>
            <p class="text-sm text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="mb-5">
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

            <div class="mb-5">
              <label for="password" class="block mb-2 text-sm text-gray-700 font-medium">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
              >
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  v-model="remember"
                  class="w-4 h-4 cursor-pointer"
                >
                <label for="remember" class="text-sm text-gray-700 cursor-pointer">Remember me</label>
              </div>
              <a href="#" class="text-sm text-gray-800 font-medium hover:opacity-70 transition-opacity">Forgot Password?</a>
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-gray-800 text-white rounded-md cursor-pointer text-base font-semibold hover:bg-gray-600 transition-colors mb-5"
            >
              Sign In
            </button>
          </form>

          <div class="flex items-center my-6 text-gray-400 text-sm">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="px-4">or continue with</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <div class="flex flex-col gap-3 mb-6">
            <button
              @click="handleGoogleLogin"
              class="w-full py-3 border border-gray-300 bg-white rounded-md cursor-pointer text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-800 hover:bg-gray-50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.59.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
            <button
              @click="handleFacebookLogin"
              class="w-full py-3 border border-gray-300 bg-white rounded-md cursor-pointer text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-800 hover:bg-gray-50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div class="text-center text-sm text-gray-600">
            Don't have an account? <a href="#" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Sign Up</a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#767064] text-white py-8">
      <div class="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
        <div class="text-white/60 text-xs">© 2024 Decorist. All rights reserved.</div>
        <ul class="flex gap-6 list-none flex-wrap justify-center">
          <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
