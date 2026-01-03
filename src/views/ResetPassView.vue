<script lang="ts">
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      showSuccessModal: false,
      errorMessage: '',
      requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      },
      strengthLevel: 'None',
      strengthClass: ''
    }
  },
  computed: {
    isFormValid() {
      return Object.values(this.requirements).every(val => val) &&
             this.newPassword === this.confirmPassword &&
             this.confirmPassword !== ''
    },
    passwordsMatch() {
      return this.newPassword === this.confirmPassword || this.confirmPassword === ''
    }
  },
  watch: {
    newPassword(val) {
      this.checkPasswordStrength(val)
    },
    confirmPassword() {
      if (this.confirmPassword && !this.passwordsMatch) {
        this.errorMessage = ''
      }
    }
  },
  methods: {
    checkPasswordStrength(password: string) {
      this.requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }

      const strength = Object.values(this.requirements).filter(Boolean).length

      if (strength === 0) {
        this.strengthLevel = 'None'
        this.strengthClass = ''
      } else if (strength <= 2) {
        this.strengthLevel = 'Weak'
        this.strengthClass = 'weak'
      } else if (strength <= 4) {
        this.strengthLevel = 'Medium'
        this.strengthClass = 'medium'
      } else {
        this.strengthLevel = 'Strong'
        this.strengthClass = 'strong'
      }
    },
    togglePasswordVisibility(field: string) {
      if (field === 'new') {
        this.showNewPassword = !this.showNewPassword
      } else {
        this.showConfirmPassword = !this.showConfirmPassword
      }
    },
    handleSubmit() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!'
        return
      }

      if (!Object.values(this.requirements).every(val => val)) {
        this.errorMessage = 'Password does not meet all requirements!'
        return
      }

      this.errorMessage = ''
      this.showSuccessModal = true
    },
    goToSignIn() {
      this.$router.push('/login')
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
        <div class="hidden md:flex bg-[url('/home/soksim/Documents/Year4_Project/LocalCam_E-Commerce/src/assets/vieux-ruines.webp')] bg-cover bg-center bg-no-repeat p-16 flex-col justify-center items-center text-white relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/3 left-1/3 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
          </div>
          <div class="relative z-10 text-center">
            <div class="flex flex-col items-center mb-8">
            <img src="../assets/whitelogoWeb.png" alt="logo" class="w-40" /></div>
            <h2 class="text-3xl font-semibold mb-4">Create New Password</h2>
            <p class="text-base leading-relaxed opacity-90 mb-8">
              Choose a strong password to keep your account secure and your decor dreams safe.
            </p>

            <div class="bg-white/10 rounded-lg p-5 text-left">
              <h3 class="text-base font-semibold mb-4">Password Tips:</h3>
              <div class="space-y-3 text-sm opacity-90">
                <div class="flex items-start gap-2">
                  <span class="mt-0.5">✓</span>
                  <span>Use at least 8 characters</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="mt-0.5">✓</span>
                  <span>Mix uppercase and lowercase</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="mt-0.5">✓</span>
                  <span>Include numbers and symbols</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="mt-0.5">✓</span>
                  <span>Avoid common words</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Side -->
        <div class="p-12 md:p-16 flex flex-col justify-center">
          <div class="mb-9">
            <h1 class="text-3xl font-semibold mb-2 text-gray-800">Reset Your Password</h1>
            <p class="text-sm text-gray-600 leading-relaxed">Enter your new password below. Make sure it's strong and secure.</p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-5 text-sm">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- New Password -->
            <div class="mb-5">
              <label for="new-password" class="block mb-2 text-sm text-gray-700 font-medium">New Password</label>
              <div class="relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="new-password"
                  v-model="newPassword"
                  placeholder="Enter new password"
                  required
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
                >
                <button
                  type="button"
                  @click="togglePasswordVisibility('new')"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 text-lg"
                >
                  {{ showNewPassword ? '👁️‍🗨️' : '👁️' }}
                </button>
              </div>

              <!-- Password Strength -->
              <div class="mt-2.5">
                <div class="h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    class="h-full transition-all duration-300"
                    :class="{
                      'w-0': strengthClass === '',
                      'w-1/3 bg-red-500': strengthClass === 'weak',
                      'w-2/3 bg-yellow-500': strengthClass === 'medium',
                      'w-full bg-green-500': strengthClass === 'strong'
                    }"
                  ></div>
                </div>
                <div class="text-xs text-gray-600">
                  Password strength: <span>{{ strengthLevel }}</span>
                </div>
              </div>

              <!-- Requirements -->
              <div class="mt-2 text-xs text-gray-600 space-y-1">
                <div
                  class="flex items-center gap-1.5"
                  :class="{ 'text-green-600': requirements.length }"
                >
                  <span class="text-sm">{{ requirements.length ? '✓' : '○' }}</span>
                  <span>At least 8 characters</span>
                </div>
                <div
                  class="flex items-center gap-1.5"
                  :class="{ 'text-green-600': requirements.uppercase }"
                >
                  <span class="text-sm">{{ requirements.uppercase ? '✓' : '○' }}</span>
                  <span>One uppercase letter</span>
                </div>
                <div
                  class="flex items-center gap-1.5"
                  :class="{ 'text-green-600': requirements.lowercase }"
                >
                  <span class="text-sm">{{ requirements.lowercase ? '✓' : '○' }}</span>
                  <span>One lowercase letter</span>
                </div>
                <div
                  class="flex items-center gap-1.5"
                  :class="{ 'text-green-600': requirements.number }"
                >
                  <span class="text-sm">{{ requirements.number ? '✓' : '○' }}</span>
                  <span>One number</span>
                </div>
                <div
                  class="flex items-center gap-1.5"
                  :class="{ 'text-green-600': requirements.special }"
                >
                  <span class="text-sm">{{ requirements.special ? '✓' : '○' }}</span>
                  <span>One special character (!@#$%^&*)</span>
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-6">
              <label for="confirm-password" class="block mb-2 text-sm text-gray-700 font-medium">Confirm New Password</label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="confirmPassword"
                  placeholder="Re-enter new password"
                  required
                  :class="[
                    'w-full px-4 py-3 pr-12 border rounded-md text-sm focus:outline-none transition-colors',
                    !passwordsMatch && confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-gray-800'
                  ]"
                >
                <button
                  type="button"
                  @click="togglePasswordVisibility('confirm')"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 text-lg"
                >
                  {{ showConfirmPassword ? '👁️‍🗨️' : '👁️' }}
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full py-3 rounded-md cursor-pointer text-base font-semibold transition-colors mb-5"
              :class="isFormValid ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            >
              Reset Password
            </button>
          </form>

          <div class="text-center text-sm text-gray-600 flex items-center justify-center gap-1">
            <span>←</span>
            <span>Back to <a href="#" @click.prevent="$router.push('/login')" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Sign In</a></span>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5"
      @click="showSuccessModal = false"
    >
      <div
        class="bg-white rounded-xl p-10 max-w-md w-full text-center"
        @click.stop
      >
        <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6">
          ✓
        </div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Password Reset Successfully!</h2>
        <p class="text-sm text-gray-600 leading-relaxed mb-8">
          Your password has been updated. You can now sign in with your new password.
        </p>
        <button
          @click="goToSignIn"
          class="w-full py-3 bg-gray-800 text-white rounded-md cursor-pointer text-base font-semibold hover:bg-gray-600 transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
