import pageTools from './PageTools'

import UploadExcel from './UploadExcel'

export default {
  install(Vue) {
    Vue.component('PageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}

