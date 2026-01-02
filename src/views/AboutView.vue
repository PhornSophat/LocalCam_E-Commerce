<template>
  <img
    class="fixed z-0 w-full h-auto top-20 "
    src="@/assets/AboutPage/Rectangle 39.png"
    alt="About Us Hero"
  />
  <div class="relative top-0 z-10">
    <!-- Hero Section -->
    <div class="w-full flex flex-col items-center justify-center py-20 bg-[#F3F0E9]">
      <div class="text-black text-9xl font-normal font-['Acme'] text-center">
        SUPPORT OUR LOCAL PRODUCTS
      </div>
      <div class="text-black text-6xl font-normal font-['Acme'] mt-8 text-center">
        EVERY ITEM SHOWS THE HEART OF CAMBODIA
      </div>
      <div class="text-black text-6xl font-normal font-['Acme'] text-center">
        HANDMADE, AUTHENTIC, AND FULL OF STORY.
      </div>
      <div class="text-black text-6xl font-normal font-['Acme'] mt-12 text-center">
        (Scroll Down)
      </div>
    </div>

    <!-- Hero Image -->

    <!-- Welcome Section -->
    <div class="w-full max-w-full px-8 py-20 mx-auto bg-white mt-150 ">
      <div class="text-black text-9xl font-normal font-['Acme'] mb-12">
        WELCOME TO <br/>LocalCam
      </div>
      <div class="text-black text-4xl font-normal font-['Acme'] mb-20">
        <p class="mb-8">LocalCam is a Cambodian local products brand dedicated to bringing authentic craftsmanship and cultural heritage into modern homes. With a curated selection of handmade handicrafts, textiles, decor, and artisanal food products, we help individuals and enthusiasts celebrate Cambodian tradition in a personal and meaningful way.</p>
        <p>Our approach is rooted in supporting local artisans, preserving traditional skills, and delivering high-quality products that are both beautiful and sustainable. Whether you're decorating your home, gifting someone special, or exploring Cambodian culture, we make experiencing local craftsmanship simple and joyful.</p>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 gap-12 mt-20 md:grid-cols-2">
        <div>
          <div class="text-8xl font-normal font-['Acme']">1,200+</div>
          <div class="text-4xl font-normal font-['Acme'] mt-4">Curated products,<br/>growing each season</div>
        </div>
        <div>
          <div class="text-8xl font-normal font-['Acme']">50,000+</div>
          <div class="text-4xl font-normal font-['Acme'] mt-4">Trusted by happy customers<br/>worldwide</div>
        </div>
      </div>

      <!-- Trusted By Section -->
      <div class="w-full bg-[#F3F0E9] px-6 py-12 md:px-12 md:py-20 mt-20">
        <div class="flex items-center justify-between w-full mb-16 text-xs font-medium text-gray-500 md:mb-24">
          <span class="tracking-widest">//02</span>
          <span class="tracking-wide">/Our Partners</span>
        </div>

        <div class="mb-24 text-center">
          <h2 class="text-5xl md:text-7xl text-gray-900 tracking-tight font-['Acme'] italic">
            trusted by thousands
          </h2>
        </div>

        <div class="w-full border-gray-300">
          <div class="grid items-center justify-center grid-cols-2 gap-0 md:grid-cols-5">

            <div class="flex items-center justify-center py-8 border-r border-gray-300/50 md:border-gray-300">
              <div class="flex items-center gap-2 transition-all opacity-70 grayscale hover:grayscale-0">
                <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span class="text-lg font-bold text-gray-700">ArtisanHub</span>
              </div>
            </div>

            <div class="flex items-center justify-center py-8 border-r border-gray-300/50 md:border-gray-300">
              <div class="flex items-center gap-2 transition-all opacity-70 grayscale hover:grayscale-0">
                <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
                </svg>
                <span class="text-lg font-bold text-gray-700">KhmerCraft</span>
              </div>
            </div>

            <div class="flex items-center justify-center py-8 border-r border-gray-300/50 md:border-gray-300">
              <div class="flex items-center gap-2 transition-all opacity-70 grayscale hover:grayscale-0">
                <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span class="text-lg font-bold text-gray-700">SilkRoad</span>
              </div>
            </div>

            <div class="flex items-center justify-center py-8 border-r border-gray-300/50 md:border-gray-300">
              <div class="flex items-center gap-2 transition-all opacity-70 grayscale hover:grayscale-0">
                <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4"/>
                  <circle cx="8.5" cy="10.5" r="1.5" fill="white"/>
                  <circle cx="15.5" cy="10.5" r="1.5" fill="white"/>
                </svg>
                <span class="text-lg font-bold text-gray-700">AngkorArt</span>
              </div>
            </div>

            <div class="flex items-center justify-center py-8">
              <div class="flex items-center gap-2 transition-all opacity-70 grayscale hover:grayscale-0">
                <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <span class="text-lg font-bold text-gray-700">KramaCo</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView'
}
</script>
