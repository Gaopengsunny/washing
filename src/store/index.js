import Vue from 'vue'
import Vuex from 'vuex'

import publicData from './modules/publicData'
import orderData from './modules/orderData'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    publicData,
    orderData
  }
})
