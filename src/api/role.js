import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {*} page 当前页
 * @param {*} pagesize 每页可以显示多少条数据
 * @returns
 */
export const getAllroleListApi = (page, pagesize) => {
  return request({
    url: `/sys/role`,
    params: {
      page,
      pagesize
    }
  })
}

/**
 * 删除角色
 * @param {*} id 删除角色所需id
 * @returns
 */
export const delRoleListApi = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 添加角色
 * @param {*} data 添加角色所需数据
 * @returns
 */
export const addRoleListApi = data => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 获取员工详情
 * @param {*} id
 * @returns
 */
export const getRoleApi = id => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 编辑角色
 * @param {*} data
 * @returns
 */
export const editRoleApi = data => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
