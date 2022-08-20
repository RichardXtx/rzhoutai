import { loginApi, getUserInfoApi } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

const obj = {
  namespaced: true,
  state() {
    return {
      token: getToken() || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, newToken) { // 获取用户token
      state.token = newToken
      setToken(newToken)
    },
    setUserInfo(state, newGetUserInfo) { // 获取用户信息
      state.userInfo = newGetUserInfo
    }
  },
  actions: {
    login(context, data) {
      return new Promise((resolve, reject) => {
        loginApi(data).then(res => {
        //   console.log(res)
          const token = res.data
          context.commit('setToken', token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo(context) {
      getUserInfoApi().then(res => {
        console.log(res)
        const { data } = res
        // let data=res.data
        context.commit('setUserInfo', data)
      })
    }
  },
  getters: {}

}

export default obj
