import axios from 'axios'

import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
// Do something before request is sent
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
// Do something before response is sent
  // console.log(response)
  if (!response.data.success) {
    Message.error(response.data.message)
    return Promise.reject(new Error(response.data.message))
  }
  return response.data
}, error => {
// Do something with response error
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
