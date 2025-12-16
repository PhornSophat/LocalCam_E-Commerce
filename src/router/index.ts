import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home Page
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // Shop Page + Nested Routes
    {
      path: '/shop',
      name: 'ShopPageView',
      component: () => import('../views/ShopView.vue'),
      // children: [
      //   {
      //     path: '',
      //     name: 'all-products',
      //     component: () =>
      //       import('../views/nestviews/AllProductsComponent.vue'),
      //   },
      //   {
      //     path: 'foods-snacks',
      //     name: 'foods-snacks',
      //     component: () =>
      //       import('../views/nestviews/FoodSnacksComponents.vue'),
      //   },
      //   {
      //     path: 'instruments',
      //     name: 'instruments',
      //     component: () =>
      //       import('../views/nestviews/IntrumentsComponent.vue'),
      //   },
      //   {
      //     path: 'delta-outline',
      //     name: 'delta',
      //     component: () =>
      //       import('../views/nestviews/DeltaOutlineComponent.vue'),
      //   },
      //   {
      //     path: 'beauty-home',
      //     name: 'beauty-home',
      //     component: () =>
      //       import('../views/nestviews/BeautyHomeComponent.vue'),
      //   },
      // ],
    },

    // Product detail page (kept from merged version)
    {
      path: '/product_detail',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue'),
    },

    // Contact us
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../views/ContactUsView.vue'),
    },

    {
      path: '/about',
      name: 'AboutUs',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
