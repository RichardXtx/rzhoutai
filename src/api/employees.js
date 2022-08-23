import request from '@/utils/request'

export const getUserEasyListApi = _ => {
  return request({
    url: '/sys/user/simple'
  })
}
