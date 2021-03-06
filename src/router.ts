import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { OnMemoryCartItemListRepository } from './views/cart/model/repository/on-memory'
import { FromApiCartItemListRepository } from './views/cart/model/repository/from-api'
import { OnMemoryTodoRepository } from './views/todo/model/repository/on-memory'
import { FromApiTodoRepository } from './views/todo/model/repository/from-api'

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
      path: '/state-pattern/on-memory',
      name: 'state-on-memory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/todo/view/TodoList.vue'),
      props: () => ({
        repository: new OnMemoryTodoRepository()
      })
    },
    {
      path: '/state-pattern/from-api',
      name: 'state-from-api',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/todo/view/TodoList.vue'),
      props: () => ({
        repository: new FromApiTodoRepository()
      })
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
      path: '/first-class-collection-pattern/on-memory',
      name: 'first-class-collection-on-memory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/cart/view/Cart.vue'),
      props: () => ({
        repository: new OnMemoryCartItemListRepository()
      })
    },
    {
      path: '/first-class-collection-pattern/from-api',
      name: 'first-class-collection-on-memory/from-api',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/cart/view/Cart.vue'),
      props: () => ({
        repository: new FromApiCartItemListRepository()
      })
    },
    {
      path: '/first-class-collection-pattern/composition-api',
      name: 'first-class-collection-on-memory/composition-api',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/cart/view/CartByCompositionApi.vue'),
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
      component: () => import(/* webpackChunkName: "about" */ './views/button-behavior/view/View.vue')
    }

  ]
})
