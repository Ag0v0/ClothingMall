import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const state = {
  cartList: []
}

 const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
})

export default store