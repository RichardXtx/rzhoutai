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
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    setUserInfo(state, newGetUserInfo) {
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
        context.commit('setUserInfo', data)
      })
    }
  },
  getters: {}

}

export default obj
