import Vue from 'vue'
import VueRouter from 'vue-router'
// 文件名为index 可以简写 只写到父文件夹即可
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'
import SearchList from '@/views/search/list.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来时哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置守卫
// to：到哪里去，到哪里去的完整路由信息对象（路径、参数）
// from：从哪里来，到那里去的完整路由信息对象（路径、参数）
// next()：
// (1) next() 直接放行到to
// (2) next(路径) 拦截到 路径 位置

// 定义数组 存放 需要权限 访问的页面
const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // next()
  if (!authUrl.includes(to.path)) {
    // 非权限页面直接放行
    return next()
  }

  // 能走到这说明是权限页面 需要判断tokens
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
