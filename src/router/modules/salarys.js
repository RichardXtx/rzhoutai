import Layout from '@/layout'
export default { // 工资

  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys',
      component: _ => import('@/views/salarys/index'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
