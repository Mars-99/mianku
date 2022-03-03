<template>
	<view class="content">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="JRMD-box" :style="{'min-height': swiperheight + 'px'}" v-if="isPage">
				<view class="banner">
					<image class="img" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-banner.jpg">
					</image>
					<view class="rule-link">
						<text class="txt" @tap="openSiteContent()">活动规则</text>
						<view class="icon">
							<uni-icons type="right" size="12" color="#666666"></uni-icons>
						</view>
					</view>
				</view>
				<view class="mian-box">
					<view class="coupon-list">
						<view class="coupon-item" v-for="item in prizelist" :key="item.id">
							<view class="l-part">
								<image class="img" mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
								</image>
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
										<button class="btn" type="primary" size="default"
											@tap="openZeroYuanDetailPage(item.id)"
											v-if="item.recevie_status==1">免费拿</button>
										<button class="btn" type="primary" size="default"
											v-if="item.recevie_status==0">未开始</button>
										<button class="btn" type="primary" size="default"
											v-if="item.recevie_status==2">已领取</button>
										<button class="btn" type="primary" size="default"
											@tap="openZeroYuanDetailPage(item.id)" v-if="item.recevie_status==3">领取</button>
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
					<view class="coupon-item" v-for="item in myPrizeList" :key="item.id">
						<view class="l-part">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
							</image>
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
									<text class="txt">价值</text>g  
									￥{{item.deduct}}
								</view>
								<view class="r-btn">
									<button class="btn" type="primary" size="default" v-if="item.botton_text === '已领取'">{{item.botton_text}}</button>
									<button class="btn" type="primary" size="default" @tap="openZeroYuanDetailPage(item.id)" v-else>{{item.botton_text}}</button>
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
					今日优惠券
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
					我的优惠券
				</view>
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
	import pageLoad from '@/components/pageLoad/pageLoad'
	export default {
		data() {
			return {
				swiperheight: 0,
				isPage: true,
				prizelist: [], //今日优惠券
				myPrizeList: [], //我的优惠券
				pageshow: true,
				share: {
					title: '0元领福利',
					path: '../zero-yuan/zero-yuan',
					imageUrl: '',
					desc: '',
					content: ''
				},

			}
		},
		components: {
			pageLoad
		},
		mounted() {
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
				let loginAuth = uni.getStorageSync('loginAuth')
				if (!loginAuth) {
					this.$api.href('../login/login')
					return
				}
				const {
					data
				} = await getShareDetail() //助力活动详情
				let user_share_list = await getUserShare() // 助力活动用户数据
				let userdata = user_share_list.data.data;
				for (let i = 1; i <= 10; i++) {
					let prize_obj = null //今日
					let my_obj = null //我的
					if (data.data.share['target' + i] > 0 && data.data.share['reward' + i] > 0) {
						prize_obj = data.data['prize' + i][0]
						prize_obj.recevie_status = 0 //未开始		
						if (userdata.rewards === (i - 1)) {
							my_obj = data.data['prize' + i][0]
							//正在助力的活动
							if (data.data.share["target" + i] <= userdata.shareNum) {
								//助力人数大于等于目标数，则可领取优惠券
								// prize_obj.recevie_status = 2
								prize_obj.recevie_status = 3 //达到目标，未领取
								my_obj.botton_text = '领取'
							} else {
								prize_obj.recevie_status = 1
								my_obj.botton_text = '助力进行中'
							}
						} else {
							if (userdata.rewards > i - 1) {
								//已完成的助力
								prize_obj.recevie_status = 2
								my_obj = data.data['prize' + i][0]
								my_obj.botton_text = '已领取'
							} else {
								//未开始的助力
								prize_obj.recevie_status = 0
							}
						}
						if (my_obj) {
							this.myPrizeList.push(my_obj)
						}
						this.prizelist.push(prize_obj)
					}
				}
				this.pageshow = false
				console.log('myPrizeList:', this.myPrizeList)
			},
			openZeroYuanDetailPage(id) {
				uni.navigateTo({
					url: '../zero-yuan/zero-yuan-detail?id=' + id
				})
			},
			openSiteContent() {
				uni.navigateTo({
					url: '../site-content/site-content?id=9'
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

				.rule-link {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					background-color: rgba($color: #333333, $alpha: 0.6);
					padding: 10rpx 20rpx;
					display: flex;
					align-items: center;
					color: #ffffff;
					border-radius: 30rpx;
					line-height: 40rpx;
					font-size: 24rpx;

					.icon {
						width: 30rpx;
						height: 30rpx;
						border-radius: 30rpx;
						background-color: #ffffff;
						margin-left: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
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
