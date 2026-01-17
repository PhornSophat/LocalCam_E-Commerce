<template>
    <div class="min-h-screen flex flex-col bg-[#F1EEE5]">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="px-5 py-5 mx-auto max-w-7xl">
                <div class="flex items-center justify-center">
                    <img src="../assets/black-weblogo.png" alt="logo" class="w-20" />
                    <div class="text-3xl font-semibold tracking-wide text-gray-800">
                        LocalCam
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Container -->
        <div class="flex items-center justify-center flex-1 px-5 py-10">
            <div class="grid w-full max-w-5xl overflow-hidden bg-white shadow-lg rounded-xl md:grid-cols-2">
                <!-- Visual Section -->
                <div class="relative flex-col items-center justify-center hidden p-10 overflow-hidden text-white md:flex bg-linear-to-br from-gray-800 to-gray-600 lg:p-16">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute top-1/2 left-1/5 w-96 h-96 bg-[#F1EEE5] rounded-full blur-3xl"></div>
                        <div class="absolute bottom-1/5 right-1/5 w-80 h-80 bg-[#F1EEE5] rounded-full blur-3xl"></div>
                    </div>

                    <div class="relative z-10 flex flex-col items-center text-center">
                        <div class="w-40 mb-8"><img src="../assets/whitelogoWeb.png" alt="logo"></div>
                        <h2 class="mb-4 text-3xl font-semibold">
                            Forgot Your Password?
                        </h2>
                        <p class="text-base leading-relaxed opacity-90">
                            No worries! We'll send you a recovery link to your Gmail account
                            so you can reset your password and get back to decorating your space.
                        </p>
                    </div>
                </div>

                <!-- Form Section -->
                <div class="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                    <!-- Form View -->
                    <div v-if="!showSuccess">
                        <div class="mb-9">
                            <h1 class="mb-3 text-3xl font-semibold text-gray-800">
                                Reset Password
                            </h1>
                            <p class="leading-relaxed text-gray-600">
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
                                    class="w-full px-4 py-3 text-sm transition-colors border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                                />
                            </div>

                            <div class="p-4 mb-6 border-l-4 border-gray-800 rounded bg-gray-50">
                                <p class="text-sm leading-relaxed text-gray-700">
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

                        <div class="flex items-center justify-center gap-1 text-sm text-center text-gray-600">
                            <span>←</span>
                            <span>Back to <router-link to="/login" class="font-semibold text-gray-800 transition-opacity hover:opacity-70">Sign In</router-link></span>
                        </div>
                    </div>

                    <!-- Success View -->
                    <div v-else>
                        <div class="p-4 mb-5 text-center text-green-800 bg-green-100 border border-green-300 rounded-md">
                            <strong class="block mb-1 text-base">✓ Email Sent Successfully!</strong>
                            <p class="text-sm">Check your Gmail inbox for password reset instructions.</p>
                        </div>

                        <div class="p-4 mb-6 border-l-4 border-gray-800 rounded bg-gray-50">
                            <p class="mb-2 text-sm font-semibold text-gray-700">What's next?</p>
                            <p class="text-sm leading-relaxed text-gray-700">1. Check your Gmail inbox (and spam folder)</p>
                            <p class="text-sm leading-relaxed text-gray-700">2. Click the reset link in the email</p>
                            <p class="text-sm leading-relaxed text-gray-700">3. Create a new password</p>
                            <p class="text-sm leading-relaxed text-gray-700">4. Sign in with your new password</p>
                        </div>

                        <div class="mb-5 text-sm text-center text-gray-600">
                            <span>Didn't receive the email? </span>
                            <a href="#" @click.prevent="handleResend" class="font-semibold text-gray-800 transition-opacity hover:opacity-70">Resend</a>
                        </div>

                        <div class="flex items-center justify-center gap-1 text-sm text-center text-gray-600">
                            <span>←</span>
                            <span>Back to <router-link to="/login" class="font-semibold text-gray-800 transition-opacity hover:opacity-70">Sign In</router-link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer
        <footer class="bg-[#767064] text-white py-8">
            <div class="px-5 mx-auto max-w-7xl">
                <div class="flex flex-col items-center justify-between gap-5 sm:flex-row">
                    <div class="text-xs text-white/60">
                        © 2025 LocalCam. All rights reserved.
                    </div>
                    <ul class="flex flex-wrap justify-center gap-6 list-none">
                        <li><a href="#" class="text-sm transition-colors text-white/80 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" class="text-sm transition-colors text-white/80 hover:text-white">Terms of Service</a></li>
                        <li><a href="#" class="text-sm transition-colors text-white/80 hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </footer> -->
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
