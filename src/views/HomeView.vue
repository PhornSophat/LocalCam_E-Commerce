<script lang="ts">
import { defineComponent } from 'vue'
// 1. Import the component
import Slider from '../components/Slider.vue'
import NavigationBar from '../components/NavigationBar.vue'
import Carousel from '../components/Carousel.vue'
import ProductScroll from '../components/ProductScroll.vue'
import WorkProcess from '../components/WorkProcess.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
// 2. Import the Icon
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'
// 3. Import the image
import categories from '@/assets/categoryGiftSet2.png'
import Handicraft from '@/assets/categoryGiftSet.png'
import Toy from '@/assets/homePage.jpg'
import food from '@/assets/homePage2.jpg'
import palm_sugar_cam from '@/assets/Palm-Sugar-cambodia.webp'
import krama from '@/assets/1. Krama.jpg'

export default defineComponent({
  name: 'HomeView',
  // 2. Register the Slider and NavigationBar components
  components: {
    Slider,
    NavigationBar,
    ArrowLongRightIcon,
    Carousel,
    ProductScroll,
    WorkProcess,
    TestimonialCard,
  },

  setup() {
    const testimonialData = [
      {
        image: categories,
        name: 'Chenda',
        location: 'Phnom Penh, Cambodia',
        review: 'I bought the roasted cashew and the flavor is amazing!',
        rating: 5,
      },
      {
        image: Toy,
        name: 'Chenda',
        location: 'Phnom Penh, Cambodia',
        review: 'I bought the roasted cashew and the flavor is amazing!',
        rating: 5,
      },
      {
        image: food,
        name: 'Chenda',
        location: 'Phnom Penh, Cambodia',
        review: 'I bought the roasted cashew and the flavor is amazing!',
        rating: 4,
      },
    ]

    const Principle = [
      {
        number: 1,
        detail:
          'Discover a curated collection of designs for every taste and lifestyle. Whether you prefer modern, classic, or eclectic styles,find the perfect pieces to suit your personality and elevate yourspace.',
        article: 'BROWSE OUR CURATED DESIGNS',
      },
      {
        number: 2,
        detail:
          'Two Discover a curated collection of designs for every taste and lifestyle. Whether you prefer modern, classic, or eclectic styles,find the perfect pieces to suit your personality and elevate yourspace.',
        article: 'Article Two',
      },
      {
        number: 3,
        detail:
          'Three Discover a curated collection of designs for every taste and lifestyle. Whether you prefer modern, classic, or eclectic styles,find the perfect pieces to suit your personality and elevate yourspace.',
        article: 'Article Three',
      },
      {
        number: 4,
        detail:
          'Four Discover a curated collection of designs for every taste and lifestyle. Whether you prefer modern, classic, or eclectic styles,find the perfect pieces to suit your personality and elevate yourspace.',
        article: 'Article Four',
      },
    ]

    const myCategories = [
      { name: 'Handicraft & Arts', image: categories },
      { name: 'Foods & Snacks', image: food ,route: "/shop/foods-snacks", },
      { name: 'Clothing & Accessories', image: Toy },
      { name: 'Beauty & Herbal Products', image: Handicraft, route: "/shop/beauty-home" },
      { name: 'Home & Decor', image: Handicraft },
      { name: 'Drinks & Coffee', image: Handicraft },
      { name: 'Gift Sets', image: Handicraft },
    ]

      const productList = [
        { img: krama, category: 'Handicrafts & Arts', title: 'Krama( khmer scraft )', price: 3, slug: 'krama' },
        { img: food, category: 'Foods & Snacks', title: 'Product 2', price: 12, slug: 'food-snack-2' },
        { img: palm_sugar_cam, category: 'Foods & Snacks', title: 'Palm Sugar', price: 12, slug: 'palm-sugar-cambodia' },
        { img: categories, category: 'Beauty & Herbal Products', title: 'Product 4', price: 12, slug: 'beauty-herbal-4' },
        { img: categories, category: 'Home & Decor', title: 'Product 5', price: 12, slug: 'home-decor-5' },
        { img: categories, category: 'Drinks & Decor', title: 'Product 6', price: 12, slug: 'drink-decor-6' },
        { img: categories, category: 'Gift Sets', title: 'Product 7', price: 12, slug: 'gift-set-7' },
        { img: categories, category: 'Handicrafts & Arts', title: 'Product 8', price: 12, slug: 'handicraft-art-8' },
        { img: food, category: 'Foods & Snacks', title: 'Product 9', price: 12, slug: 'food-snack-9' },
        { img: categories, category: 'Home & Decor', title: 'Product 10', price: 12, slug: 'home-decor-10' },
    ]
    return { myCategories, productList, Principle, testimonialData }
  },
})
</script>

