import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shop',
      name: 'ShopPageView',
      component: () => import('../views/ShopPageview.vue'),
      children: [
        {
       path: '',
       name: 'all-products',
       component: () => import('../views/nestviews/AllProductsComponent.vue'),
    } ,
        {
       path: 'foods-snacks',
       name: 'foods-snacks',
       component: () => import('../views/nestviews/FoodSnacksComponents.vue'),
        },
        {
       path: 'instruments',
       name: 'instruments',
       component: () => import('../views/nestviews/IntrumentsComponent.vue'),
        },
        {
          path : 'delta-outline' ,
          name : 'delta' ,
          component : () => import('../views/nestviews/DeltaOutlineComponent.vue') ,
        },
        {
          path : 'beauty-home' ,
          name : 'beauty-home' ,
          component : () => import('../views/nestviews/BeautyHomeComponent.vue') ,
        }

      ],
=======
      path: '/product_detail',               // default route
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue')
>>>>>>> 61b269ea6d99857f0a950a122efdd795bd32dd52
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../views/ContactUsView.vue'),
    },
<<<<<<< HEAD



      ],

=======
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ],
>>>>>>> 61b269ea6d99857f0a950a122efdd795bd32dd52
})

export default router
