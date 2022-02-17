<template>
	<view class="order-page">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="column-box">
				<view class="pack-item">
					<view class="img-left">
						<image mode="aspectFill" :src="listingsDetail.hotel.thum">
						</image>
					</view>
					<view class="cont-right">
						<view class="title">
							{{listingsDetail.hotel.hotelName}}
						</view>
						<view class="info">
							<text class="txt">整套房源</text>·
							<text class="txt">{{listingsDetail.hotel.houseType}}</text>·
							<text class="txt">可住{{listingsDetail.hotel.bedNum}}人</text>
						</view>

					</view>
				</view>
				<view class="date">
					<view class="select-date">
						<text class="txt">{{checkInYH}}入住-{{checkOutYH}}离店 共{{dayCount}}晚</text>
						<!-- <uni-icons type="right" size="20" color="#666666"></uni-icons> -->
					</view>
					<view class="remark">最早14:00入住 最晚12:00离开 最少入住1天</view>
				</view>
			</view>

			<view class="column-box">
				<view class="resident">
					<view class="item">
						<view class="left">入住人（{{checkedLodgerList.length}}/{{listingsDetail.hotel.bedNum}}）</view>
						<view class="right">
							<button class="btn-edit" type="default" size="mini" @tap="openLodgerPage()">添加/编辑</button>
						</view>
					</view>
					<view></view>
					<view class="item" v-if="checkedLodgerList.length" v-for="(item ,index) in checkedLodgerList"
						:key="index">
						<view class="left">{{item.contacts}}</view>
						<view class="right">
							{{item.phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}
						</view>
					</view>
					<view v-else></view>

				</view>
			</view>

			<view class="column-box">
				<view class="amount">
					<view class="item">
						<view class="left">房费</view>
						<view class="right">
							￥{{totalPice}}
						</view>
					</view>
					<view class="item">
						<view class="left">清洁费</view>
						<view class="right">
							￥{{listingsDetail.hotel.cleaningFee}}
						</view>
					</view>
					<view class="item">
						<view class="left">首单立减</view>
						<view class="right">
							<text class="act-txt">-￥{{listingsDetail.hotel.firstReduce}}</text>
						</view>
					</view>
					<!-- <view class="item">
						<view class="left">新房特惠</view>
						<view class="right">
							<text class="act-txt">-￥{{listingsDetail.hotel.}}</text>
						</view>
					</view> -->
					<view class="item">
						<view class="left">优惠券</view>
						<view class="right">
							<text class="grey-txt">无可用优惠</text>
						</view>
					</view>
					<view class="total">
						合计：<text
							class="number">￥{{totalPice}}</text>
					</view>
				</view>
			</view>
			<view class="bottom-nav">
				<view class="left">
					<view class="total-number">
						￥{{totalPice}}
					</view>
				</view>
				<view class="right">
					<button class="btn" type="primary" size="default" @tap="submitOrders()">确认支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hotelDetail,
		booking,
		payWX,
	} from '@/utils/request/manage.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	export default {
		components: {
			pageLoad
		},
		data() {
			return {
				pageshow: true,
				checkIn: 0,
				checkOut: 0,
				checkInYH: 0,
				checkOutYH: 0,
				dayCount: 1,
				totalPice: null,
				listingsDetail: [],
				lodger: [],
				checkedLodgerList: [],
				arriveAt: '',
				couponId: 0, //优惠券id
				orderNumber: 0,
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 1]
			this.brand = prevPage.brand
			if (this.brand) {
				if (this.brand.checkedLodgerList) {
					this.checkedLodgerList = this.brand.checkedLodgerList.map(item => ({
						contacts: item.contacts,
						cardType: item.cardType,
						phone: item.phone,
					 idCard: item.idCard,
					}))

					console.log("this.checkedLodgerList", this.checkedLodgerList)

				}
			} else {
				return
			}

			if (this.checkedLodgerList.length > this.listingsDetail.hotel.bedNum) {
				this.checkedLodgerList = []
				uni.showToast({
					icon: "none",
					title: '入住人数不可大于可住人数',
					duration: 2000,
					position: 'top'
				})
			}
			console.log('checkedLodgerList', this.checkedLodgerList)
		},
		methods: {
			async init() {
				const {
					data
				} = await hotelDetail(Number(this.$mp.query.id))
				this.checkIn = this.$mp.query.checkIn
				this.checkOut = this.$mp.query.checkOut
				this.checkInYH = this.checkIn.slice(5)
				this.checkOutYH = this.checkOut.slice(5)
				console.log(this.checkIn, this.checkOut)
				this.dayCount = this.$mp.query.dayCount
				this.totalPice = this.$mp.query.totalPice
				this.listingsDetail = data.data
				this.pageshow = false
				
				this.totalPice = Number(this.totalPice)+Number(this.listingsDetail.hotel.cleaningFee)-Number(this.listingsDetail.hotel.firstReduce)

			},
			openLodgerPage() {
				uni.navigateTo({
					url: '../order/lodger-list'
				})

			},

			async booking() {
				const {
					data: res
				} = await booking(this.listingsDetail.hotel.id, this.couponId, this.listingsDetail.hotel.bedNum, this
					.checkedLodgerList[0].contacts, this.checkedLodgerList[0].phone, this.checkIn, this.checkOut,
					this.checkIn, this.checkedLodgerList)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.orderNumber = res.data.id
					console.log("this.orderNumber", this.orderNumber)

					this.payWX(this.orderNumber)
					console.log("res", res)
				}

			},

			async payWX(id) {
				const {
					data: res
				} = await payWX(id)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					// this.orderNumber= res
					uni.requestPayment({
						provider: 'wxpay', //微信支付就是'wxpay'
						timeStamp: res.data.timeStamp, //时间戳
						nonceStr: res.data.nonceStr, //就是你生成签名的时候那个随机字符串
						package: res.data.packageValue, //支付id号，我是后端拼接号了，如果没拼接需要加"prepay_id="
						signType: res.data.signType, //v3不是MD5而是RSA
						paySign: res.data.paySign,
						success(res) {
							uni.navigateTo({
								url: '../order/order-result?state=success'
							})
							console.log('success:' + JSON.stringify(res));
							
						},
						fail(err) {
							uni.navigateTo({
								url: '../order/order-result?state=fail'
							})
							console.log('fail:' + JSON.stringify(err));
						}
					});
				}

			},
			submitOrders() {
				if (this.checkedLodgerList.length == 0) {
					uni.showToast({
						icon: "none",
						title: '请添加入住人',
						duration: 2000,
						position: 'top'
					})
					return
				} else {
					this.booking()


				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.order-page {
		padding-bottom: 100rpx;

		.column-box {
			background-color: #ffffff;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 8rpx;

			.pack-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx #f5f5f5 solid;
				padding-bottom: 20rpx;

				.img-left {
					border-radius: 8rpx;
					overflow: hidden;
					height: 150rpx;
					width: 30%;
					display: flex;
					align-items: center;

					image {
						width: 100%;
					}
				}

				.cont-right {
					width: 60%;
					margin: 0 5%;

					.info {
						font-size: 24rpx;
						padding: 20rpx 0;

						.txt {
							padding-right: 10rpx;
							color: #666666;
						}
					}

					.title {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						font-weight: bold;
						color: #333333;
						font-size: 30rpx;
					}
				}
			}

			.date {
				padding: 20rpx 0 10rpx 0;

				.select-date {
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					color: #ff951d;
					font-weight: bold;
				}

				.remark {
					padding-top: 5rpx;
					color: #999999;
					font-size: 22rpx;
				}
			}

			.resident {
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 30rpx;
					padding-bottom: 30rpx;
					border-bottom: 2rpx #f5f5f5 solid;
					border-top: 2rpx #f5f5f5 solid;
					top: 2rpx #f5f5f5 solid;
					color: #333333;
					font-size: 28rpx;

					.btn-edit {
						background-color: #ff951d;
						border: 0;
						color: #ffffff;
						padding: 5rpx 10rpx;
						line-height: 50rpx;
					}

				}

				.item:first-child {

					border-bottom: 0rpx;
					border-top: 0rpx;
				}

				.item:last-child {
					padding-bottom: 20rpx;
					border-bottom: 0rpx;
				}
			}

			.amount {
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 15rpx;
					padding-bottom: 15rpx;
					color: #333333;
					font-size: 28rpx;

					.right {
						font-weight: bold;
						font-size: 24rpx;

						.grey-txt {
							color: #999999;
						}

						.act-txt {
							color: #ff951d;
						}

					}
				}

				.item:first-child {
					padding-top: 0rpx;
				}

				.item:last-child {
					padding-bottom: 10rpx;
				}

				.total {
					border-top: 2rpx #f5f5f5 solid;
					padding-top: 20rpx;
					text-align: right;

					.number {
						font-size: 30rpx;
						font-weight: bold;
						color: #ff951d;
					}
				}
			}
		}
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;

		.left {
			padding: 0 30rpx;

			.total-number {
				font-size: 46rpx;
				font-weight: bold;
				color: #ff951d;
			}
		}

		.right {
			width: 60%;

			.btn {
				border-radius: 90rpx;
				border: none;
				background-color: #333333;
				color: #fffff;
				margin-right: 20rpx;
				line-height: 90rpx;
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
