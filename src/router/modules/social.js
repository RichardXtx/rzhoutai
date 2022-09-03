import Layout from '@/layout'
export default { // 社保

  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social_securitys',
      component: _ => import('@/views/social/index'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
