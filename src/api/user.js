import request from '@/utils/request'

/**
 *
 * @param {*} data 登录所需要的的参数
 * @returns
 */
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
