<template>
	<view class="goods_detail">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="item.pics_id">
				<image @click="previewImg(i)" :src="item.pics_mid_url" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goodsInfo.goods_name">
			<!-- 商品价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<van-icon name="star-o" size="20px" />
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详细信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 底部导航区域 -->
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" bind:click="onClickIcon" />
			<van-goods-action-icon icon="cart-o" text="购物车" bind:click="onClickIcon" />
			<van-goods-action-button text="加入购物车" type="warning" @click="addToCart" />
			<van-goods-action-button text="立即购买" @click="goCart" />
		</van-goods-action>

	</view>
</template>

<script>
	import {
		loadGoodsDetail
	} from '@/api/goods.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {}
			};
		},
		methods: {
			...mapMutations('cart', ['add']),
			// 请求，数据保存，数据处理
			async getGoodsDetail(id) {
				const res = await loadGoodsDetail(id)
				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
				res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goodsInfo = res.data.message
			},
			// 预览轮播图
			previewImg(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(x => x.pics_mid_url)
				})
			},
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			addToCart() {
				const good = {
					goods_id: this.goodsInfo.goods_id, // 商品的Id
					goods_name: this.goodsInfo.goods_name, // 商品的名称
					goods_price: this.goodsInfo.goods_price, // 商品的价格
					goods_count: 1, // 商品的数量
					goods_small_logo: this.goodsInfo.goods_small_logo, // 商品的图片
					goods_state: true // 商品的勾选状态
				}
				this.add(good)
			}
		},
		onLoad(options) {
			this.getGoodsDetail(options.id)
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			width: 750rpx;
			height: 750rpx;

			swiper-item {
				image {
					width: 750rpx;
					height: 750rpx;
				}
			}
		}

		// 商品信息区域的样式
		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					font-size: 13px;
					padding-right: 10px;
				}

				// 收藏区域
				.favi {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			// 运费
			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}
		}
	}
</style>