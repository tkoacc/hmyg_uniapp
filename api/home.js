// 维护首页的所有请求
import fly from '../utils/flyio.js'
// 轮播图
export const loadSwipers = () => fly.get('/home/swiperdata')
// 首页导航请求
export const loadNavs = () => fly.get('/home/catitems')
// 首页楼层数据
export const loadFloors = () => fly.get('/home/floordata')