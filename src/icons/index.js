import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 作用: 批量导入 svg 文件夹下所有svg图标到项目中
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
