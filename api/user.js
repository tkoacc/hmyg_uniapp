import fly from '../utils/flyio.js'

export function login(data) {
	return fly.post('/user/wxlogin', data)
}

export function createOrderApi(data) {
	return fly.post('/my/orders/create', data)
}

export function loadPayParams(order_number) {
	return fly.post('/my/orders/req_unifiedorder', {
		order_number
	})
}