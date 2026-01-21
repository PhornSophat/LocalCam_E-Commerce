import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../supabase' // 1. Import your supabase client

// Cache to avoid repeated session checks
let cachedSession: any = null
let cacheExpiry = 0

async function getCachedSession() {
  const now = Date.now()
  // Use cached session if less than 30 seconds old
  if (cachedSession !== null && cacheExpiry > now) {
    return cachedSession
  }

  try {
    const sessionPromise = supabase.auth.getSession()
    const timeoutPromise = new Promise(
      (_, reject) => setTimeout(() => reject(new Error('timeout')), 500), // Reduced to 500ms
    )

    const result = await Promise.race([sessionPromise, timeoutPromise])
    cachedSession = result?.data?.session || null
    cacheExpiry = now + 30000 // Cache for 30 seconds
    return cachedSession
  } catch (err) {
    // Timeout or error; return null silently (don't spam console)
    cachedSession = null
    cacheExpiry = now + 5000 // Retry after 5 seconds
    return null
  }
}

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
          path: 'souvenirs',
          name: 'Souvenirs',
          component: () => import('../views/nestviews/SouvenirComponent.vue'),
        },
        {
          path: 'clothing_and_textiles',
          name: 'ClothingAndTextiles',
          component: () => import('../views/nestviews/Clothing_and _Textiles.vue'),
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
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/UserProfileView.vue'),
      meta: { requiresAuth: true, hideNav: false, hideFooter: false },
    },
    /* =====================
     * admin routes (PROTECTED)
     * ===================== */
    {
      path: '/admin',
      meta: { requiresAdmin: true, hideNav: true, hideFooter: false },
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('../views/admin/AdminUsers.vue'),
        },
      ],
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
  try {
    // Skip auth checks entirely for public routes (fast path)
    if (!to.meta.requiresAuth && !to.meta.requiresAdmin) {
      return next()
    }

    // Only check session for protected routes
    const session = await getCachedSession()

    // Check if route requires authentication
    if (to.meta.requiresAuth) {
      if (!session) {
        return next(`/login?redirect=${to.path}`)
      }
      return next()
    } else if (to.meta.requiresAdmin) {
      // If not logged in at all
      if (!session) {
        return next('/login')
      }

      // Check the 'profiles' table for the 'admin' role (with timeout)
      try {
        const profilePromise = supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        const profileTimeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 1000),
        )

        const profileResult = await Promise.race([profilePromise, profileTimeoutPromise])
        const profile = profileResult?.data

        if (profile && profile.role === 'admin') {
          return next() // Access granted
        } else {
          alert('Access Denied: Admins Only')
          return next('/') // Kick back to home
        }
      } catch (err) {
        // Profile check failed/timeout; deny access as a safe default
        alert('Access Denied: Unable to verify admin status')
        return next('/')
      }
    }
  } catch (err) {
    // Unexpected error; log and allow navigation to not block the user
    console.error('Router guard unexpected error:', err)
    next()
  }
})

export default router
