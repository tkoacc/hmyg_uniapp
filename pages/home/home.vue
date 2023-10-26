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
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item,i) in floors" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层的图片 -->
				<view class="img_box">
					<!-- 左侧大图片的盒子 -->
					<image @click="goGoodsList(item.product_list[0].navigator_url)" class="left" :src="item.product_list[0].image_src"></image>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right">
						<image @click="goGoodsList(item2.navigator_url)" v-for="(item2,i2) in item.product_list" v-if="i2 !== 0" :src="item2.image_src"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loadSwipers,
		loadNavs,
		loadFloors
	} from '../../api/home.js'
	export default {
		data() {
			return {
				// 轮播图数据
				swipers: [],
				// 导航数据
				navs: [],
				// 楼层数据
				floors: []
			};
		},
		methods: {
			// 获取轮播图
			async getHomeSwipers() {
				// 第一个参数就是接口地址
				const res = await loadSwipers()
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
				const res = await loadNavs()
				this.navs = res.data.message
			},
			// 跳转到分类页
			goCate() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			// 获取楼层数据
			async getHomeFloors() {
				const res = await loadFloors()
				this.floors = res.data.message
			},
			goGoodsList(url){
				uni.navigateTo({
					url:'/pages/goods_list/goods_list?' + url.split('?')[1]
				})
			}
		},
		onLoad() {
			this.getHomeSwipers()
			this.getNavs()
			this.getHomeFloors()
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

		// 楼层区域
		.floor-list {
			.floor-item {
				.floor-title {
					height: 60rpx;
					width: 100%;
				}

				.img_box {
					display: flex;
					justify-content: space-between;
					padding-left: 10rpx;

					.left {
						width: 232rpx;
						height: 392rpx;
						float: left;
					}

					.right {
						width: 500rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-content: space-between;

						image {
							width: 233rpx;
							height: 190rpx;
						}
					}
				}
			}
		}
	}
</style>