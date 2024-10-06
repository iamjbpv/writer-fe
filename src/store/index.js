import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    auth: {
      token: null,
      user: null
    }
  },
  mutations: {
    setAuth(state, authData) {
      state.auth.token = authData.token
      state.auth.user = authData.user
    },
    clearAuth(state) {
      state.auth.token = null
      state.auth.user = null
    }
  },
  actions: {
    login({ commit }, authData) {
      commit('setAuth', authData)
    },
    logout({ commit }) {
      commit('clearAuth')
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.auth.token
    },
    getUser(state) {
      return state.auth.user
    }
  },
  plugins: [createPersistedState()]
})

export default store
