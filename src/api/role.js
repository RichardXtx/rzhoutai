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
