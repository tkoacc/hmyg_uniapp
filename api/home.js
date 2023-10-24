// 维护首页的所有请求
import fly from '../utils/flyio.js'

export function loadSwipers() {
	fly.get('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata')
}