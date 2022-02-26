<template>
	<view>
		<view class="login" v-if="!loginAuth">
			<uni-icons type="contact" size="100" color="#dddddd"></uni-icons>
			<view class="txt">您尚未登录，请登录后查看</view>
			<button class="btn" type="primary" size="default" @tap="isLogin">登录/注册</button>
		</view>
		<view v-else>
			<page-load v-if="pageshow"></page-load>
			<view v-else class="uni-padding-wrap uni-common-mt">
				<view style="background-color: #ffffff;">
					<uni-segmented-control :current="current" :values="items" style-type="text"
						active-color="#ff941d" @clickItem="onClickItem" />
				</view>
				<view class="content">
					<view class="order-list" v-if="orderListData.length>0">
						<view class="order-item" v-for="(item ,index) in handleOrderList" :key="index">
							<view class="head">
								<view class="order-number">
									<view class="icon">
										<image class="img" mode="widthFix"
											src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order-list-icon.png">
										</image>
									</view>
									<view class="number">{{item.orderId}}</view>
								</view>
								<view class="order-state">{{ item.state | payStatus }}</view>
							</view>
							<view class="body" @tap="openOrderDetail(item.id)">
								<view class="listings">
									<view class="picture">
										<image class="img" :v-if="item.thum" mode="widthFix" :src="item.thum">
										</image>
									</view>
									<view class="info">
										<view class="title">
											{{item.title}}
										</view>
										<view class="date">
											<view class="in-out">{{item.checkIn}}至{{item.checkOut}}</view>
										</view>
										<view class="status-desc">
											<text class="active">支付金额</text>
											<text class="txt" style="margin-left: 10rpx;">￥{{item.price}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="footer" v-if="item.state===0">

								<view class="l-part">
									<timer :endTime="item.createdAt"></timer>
								</view>
								<button class="btn-hollow" type="default" size="mini"
									@tap="cancelOrder(item.id)">取消订单</button>
								<button class="btn-solid" type="default" size="mini" @tap="payWX(item.id)">立即支付</button>

							</view>
							<view class="footer" v-if="item.state===1">
								<button class="btn-solid" type="default" size="mini"
									@tap="customerService()">联系客服</button>
							</view>
							<view class="footer" v-if="item.state===3">
								<button class="btn-hollow" type="default" size="mini"
									@tap="delOrder(item.id)">删除订单</button>
								<button class="btn-solid" type="default" size="mini"
									@tap="openListingsDetail(item)">再次预定</button>
							</view>
							<view class="footer" v-if="item.state===9">
								<button class="btn-hollow" type="default" size="mini"
									@tap="delOrder(item.id)">删除订单</button>
								<button class="btn-solid" type="default" size="mini"
									@tap="openListingsDetail(item)">再次预定</button>
							</view>
						</view>
					</view>
					<view class="none-data" v-else>
						<view class="img-signal">
							<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/no-data.png">
							</image>
							<text>暂无订单</text>
						</view>
					</view>
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
		orderList,
		delOrder,
		cancelOrder,
		payWX,
	} from '@/utils/request/manage.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	import timer from '@/components/djs/djs'
	import moment from 'moment'
	export default {
		components: {
			pageLoad,
			timer
		},
		data() {
			return {
				items: ['全部', '待付款', '待入住', '已完成'],
				current: 0,
				state: '',
				btnnum: 0,
				orderListData: [],
				handleOrderList:[],
				// show_lists: '',
				pageshow: true,
				loginAuth: null,
				totalPage:0,
				page:1,
			}
		},
		computed: {
			...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
		},
		mounted() {
			// this.show_lists = this.orderListData

		},
		onLoad() {
			this.isLogin()
		},
		onShow() {
			this.getOrderList()
		},
		filters: {
			payStatus(value) {
				let obj = {
					0: '待支付',
					1: '已支付',
					2: '支付失败',
					3: '用户取消',
					4: '平台取消',
					5: '已退款',
					9: '已完成',
				}
				return obj[value]
			},
		},
		watch: {
			current(value) {
				switch (value) {
					case 1:
						this.state = 0;
						break;
					case 2:
						this.state = 1;
						break;
					case 3:
						this.state = 9;
						break;

					default:
						this.state = null;
						break;
				}
				this.page = 1
				this.getOrderList()

			},
		},
		methods: {

			onClickItem(e) {
				this.btnnum = e
				console.log(e.currentIndex)
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			async getOrderList() {
				if(uni.getStorageSync('current') || uni.getStorageSync('state')){
					if(uni.getStorageSync('state') == -1){
						this.current = uni.getStorageSync('current')
						this.state = ""
					}else{
						this.current = uni.getStorageSync('current')
						this.state = uni.getStorageSync('state')
					}
					uni.removeStorageSync('current')
					uni.removeStorageSync('state')
				}
				const {
					data: res
				} = await orderList(this.state,this.page,10)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.totalPage = res.data.pages
					if (this.page == 1) {
						this.orderListData = res.data.rs
						this.pageshow = false
						this.orderListData = this.orderListData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a
							.createdAt).getTime())
						this.handleOrder()
					} else {
						this.orderListData = this.orderListData.concat(res.data.rs)
						this.pageshow = false
						this.orderListData = this.orderListData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a
							.createdAt).getTime())
						this.handleOrder()
					}
				}
			},
			async delOrder(id) {
				this.pageshow = true
				const {
					data: res
				} = await delOrder(id)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {}
				this.getOrderList()
				this.pageshow = false
			},
			async cancelOrder(id) {
				this.pageshow = true
				const {
					data: res
				} = await cancelOrder(id)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {

					console.log("res", res)

				}
				this.getOrderList()
				this.pageshow = false
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
			openOrderDetail(id) {
				uni.navigateTo({
					url: '../order/order-detail?id=' + id
				})
			},
			customerService() {
				uni.navigateTo({
					url: '../news/customer-service'
				})
			},
			openListingsDetail(item) {
				uni.navigateTo({
					url: '../listings/listings-detail?id=' + item.hid
				})
			},
			isLogin() {
				this.loginAuth = uni.getStorageSync('loginAuth')
				if (!this.loginAuth) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
			},
			handleOrder() {
				let today = moment().format("YYYY-MM-DD")
				let aaa = []
				if(this.state == 0 || this.state == null){
					this.handleOrderList=this.orderListData
				}
				if(this.state == 9){
					this.handleOrderList= []
					this.orderListData.find(item => {
						if (item.checkOut < today && item.state == 1) {
							this.handleOrderList.push(item)
							// item.state = 9
							return
						}
					})
				}
				if (this.state == 1) {
					this.handleOrderList= []
					this.orderListData.find(item => {
						if (item.checkOut >= today && item.state == 1 && item.state != 5) {
							this.handleOrderList.push(item)
							return
						}
					})
					
				}
				if (this.state == 1) {
					this.handleOrderList= []
					this.orderListData.find(item => {
						if (item.checkOut >= today && item.state == 1 && item.state != 5) {
							this.handleOrderList.push(item)
							return
						}
					})
				}
			},
			onReachBottom() {
			
				if (this.page >= this.totalPage) {
					return
				} else {
					this.page += 1
					this.getOrderList(this.state)
				}
			},

		}
	}
