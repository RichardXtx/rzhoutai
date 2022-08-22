import Layout from '@/layout'
export default { // 审批

  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: _ => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
