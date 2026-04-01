import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import workOrder from './modules/repair'
import fee from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, workOrder, fee },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})