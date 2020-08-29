export default {
  namespaced: true,
  state: {
    // 是否开启适配 iPhone X 等手机型号
    isFullSucreen: false,
	cityData:[]
  },
  mutations: {
    setFullSucreen(state, data) {
      state.isFullSucreen = data
    },
	setCityData(state, data) {
		state.cityData = data
	}
  },
  actions: {}
}
