<template>
	<view>
		<ug-address></ug-address>
		<!-- 购物车列表 -->
		<van-card v-for="item in carts" :key="item.goods_id" :price="item.goods_price" :title="item.goods_name">
			<view class="custom-thumb" slot="thumb">
				<radio :checked="item.goods_state" @click="onRadio(item.goods_id)" ></radio>
				<image :src="item.goods_small_logo" mode=""></image>
			</view>
		</van-card>
		<!-- 结算组件 -->
		<ug-settle></ug-settle>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		methods:{
			...mapMutations('cart',['updateState']),
			onRadio(id){
				this.updateState(id)
			}
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCount + ''
			})
		},
		computed: {
			...mapState('cart', ['carts']),
			...mapGetters('cart', ['totalCount'])
		}
	}
</script>

<style lang="scss">
	.custom-thumb {
		display: flex;
		height: 100%;
		align-items: center;

		image {
			width: 150rpx;
			height: 200rpx;
		}
	}
</style>