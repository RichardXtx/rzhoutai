import request from '@/utils/request'

/**
 * 获取下拉时候 员工简单列表
 * @param {*} _
 * @returns
 */
export const getUserEasyListApi = _ => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工数据
 * @param {*} page
 * @param {*} size
 */
export const getUserROleListApi = (page, size) => {
  return request({
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}

/**
 * 删除id
 * @param {*} id
 * @returns
 */
export const delEmployeesApi = id => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 添加员工
 * @param {*} form
 * @returns
 */
export const addEmployeesApi = form => {
  return request({
    url: '/sys/user',
    method: 'post',
    data: form
  })
}

/**
 * 批量导入
 * @param {*} list
 * @returns
 */
export const bachEmployeesApi = list => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: list
  })
}
