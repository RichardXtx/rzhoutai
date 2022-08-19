import { loginApi } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

const obj = {
  namespaced: true,
  state() {
    return {
      token: getToken() || ''
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
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
    }
  },
  getters: {}

}

export default obj
