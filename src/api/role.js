import request from '@/utils/request'

/**
 * 获取所有角色劣列表
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
