import router from '@/router'

import store from '@/store'

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
        store.dispatch('user/getUserInfo').then(_ => {
          next()
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
