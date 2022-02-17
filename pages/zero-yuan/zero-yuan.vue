<template>
	<view class="content">
		<view class="JRMD-box" :style="{'min-height': swiperheight + 'px'}" v-if="isPage">
			<view class="banner">
				<image class="img" mode="widthFix"
					src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-banner.jpg">
				</image>
			</view>
			<view class="mian-box">
				<view class="coupon-list">
					<view class="coupon-item" v-for="item in prizelist" :key="item.id">
						<view class="l-part">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png"></image>
							<view class="cont" v-if="item.type == 2">
								<view class="t-txt">{{item.discount}}</view>
								<view class="b-txt">全场通用</view>
							</view>
							<view class="cont" v-else>
								<view class="t-txt"><text class="txt">￥</text>{{item.deduct}}</view>
								<view class="b-txt">满{{item.restrict}}-{{item.deduct}}</view>
							</view>
						</view>
						<view class="r-part">
							<view class="title">{{item.title}}</view>
							<view class="b-cont">
								<view class="l-txt" v-if="item.type == 2">
									<text class="txt">享所有房源</text>
									{{item.discount}}折
								</view>
								<view class="l-txt" v-else>
									<text class="txt">价值</text>
									￥{{item.deduct}}
								</view>
								<view class="r-btn">
									<button class="btn" type="primary" size="default" @tap="openZeroYuanDetailPage(item.id)">免费拿</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-zw">
				<image class="img" mode="widthFix"
					src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-b-bg.jpg">
				</image>
			</view>

		</view>
		<view class="WDMD-box" v-else>
			<view class="coupon-list">
				<view class="coupon-item">
					<view class="l-part">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
						</image>
						<view class="cont">
							<view class="t-txt"><text class="txt">￥</text>100</view>
							<view class="b-txt">满200-100</view>
						</view>
					</view>
					<view class="r-part">
						<view class="title">【民宿券】满200返100 新老客均可使用</view>
						<view class="b-cont">
							<view class="l-txt">
								<text class="txt">价值</text>
								￥100
							</view>
							<view class="r-btn">
								<button class="btn" type="primary" size="default" @tap="">免费拿</button>
							</view>
						</view>
					</view>
				</view>
				<view class="coupon-item">
					<view class="l-part">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
						</image>
						<view class="cont">
							<view class="t-txt"><text class="txt">￥</text>100</view>
							<view class="b-txt">满200-100</view>
						</view>
					</view>
					<view class="r-part">
						<view class="title">【民宿券】满200返100 新老客均可使用</view>
						<view class="b-cont">
							<view class="l-txt">
								<text class="txt">价值</text>
								￥100
							</view>
							<view class="r-btn">
								<button class="btn" type="primary" size="default" @tap="">免费拿</button>
							</view>
						</view>
					</view>
				</view>
				<view class="coupon-item">
					<view class="l-part">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
						</image>
						<view class="cont">
							<view class="t-txt"><text class="txt">￥</text>100</view>
							<view class="b-txt">满200-100</view>
						</view>
					</view>
					<view class="r-part">
						<view class="title">【民宿券】满200返100 新老客均可使用</view>
						<view class="b-cont">
							<view class="l-txt">
								<text class="txt">价值</text>
								￥100
							</view>
							<view class="r-btn">
								<button class="btn" type="primary" size="default" >免费拿</button>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="botton-nav">
			<view class="nav-item" @tap="openJRMD()">
				<view class="icon">
					<image class="img" v-if="isPage" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/jrmd-icon-act.png">
					</image>
					<image class="img" v-else mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/jrmd-icon.png">
					</image>
				</view>
				今日免单
			</view>
			<view class="nav-item" @tap="openWDMD()">
				<view class="icon">
					<image class="img" v-if="isPage" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/wdmd-icon.png">
					</image>
					<image class="img" v-else mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/wdmd-icon-act.png">
					</image>
				</view>
				我的免单
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getShareDetail,
		getUserShare,
		getUserSharePrice
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				swiperheight: 0,
				isPage: true,
				prizelist: [],
				myPrizeList:[]
			}
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
		computed: {
			...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
		},
		onLoad() {
			this.initData()
		},
		methods: {
			openJRMD() {
				this.isPage = true;
			},
			openWDMD() {
				this.isPage = false;
			},
			async initData() {
				const {
					data
				} = await getShareDetail()
				for (let i = 1; i <= 10; i++) {
					let target = 'target' + i
					let reward = 'reward' + i
					let prize = 'prize' + i
					if (data.data.share[target] > 0 && data.data.share[reward] > 0) {
						this.prizelist = this.prizelist.concat(data.data[prize])
					}
				}
				console.log("this.prizelist",this.prizelist)
				// const {data1} = await getUserShare()
				// this.myPrizeList = data1.data
				// console.log('助力活动用户数据:',data1)
				// const {data2} = await getUserSharePrice()
				// console.log('领取助力奖励:',data2)
			},
			openZeroYuanDetailPage(id){
				let current_user = uni.getStorageSync('userinfo')
				if (!current_user) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
				uni.navigateTo({
					url: '../zero-yuan/zero-yuan-detail?id='+id
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.JRMD-box {
			background-color: #b90d1d;

			.banner {
				.img {
					width: 100%;
					display: block;
				}
			}

			.mian-box {

				background: url(https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-bg.jpg) repeat-y;
				background-position: center;
				background-size: 100%;
				padding: 20rpx;

				.coupon-list {
					margin-top: -100px;

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

								.btn {
									border-radius: 40rpx;
									border: none;
									background-color: #ed5454;
									color: #fffff;
									line-height: 50rpx;
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}

			.bottom-zw {
				.img {
					width: 100%;
				}
			}
		}

		.WDMD-box {
			margin-top: 30rpx;

			.coupon-list {
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

							.btn {
								border-radius: 40rpx;
								border: none;
								background-color: #ed5454;
								color: #fffff;
								line-height: 50rpx;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}

		.botton-nav {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #ffffff;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.nav-item {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-right: 2rpx #e0e0e0 solid;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;

					.img {
						width: 100%;
					}
				}
			}

			.nav-item:last-child {
				border-right: 0;
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
