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

/**
 * 用户信息
 * @returns
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取用户基本信息
 * @param {*} id 用户ID
 * @returns
 */
export function userInfoApi(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
