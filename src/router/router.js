import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const constantRoutes = [
  {
    path: '/',
    redirect: '/my-table'
  },
  {
    path: '/my-table',
    name: 'my-table',
    component: () => import(/* webpackChunkName: "router" */'@/view/table/table-render')
  },
  {
    path: '/component',
    name: 'component',
    component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/index'),
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/table')
      },
      {
        path: 'virtualList',
        name: 'virtualList',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/virtualList')
      },
      {
        path: 'slot',
        name: 'slot',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/slot')
      }, {
        path: 'drag',
        name: 'drag',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/drag')
      }, {
        path: 'alert',
        name: 'alert',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/alert')
      }, {
        path: 'magnifier',
        name: 'magnifier',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/magnifier')
      }, {
        path: 'datePicker',
        name: 'datePicker',
        component: () => import(/* webpackChunkName: "router" */'@/view/myComponent/components/datePicker')
      }
    ]
  }
]

// 针对vue-router3.1.x版本点击重复路由时。控制台会报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'hash',
  // base: '/vue1',
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