</script>

<style scoped lang="scss">
	.login {
		padding: 150rpx 50rpx;
		text-align: center;

		.txt {
			margin: 30rpx auto;
		}

		.btn {
			background: linear-gradient(0deg, rgba(221, 135, 12, 1) 0%, rgba(255, 202, 73, 1) 100%);
			color: #ffffff;
			border-radius: 40rpx;
			width: 50%;
			margin: 0 auto;
		}
	}

	.order-list {
		margin: 30rpx;

		.order-item {
			width: 94%;
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 3%;
			margin-bottom: 30rpx;

			.head {
				padding-bottom: 20rpx;
				border-bottom: 2rpx #f5f5f5 solid;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.order-number {
					display: flex;
					align-items: center;
					color: #666666;
					font-size: 24rpx;

					.icon {
						width: 30rpx;
						height: 30rpx;

						.img {
							width: 100%;
						}
					}
				}

				.order-state {
					color: #ff951d;
				}
			}

			.body {
				padding: 20rpx 0;
				border-bottom: 2rpx #f5f5f5 solid;

				.listings {
					display: flex;
					justify-content: space-between;

					.picture {
						width: 35%;
						height: 140rpx;
						overflow: hidden;
						border-radius: 8rpx;
						margin-right: 5%;

						.img {
							width: 100%;
						}
					}

					.info {
						width: 60%;

						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-weight: bold;
							color: #333333;
							font-size: 30rpx;
						}

						.date {
							color: #666666;
							font-size: 26rpx;
							padding: 10rpx 0;
						}

						.status-desc {
							color: #666666;
							font-size: 26rpx;

							.active {
								color: #ff951d;
							}
						}
					}
				}
			}

			.footer {
				padding-top: 20rpx;
				text-align: right;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.btn-solid {
					border-radius: 60rpx;
					border: none;
					background-color: #333333;
					color: #ffffff;
					margin: 0 10rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					border: none;
				}

				.btn-hollow {
					border-radius: 60rpx;
					border: none;
					background-color: transparent;
					color: #999999;
					border: 2rpx #cccccc solid;
					margin: 0 10rpx;
					line-height: 60rpx;
					font-size: 26rpx;
				}

				.l-part {
					font-size: 24rpx;
					color: #ed7961;
					padding: 0 20rpx;
				}
			}

		}
	}

	.none-data {

		border-radius: 8rpx;
		padding: 20rpx;
		margin: 30rpx 0;
		text-align: center;

		.img-signal {
			width: 300rpx;
			height: 300rpx;
			margin: 0 auto;

			.img {
				width: 100%;
			}
		}

	}

	/deep/ button::after {
		border: none;
	}
</style>
