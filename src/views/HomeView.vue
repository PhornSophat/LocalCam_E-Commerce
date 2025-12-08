<script>
import { defineComponent } from 'vue'
// 1. Import the Slider component
import Slider from '../components/Slider.vue'
import NavigationBar from '../components/NavigationBar.vue'
import Carousel from "../components/Carousel.vue"
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'
import categories from '@/assets/categoryGiftSet2.png'
import Handicraft from '@/assets/categoryGiftSet.png'
import Toy from '@/assets/homePage.jpg'
import food from '@/assets/homePage2.jpg'
import ProductCard from '@/components/ProductCard.vue'

export default defineComponent({
  name: 'HomeView',
  // 2. Register the Slider and NavigationBar components
  components: {
    Slider,
    NavigationBar,
    ArrowLongRightIcon,
    Carousel,
    ProductCard,
  },

 setup() {
    const myCategories = [
      { name: "Handicraft & Arts", image: categories },
      { name: "Foods & Snacks", image: food },
      { name: "Clothing & Accessories", image: Toy },
      { name: "Beauty & Herbal Products", image: Handicraft },
      { name: "Home & Decor", image: Handicraft },
      { name: "Drinks & Coffee", image: Handicraft },
      { name: "Gift Sets", image: Handicraft },
    ];

    return { myCategories };
  },
})
</script>

<template>
  <!-- <div class="h-screen w-full absolute top-0 inset-0 z-0"> -->
  <Slider />
  <!-- TEXT OVERLAY (Title - z-20) -->
  <p
    class="absolute top-[25vh] right-10 font-bold font-['Condiment'] z-20 text-white text-7xl lg:text-8xl md:w-3/6 w-11/12 /* Mobile Overrides (Centering and size adjustments) */ max-[430px]:top-1/4 max-[430px]:left-1/2 max-[430px]:-translate-x-1/2 max-[430px]:text-center max-[430px]:text-5xl"
  >
    Supporting Local Products starts with you.
  </p>

  <!-- TEXT OVERLAY (Subtitle - z-20) -->
  <p
    class="absolute bottom-[25vh] left-[8.33333%] font-['Poppins'] z-20 text-white font-medium text-xl w-2/5 max-[635px]:bottom-20 /* Mobile Overrides (Centering) */ max-[430px]:left-1/2 max-[430px]:-translate-x-1/2 max-[430px]:text-center max-[430px]:bottom-1/5 max-[430px]:w-5/6"
  >
    Mix texture, colors, and personality with our uniquely expressive home pieces. Discover quality
    and charm crafted by local artisans.
  </p>
  <router-link to="/shop">
    <button
      class="group flex justify-center items-center bg-white hover:bg-black text-black font-semibold border border-[#806E53] rounded-lg px-6 py-3 text-lg hover:text-white transition duration-300 cursor-pointer max-[430px]:text-xs max-[430px]:px-4 max-[430px]:py-2 absolute bottom-1/6 left-1/12 z-20 /* Mobile Overrides (Centering) */ max-[430px]:bottom-1/8 max-[430px]:left-1/2 max-[430px]:-translate-x-1/2"
    >
      SHOP THE COLLECTION

      <ArrowLongRightIcon
        alt="Go to exploration our products"
        class="ml-3 w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white"
      />
    </button>
  </router-link>
  <div class="flex justify-between h-auto w-full p-4 py-8 text-gray-500 px-[7vw]">
    <div>///001</div>
    <div>/introduction</div>
  </div>


<!-- about LocalCam -->
  <div class="w-full flex max-md:flex-col max-md:justify-center max-md:items-center px-[7vw] py-20 gap-x-[3vw] text-black transition-transform duration-300">
    <div class="flex flex-col w-1/2 max-md:w-full max-md:items-center">
      <p class="font-['Condiment'] text-5xl font-bold">about LocalCam</p>
      <p class="text-[2vw] max-md:text-xl text-[#767064] italic md:hidden">
        YOUR ONE-STOP DESTINATION FOR ALL THINGS YOU NEEDS.
      </p>
      <img
        src="../assets/aboutImage.png"
        alt="Cat Image"
        class="w-full h-auto pt-18 object-cover rounded-2xl"
      />
    </div>
    <div class="flex flex-col w-1/2 max-md:w-full max-md:items-center">
      <div class="pb-8 mt-6 max-md:hidden">
        <p class="text-[2vw] max-md:text-xl text-[#767064] italic">
          YOUR ONE-STOP DESTINATION FOR ALL THINGS YOU NEEDS.
        </p>
      </div>
      <div class="pl-16 max-md:pl-0 max-md:px-6">
        <p
          class="mt-2 text-[1vw] max-md:text-[1.5vw] font-['Poppins'] font-extralight leading-[1.75]"
        >
          At LocalCam, we believe that your living space should be a reflection of your unique style
          and taste. Whethe you’re redecoration a cozy apartment or styling your dream home, our
          curated selection of modern and classic pieces is designed to reflect your personality and
          elevate your space.
        </p>
        <p
          class="mt-2 text-[1vw] max-md:text-[1.5vw] font-['Poppins'] font-extralight leading-[1.75] pt-6"
        >
          we blend style, comfort, and quality to help you create interiors that inspire every day.
        </p>
        <router-link to="/about">
          <button
            class="group w-fit flex justify-center items-center bg-white hover:bg-black text-black font-semibold border border-[#806E53] rounded-lg px-6 py-3 text-lg hover:text-white transition duration-300 cursor-pointer max-[430px]:text-xs max-[430px]:px-4 max-[430px]:py-2 mt-6"
          >
            ABOUT US
            <ArrowLongRightIcon
              alt="Go to exploration our products"
              class="ml-3 w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white"
            />
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <div class="w-full bg-[#F1EEE5] pb-10">
    <div class="flex justify-between h-auto w-full pt-14 text-gray-500 px-[7vw]">
      <div>///002</div>
      <div>/categories</div>
    </div>
     <div>
      <Carousel :categories="myCategories" />
    </div>
  </div>


<!-- fresh find just in -->
  <div class="w-full">
    <div class="flex justify-between h-auto w-full py-8 text-gray-500 px-[7vw]">
      <div>///003</div>
      <div>/new arrivals</div>
    </div>
    <div class="text-5xl font-['Condiment'] font-extrabold flex justify-center items-center py-6">
      fresh find just in
    </div>
    <div class="flex flex-wrap w-full p-10 gap-6 justify-center">

      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  </div>
</template>
