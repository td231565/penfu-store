import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeId: ''
  },
  mutations: {
    setStoreId(state, payload) {
      state.storeId = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
