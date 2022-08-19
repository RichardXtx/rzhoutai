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
      loginApi(data).then(res => {
        console.log(res)
        const token = res.data.data
        context.commit('setToken', token)
      })
    }
  },
  getters: {}

}

export default obj
