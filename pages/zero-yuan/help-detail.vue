<template>
	<view class="content">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="banner">
				<image class="img" mode="widthFix"
					src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-banner-detail.jpg">
				</image>
				<view class="user-cont">
					<view class="avatar">
						<image class="img" mode="widthFix" :src="initUserinfo.face">
						</image>
					</view>
					<view class="name">{{initUserinfo.userName}}</view>
					<view class="slogan">“朋友们,求点击助力！”</view>
				</view>
			</view>
			<view class="main-box">
				<view class="coupon-list">
					<view class="coupon-item">
						<view class="l-part">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
							</image>
							<view class="cont" v-if="detail_info.prize.type == 2">
								<view class="t-txt">{{detail_info.prize.discount}}</view>
								<view class="b-txt">全场通用</view>
							</view>
							<view class="cont" v-else>
								<view class="t-txt"><text class="txt">￥</text>{{detail_info.prize.deduct}}</view>
								<view class="b-txt">满{{detail_info.prize.restrict}}-{{detail_info.prize.deduct}}</view>
							</view>
						</view>
						<view class="r-part">
							<view class="title">{{detail_info.prize.title}}</view>
							<view class="b-cont">
								<view class="l-txt" v-if="detail_info.prize.type == 2">
									<text class="txt">享所有房源</text>
									{{detail_info.prize.discount}}折
								</view>
								<view class="l-txtK" v-else>
									<text class="txt">价值</text>
									￥{{detail_info.prize.deduct}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="help-box">
					<view class="title">
						{{target}}人完成助力可领优惠券
					</view>
					<view class="help-mian">
						<view class="help-list">
							<view class="help-item" v-for="item in helpuserlist" :key="item.userName">
								<view class="avatar">
									<image class="img" mode="widthFix" :src="item.face">
									</image>
								</view>
								<view class="name">{{item.userName}}</view>
							</view>
						</view>
						<view class="txt" v-if="remain===0">
							朋友已完成助力领取奖励，你也来试试吧
						</view>
						<view class="txt" v-else>
							<uni-icons v-if="helpuserlist.length == 0" type="plus" size="40" color="#ffe0cb">
							</uni-icons>
							<text v-else>{{helpuserlist.length}}位好友已完成助力,还差{{remain}}位</text>
						</view>
						<view class="help-btn">
							<button class="btn" type="primary" size="default" @tap="getCoupon()"
								v-if="isHelp">我也要拿券</button>
							<button class="btn" type="primary" size="default" @tap="Help()" v-else>帮ta助力</button>
						</view>
					</view>
				</view>

			</view>
			<view class="bottom-zw">
				<image class="img" mode="widthFix"
					src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-b-bg.jpg">
				</image>
			</view>
			<view class="help-rule">
				<view class="title">活动规则</view>
				<view class="cont" v-html="detail_info.share.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shareActivity,
		getShareDetail,
		getUserShare,
		getHelpUserList,
		userHelp,
		userDetail,
	} from '@/utils/request/manage.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	export default {
		data() {
			return {
				initUserinfo: {}, //发起助力人
				curUserinfo: {},
				detail_info: {
					share: {},
					prize: {}
				},
				target: 0, //本次券目标数
				prev_target: 0, //上张券目标数
				remain: 0, //剩余助力人数
				helpuserlist: [],
				shareUserList: [], //助力用户列表
				isHelp: false, //是否助力成功
				pageshow: true,
				recommend: 0,
				loginAuth: null,
			}
		},
		components: {
			pageLoad
		},
		onLoad() {

		},
		onShow() {
	
			if(!this.$mp.query){
				this.recommend = uni.getStorageSync('recommend')
				uni.removeStorageSync('recommend')
				this.init()
			}else{
				uni.setStorageSync('recommend', this.$mp.query.recommend)
				this.recommend = this.$mp.query.recommend
				this.init()	
			}
		},
		methods: {
			async init() {
				const {
					data: user_data
				} = await userDetail() //当前用户
				this.curUserinfo = user_data.data
				console.log("curUserinfo",this.curUserinfo)
				// let recommend = this.$mp.query.recommend //发起人id
				const {
					data: res
				} = await shareActivity(this.recommend,1,99999)
				this.initUserinfo = res.data.user
				this.shareUserList = res.data.shareUser
				let userdata = {
					rewards: res.data.rewards,
					shareNum: res.data.shareNum
				}
				const {
					data: sharedetail
				} = await getShareDetail() //助力活动详情						

				// console.log('助力数据：', userdata)
				this.detail_info.share = sharedetail.data.share
				this.detail_info.prize = sharedetail.data['prize' + (userdata.rewards + 1)][0]
				this.target = this.detail_info.share['target' + (userdata.rewards + 1)]
				if (userdata.rewards > 0) {
					this.target = this.target - this.detail_info.share['target' + (userdata.rewards)]
					this.prev_target = this.detail_info.share['target' + (userdata.rewards)]
				}
				// console.log('target:', this.target)
				// console.log('prev_target:', this.prev_target)
				let start = userdata.rewards === 0 ? 0 : this.detail_info.share['target' + userdata.rewards]
				let end = this.detail_info.share['target' + (userdata.rewards + 1)]
				this.helpuserlist = this.shareUserList.reverse().slice(start, end) //获取显示的用户列表

				if (this.detail_info.share["target" + (userdata.rewards + 1)] <= userdata.shareNum) {
					this.isHelp = true
				} else {
					this.remain = this.target - (userdata.shareNum - this.prev_target)
				}

				this.pageshow = false
			},
			async Help() {
				if (this.recommend && this.curUserinfo.id != this.recommend) {
					const {
						data
					} = await userHelp(Number(this.recommend), 2)
					if (data.code == 1) {
						// this.$api.msg(data.msg)
						wx.showToast({
							title: data.msg,
							icon: 'none',
						})
					} else {
						// this.$api.msg(data.msg)
						wx.showToast({
							title: data.msg,
							icon: 'none',
						})
						this.remain = this.remain - 1
						this.isHelp = true
						this.init()

					}
					console.log('助力活动返回结果：', data)
				} else {
					wx.showToast({
						title: '不能给自己助力!',
						icon: 'none',
					})
				}
			},
			getCoupon() {
				uni.navigateTo({
					url: '../zero-yuan/zero-yuan'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #b90d1d;

		.banner {
			position: relative;

			.img {
				width: 100%;
				display: block;
			}

			.user-cont {
				position: absolute;
				top: 10%;
				text-align: center;
				display: flex;
				justify-content: center;
				flex-direction: column;
				width: 100%;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					margin: 0 auto;
					overflow: hidden;
					border-radius: 120rpx;

					.img {
						width: 100%;
					}
				}

				.name {
					font-size: 32rpx;
					color: #ffffff;
					font-weight: bold;
				}

				.slogan {
					font-size: 28rpx;
					color: #ffffff;
					font-weight: bold;
				}

				.countdown {
					background-color: #d13030;
					border: 10rpx #b91300 solid;

					border-radius: 50rpx;
					margin: 40rpx auto;
					padding: 20rpx 20rpx;
					color: #FFFFFF;

					span {
						background-color: #ff8727;
						border-radius: 6rpx;
						padding: 5rpx 10rpx;
						margin: 10rpx;
						border: 2rpx #ebbb66 solid;
					}
				}
			}
		}

		.main-box {
			background: url(https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-bg.jpg) repeat-y;
			background-position: center;
			background-size: 100%;
			padding: 20rpx 20rpx 50rpx 20rpx;
			position: relative;

			.coupon-list {
				margin-top: -80px;

				.coupon-item {
					background-color: #ffffff;
					border-radius: 8rpx;
					padding: 20rpx;
					width: 85%;
					margin: 30rpx auto;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.l-part {
						width: 35%;
						position: relative;

						.img {
							width: 100%;
							display: block;
						}

						.cont {
							position: absolute;
							top: 15%;
							left: 60rpx;
							text-align: center;

							.t-txt {
								font-size: 40rpx;
								color: #ffffff;
								font-weight: bold;

								.txt {
									font-size: 24rpx;
									font-weight: 100;
								}
							}

							.b-txt {
								background-color: #e93f41;
								border-radius: 8rpx;
								font-size: 24rpx;
								color: #ffffff;
								padding: 5rpx 10rpx;
							}
						}
					}

					.r-part {
						width: 60%;

						.title {
							font-weight: bold;
							color: #333333;
							font-size: 28rpx;
						}

						.b-cont {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.l-txt {
								font-weight: bold;
								color: #ed5454;
								font-size: 28rpx;

								.txt {
									font-weight: 100;
									color: #999999;
									font-size: 24rpx;
								}
							}
						}
					}
				}

			}

			.help-box {
				background-color: #ffffff;
				border-radius: 8rpx;
				padding: 20rpx;
				width: 85%;
				margin: 30rpx auto 0 auto;
				text-align: center;

				.title {
					font-size: 28rpx;
					color: #e13c3c;
					font-weight: bold;
				}

				.help-mian {
					margin: 0 0 30rpx 0;

					.help-list {
						display: flex;
						justify-content: center;

						.help-item {
							width: 20%;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction: column;

							.avatar {
								width: 80rpx;
								height: 80rpx;
								margin: 0 10rpx;
								overflow: hidden;
								border-radius: 80rpx;

								.img {
									width: 100%;
								}
							}

							.name {
								font-size: 24rpx;
								color: #E09014;
							}
						}
					}

					.txt {
						font-size: 24rpx;
						color: #e13c3c;
						margin: 20rpx 0;
					}
				}

				.help-btn {
					margin: 0 auto -90rpx auto;

					.btn {
						border-radius: 80rpx;
						border: none;
						background-color: #ed5454;
						color: #fffff;
						line-height: 80rpx;
						font-size: 34rpx;
						width: 80%;
						font-weight: bold;
					}
				}
			}

		}


		.bottom-zw {
			.img {
				width: 100%;
			}
		}

		.help-rule {
			padding: 30rpx;

			.title {
				font-size: 38rpx;
				font-weight: bold;
				color: #ffe0cd;
				margin-bottom: 30rpx;
				text-align: center;
			}

			.cont {
				font-size: 24rpx;
				color: #ffe0cd;
			}
		}

	}
</style>
