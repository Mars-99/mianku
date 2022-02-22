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
					<view class="item" v-if="userDetail.isFirst == 1">
						<view class="left">首单立减</view>
						<view class="right">
							<text class="act-txt">-￥{{listingsDetail.hotel.firstReduce}}</text>
						</view>
					</view>
					<view class="item" v-if="userDetail.examine == 1">
						<view class="left">学生特权</view>
						<view class="right">
							<text class="act-txt">享9.5折</text>
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
							<text class="act-txt" v-if="canUseCoupon.length>0" @tap="openCoupon()">选择优惠券</text>
							<text class="grey-txt" v-else>无可用优惠</text>
						</view>
					</view>
					<view class="total">
						合计：<text class="number">￥{{payPice}}</text>
					</view>
				</view>
			</view>
			<view class="bottom-nav">
				<view class="left">
					<view class="total-number">
						￥{{payPice}}
					</view>
				</view>
				<view class="right">
					<button class="btn" type="primary" size="default" @tap="submitOrders()">确认支付</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="coupon-list">
				<view class="title">可用优惠券</view>
				<view class="coupon-item" v-for="(coupon ,index) in canUseCoupon" :key="index">
					<view class="l-part">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
						</image>
						<view class="cont" v-if="coupon.type == 2">
							<view class="t-txt">{{coupon.discount}}</view>
							<view class="b-txt">享房源{{coupon.discount}}折</view>
						</view>
						<view class="cont" v-else>
							<view class="t-txt"><text class="txt">￥</text>{{coupon.deduct}}</view>
							<view class="b-txt">满{{coupon.restrict}}-{{coupon.deduct}}</view>
						</view>
					</view>
					<view class="r-part">
						<view class="title">{{coupon.title}}</view>
						<view class="b-cont">
							<view class="l-txt">
								<text class="txt" v-if="coupon.invalidAt">有效期:{{coupon.invalidAt}}</text>
								<text class="txt" v-else>永久有效</text>
							</view>
							<view class="r-btn">
								<button :class="[isCoupon==index ? 'btn-act' : 'btn']" type="primary" size="default"
									@tap="selectCoupon(coupon,index)">使用</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		hotelDetail,
		booking,
		payWX,
		userDetail,
		getCouponList,
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
				couponId: -1, //优惠券id
				orderNumber: 0,
				payPice: 0,
				userDetail: {},
				couponList: [],
				canUseCoupon: [],
				isCoupon: -1,
				couponPice: null,
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
				this.dayCount = this.$mp.query.dayCount
				this.totalPice = this.$mp.query.totalPice
				this.listingsDetail = data.data
				this.pageshow = false

				const {
					data: res
				} = await userDetail()
				this.userDetail = res.data
				console.log("this.userDetail", this.userDetail)
				this.countPice()
				this.getCoupon()

			},
			countPice() {
				//判断是不是首单，不是首单的话首单价格设置为0
				if (this.userDetail.isFirst == 0) {
					this.listingsDetail.hotel.firstReduce = 0
				}
				//判断是不是学生认证
				if (this.userDetail.examine == 1) {
					//判断优惠券是不是整数，整数为满减或抵扣，直接减数值
					if (this.couponPice % 1 === 0) {
						this.payPice = (Number(this.totalPice) - Number(this.couponPice) + Number(this.listingsDetail.hotel.cleaningFee) -
							Number(this
								.listingsDetail.hotel.firstReduce))* 0.95
						this.payPice = this.payPice.toFixed(2)
					} else {//不是整数为小数说明是折扣，总价乘以折扣
						this.payPice = (Number(this.totalPice) * Number(this.couponPice) + Number(this.listingsDetail
								.hotel
								.cleaningFee) -
							Number(this
								.listingsDetail.hotel.firstReduce)) * 0.95
						this.payPice = this.payPice.toFixed(2)
					}
				} else {//不是学生认证用户价格计算
					if (this.couponPice % 1 === 0) {//同上，判断是不是整数，获得是折扣优惠还是满减或抵扣
						this.payPice = Number(this.totalPice) + Number(this.listingsDetail.hotel.cleaningFee) -
							Number(this
								.listingsDetail.hotel.firstReduce) - Number(this.couponPice)
						this.payPice = this.payPice.toFixed(2)
					} else {
						this.payPice = Number(this.totalPice) * Number(this.couponPice) + Number(this.listingsDetail.hotel
								.cleaningFee) -
							Number(this
								.listingsDetail.hotel.firstReduce)
						this.payPice = this.payPice.toFixed(2)
					}
				}
				console.log("aaa", this.couponPice)
			},
			async getCoupon() {
				const {
					data: res
				} = await getCouponList(0)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.couponList = res.data.rs //我的优惠券列表
					// this.listingsDetail.hotel.cityId   //订单房源城市id
					// this.listingsDetail.hotel.id    //订单房源id
					// this.totalPice  //订单房源总价
					// this.listingsDetail.hotel.coupon0
					// this.listingsDetail.hotel.coupon1
					// this.listingsDetail.hotel.coupon2

					let can_use = [] //能用的优惠券列表
					this.couponList.forEach(item => {
						if (item.cityId === 0 || item.cityId === this.listingsDetail.hotel.cityId) {
							if ((item.type === 0 && this.listingsDetail.hotel.coupon0 === 1) || (item.type ===
									1 && this.listingsDetail.hotel.coupon1 === 1) || (item.type === 2 && this
									.listingsDetail.hotel.coupon2 === 1)) {
								let select_obj = null
								if (item.gids) {
									let arr = item.gids.split(',')
									select_obj = arr.find(obj => {
										return obj = this.listingsDetail.hotel.id
									})
								}
								if (item.gType === 0 || (item.gType === 1 && select_obj)) {
									if (item.restrict === 0 || this.totalPice >= item.restrict) {
										can_use.push(item)
									}
								}
							}
						}
					})
					this.canUseCoupon = can_use
					console.log("this.canUseCoupon", this.canUseCoupon)
				}
			},
			openCoupon() {
				this.$refs.popup.open('bottom')
			},
			selectCoupon(item, index) {
				this.isCoupon = index
				this.couponId = item.id
				if (item.type == 2) {
					this.couponPice = item.discount / 10
					console.log("this.couponPice1", this.couponPice)
				} else {
					this.couponPice = item.deduct
					console.log("this.couponPice2", this.couponPice)
				}
				this.countPice()
				this.$refs.popup.close()

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

	.coupon-list {
		border-radius: 50rpx 50rpx 0 0;
		background-color: #ffffff;
		padding: 30rpx;
		overflow-y: scroll;
		background-color: #ffffff;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding: 30rpx 0;
		}

		.coupon-item {
			background-color: #f5f5f5;
			border-radius: 8rpx;
			padding: 20rpx;
			width: 90%;
			margin: 20rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: left;

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
					text-align: left;
					padding: 10rpx;
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
						border: 2rpx #ed5454 solid;
						line-height: 50rpx;
						font-size: 24rpx;
						color: #ed5454;
						background-color: #ffffff;
					}

					.btn-act {
						border-radius: 40rpx;
						border: none;
						background-color: #ed5454;
						color: #ffffff;
						line-height: 50rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
