import pageTools from './PageTools'

import UploadExcel from './UploadExcel'

import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import Lang from './Lang'
export default {
  install(Vue) {
    Vue.component('PageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
    Vue.component('Lang', Lang)
  }
}

