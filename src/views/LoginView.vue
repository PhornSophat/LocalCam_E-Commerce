<script lang="ts">
import { supabase } from '../supabase';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      remember: false,
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) return;
      
      this.loading = true;
      this.errorMessage = '';

      try {
        // 1. Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (authError) throw authError;

        // 2. Check for 'redirect' query parameter (e.g., from Cart)
        // If the URL is /login?redirect=/cart, redirectTo will be '/cart'
        const redirectTo = this.$route.query.redirect as string;

        if (redirectTo) {
          this.$router.push(redirectTo);
          return; // Exit early to avoid role-based logic
        }

        // 3. Normal Routing Logic (if not redirected from a specific page)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        if (profile.role === 'admin') {
          this.$router.push('/admin');
        } else {
          this.$router.push('/');
        }

      } catch (error: any) {
        this.errorMessage = error.message || "Invalid email or password";
      } finally {
        this.loading = false;
      }
    },

    async handleGoogleLogin() {
      // For OAuth, we pass the redirect info through the provider options
      const redirectToPath = this.$route.query.redirect as string || '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}${redirectToPath}` 
        }
      });
      if (error) this.errorMessage = error.message;
    },

    async handleFacebookLogin() {
      const redirectToPath = this.$route.query.redirect as string || '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: { 
          redirectTo: `${window.location.origin}${redirectToPath}` 
        }
      });
      if (error) this.errorMessage = error.message;
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F1EEE5] font-Poppins">
    <header class="bg-white shadow-sm">
      <div class="px-5 py-3 mx-auto max-w-7xl">
        <div class="flex items-center justify-center gap-3">
          <img src="../assets/black-weblogo.png" alt="logo" class="w-12 md:w-16" />
          <div class="text-2xl font-black tracking-tight text-gray-800 uppercase md:text-3xl">
            LocalCam
          </div>
        </div>
      </div>
    </header>

    <main class="flex items-center justify-center flex-1 px-5 py-10">
      <div class="grid w-full max-w-5xl overflow-hidden bg-white border border-gray-100 shadow-2xl md:grid-cols-2 rounded-2xl">
        
        <div class="relative flex-col items-center justify-center hidden p-16 overflow-hidden text-white md:flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
          <div class="absolute inset-0 opacity-20">
            <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200 rounded-full blur-[80px]"></div>
            <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-400 rounded-full blur-[80px]"></div>
          </div>
          
          <div class="relative z-10 flex flex-col items-center text-center">
            <img src="../assets/whitelogoWeb.png" alt="logo" class="w-32 mb-8 drop-shadow-lg">
            <h2 class="mb-2 text-3xl font-light tracking-widest uppercase">Welcome Back</h2>
            <p class="mb-6 text-5xl font-black uppercase text-amber-50">LocalCam</p>
            <div class="w-12 h-1 mb-6 bg-amber-400"></div>
            <p class="max-w-xs text-sm leading-relaxed opacity-80">
              Access your artisan collection, manage your orders, and explore the best of Cambodian craftsmanship.
            </p>
          </div>
        </div>

        <div class="flex flex-col justify-center p-10 md:p-16">
          <div class="mb-8">
            <h1 class="mb-2 text-3xl font-black text-gray-900">Sign In</h1>
            <p class="text-sm text-gray-500">
              {{ $route.query.redirect ? 'Please login to finish your order.' : 'Welcome back! Please enter your details.' }}
            </p>
          </div>

          <div v-if="errorMessage" class="flex items-center gap-3 p-4 mb-6 text-xs font-bold text-red-700 border-l-4 border-red-500 rounded bg-red-50">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="email" class="block mb-1.5 text-xs font-black uppercase tracking-wider text-gray-400">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="you@example.com"
                required
                class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-800 focus:bg-white outline-none transition-all"
              >
            </div>

            <div class="relative">
              <label for="password" class="block mb-1.5 text-xs font-black uppercase tracking-wider text-gray-400">Password</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  placeholder="••••••••"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-800 focus:bg-white outline-none transition-all pr-12"
                >
                <button 
                  type="button" 
                  @click="showPassword = !showPassword" 
                  class="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-gray-800"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between py-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" v-model="remember" class="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800">
                <span class="text-xs font-bold text-gray-500 transition-colors group-hover:text-gray-800">Stay logged in</span>
              </label>
              <router-link to="/forgot-password" class="text-xs font-black text-gray-800 hover:underline">Forgot Password?</router-link>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-200 disabled:opacity-70 flex justify-center items-center gap-3"
            >
              <svg v-if="loading" class="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Authenticating...' : 'Sign In' }}
            </button>
          </form>

          <div class="relative my-8 text-center">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
            <span class="relative px-4 bg-white text-[10px] font-black uppercase tracking-widest text-gray-400">Social Login</span>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <button @click="handleGoogleLogin" class="flex items-center justify-center gap-2 py-3 transition-all border border-gray-200 rounded-xl hover:bg-gray-50">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5" alt="Google">
              <span class="text-xs font-bold text-gray-600">Google</span>
            </button>
            <button @click="handleFacebookLogin" class="flex items-center justify-center gap-2 py-3 transition-all border border-gray-200 rounded-xl hover:bg-gray-50">
              <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span class="text-xs font-bold text-gray-600">Facebook</span>
            </button>
          </div>

          <div class="text-xs font-medium text-center text-gray-500">
            Need an artisan account? 
            <router-link to="/signup" class="ml-1 font-black text-gray-900 hover:underline">Create Account</router-link>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-[#2D2A26] text-white/40 py-6">
      <div class="flex flex-col items-center justify-between gap-4 px-5 mx-auto max-w-7xl md:flex-row">
        <div class="text-[10px] font-bold uppercase tracking-widest text-white/20">© 2026 LocalCam Studio</div>
        <div class="flex gap-6">
          <a href="#" class="text-[10px] hover:text-white transition-colors uppercase font-bold tracking-widest">Support</a>
          <a href="#" class="text-[10px] hover:text-white transition-colors uppercase font-bold tracking-widest">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>