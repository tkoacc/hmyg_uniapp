<template>
	<view>
		<view>
			<!-- 选择收货地址的盒子 -->
			<view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
				<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
			</view>

			<!-- 渲染收货信息的盒子 -->
			<view class="address-info-box" @click="chooseAddress" v-else>
				<view class="row1">
					<view class="row1-left">
						<view class="username">收货人：<text>{{address.userName}}</text></view>
					</view>
					<view class="row1-right">
						<view class="phone">电话：<text>{{address.telNumber}}</text></view>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
				<view class="row2">
					<view class="row2-left">收货地址：</view>
					<view class="row2-right">{{addStr}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 存放收货地址信息
				// address: {}
			};
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addStr'])
		},
		methods: {
			...mapMutations('user', ['updateAddress']),
			chooseAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.updateAddress(res)
					},
					fail() {
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 渲染收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>