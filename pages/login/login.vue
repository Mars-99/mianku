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
				avatarUrl: ''
			}
		},
		onLoad() {
			// this.auth()
			this.login()
		},
		// computed:{
		// 	...mapGetters(['getUserinfo','getNeedAuth','getIsLogin'])
		// },
		methods: {
			// ...mapActions(['login','authUserInfo','getPhoneNumber']),
			async init() {
				// if(!this.getIsLogin){
				// 	await this.login()
				// }
				// let current_user = uni.getStorageSync('userinfo')
				// if (!current_user) {
				// 	await this.login()
				// }
			},
			// auth(){
			// 	this.init()
			// 	if(this.getNeedAuth){
			// 		this.authUserInfo()
			// 	}
			// },			

			getUserInfo() {
				let that = this
				uni.showModal({
					mask: true,
					title: '温馨提示',
					content: '授权微信登录后才能正常使用小程序功能',
					success(res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取你的昵称和头像',
								success: async (userRes) => {
									const res1 = uni.getStorageSync('res1');
									console.log("getUserProfile", userRes)
									const {
										data: userInfo
									} = await wxInfo(res1.sessionKey, userRes.encryptedData, userRes
										.iv)
									if (userInfo.code == 1) {
										this.$api.msg('登录失败!' + userInfo.msg)
									} else {

									}
								},
								fail: error => {}
							});
						} else if (res.cancel) {}
					}
				})
			},
			login() {
				var that = this
				uni.login({
					provider: 'weixin',
					success: async (loginAuth) => {
						const {
							data: res
						} = await wxLogin(loginAuth.code)

						if (res.code == 1) {
							return _self.$api.msg('登录失败!' + res.msg)
						} else {
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('res1', res.data)
							// const userRes = uni.getStorageSync('userRes');
							// const {data: userPhone} = wxPhone(res.data.token,res.data.wxOpenid,res.data.sessionKey,userRes.encryptedData,userRes.iv)
							// console.log("登录成功",res.data)
							console.log("wxLogin", res)
							this.getUserInfo()
						}

					},
					fail: (loginAuth) => {
						console.log("获取code失败")
					}
				})
			},
			async getPhoneNumber(e) {
				const res1 = uni.getStorageSync('res1');
				const token = uni.getStorageSync('token');
				const {
					data: userPhone
				} = await wxPhone(token, res1.wxOpenid, res1.sessionKey, e.detail.encryptedData, e.detail.iv)
				if (userPhone.code == 1) {
					this.$api.msg('登录失败!' + userPhone.msg)
				} else {
					uni.setStorageSync('loginAuth', true)
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 2]; // 上一页
					if(this.$mp.query.recommend){
							uni.navigateTo({
								url: '../zero-yuan/help-detail?recommend=' + this.$mp.query.recommend
							})
					}else{
						uni.navigateBack({
							success: function() {
								beforePage.onLoad(); // 执行上一页的onLoad方法
							}
						});
					}
				}

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
