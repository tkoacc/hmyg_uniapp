<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button @click="onLogin" type="primary" class="btn-login">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/user.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "ug-login",
		data() {
			return {

			};
		},
		props:['urlParams'],
		methods: {
			...mapMutations('user',['updateToken']),
			async onLogin() {
				const resProfile = await uni.getUserProfile({
					desc: '获取用户信息'
				})
				const {
					rawData,
					iv,
					signature,
					encryptedData
				} = resProfile
				const resLogin = await uni.login()
				const {
					code
				} = resLogin
				const res = await login({
					rawData,
					iv,
					signature,
					encryptedData,
					code
				})
				if (!res.data.message) return uni.showToast({
					title: '请求失败请重试',
					icon: 'none'
				})
				this.updateToken(res.data.message.token)
				uni.showToast({
					title:'登录成功',
					icon:'success'
				})
				if(!this.urlParams.url) return
				if(this.urlParams.type === 'switchTab'){
					uni.switchTab({
						url:this.urlParams.url
					})
				} else {
					uni.navigateTo({
						url:this.urlParams.url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>