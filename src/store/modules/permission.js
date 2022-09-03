
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}

const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [
      ...constantRoutes,
      ...otherRoutes,

      // 可加可不加
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

const actions = {
  async filterRoutes({ commit }, menus) {
    const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    // console.log(o);
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
