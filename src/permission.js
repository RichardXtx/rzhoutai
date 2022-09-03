import router from '@/router'

import store from '@/store'

// import { asyncRoutes } from '@/router'

// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const writeList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) { // 有token
    // 还要去登录页就直接跳转到首页，去别的页就放行
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      const res = Object.keys(store.state.user.userInfo)
      if (res.length <= 0) {
        store.dispatch('user/getUserInfo').then(async res => {
          // 1 在这里可以拿到用户的权限
          // 2 拿到权限之后，可以动态新增路由
          // addRoutes 可以在 router 对象上新增路由
          // 动态添加的路由 this.$router.options.routes 失取不到的
          // addRoutes 是异步的,不会阻碍后面代码的执行

          const { roles: { menus }} = res

          const otherRoutes = await store.dispatch('permission/filterRoutes', menus)

          router.addRoutes(otherRoutes)
          // 为了让用户看到对应的导航， 让用户重新再进一次页面
          next({
            ...to,
            replace: true
          })
        })
      } else {
        next()
      }
    }
  } else { // 没有token
    // 看看是否在白名单中，如果在就放行，不在就跳转到登录页
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(_ => {
  NProgress.done()
})
