export default {
  // 开启命名空间
  namespaced: true,

  // 数据：用户信息、token
  state: {
    token: '',
    userInfo: {}
  },

  // 计算属性
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo
  },

  // 同步修改数据
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR_USER(state) {
      state.token = ''
      state.userInfo = {}
    }
  },

  // 异步操作
  actions: {
    // 登录
    login({ commit }, userInfo) {
      const token = 'mock-token-' + Date.now()
      commit('SET_TOKEN', token)
      commit('SET_USER_INFO', userInfo)
      return Promise.resolve(token)
    },

    // 退出登录
    logout({ commit }) {
      commit('CLEAR_USER')
      return Promise.resolve()
    }
  }
}