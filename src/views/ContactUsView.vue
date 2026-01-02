<script setup>
import { ref, reactive } from 'vue'

// --- Unified State Management ---
const activeFaq = ref(0)

const contactInfo = {
  email: 'support@localcam.com',
  phone: '+(855) 12 345 678',
  address: '123 Toul Kork, Phnom Penh, Cambodia',
  hours: 'Monday – Friday | 8:30 AM – 5:00 PM'
}

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 1 - 2 days. Express delivery is available at checkout." },
  { q: "Do you ship international?", a: "Yes, we ship to over 50 countries worldwide with real-time tracking." },
  { q: "Can I return or exchange and item?", a: "We offer a 30-day hassle-free return policy for all unused items." },
  { q: "How do I track my order?", a: "Once shipped, you will receive a tracking link via your registered email." },
  { q: "Do you offer to promote the product?", a: "We have an affiliate program for creators; contact us for details." }
]

// --- Handlers ---
const sendMessage = () => {
  console.log('Form Submitted:', form)
  alert('Message sent successfully!')
}
</script>

<template>
  <div class="bg-[#F8F7F2] text-[#1A1A1A] font-['Poppins'] selection:bg-black selection:text-white overflow-x-hidden ">
    
    <section class="px-6 py-20 mx-auto mt-20 max-w-7xl lg:py-32">
      <div class="flex flex-col items-start justify-between mb-20 lg:flex-row">
        <h1 class="mb-8 text-6xl italic leading-none tracking-tighter md:text-8xl font-['Condiment'] lg:mb-0">
          We are here to help
        </h1>
        <p class="max-w-xs pt-4 text-lg leading-relaxed text-slate-500">
          Have a question, or need some assistance? We would love to hear from you.
        </p>
      </div>

      <div class="flex w-screen-xl justify-between text-[10px] uppercase tracking-[0.3em] border-b border-slate-300 pb-4 mb-16 text-slate-400">
        <span>//01</span>
        <span>/our contact</span>
      </div>

      <div class="grid items-center grid-cols-1 gap-16 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="rounded-tr-[160px] rounded-bl-[160px] overflow-hidden aspect-[4/5] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80" 
                 alt="Contact Visual" class="object-cover w-full h-full">
          </div>
        </div>

        <div class="lg:col-span-7">
          <h2 class="mb-16 text-5xl italic leading-tight md:text-7xl font-['Condiment']">LocalCam <br/> contact info</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-12">
            <div v-for="(val, key) in contactInfo" :key="key">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">OUR {{ key }}</h4>
              <p class="text-lg font-medium leading-snug">{{ val }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#F2F1EA] py-24">
      <div class="px-6 mx-auto max-w-7xl">
        <div class="flex justify-between text-[10px] uppercase tracking-[0.3em] border-b border-slate-300 pb-4 mb-20 text-slate-400">
          <span>//02</span>
          <span>/form</span>
        </div>
        <div class="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <h2 class="text-6xl font-['Condiment'] italic mb-8 leading-[0.9]">send us a message</h2>
            <p class="max-w-xs text-sm leading-relaxed text-slate-500">
              Fill out the form below and our team will get back to you within 6-24 hours.
            </p>
          </div>
          <form @submit.prevent="sendMessage" class="grid lg:col-span-8 md:grid-cols-2 gap-x-12 gap-y-14">
            <div v-for="label in ['First Name', 'Last Name', 'E-mail', 'Subject']" :key="label" class="flex flex-col group">
              <label class="text-[10px] font-bold uppercase mb-2 tracking-widest transition-colors group-focus-within:text-black">{{ label }}*</label>
              <input type="text" :placeholder="label.toLowerCase()" 
                class="py-3 transition-all duration-300 bg-transparent border-b outline-none border-slate-400 focus:border-black placeholder:text-slate-300">
            </div>
            <div class="flex flex-col md:col-span-2 group">
              <label class="text-[10px] font-bold uppercase mb-2 tracking-widest transition-colors group-focus-within:text-black">Message*</label>
              <textarea v-model="form.message" rows="1" placeholder="leave us message here..." 
                class="py-3 transition-all duration-300 bg-transparent border-b outline-none resize-none border-slate-400 focus:border-black placeholder:text-slate-300"></textarea>
            </div>
            <button class="bg-black text-white px-10 py-5 w-fit flex items-center space-x-6 hover:bg-slate-800 transition-all uppercase text-[10px] font-bold tracking-[0.2em] active:scale-95">
              <span>Send Message</span> 
              <span class="text-lg">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section class="px-6 py-32 mx-auto max-w-7xl">
      <div class="flex justify-between text-[10px] uppercase tracking-[0.3em] border-b border-slate-300 pb-4 mb-20 text-slate-400">
        <span>//03</span>
        <span>/curated products</span>
      </div>
      <div class="mb-24 text-center">
        <h2 class="mb-4 text-5xl italic leading-tight md:text-7xl font-['Condiment']">Everything you might need to know</h2>
        <p class="text-lg text-slate-400">Find quick answers to common questions.</p>
      </div>
      <div class="divide-y divide-slate-200">
        <div v-for="(faq, i) in faqs" :key="i" class="py-2">
          <button @click="activeFaq = (activeFaq === i ? -1 : i)" class="flex items-center justify-between w-full py-8 text-left transition-all hover:pl-2">
            <span class="text-xl font-medium tracking-tight md:text-2xl">{{ faq.q }}</span>
            <span class="text-2xl transition-transform duration-300" :class="{ 'rotate-180': activeFaq === i }">
              {{ activeFaq === i ? '−' : '+' }}
            </span>
          </button>
          <div v-show="activeFaq === i" class="max-w-2xl pb-8 text-lg leading-relaxed text-slate-500 animate-fadeIn">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

    <section class="w-full bg-[#F1EEE5] pb-24 border-t border-slate-200">
        <div class="w-full bg-[#F1EEE5] pb-20 relative z-10">
            <div class="flex justify-between w-full h-auto text-gray-500 pt-14 max-w-7xl mx-auto px-6 text-[10px] uppercase tracking-[0.3em] border-b border-slate-300 pb-4 mb-12">
                <div>///007</div>
                <div>/shopping</div>
            </div>
            <div class="flex max-lg:flex-col-reverse w-full px-[7vw] pt-12">
                <div
                    class="flex flex-col w-1/2 text-[5vw] max-lg:w-full max-lg:text-5xl font-['Condiment'] font-extrabold py-6 max-lg:mb-10 lg:items-s max-lg:text-center max-lg:leading-normal"
                >
                    Ready to refresh your lifestyle with local goodness?
                    <router-link to="/shop">
                    <button
                        class="font-['Poppins'] group w-fit flex justify-start items-start bg-black hover:bg-white text-white font-semibold border border-[#806E53] rounded-lg px-6 py-3 text-lg hover:text-black transition duration-300 cursor-pointer max-[430px]:text-xs max-[430px]:px-4 max-[430px]:py-2 mt-6"
                    >
                        START SHOPPING NOW
                        <ArrowLongRightIcon
                        alt="Go to exploration our products"
                        class="w-6 h-6 ml-3 text-white transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black"
                        />
                    </button>
                    </router-link>
                </div>
            <div class="flex w-1/2 max-lg:w-full p-[4vw] gap-6">
                <div class="w-1/2">
                <img src="../assets/image 20.png" alt="" class="w-full" />
                </div>
                <div class="w-1/2">
                <img src="../assets/image 21.png" alt="" class="w-full" />
                </div>
            </div>
            </div>
        </div>
    </section>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Condiment&display=swap');

/* High-vibe script font applied globally to .font-script */
.font-script {
  font-family: 'Caveat', cursive;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>