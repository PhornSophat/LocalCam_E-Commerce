<script lang="ts">
export default {

}
</script>

<template>
  <div class="login-view w-full h-screen bg-[#F1EEE5]">
    <div class="w-full h-screen flex flex-col">
      <header class="flex items-center justify-center bg-white h-25 shadow-md">
        <img src="/src/assets/black-weblogo.png" alt="logo" class="w-20"/>
        <h1 class="text-4xl font-bold">LocalCam</h1>
      </header>
      <div class="main w-full h-screen bg-[#F1EEE5] flex justify-center items-center">
        <div class="login-form flex justify-center items-center mt-20 mb-20">
          <div class="left w-125 h-150 bg-white items-center justify-center flex flex-col gap-10 p-10">
            <img src="/src/assets/whitelogoWeb.png" alt="logo" class="w-30"/>
            <h1 class="text-5xl/15 text-center ">Welcome Back <br> To <br><span class="text-8xl/30">LocalCam</span></h1>
          </div>
          <div class="right w-125 h-150 bg-white  p-10 flex flex-col">
            <h1 class="text-2xl">Sign In</h1>
            <p>Enter your credentials to access your account</p>
            <form action="#">
              <div class="input-group text-sm flex flex-col">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="yourname@gmail.com" required />
              </div>
              <div class="input-group text-sm flex flex-col">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
              </div>
              <div class="input-group text-sm flex justify-between items-center">
                <div class="flex gap-3">
                  <input type="checkbox" id="remember" name="remember" />
                  <label for="remember">Remember Me</label>
                </div>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" class="submit-button text-sm">Sign In</button>
            </form>
            <p class="text-sm">or continue with</p>
            <div class="social-login flex gap-10 text-sm">
              <button class="google-login">Google</button>
              <button class="facebook-login">Facebook</button>
            </div>
            <p class="text-sm">Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </div>
      </div>
      <footer class="footer mt-auto w-full">
        <div class="footer-content bg-[#767064] h-20 flex items-center justify-evenly text-white">
          <div>
            <p>&copy; 2024 LocalCam. All rights reserved.</p>
          </div>
          <div class="flex justify-evenly gap-10">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Contact Us</p>
          </div>
        </div>

      </footer>
    </div>
  </div>
</template>
