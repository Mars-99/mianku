<template>
	<view class="content" :style="{'height': swiperheight + 'px'}">
		<image class="bg-img" mode="widthFix" :src="bg">
		</image>
		<view class="user-box">
			<view class="user-info">
				<view class="avatar">
					<image class="img" mode="widthFix" :src="userinfo.face?userinfo.face:avatarUser">
					</image>
				</view>
				<view class="frame" v-if="userinfo.userName">
					<view class="name">{{userinfo.userName}}</view>
					<view class="cert">
						<view class="finish" v-if="userinfo.examine===1">
							<uni-icons class="icon" type="vip-filled" size="16" color="#ffffff"></uni-icons>
							已认证
						</view>
						<view class="undone" v-else>
							<uni-icons class="icon" type="vip-filled" size="16" color="#c9c9c9"></uni-icons>
							未认证
						</view>
					</view>
				</view>
				<view class="frame" v-else>
					<view class="name" @tap="openLogin()">请先登录</view>
				</view>
			</view>
			<view class="order">
				<uni-card title="我的订单" :border="false">
					<view class="order-list">
						<view class="order-item">
							<view class="icon">
								<image class="img" mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_all.png">
								</image>
							</view>
							<view class="txt">全部</view>
						</view>
						<view class="order-item">
							<view class="icon">
								<image class="img" mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_pending-payment.png">
								</image>
							</view>
							<view class="txt">待付款</view>
						</view>
						<view class="order-item">
							<view class="icon">
								<image class="img" mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_waiting_checkin.png">
								</image>
							</view>
							<view class="txt">待入住</view>
						</view>
						<view class="order-item">
							<view class="icon">
								<image class="img" mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_finish.png">
								</image>
							</view>
							<view class="txt">已完成</view>
						</view>

					</view>
				</uni-card>
			</view>
			<view class="column-box">
				<uni-card :border="false" class="column-list">
					<view class="column-item">
						<view class="icon">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/user_icon_student.png">
							</image>
						</view>
						<view class="txt" @tap="openStudentPrivilege()">学生特权</view>
					</view>
					<view class="column-item">
						<view class="icon">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/user_icon_collect.png">
							</image>
						</view>
						<view class="txt" @tap="openCollect()">我的收藏</view>
					</view>
					<view class="column-item">
						<view class="icon">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/user_icon_discount.png">
							</image>
						</view>
						<view class="txt">我的优惠券</view>
					</view>
					<view class="column-item">
						<view class="icon">
							<image class="img" mode="widthFix" src="../../static/image/user_icon_connect.png">
							</image>
						</view>
						<view class="txt" @tap="customerService()">联系客服</view>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userDetail
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				swiperheight: 0,
				bg: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/user-bg.png',
				avatarUser: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/avatar-user.jpg',
				userinfo: {}
			}
		},
		onLoad() {
			this.getUserDetail()
		},
		mounted() {
			// 注意，这里要用个变量存this，不然进到getSystemInfo后this指向会变化，找不到data变量
			var _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.swiperheight = res.windowHeight
				}
			})
		},
		methods: {
			async getUserDetail() {
				// this.token = uni.getStorageSync('token')
				// console.log(this.token)
				const {
					data
				} = await userDetail()
				this.userinfo = data.data
				console.log(data.data)
			},
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			openStudentPrivilege() {
				uni.navigateTo({
					url: '../student-privilege/student-privilege'
				})
			},
			openCollect() {
				uni.switchTab({
					url: '../collect/collect'
				})
			},
			customerService() {
				uni.navigateTo({
					url: '../news/customer-service'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;

		.bg-img {
			width: 100%;
		}

		.user-box {
			position: absolute;
			width: 100%;
			top: 160rpx;

			.user-info {
				display: flex;
				align-items: center;
				padding: 0 50rpx;

				.avatar {
					border: 4rpx #ffffff solid;
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 30rpx;

					.img {
						width: 100%;
					}
				}

				.frame {
					.name {
						color: #ffffff;
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}

					.finish {
						background-color: #ec8d1c;
						border-radius: 40rpx;
						padding: 10rpx 20rpx;
						font-size: 22rpx;
						color: #ffffff;
						display: flex;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;
							background-color: #ffcb04;
							border-radius: 30rpx;
							display: inline-block;
							text-align: center;
							margin-right: 10rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}

					.undone {
						background-color: #c88c43;
						border-radius: 40rpx;
						padding: 10rpx 20rpx;
						font-size: 22rpx;
						color: #ffffff;
						display: flex;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;
							background-color: #e3e3e3;
							border-radius: 30rpx;
							display: inline-block;
							text-align: center;
							margin-right: 10rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}

			.order {
				padding-top: 30rpx;

				.order-list {
					padding: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-item {
						text-align: center;
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #333333;

						.icon {
							width: 60rpx;
							height: 60rpx;

							.img {
								width: 100%;
							}
						}
					}
				}
			}

			.column-box {
				.column-list {
					.column-item {
						display: flex;
						align-items: center;
						padding: 30rpx 0;
						border-bottom: 2rpx #f5f5f5 solid;

						.icon {
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;

							.img {
								width: 100%;
							}
						}

						.txt {
							font-size: 30rpx;
							color: #333333;
						}
					}

					.column-item:last-child {
						border-bottom: 0rpx #f5f5f5 solid;
					}
				}
			}
		}
	}

	/deep/ .uni-card .uni-card__header {
		border-bottom: 1px #f5f5f5 solid;
	}
</style>
