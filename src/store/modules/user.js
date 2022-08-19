import { loginApi } from '@/api/user'
const obj = {
  namespaced: true,
  state() {
    return {
      token: ''
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
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
