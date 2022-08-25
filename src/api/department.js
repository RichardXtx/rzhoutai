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

/**
 * 删除部门
 * @param {*} id 删除部门所需 id
 * @returns
 */
export const delDepartmentApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 获取下拉列表数据
 * @param {*} data
 * @returns
 */
export const getDepartmentEasyListApi = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * 修改部门详情
 * @param {*} id
 * @returns
 */
export const editDepartmentApi = id => {
  return request({
    url: `/company/department/${id}`
  })
}
