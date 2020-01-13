import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const constantRoutes = [
  {
    path: '/',
    redirect: '/table'
  },
  {
    path: '/my-table',
    name: 'my-table',
    component: () => import(/* webpackChunkName: "router" */'@/view/table-render.vue')
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import(/* webpackChunkName: "router" */'@/view/Slot.vue')
  },
  {
    path: '/VirtualList',
    name: 'VirtualList',
    component: () => import(/* webpackChunkName: "router" */'@/view/VirtualList.vue')
  }, {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "router" */'@/view/table.vue')
  }, {
    path: '/myInput',
    name: 'myInput',
    component: () => import(/* webpackChunkName: "router" */'@/view/myInput.vue')
  }, {
    path: '/alert',
    name: 'alert',
    component: () => import(/* webpackChunkName: "router" */'@/view/alert.vue')
  }, {
    path: '/magnifier',
    name: 'magnifier',
    component: () => import(/* webpackChunkName: "router" */'@/view/magnifier/magnifier.vue')
  }
]

// 针对vue-router3.1.x版本点击重复路由时。控制台会报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  base: 'vue1',
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