<template>
  <!-- <div class="absolute inset-0 top-0 z-0 w-full h-screen"> -->
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
        class="w-6 h-6 ml-3 text-black transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white"
      />
    </button>
  </router-link>
  <div class="flex justify-between h-auto w-full p-4 py-8 text-gray-500 px-[7vw]">
    <div>///001</div>
    <div>/introduction</div>
  </div>

  <!-- about LocalCam -->
  <div
    class="w-full flex max-md:flex-col max-md:justify-center max-md:items-center px-[7vw] py-20 gap-x-[3vw] text-black transition-transform duration-300"
  >
    <div class="flex flex-col w-1/2 max-md:w-full max-md:items-center">
      <p class="font-['Condiment'] text-[5vw] max-lg:text-5xl font-bold">About LocalCam</p>
      <p class="text-[2vw] max-md:text-xl text-[#767064] italic md:hidden">
        YOUR ONE-STOP DESTINATION FOR ALL THINGS YOU NEEDS.
      </p>
      <img
        src="../assets/aboutImage.png"
        alt="Cat Image"
        class="object-cover w-full h-auto pt-18 rounded-2xl"
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
              class="w-6 h-6 ml-3 text-black transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white"
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
    <div
      class="text-[5vw] max-lg:text-5xl font-['Condiment'] font-extrabold flex justify-center items-center py-6"
    >
      Fresh Find Just In
    </div>
    <!-- <div class="flex flex-wrap justify-center w-full gap-6 p-10"> -->
    <div class="w-full px-[7vw]">
      <ProductScroll :products="productList" />
    </div>
  </div>

  <!-- feature in -->
  <div class="flex flex-col w-full my-20">
    <div
      class="text-[5vw] max-lg:text-5xl font-['Condiment'] font-extrabold flex justify-center items-center"
    >
      Featured In
    </div>
    <div class="text-base font-['Poppins'] font-light flex justify-center items-center">
      Handpicked pieces our customers can’t stop talking about.
    </div>
    <div class="w-full px-[7vw] pt-10">
      <img src="../assets/featureIn.png" alt="Feature In Image" class="obtain-cover" />
    </div>
    <div class="flex max-lg:flex-col w-full px-[7vw] py-6">
      <div class="w-1/2 max-lg:w-full">
        <p class="font-['Poppins'] text-3xl font-bold">HANDWOVEN CRAFTS</p>
        <p class="font-['Poppins'] text-3xl py-6">$2-$100</p>
        <p class="font-['Poppins'] text-base text-gray-500">
          This vibrant market display offers a wide selection of handcrafted rattan and bamboo
          goods, from decorative lanterns to practical storage baskets, perfect for adding an
          authentic, natural aesthetic to any home.
        </p>
      </div>
      <div class="flex flex-col justify-center w-1/2 px-6 pt-4 max-lg:w-full">
        <ul class="font-semibold list-disc">
          <li>Abundance of Handwoven Goods</li>
          <li>Cultural Market Setting</li>
          <li>Colorful Lanterns</li>
        </ul>
        <router-link to="/shop">
          <button
            class="group w-fit flex justify-center items-center bg-black hover:bg-white text-white font-semibold border border-[#806E53] rounded-lg px-6 py-3 text-lg hover:text-black transition duration-300 cursor-pointer max-[430px]:text-xs max-[430px]:px-4 max-[430px]:py-2 mt-6"
          >
            SHOP NOW
            <ArrowLongRightIcon
              alt="Go to exploration our products"
              class="w-6 h-6 ml-3 text-white transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black"
            />
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- work process -->
  <div class="w-full bg-[#F1EEE5] pb-20">
    <div class="flex justify-between h-auto w-full pt-14 text-gray-500 px-[7vw]">
      <div>///005</div>
      <div>/work process</div>
    </div>
    <div class="flex max-lg:flex-col w-full px-[7vw] pt-12">
      <div
        class="flex w-1/2 text-[5vw] max-lg:w-full max-lg:text-5xl font-['Condiment'] font-extrabold py-6 max-lg:mb-10 lg:items-center"
      >
        a seamless experience made for you
      </div>
      <div class="w-1/2 max-lg:w-full">
        <WorkProcess :priciple="Principle" />
      </div>
    </div>
  </div>

  <!-- testimonials -->
  <div class="w-full h-auto pb-20 px-[7vw]">
    <div class="flex justify-between w-full h-auto text-gray-500 pt-14">
      <div>///006</div>
      <div>/testimonials</div>
    </div>
    <div class="flex flex-col w-full pt-12">
      <div
        class="w-full text-[5vw] flex justify-center max-lg:w-full max-lg:text-5xl font-['Condiment'] font-extrabold py-6 pb-8"
      >
        What our customers say
      </div>
    </div>
    <div class="flex justify-center w-full">
      <TestimonialCard :testimonials="testimonialData" />
    </div>
  </div>

  <!-- our partner -->
  <div class="w-full bg-[#F1EEE5] px-[7vw] pb-20">
    <div class="flex justify-between h-auto w-full pt-14 text-gray-500 px-[7vw]">
      <div>///007</div>
      <div>/our partners</div>
    </div>
    <div
      class="w-full text-[5vw] flex justify-center max-lg:w-full max-lg:text-5xl font-['Condiment'] font-extrabold py-6 pb-8"
    >
      Trust by Hundreds
    </div>
    <div class="flex w-full">
      <div
        class="w-1/4 flex justify-center items-center gap-4 border-r-2 border-[#D5D5D2] max-lg:flex-col"
      >
        <img src="../assets/partner1 1.png" alt="confirel" class="w-[6vw]" />
        <div class="text-3xl max-lg:text-xl text-[#616161] font-['Poppins'] font-bold">
          confirel
        </div>
      </div>
      <div
        class="w-1/4 flex justify-center items-center gap-4 border-r-2 border-[#D5D5D2] max-lg:flex-col"
      >
        <img src="../assets/partner1 1.png" alt="confirel" class="w-[6vw]" />
        <div class="text-3xl max-lg:text-xl text-[#616161] font-['Poppins'] font-bold">
          confirel
        </div>
      </div>
      <div
        class="w-1/4 flex justify-center items-center gap-4 border-r-2 border-[#D5D5D2] max-lg:flex-col"
      >
        <img src="../assets/partner1 1.png" alt="confirel" class="w-[6vw]" />
        <div class="text-3xl max-lg:text-xl text-[#616161] font-['Poppins'] font-bold">
          confirel
        </div>
      </div>
      <div class="flex items-center justify-center w-1/4 gap-4 max-lg:flex-col">
        <img src="../assets/partner1 1.png" alt="confirel" class="w-[6vw]" />
        <div class="text-3xl max-lg:text-xl text-[#616161] font-['Poppins'] font-bold">
          confirel
        </div>
      </div>
    </div>
  </div>

  <!-- Background Image -->
  <img
    src="../assets/bgImage4.jpg"
    alt="Background Image"
    class="w-full h-[35vw] object-cover sticky top-0 z-0"
  />


  <div class="w-full bg-[#F1EEE5] pb-20 relative z-10">
    <div class="flex justify-between h-auto w-full pt-14 text-gray-500 px-[7vw]">
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
</template>
