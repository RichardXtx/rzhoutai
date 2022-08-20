import { loginApi, getUserInfoApi, userInfoApi } from '@/api/user'
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
    // login(context, data) {
    //   return new Promise((resolve, reject) => {
    //     loginApi(data).then(res => {
    //     //   console.log(res)
    //       const token = res.data
    //       context.commit('setToken', token)
    //       resolve(res)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    async login({ commit }, data) {
      const res = await loginApi(data)
      const token = res.data
      commit('setToken', token)
      return res
    },
    // getUserInfo(context) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfoApi().then(res => {
    //       console.log(res)
    //       const { data } = res
    //       // let data=res.data
    //       context.commit('setUserInfo', data)
    //       resolve(res)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
    async getUserInfo({ commit }) {
      const { data } = await getUserInfoApi()
      const { data: data2 } = await userInfoApi(data.userId)
      // console.log(data2)
      const baseData = {
        ...data,
        ...data2
      }
      commit('setUserInfo', baseData)
      return baseData
    }

  },
  getters: {}

}

export default obj
