<template>
	<view>
		分类
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {

			};
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCount + ''
			})
		},
		computed: {
			...mapGetters('cart', ['totalCount'])
		}
	}
</script>

<style lang="scss">

</style>