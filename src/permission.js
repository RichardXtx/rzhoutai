import router from '@/router'

import store from '@/store'

const writeList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (token) { // 有token
    // 还要去登录页就直接跳转到首页，去别的页就放行
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else { // 没有token
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
