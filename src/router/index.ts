import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    /* =====================
     * Home
     * ===================== */
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },

    /* =====================
     * Shop (ALL + Category by Slug)
     * ===================== */
   {
      path: "/shop",
      name: "Shop",
      component: () => import("../views/ShopPageview.vue"), // Ensure this filename matches your file
      children: [
        {
          path: "", // URL: /shop
          name: "AllProducts",
          component: () => import("../views/nestviews/AllProductsComponent.vue"),
        },
        {
          path: "foods-snacks", // URL: /shop/foods-snacks
          name: "FoodsSnacks",
          component: () => import("../views/nestviews/FoodSnacksComponents.vue"),
        },
        {
          path: "instruments", // URL: /shop/instruments
          name: "Instruments",
          component: () => import("../views/nestviews/IntrumentsComponent.vue"),
        },
        {
          path: "beauty-home", // URL: /shop/beauty-home
          name: "BeautyHome",
          component: () => import("../views/nestviews/BeautyHomeComponent.vue"),
        },
        {
          path: "delta-outline", // URL: /shop/delta-outline
          name: "DeltaOutline",
          component: () => import("../views/nestviews/DeltaOutlineComponent.vue"),
        },
      ],
    },
    /* =====================
     * Product Detail (Dynamic)
     * ===================== */
    {
      path: "/products/:slug",
      name: "ProductDetail",
      component: () => import("../views/ProductDetail.vue"),
      props: true,
    },

    /* =====================
     * Static Pages
     * ===================== */
    {
      path: "/contact-us",
      name: "ContactUs",
      component: () => import("../views/ContactUsView.vue"),
    },
    {
      path: "/about",
      name: "AboutUs",
      component: () => import("../views/AboutView.vue"),
    },

    /* =====================
     * Auth
     * ===================== */
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("../views/ForgotPassView.vue"),
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: () => import("../views/ResetPassView.vue"),
    },

    /* =====================
     * 404
     * ===================== */
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
