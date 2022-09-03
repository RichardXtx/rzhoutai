
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}

const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [
      ...constantRoutes,
      ...otherRoutes
    ]
  }
}

const actions = {
  async filterRoutes({ commit }, menus) {
    const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    commit('setRoutes', otherRoutes)
    return otherRoutes
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
