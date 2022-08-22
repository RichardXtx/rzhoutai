import Layout from '@/layout'
export default { // 公司设置

  path: '/setting',
  component: Layout,
  children: [
    {
      path: '',
      name: 'setting',
      component: _ => import('@/views/setting/index'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
