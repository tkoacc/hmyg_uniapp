<template>
	<view>
		<van-card @click.native="goGoodsDetail(item.goods_id)" v-for="item in goods" :key="item.goods_id"
			:price="item.goods_price.toFixed(2)" :title="item.goods_name" :thumb="item.goods_big_logo || defaultPic" />
	</view>
</template>

<script>
	import {
		loadGoodsList
	} from '@/api/goods.js'

	export default {
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				// 商品列表
				goods: [],
				total: 0,
				isLoading: false
			};
		},
		methods: {
			async getGoodsList() {
				if (this.isLoading) return
				this.isLoading = true
				const res = await loadGoodsList(this.queryObj)

				this.goods.push(...res.data.message.goods)
				this.total = res.data.message.total
				this.isLoading = false
				uni.stopPullDownRefresh()
			},
			// 跳转到商品详情
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: "/pages/goods_detail/goods_detail?id=" + goods_id
				})
			}
		},
		onLoad(options) {
			if (options.query) {
				this.queryObj.query = options.query
			}
			this.getGoodsList()
		},
		// 监听触底
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize > this.total) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none'
				})
				return
			}
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			// 刷新页面重新获取第一页的数据
			this.goods = []
			this.queryObj.pagenum = 1
			this.getGoodsList()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">

</style>