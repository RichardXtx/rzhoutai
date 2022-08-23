import request from '@/utils/request'

/**
 * 查询企业组织架构列表
 * @returns
 */
export function getDepartmentApi() {
  return request({
    url: '/company/department'
  })
}
