import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../supabase' // 1. Import your supabase client

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/shop',
      name: 'Shop',
      component: () => import('../views/ShopPageview.vue'),
      children: [
        {
          path: '',
          name: 'AllProducts',
          component: () => import('../views/nestviews/AllProductsComponent.vue'),
        },
        {
          path: 'foods-snacks',
          name: 'FoodsSnacks',
          component: () => import('../views/nestviews/FoodSnacksComponents.vue'),
        },
        {
          path: 'instruments',
          name: 'Instruments',
          component: () => import('../views/nestviews/IntrumentsComponent.vue'),
        },
        {
          path: 'beauty-home',
          name: 'BeautyHome',
          component: () => import('../views/nestviews/BeautyHomeComponent.vue'),
        },
        {
          path: 'delta-outline',
          name: 'DeltaOutline',
          component: () => import('../views/nestviews/DeltaOutlineComponent.vue'),
        },
      ],
    },
    {
      path: '/products/:slug',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true,
    },
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
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { hideNav: true, hideFooter: true },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
      meta: { hideNav: true, hideFooter: true },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPassView.vue'),
      meta: { hideNav: true, hideFooter: true },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
    },
    /* =====================
     * admin routes (PROTECTED)
     * ===================== */
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/admin/AdminView.vue'),
      // 2. Add metadata to protect this route
      meta: { requiresAdmin: true, hideNav: true, hideFooter: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

/* =====================
 * Navigation Guard
 * ===================== */
// 3. This runs before every page change
router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAdmin) {
    // If not logged in at all
    if (!session) {
      return next('/login')
    }

    // Check the 'profiles' table for the 'admin' role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile && profile.role === 'admin') {
      next() // Access granted
    } else {
      alert('Access Denied: Admins Only')
      next('/') // Kick back to home
    }
  } else {
    // Not an admin route? Just let them go.
    next()
  }
})

export default router
