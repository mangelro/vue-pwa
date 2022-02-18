import { createRouter, createWebHistory } from 'vue-router'

import registro from '../modules/firmas/router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/users',
  //   name: 'Users',
  //   component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  // },
  {
    path:'/registro',
    ...registro
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
