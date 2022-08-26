// 公司请求页
import request from '@/utils/request'

/**
 * 根据 id 请求公司详情
 * @param {*} id
 * @returns
 */
export const getCompanyApi = id => {
  return request({
    url: `/company/${id}`
  })
}
