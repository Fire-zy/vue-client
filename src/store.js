import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  STATUS: 'STATUS'
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {},   // 存储用户信息
  status: ''//用户角色
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  status: state => state.status
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  [types.STATUS](state, status) {
    if (status)
      state.status = status
    else
      state.status = ''
  },
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setStatus: ({ commit }, status) => {
    commit(types.STATUS, status)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
