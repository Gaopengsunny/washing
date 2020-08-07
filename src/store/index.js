import Vue from 'vue'
import Vuex from 'vuex'

import publicData from './modules/publicData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    publicData
  }
})
