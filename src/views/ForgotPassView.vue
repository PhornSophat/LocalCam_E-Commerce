<template>
    <div class="min-h-screen flex flex-col bg-[#F1EEE5]">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-5 py-5">
                <div class="flex justify-center items-center">
                    <img src="../assets/black-weblogo.png" alt="logo" class="w-20" />
                    <div class="text-3xl font-semibold text-gray-800 tracking-wide">
                        LocalCam
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Container -->
        <div class="flex-1 flex items-center justify-center px-5 py-10">
            <div class="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">
                <!-- Visual Section -->
                <div class="hidden md:flex bg-linear-to-br from-gray-800 to-gray-600 p-10 lg:p-16 flex-col justify-center items-center text-white relative overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute top-1/2 left-1/5 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
                        <div class="absolute bottom-1/5 right-1/5 w-80 h-80 bg-[#F1EEE5] rounded-full blur-3xl"></div>
                    </div>

                    <div class="relative z-10 text-center flex flex-col items-center">
                        <div class="w-40 mb-8"><img src="../assets/whitelogoWeb.png" alt="logo"></div>
                        <h2 class="text-3xl font-semibold mb-4">
                            Forgot Your Password?
                        </h2>
                        <p class="text-base leading-relaxed opacity-90">
                            No worries! We'll send you a recovery link to your Gmail account
                            so you can reset your password and get back to decorating your space.
                        </p>
                    </div>
                </div>

                <!-- Form Section -->
                <div class="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                    <!-- Form View -->
                    <div v-if="!showSuccess">
                        <div class="mb-9">
                            <h1 class="text-3xl font-semibold text-gray-800 mb-3">
                                Reset Password
                            </h1>
                            <p class="text-gray-600 leading-relaxed">
                                Enter your Gmail address and we'll send you instructions to reset your password
                            </p>
                        </div>

                        <form @submit.prevent="handleSubmit">
                            <div class="mb-5">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-700">
                                    Gmail Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    v-model="email"
                                    placeholder="your@gmail.com"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800 transition-colors"
                                />
                            </div>

                            <div class="bg-gray-50 border-l-4 border-gray-800 p-4 mb-6 rounded">
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    📧 We'll send a password reset link to your Gmail account. The link will expire in 1 hour for security purposes.
                                </p>
                            </div>

                            <button
                                type="submit"
                                class="w-full py-3.5 bg-gray-800 text-white rounded-md font-semibold text-base hover:bg-gray-700 transition-colors mb-5"
                            >
                                Send Reset Link
                            </button>
                        </form>

                        <div class="text-center text-sm text-gray-600 flex items-center justify-center gap-1">
                            <span>←</span>
                            <span>Back to <a href="#" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Sign In</a></span>
                        </div>
                    </div>

                    <!-- Success View -->
                    <div v-else>
                        <div class="bg-green-100 border border-green-300 text-green-800 p-4 rounded-md mb-5 text-center">
                            <strong class="block mb-1 text-base">✓ Email Sent Successfully!</strong>
                            <p class="text-sm">Check your Gmail inbox for password reset instructions.</p>
                        </div>

                        <div class="bg-gray-50 border-l-4 border-gray-800 p-4 mb-6 rounded">
                            <p class="text-sm font-semibold text-gray-700 mb-2">What's next?</p>
                            <p class="text-sm text-gray-700 leading-relaxed">1. Check your Gmail inbox (and spam folder)</p>
                            <p class="text-sm text-gray-700 leading-relaxed">2. Click the reset link in the email</p>
                            <p class="text-sm text-gray-700 leading-relaxed">3. Create a new password</p>
                            <p class="text-sm text-gray-700 leading-relaxed">4. Sign in with your new password</p>
                        </div>

                        <div class="text-center text-sm text-gray-600 mb-5">
                            <span>Didn't receive the email? </span>
                            <a href="#" @click.prevent="handleResend" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Resend</a>
                        </div>

                        <div class="text-center text-sm text-gray-600 flex items-center justify-center gap-1">
                            <span>←</span>
                            <span>Back to <a href="#" class="text-gray-800 font-semibold hover:opacity-70 transition-opacity">Sign In</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-[#767064] text-white py-8">
            <div class="max-w-7xl mx-auto px-5">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-5">
                    <div class="text-white/60 text-xs">
                        © 2024 Decorist. All rights reserved.
                    </div>
                    <ul class="flex flex-wrap gap-6 list-none justify-center">
                        <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="text-white/80 text-sm hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            email: '',
            showSuccess: false
        }
    },
    methods: {
        handleSubmit() {
            if (!this.email.endsWith('@gmail.com')) {
                alert('Please enter a valid Gmail address');
                return;
            }
            this.showSuccess = true;
        },
        handleResend() {
            alert('Reset link has been resent to your Gmail!');
        }
    }
}
</script>
