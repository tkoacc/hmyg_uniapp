<template>
	<view>
		<!-- 最外层的容器 -->
		<view class="my-settle-container">
			<!-- 全选区域 -->
			<label class="radio">
				<radio color="#C00000" :checked="isAllCheck" /><text>全选</text>
			</label>

			<!-- 合计区域 -->
			<view class="amount-box">
				合计:<text class="amount">￥{{totalPrice}}</text>
			</view>

			<!-- 结算按钮 -->
			<view class="btn-settle" @click="onSettle">结算({{settleTotalCount}})</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'
	import {
		createOrderApi,
		loadPayParams
	} from '@/api/user.js'
	export default {
		name: "ug-settle",
		data() {
			return {
				token: ''
			};
		},
		methods: {
			async onSettle() {
				if (JSON.stringify(this.address) === '{}') return uni.showToast({
					title: '请选择收货地址',
					icon: 'none'
				})
				if (!this.carts.length) return uni.showToast({
					title: '请选择商品',
					icon: 'none'
				})
				if (!this.token) return uni.showModal({
					title: '黑马优购',
					content: '还未登录，是否去登录页？',
					success(e) {
						if (e.confirm) {
							uni.reLaunch({
								url: "/pages/my/my?url=/pages/cart/cart&type=switchTab"
							})
						}
					}
				})

				// 支付1（创建订单）
				const order_number = await this.createOrder()

				// 支付2
				const payParams = await this.getPayParams(order_number)

				// 支付3
				this.pay(payParams)
			},

			async pay(payParams) {
				const [err, succ] = await uni.requestPayment(payParams)
				if (err?.errMsg === 'requestPayment:fail cancel') {
					return uni.showToast({
						title: '您已取消支付',
						icon: 'none'
					})
				}

				if (succ?.errMsg === 'requestPayment:ok') {
					uni.showToast({
						title: '支付成功'
					})
				}
			},
			async getPayParams(order_number) {
				const res = await loadPayParams(order_number)
				return res.data.message.pay
			},
			async createOrder() {
				const order_price = this.totalPrice
				const consignee_addr = this.addStr
				const goodsFilter = this.carts.filter(item => item.goods_state)
				const goods = []
				for (let i = 0; i < goodsFilter.length; i++) {
					const good = goodsFilter[i]
					goods.push({
						goods_id: goods.goods_id,
						goods_number: goods.goods_count,
						goods_price: good.goods_price
					})
				}
				const res = await createOrderApi({
					order_price,
					consignee_addr,
					goods
				})
				return res.data.message.order_number
			}
		},
		computed: {
			...mapState('user', ['address', 'token']),
			...mapGetters('user', ['addStr']),
			...mapState('cart', ['carts']),
			...mapGetters('cart', ['isAllCheck', 'totalPrice', 'settleTotalCount'])
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>