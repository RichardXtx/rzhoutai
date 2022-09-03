import { loginApi, getUserInfoApi, userInfoApi } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
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
    },
    clearToken(state) { // 清token
      state.token = ''
      removeToken()
    },
    clearUserInfo(state) {
      state.userInfo = {}
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
      // data2.staffPhoto = '51'
      const baseData = {
        ...data,
        ...data2
      }
      commit('setUserInfo', baseData)
      return baseData
    },
    logout({ commit }) { // 退出
      commit('clearToken') // 清除用户 token
      commit('clearUserInfo') // 清除 用户信息
      resetRouter() // 重置路由表单
      commit('permission/setRoutes', [], { root: true }) // 清除vuex 中的路由表
    }

  },
  getters: {}

}

export default obj
