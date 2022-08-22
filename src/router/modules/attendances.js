import Layout from '@/layout'
export default { // 考勤

  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: _ => import('@/views/attendances/index'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
