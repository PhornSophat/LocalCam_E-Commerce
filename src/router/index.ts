import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { routes } from 'vue-router/auto-routes'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
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
       name: 'instruments',
       component: () => import('../views/nestviews/AllProductsComponent.vue'),
    } ,
      //   {
      //  path: '/foods-snacks',
      //  name: 'foods-snacks',
      //  component: () => import('../views/nestviews/FoodSnacksComponents.vue'),
      //   },
      //   {
      //  path: '/instruments',
      //  name: 'instruments',
      //  component: () => import('../views/nestviews/IntrumentsComponent.vue'),
      //   },
      ],
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../views/ContactUsView.vue'),
    },
  ],
})


