const TOKEN = 'TOKEN'
export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: {
		// 收货地址
		address: uni.getStorageSync('address') || {},
		token: uni.getStorageSync(TOKEN)
	},

	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, payload) {
			state.address = payload
			uni.setStorageSync('address', payload)
		},
		updateToken(state, token) {
			state.token = token
			uni.setStorageSync(TOKEN, token)
		},
	},

	// 数据包装器
	getters: {
		// 收货详细地址的计算属性
		addStr(state) {
			if (!state.address.provinceName) return ''

			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	},
}