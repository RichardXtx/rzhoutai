import Layout from '@/layout'
export default { // 员工

  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: _ => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      hidden: true,
      component: _ => import('@/views/employees/detail')
      // meta: { title: '员工详情', icon: 'people' }
    }
  ]
}
