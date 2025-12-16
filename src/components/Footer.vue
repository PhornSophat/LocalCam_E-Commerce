<template>
  <div class="w-full px-[7vw] bg-[#767064] relative z-10 pt-20">
    <div class="flex w-full justify-between max-lg:flex-col max-lg:justify-center">
        <div class="w-5/6 max-lg:w-full max-lg:flex-col max-lg:justify-center ">
            <p class="font-['Poppins'] font-medium text-4xl text-white">Subscribe for member-only discounts, cultural inspiration, and early updates on new local goods.</p>
            <div class="w-1/2 max-lg:w-full py-12">
                <EmailInput />
            </div>
        </div>
        <div class="flex w-2/6 max-lg:w-full max-lg:text-center  justify-center lg:justify-end  text-xl text-white ">
            <ul class="leading-9">
                <router-link to="/shop">
                    <li>HOME</li>
                </router-link>
                <router-link to="/shop">
                    <li>ABOUT US</li>
                </router-link>
                <router-link to="/shop">
                    <li>SHOP ALL</li>
                </router-link>
                <router-link to="/shop">
                    <li>CONTACT US</li>
                </router-link>
                <router-link to="/shop">
                    <li>FAQs</li>
                </router-link>
            </ul>
        </div>
    </div>
    <div class="w-full font-extrabold text-[16vw] flex justify-center items-center text-white border-b-2 border-[#A6A6A6]">
        LOCALCAM
    </div>
    <div class="w-full flex justify-center items-center text-white border-b-2 border-[#A6A6A6] py-3">
        <ul class="flex w-full text-xl font-['Poppins'] justify-around ">
            <li>
                <a href="https://www.facebook.com/mandixzzzzz" target="_blank">INSTAGRAM</a>
            </li>
            <li>
                <a href="https://www.facebook.com/mandixzzzzz" target="_blank">FACEBOOK</a>
            </li>
            <li>
                <a href="https://www.facebook.com/mandixzzzzz" target="_blank">TIK_TOK</a>
            </li>
            <li>
                <a href="https://t.me/YourTelegramUsername" target="_blank">TELEGRAM</a>
            </li>
        </ul>
    </div>
    <div class="w-full flex justify-center items-center text-white border-b-2 border-[#A6A6A6] py-3">
        <p>2025 LocalCam. All rights Reserved</p>
    </div>
  </div>
</template>

<script>
import EmailInput from '../components/EmailInput.vue';

export default {
    name: "Footer",

    components: {
        EmailInput,
    }
}
</script>

<style>

</style>