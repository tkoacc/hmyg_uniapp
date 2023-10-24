<template>
	<view class="home">
		<!-- 轮播图 -->
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" circular="true">
			<swiper-item v-for="item in swipers" :key="item.goods_id">
				<image @click="goDetail(item.goods_id)" :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="navs">
			<view @click="goCate" class="nav-item" v-for='(item,index) in navs' :key='index'>
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import fly from '../../utils/flyio.js'
	export default {
		data() {
			return {
				// 轮播图数据
				swipers: [],
				// 导航数据
				navs: []
			};
		},
		methods: {
			// 获取轮播图
			async getHomeSwipers() {
				// 第一个参数就是接口地址
				const res = await fly.get('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata')
				this.swipers = res.data.message
			},
			// 跳转到商品详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/goods_detail/goods_detail?id=' + id
				})
			},
			// 获取导航数据
			async getNavs() {
				const res = await fly.get('https://api-hmugo-web.itheima.net/api/public/v1/home/catitems')
				this.navs = res.data.message
			},
			// 跳转到分类页
			goCate() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			}
		},
		onLoad() {
			this.getHomeSwipers()
			this.getNavs()
		}
	}
</script>

<style lang="scss">
	.home {

		// 轮播图区域
		swiper {
			width: 750rpx;
			height: 330rpx;

			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		// 导航区域
		.navs {
			display: flex;
			justify-content: space-around;
			margin: 15rpx 0;

			.nav-item {
				image {
					width: 128rpx;
					height: 128rpx;
				}
			}
		}
	}
</style>