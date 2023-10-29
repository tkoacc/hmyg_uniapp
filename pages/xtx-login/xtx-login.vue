<template>
	<view>
		<van-cell-group>
			<van-field @input="setMobile" :value="mobile" center clearable placeholder="请输入手机号" border="{{ false }}" use-button-slot>
			</van-field>
			<van-field value="" center clearable placeholder="请输入短信验证码" border="{{ false }}" use-button-slot>
				<van-button @click="sendCode" slot="button" size="small" type="primary">
					发送验证码
				</van-button>
			</van-field>
			<van-button size="small" type="primary">登录</van-button>
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '111'
			};
		},
		methods: {
			sendCode() {
				console.log('获取', this.mobile)
			},
			setMobile(event){
				this.mobile = event.detail
			}
		}
	}
</script>

<style lang="scss">

</style>