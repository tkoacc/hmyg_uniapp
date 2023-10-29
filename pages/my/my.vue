<template>
	<view>
		<ug-login :urlParams="urlParams" v-if="!token"></ug-login>
		<ug-info v-else></ug-info>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				urlParams: {
					url: '',
					type: ''
				}
			};
		},
		onLoad({
			url,
			type
		}) {
			this.urlParams.url = url
			this.urlParams.type = type
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCount + ''
			})
		},
		computed: {
			...mapGetters('cart', ['totalCount']),
			...mapState('user', ['token'])
		}

	}
</script>

<style lang="scss">

</style>