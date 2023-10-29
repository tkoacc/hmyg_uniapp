let Fly = require('flyio/dist/npm/wx')
let fly = new Fly()

fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截器
fly.interceptors.request.use((config) => {
	if (uni.getStorageSync('TOKEN')) {
		config.headers.Authorization = uni.getStorageSync('TOKEN')
	}
})

export default fly