import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import( /* webpackChunkName: "Success" */ '../views/Success.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "Test" */ '../views/Test.vue')
  },
  {
    path: '/ad/suim',
    name: 'SuiMing',
    component: () => import( /* webpackChunkName: "SuiMing" */ '../views/ad/SuiMing.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
