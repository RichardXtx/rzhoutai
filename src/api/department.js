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
 * 获取部门详情
 * @param {*} id
 * @returns
 */
export const geteditDepartmentApi = id => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 编辑部门
 * @param {*} form
 * @returns
 */
export const editDepartmentApi = form => {
  return request({
    url: `/company/department/${form.id}`,
    method: 'put',
    data: form

  })
}
