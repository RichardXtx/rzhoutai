
import { constantRoutes } from '@/router'
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
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
