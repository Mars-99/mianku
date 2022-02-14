<template>
	<view class="content">
		<view class="logo">
			<view class="jxw-img">
				<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png">
				</image>
			</view>
			<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/slogan.png">
			</image>
		</view>
		
        <view class="btn" @click="auth">
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters } from 'vuex'
	import {
		// wxLogin,
		// wxInfo,
		wxPhone
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
				token:""
			}
		},
		onLoad() {
           this.init()
		},
		computed:{
			...mapGetters(['getUserinfo','getNeedAuth','getIsLogin'])
		},
		methods: {
			...mapActions(['login','authUserInfo','getPhoneNumber']),
			async init(){
				if(!this.getIsLogin){
					await this.login()
				}
			},
			auth(){
				if(this.getNeedAuth){
					this.authUserInfo()
				}
			},
			
			getPhoneNumber(e){
				console.log(e)
				const userinfo = uni.getStorageSync('userinfo');
				const token = uni.getStorageSync('token');
				console.log(userinfo)
				const {data: userPhone} = wxPhone(token,userinfo.wxOpenid,userinfo.sessionKey,e.detail.encryptedData,e.detail.iv)
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
				
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
			.jxw-img{
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
		.btn{
			margin: 150rpx 20% 30rpx 20%;
			button{
				background: linear-gradient(0deg, rgba(221,135,12,1) 0%, rgba(255,202,73,1) 100%);
				color: #ffffff;
				border-radius: 40rpx;
			}
			button::after{
				border: none;
			}
		}
	}
</style>
