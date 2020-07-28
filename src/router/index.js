import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import goodsRouter from "./module/goods";
import userRouter from "./module/user";
import sxyRouter from "./module/sxy";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: 'Test'
    },
    component: () => import( /* webpackChunkName: "Test" */ '../views/Test.vue')
  },
  ...goodsRouter,
  ...userRouter,
  ...sxyRouter,

  {
    path: '/500',
    name: 'Error',
    meta: {
      title: 'Error'
    },
    component: () => import( /* webpackChunkName: "Error" */ '../views/Error.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    meta: {
      title: 'Not Found'
    },
    component: () => import( /* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
    // redirect:'/not-found'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
