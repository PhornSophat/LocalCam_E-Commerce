import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/product_detail',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../views/ContactUsView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPass',
      component: () => import('../views/ForgotPassView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ],
})

export default router
