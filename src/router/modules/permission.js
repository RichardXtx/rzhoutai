import Layout from '@/layout'
export default { // 权限管理

  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permissions',
      component: _ => import('@/views/permission/index'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
