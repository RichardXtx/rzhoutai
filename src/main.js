import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import request from '@/utils/request'

// 引入自定义指令
// import { imgerror, color } from '@/directives'

// 批量注册
import * as directives from '@/directives'
import * as filters from '@/filters' // 过滤器

// import PageTools from '@/components/PageTools'

import company from '@/components'
Vue.use(company)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import Print from 'vue-print-nb'
Vue.use(Print)
import i18n from '@/lang'
// 配置ElementUI的中英切换逻辑
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.prototype.$request = request

// 第一种方式：批量注册
// for (const key in directives) {
//   Vue.directive(key, directives[key])
// }

// 第二种方式：批量注册
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
