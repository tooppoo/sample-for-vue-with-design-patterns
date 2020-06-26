import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { OnMemoryCartItemListRepository } from './views/cart/repository/on-memory'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/state-pattern',
      name: 'state',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/todo/TodoList.vue')
    },
    {
      path: '/notification-pattern',
      name: 'notification',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/error/ErrorJob.vue')
    },
    {
      path: '/first-class-collection-pattern',
      name: 'first-class-collection',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/cart/Cart.vue'),
      props: () => ({
        repository: new OnMemoryCartItemListRepository()
      })
    },
    {
      path: '/strategy-pattern',
      name: 'strategy',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/button-behavior/View.vue')
    }

  ]
})
