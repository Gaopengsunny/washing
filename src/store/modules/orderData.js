export default {
  namespaced: true,
    state: {
      orderDetail:{}
    },
    mutations: {
      setOrderInfo(state, data) {
        state.orderDetail = data
      }
    },
    actions: {}
  }
  