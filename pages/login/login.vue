<template>
	<view class="content">
		<view class="logo">
			<view class="jxw-img">
				<image class="img" mode="widthFix"
					src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png">
				</image>
			</view>
			<image class="img" mode="widthFix"
				src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/slogan.png">
			</image>
		</view>

		<view class="btn">
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		wxLogin,
		wxInfo,
		wxPhone,
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				userInfo: {},
				hasUserInfo: false,
				canIUseGetUserProfile: false,
				encryptedData: '',
				iv: '',
				code: '',
				wxLogindata: '',
				token: "",
				nickName: '',
				avatarUrl: '',
				userRes: {},
				loginData: {}
			}
		},
		onLoad() {
			this.login()
		},

		methods: {
			login() {
				uni.login({
					provider: 'weixin',
					success: async (loginAuth) => {
						// console.log(" that.userRes", that.userRes)
						const {
							data: res
						} = await wxLogin(loginAuth.code)
						console.log("res", res)
						if (res.code == 1) {
							this.$api.msg('登录失败!' + res.msg)
						} else {
							this.loginData = res.data
							uni.setStorageSync('token', res.data.token)
						}

					},
					fail: (loginAuth) => {
						console.log("获取code失败")
					}
				})
			},
			async getPhoneNumber(e) {
				var that = this
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					const {
						data: userPhone
					} = await wxPhone(that.loginData.token, that.loginData.wxOpenid, that.loginData.sessionKey, e
						.detail.encryptedData, e.detail.iv)
					console.log("userPhone", userPhone)
					if (userPhone.code == -1) {
						that.$api.msg('登录失败!' + userPhone.msg)
					} else {
						that.getUserInfo()
					}
					} else if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
						wx.showToast({
							title: '您拒绝了授权',
							icon: 'none',
							duration: 500
						})
						setTimeout(() => {
							uni.switchTab({
								url: '../index/index'
							})
						}, 500)
				
					} else if (e.detail.errMsg === 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试') {
						wx.showToast({
							title: '您的微信未绑定手机号',
							icon: 'none',
							duration: 500
						})
						setTimeout(() => {
							uni.switchTab({
								url: '../index/index'
							})
						}, 500)
					}
			},
			getUserInfo() {
				var that = this
				uni.showModal({
					mask: true,
					title: '温馨提示',
					content: '授权微信登录后才能正常使用小程序功能',
					success(res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取你的昵称和头像',
								success: async (userRes) => {
									const {
										data: userInfo
									} = await wxInfo(that.loginData.sessionKey, userRes.encryptedData,
										userRes.iv)
									if (userInfo.code == -1) {
										that.$api.msg('登录失败!' + userInfo.msg)
									} else {
										uni.setStorageSync('loginAuth', true)
										let pages = getCurrentPages(); // 当前页面
										let beforePage = pages[pages.length - 2]; // 上一页
										if (that.$mp.query.recommend) {
											uni.navigateTo({
												url: '../zero-yuan/help-detail?recommend=' +
													that.$mp.query
													.recommend
											})
										} else {
											uni.navigateBack({
												success: function() {
													beforePage.onLoad(); // 执行上一页的onLoad方法
												}
											});
										}
									}
									console.log("userInfo", userInfo)
									console.log("微信用户信息", that.userRes)
								},
								fail: error => {
									wx.showToast({
										title: '您拒绝了授权',
										icon: 'none',
										duration: 500
									})
									setTimeout(() => {
										uni.switchTab({
											url: '../index/index'
										})
									}, 500)

								}
							});
						} else if (res.cancel) {
							wx.showToast({
								title: '您拒绝了授权',
								icon: 'none',
								duration: 500
							})
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								})
							}, 500)

						}
					}
				})
			}

		},
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		height: 100vh;

		.logo {
			padding-top: 120rpx;
			width: 180rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;

			.jxw-img {
				width: 180rpx;
				height: 180rpx;
				overflow: hidden;
				border-radius: 30rpx;
				margin-bottom: 30rpx;

				.img {
					width: 100%;
				}
			}


			.img {
				width: 100%;
			}
		}

		.btn {
			margin: 150rpx 20% 30rpx 20%;

			button {
				background: linear-gradient(0deg, rgba(221, 135, 12, 1) 0%, rgba(255, 202, 73, 1) 100%);
				color: #ffffff;
				border-radius: 40rpx;
			}

			button::after {
				border: none;
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
