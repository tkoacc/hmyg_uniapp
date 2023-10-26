import fly from '../utils/flyio.js'

export const loadGoodsList = (data) => fly.get('/goods/search', data)

export const loadGoodsDetail = (id) => fly.get('/goods/detail', {
	goods_id: id
})