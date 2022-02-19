<template>
	<view class="content">
		<view class="login" v-if="!current_user">
			<uni-icons type="contact" size="100" color="#dddddd"></uni-icons>
			<view class="txt">您尚未登录，请登录后查看</view>
			<button class="btn" type="primary" size="default" @tap="isLogin">登录/注册</button>
		</view>
		<view v-else>
			<view class="news-type">
				<view class="item" @tap="openSystemNews()">
					<view class="l-part">
						<image class="img" mode="widthFix" src="../../static/image/news-xt-icon.png">
						</image>
					</view>
					<view class="c-part">
						<view class="h2">系统消息</view>
						<view class="info">{{messageList.length?messageList[0].msg:'暂无消息'}}</view>
					</view>
					<view class="r-part">
						<view class="date">{{messageList.length?$api.timeHandle(messageList[0].updatedAt):''}}</view>
						<view class="remind" v-if="sta.length">
							<uni-badge :text="sta.length"></uni-badge>
						</view>
					</view>
				</view>
				<view class="item" @tap="openCustomerService()">
					<view class="l-part">
						<image class="img" mode="widthFix" src="../../static/image/news-kf-icon.png">
						</image>
					</view>
					<view class="c-part">
						<view class="h2">客服消息</view>
						<view class="info">眠库专属客服，点击立即聊天。</view>
					</view>
					<view class="r-part">
						<!-- <view class="date">{{$api.timeHandle('2022-01-29')}}</view>
						<view class="remind">
							<uni-badge text="8"></uni-badge>
						</view> -->
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getUserMsgList,
	} from '@/utils/request/manage.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				messageList: [],
				sta: [],
				current_user:null,
			}
		},
		computed: {
			...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
		},
		onLoad() {
			this.isLogin()	
		},
		onShow() {
			this.initData()
		},
		methods: {
			openSystemNews() {
				uni.navigateTo({
					url: '../news/news-system'
				})
			},
			openCustomerService() {
				uni.navigateTo({
					url: '../news/customer-service'
				})
			},
			async initData() {
				const {
					data: res
				} = await getUserMsgList()
				console.log(res)
				if (res.code == -1) {
					// return this.$api.msg(res.msg)
				}
				this.totalPage = res.data.pages
				if (res.data.page == 1) {
					this.messageList = res.data.rs
				} else {
					this.messageList = this.messageList.concat(res.data.rs)
				}

				this.sta = this.messageList.filter(function(item) {
					return item.state == 0
				})
			},
			isLogin(){
				this.current_user = uni.getStorageSync('userinfo')
				if (!this.current_user) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.login{
		padding: 150rpx 50rpx;
		text-align: center;
		.txt{
			margin: 30rpx auto;
		}
		.btn{
			background: linear-gradient(0deg, rgba(221,135,12,1) 0%, rgba(255,202,73,1) 100%);
			color: #ffffff;
			border-radius: 40rpx;
			width: 50%;
			margin: 0 auto;
		}
	}
	.news-type {
		margin-top: 2rpx;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx 20rpx;
			background-color: #ffffff;
			margin-bottom: 2rpx;

			.l-part {
				width: 80rpx;
				height: 80rpx;

				.img {
					width: 100%;
				}
			}

			.c-part {
				width: 70%;

				.h2 {
					font-size: 28rpx;
					font-weight: bold;
					line-height: 34rpx;
					color: #333333;
					padding-bottom: 10rpx;
				}

				.info {
					font-size: 24rpx;
					color: #999999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.r-part {
				width: 100rpx;
				.date {
					font-size: 24rpx;
					color: #999999;
					line-height: 34rpx;
					padding-bottom: 10rpx;
				}

				.remind {
					text-align: right;

				}
			}
		}
	}
</style>
