export default {
	namespaced: true,
	state: {
		carts: []
	},
	mutations: {
		add(state, good) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.carts.find((item) => item.goods_id === good.goods_id)

			if (!findResult) {
				// 如果购物车中没有这件商品，则直接 push
				state.carts.push(good)
			} else {
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count++
			}
		}
	}
}