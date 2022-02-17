<template>
	<view class="content" :style="'overflow:'+(show?'hidden':'visible')">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="picture">
				<uni-swiper-dot :info="listingsDetail.pics" :current="current" field="content" :mode="mode">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item ,index) in listingsDetail.pics" :key="index">
							<view class="swiper-item">
								<image mode="widthFix" v-if="item.url.length" :src="item.url">
								</image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
				<view class="price">
					<text
						class="act">￥{{week===6 ||week===5?listingsDetail.hotel.weekendActivity:listingsDetail.hotel.weekdaysActivity}}</text>
					<text>/晚</text>
				</view>
			</view>
			<view class="detail-cont">
				<view class="description">
					<view class="title">
						{{listingsDetail.hotel.hotelName}}
					</view>
					<view class="info">
						<text class="txt">整套房源</text> ·
						<text class="txt">{{listingsDetail.hotel.houseType}}</text> ·
						<text class="txt">可住{{listingsDetail.hotel.bedNum}}人</text>
					</view>
					<view class="char">
						<text class="char-active" v-for="(bq ,key) in flag" :key="key" v-if="bq">{{bq|flag}}</text>
						<view class="txt" :v-if="listingsDetail.hotel.infrastructure.indexOf('投影仪') != -1">投影仪</view>
						<view class="txt" v-if="listingsDetail.hotel.tag.indexOf('近地铁') != -1">近地铁</view>
						<view class="txt" v-if="listingsDetail.hotel.service.indexOf('自主入住') != -1">自主入住</view>
						<view class="txt" v-if="listingsDetail.hotel.rules.indexOf('允许聚会') != -1">允许聚会</view>
					</view>
					<view class="date">
						<view class="reveal">
							<text class="txt check-in">入住{{checkInYH}}</text>
							<text class="txt check-out">离店{{checkOutYH}}</text>
							<text class="txt">共{{dayCount}}晚</text>
						</view>
						<view class="select" @tap="selectDate()">修改日期</view>
					</view>
					<view class="location">
						<view class="wz">
							<uni-icons type="location-filled" size="34" color="#ff941d"></uni-icons>
							<text>{{listingsDetail.hotel.address}}</text>
						</view>
						<view class="dh">
							<uni-icons type="phone-filled" size="34" color="#ff941d" @tap="call_phone()"></uni-icons>
						</view>
					</view>
				</view>
				<view class="overview">
					<uni-title type="h3" title="房源概况" align="left"></uni-title>
					<view class="icon-list">
						<view class="icon-item">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/overview-icon-fx.png">
							</image>
							<view class="label-above">整套</view>
							<view class="label-under">{{listingsDetail.hotel.houseType}}</view>
						</view>
						<view class="icon-item">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/overview-icon-cw.png">
							</image>
							<view class="label-above">{{listingsDetail.hotel.bedType}}张床</view>
							<view class="label-under">{{listingsDetail.hotel.bedType}}</view>
						</view>
						<view class="icon-item">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/overview-icon-wy.png">
							</image>
							<view class="label-above">一独卫</view>
							<view class="label-under"></view>
						</view>
						<view class="icon-item">
							<image class="img" mode="widthFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/overview-icon-rs.png">
							</image>
							<view class="label-above">{{listingsDetail.hotel.occupancy}}人</view>
							<view class="label-under">不可加床</view>
						</view>
					</view>
					<view class="introduce">
						<view class="label">介绍</view>
						<view class="txt">
							<rich-text :nodes="listingsDetail.hotel.content"></rich-text>
							<text class="more" @tap="open">查看更多</text>
						</view>
					</view>
					<uni-popup ref="popup" type="bottom" @change="openM" @touchmove.stop.prevent="moveStop">
						<view class="popup-cont">
							<scroll-view scroll-y="true" show-scrollbar="false"
								:style="{'max-height': swiperheight-100 + 'px'}">
								<uni-title type="h2" title="房屋介绍" align="center"></uni-title>
								<rich-text :nodes="listingsDetail.hotel.content"></rich-text>
							</scroll-view>
						</view>
					</uni-popup>
				</view>

				<view class="facility">
					<view class="head">
						<uni-title type="h3" title="服务设施" align="left"></uni-title>
						<!-- <view class="more">
								88项设施
							</view> -->
					</view>
					<view class="facility-cont-list">
						<view class="facility-cont-item" v-if="infrastructure">
							<view class="label">基础设施</view>
							<view class="genus-list">
								<view class="genus-item" v-for="(jcss ,jc) in infrastructure" :key="jc">
									<uni-icons type="checkbox" size="14" color="#ff951d"></uni-icons>
									<text class="txt">{{jcss}}</text>
								</view>
							</view>
						</view>
						<view class="facility-cont-item" v-if="security">
							<view class="label">安全设施</view>
							<view class="genus-list">
								<view class="genus-item" v-for="(aqss ,aq) in security" :key="aq">
									<uni-icons type="checkbox" size="14" color="#ff951d"></uni-icons>
									<text class="txt">{{aqss}}</text>
								</view>
							</view>
						</view>
						<view class="facility-cont-item" v-if="service">
							<view class="label">服务设施</view>
							<view class="genus-list">
								<view class="genus-item" v-for="(fwss ,fw) in service" :key="fw">
									<uni-icons type="checkbox" size="14" color="#ff951d"></uni-icons>
									<text class="txt">{{fwss}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="around">
					<view class="head">
						<uni-title type="h3" title="周边位置" align="left"></uni-title>
						<view class="more" @tap="openDetailMap()">
							地图·周边
						</view>
					</view>
					<view class="cont-map">
						<map style="width: 100%; height: 450rpx;" :latitude="latitude" :longitude="longitude"
							:markers="markers">
						</map>
					</view>
				</view>

				<view class="notice">
					<view class="booking">
						<uni-title type="h3" title="预定须知" align="left"></uni-title>
						<view class="notice-cont">
							<view class="notice-item">
								<view class="label">无须押金：</view>
								<view class="txt">免押金入住，订房更轻松</view>
							</view>
							<view class="notice-item">
								<view class="label">清洁费：</view>
								<view class="txt">免清洁费</view>
							</view>
						</view>
					</view>
					<view class="checkin">
						<uni-title type="h3" title="入住须知" align="left"></uni-title>
						<view class="notice-cont">
							<view class="notice-item">
								<view class="label">入离时间：</view>
								<view class="txt">{{listingsDetail.hotel.checkExplain}}</view>
							</view>
							<view class="notice-item">
								<view class="label">接待时间：</view>
								<view class="txt">全天{{listingsDetail.hotel.receptionTime}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="recommend">
					<uni-title type="h3" title="周边相似房源" align="left"></uni-title>
					<view class="recommend-list">
						<view class="recommend-item" @tap="openListingsDetail(item)"
							v-for="(item ,index) in listingsDetail.resembleHotels" :key="index">
							<view class="picture">
								<image class="img" mode="widthFix" :src="item.thum">
								</image>
							</view>
							<view class="description">
								<view class="cont">
									<view class="info">
										<text class="txt">整套房源</text>
										<text class="txt">{{item.houseType}}</text>
										<text class="txt">可住{{item.occupancy}}人</text>
									</view>
									<view class="title">
										{{item.hotelName}}
									</view>
									<view class="price">
										<view class="CP">￥{{item.weekdaysActivity}}</view>
										<view class="OP">￥{{item.weekdaysOriginal}}</view>
										<view class="wan">/晚</view>
									</view>
								</view>
							</view>
							<view class="collect">
								<uni-icons type="star" size="30" color="#ffffff" v-if="true"></uni-icons>
								<uni-icons type="star-filled" size="30" color="#ff951d" v-else></uni-icons>
							</view>
						</view>
					</view>
				</view>

			</view>

			<view class="bottom-nav">
				<view class="left">
					<view class="price">
						<view class="sz">
							<!-- <view class="CP" v-if="totalPice==null">
								￥{{week===6 ||week===5?listingsDetail.hotel.weekendActivity:listingsDetail.hotel.weekdaysActivity}}
							</view> -->
							<view class="CP">
								￥{{totalPice}}
							</view>
						</view>
						<view>
							共{{dayCount}}晚
						</view>
						<!-- <view class="yh" v-if="listingsDetail.hotel.firstReduce">
							首单立减{{listingsDetail.hotel.firstReduce}}
						</view> -->
					</view>
					<view class="sc" @tap="getUserCollection()">
						<uni-icons :type="isCollect==0?'star-filled':'star'" size="30"
							:color="isCollect==0?'#ff941d':'#333333'"></uni-icons>
						<view class="txt">
							收藏房源
						</view>
					</view>
				</view>
				<view class="right">
					<button class="btn" type="primary" size="default" @tap="openOrderConfirm()">立即预定</button>
				</view>
			</view>

			<view class="shishui" v-if="freeTrialShow">
				<view class='l-part'>
					<image class="img" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/shishui.jpg">
					</image>
				</view>
				<view class='c-part'>
					<view class='t-txt'>试睡活动正在进行中，2月28日截止。</view>
					<view class='b-txt'>品质民宿免费住</view>
				</view>
				<view class="r-part">
					<button class="btn" type="primary" size="default"
						@tap="freeTrialApply(listingsDetail.hotel.id)">去报名</button>
					<view class="icon" @tap="freeTrialClose()">
						<uni-icons type="closeempty" size="14" color="#cccccc"></uni-icons>
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
		hotelDetail,
		getUserCollection,
		getCollectionList,
		activityEnroll,
	} from '@/utils/request/manage.js'
	import gcoord from '@/common/gcoord.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	export default {
		components: {
			pageLoad
		},
		data() {
			return {
				curID: 0,
				current: 0,
				mode: 'round',
				choicCurrentIndex: 0,
				title: 'map',
				latitude: 0,
				longitude: 0,
				markers: [{
					width: 30,
					height: 30,
					latitude: 0,
					longitude: 0,
					iconPath: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/map-icon.png',
					callout: {
						content: "",
						borderRadius: 5,
						display: "ALWAYS",
						padding: 7,
						bgColor: "#FFFFFF",
						textAlign: "center",
					}
				}],
				listingsDetail: [],
				flag: [],
				security: [],
				service: [],
				tag: [],
				infrastructure: [],
				swiperheight: 0,
				show: false,
				week: 0,
				check: [],
				pageshow: true,

				checkIn: 0,
				checkOut: 0,
				checkInYH: 0,
				checkOutYH: 0,
				dayCount: 1,

				brand: 0,
				choiceDateArr: [],
				totalPice: 0,

				isCollect: -1,
				collectionList: [],

				freeTrialPage: "",
				freeTrialShow: false,

				orderDate: [],

				share: {
					title: '眠库小程序',
					path: '/pages/index/index',
					imageUrl: '',
					desc: '',
					content: ''
				}
			}
		},
		filters: {
			flag(value) {
				switch (value) {
					case 'h':
						//这里是值对应的处理
						return value = "首单立减";
						break
					case "c":
						return value = "今日特价";
						break
					case "j":
						return value = "新房优惠";
						break
					default:
						break
				}
			},
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
			this.getWeeK()
			this.getHotelDetail()
			// this.getTimeandWeek()
			// console.log(this.markers)
		},
		onShow() {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 1]
			this.brand = prevPage.brand
			if (this.brand) {
				if (this.brand.choiceDate) {
					this.checkIn = this.brand.choiceDate[0].re
					this.checkOut = this.brand.choiceDate[1].re
					this.dayCount = this.brand.dayCount
					this.checkInYH = this.checkIn.slice(5)
					this.checkOutYH = this.checkOut.slice(5)
					this.choiceDateArr = this.brand.choiceDateArr
					this.getTotalPice()
				} else {
					return
				}
			} else {
				return
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			openM(e) {
				this.show = e.show
			},
			openListingsDetail(item) {
				this.checkIn = this.checkIn
				this.checkOut = this.checkOut

				console.log("b", this.checkIn, this.checkOut)
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))

				uni.navigateTo({
					url: '../listings/listings-detail?id=' + item.id + '&checkIn=' + this.checkIn + '&checkOut=' +
						this.checkOut + '&dayCount=' + this.dayCount + '&choiceDateArr=' + choiceDateArr
				})

			},
			openDetailMap() {
				let markers = JSON.stringify(this.markers)
				uni.navigateTo({
					url: '../listings/detail-map?markers=' + markers
				})
			},
			openOrderConfirm() {
				console.log("b", this.checkIn, this.checkOut)
				this.checkIn = this.checkIn
				this.checkOut = this.checkOut
				uni.navigateTo({
					url: '../order/order-confirm?id=' + this.listingsDetail.hotel.id + '&checkIn=' + this.checkIn +
						'&checkOut=' +
						this.checkOut + '&dayCount=' + this.dayCount + '&totalPice=' + this.totalPice
				})

			},
			open(e) {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			},
			async getHotelDetail() {
				
				const {
					data
				} = await hotelDetail(Number(this.$mp.query.id))
				this.checkIn = this.$mp.query.checkIn
				this.checkOut = this.$mp.query.checkOut
				this.dayCount = this.$mp.query.dayCount
				this.checkInYH = this.checkIn.slice(5)
				this.checkOutYH = this.checkOut.slice(5)
				this.freeTrialPage = this.$mp.query.pageRoot
				this.freeTrial()
				console.log('freeTrialPage', this.freeTrialPage)

				if (this.$mp.query.choiceDateArr) {
					this.choiceDateArr = JSON.parse(decodeURIComponent(this.$mp.query.choiceDateArr))
				}
				// console.log("choiceDateArr",this.choiceDateArr)
				this.listingsDetail = data.data
				this.orderDate = data.data.onOrder
				console.log("orderDate", this.orderDate)
				this.getCollectionList(0)
				if (this.dayCount == 1) {
					if (this.week === 6 || this.week === 5) {
						this.totalPice = this.listingsDetail.hotel.weekendActivity
					} else {
						this.totalPice = this.listingsDetail.hotel.weekdaysActivity
					}
				} else {
					this.getTotalPice()
				}

				this.flag = data.data.hotel.flag.split(',')
				this.security = data.data.hotel.security.split(',')
				this.service = data.data.hotel.service.split(',')
				this.tag = data.data.hotel.tag.split(',')
				this.infrastructure = data.data.hotel.infrastructure.split(',')
				//百度坐标转高德坐标
				let result = gcoord.transform(
					[data.data.hotel.mapLng, data.data.hotel.mapLat], // 经纬度坐标
					gcoord.BD09, // 当前坐标系
					gcoord.GCJ02 // 目标坐标系
				);
				this.latitude = result[1];
				this.longitude = result[0];
				this.markers[0].latitude = result[1]
				this.markers[0].longitude = result[0];
				this.markers[0].callout.content = data.data.hotel.address

				this.pageshow = false
				//历史浏览记录
				let historyList = uni.getStorageSync('history_list')
				if (!historyList) {
					historyList = []
					historyList.unshift(data.data.hotel)
				} else {
					let selectobj = historyList.find(obj => {
						return obj.id === data.data.hotel.id
					})
					if (!selectobj) {
						historyList.unshift(data.data.hotel)
					}
				}
				//历史浏览记录超过10个，则删除最早浏览的记录
				if (historyList.length > 10) {
					historyList.pop()
				}
				this.Share()
				uni.setStorageSync('history_list', historyList)

			},
			call_phone() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '18684764310',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
			},
			moveStop() {
				return
			},
			getWeeK() {
				var now = new Date();
				var num = now.getDay(now)
				this.week = num
			},
			selectDate() {

				let orderDate = JSON.stringify(this.orderDate)
				// let orderDate = JSON.stringify(this.orderDate)
				uni.navigateTo({
					url: '../select-date/select-date?pageSource=listingsDetail' + '&weekendActivity=' + this
						.listingsDetail.hotel.weekendActivity + '&weekdaysActivity=' + this.listingsDetail.hotel
						.weekdaysActivity + '&orderDate=' + orderDate
				})
			},
			getTimeandWeek() {
				//获取当前时间
				var now = new Date();
				//往后几天就循环几次
				for (let i = 0; i < 7; i++) {
					//24 * 3600 * 1000 就是计算一天的时间  
					var date = new Date(now.getTime() + i * 24 * 3600 * 1000);
					var year = date.getFullYear();
					var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
					var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
					var dt2 = new Date(now.getTime() + i * 24 * 3600 * 1000);
					var weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
					//把七天的时间和星期添加到数组中
					this.check.push({
						date: year + '-' + month + '-' + day,
						week: weekDay[dt2.getDay()],
						checked: false

					});
				}
				this.checkIn = this.check[0].date
				this.checkOut = this.check[1].date
				this.checkInYH = this.check[0].date.slice(5)
				this.checkOutYH = this.check[1].date.slice(5)

			},
			getTotalPice() {
				if (this.choiceDateArr.length > 0) {
					for (var i = 0; i < this.choiceDateArr.length; i++) {
						if (this.choiceDateArr[i].week == '五' || this.choiceDateArr[i].week == '六') {
							this.choiceDateArr[i].price = this.listingsDetail.hotel.weekendActivity
						} else {
							this.choiceDateArr[i].price = this.listingsDetail.hotel.weekdaysActivity
						}
					}
					this.totalPice = null
					for (var i = 0; i < this.choiceDateArr.length - 1; i++) {
						this.totalPice += this.choiceDateArr[i].price
					}
					this.totalPice = this.totalPice.toFixed(2)
				} else {
					if (this.week === 6 || this.week === 5) {
						this.totalPice = this.listingsDetail.hotel.weekendActivity
					} else {
						this.totalPice = this.listingsDetail.hotel.weekdaysActivity
					}
				}
				// console.log("price", this.totalPice)
			},
			// 收藏点击事件 刘慧
			async getUserCollection() {
				this.isCollect
				let current_user = uni.getStorageSync('userinfo')
				if (!current_user) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
				console.log('aaaaaa', this.listingsDetail.hotel.id)
				const {
					data
				} = await getUserCollection(this.listingsDetail.hotel.id, 0)
				console.log(data)
				if (data.code == 1) {
					this.$api.msg(data.code.msg)
				} {
					if (this.isCollect == 0) {
						this.isCollect = -1
					} else {
						this.isCollect = 0
					}
				}

				//根据data的返回值来判断收藏样式变更
			},
			async getCollectionList(type) {
				const {
					data: res
				} = await getCollectionList(type)
				if (res.code == 1) {
					this.$api.msg(data.code.msg)
				} else {
					this.collectionList = res.data.rs
					console.log("收藏列表", this.collectionList)
					let isCollect = this.collectionList.find(item => item.cid == this.listingsDetail.hotel.id)
					if (isCollect) {
						console.log("isCollect", isCollect)
						if (isCollect.cid == this.listingsDetail.hotel.id) {
							this.isCollect = 0
						} else {
							this.isCollect = -1
						}
					} else {
						return
					}
				}
			},
			freeTrial() {
				if (this.freeTrialPage == "试睡") {
					this.freeTrialShow = true
				} else {
					this.freeTrialShow = false
				}
			},
			freeTrialClose() {
				this.freeTrialShow = false
			},
			async freeTrialApply(hid) {
				let current_user = uni.getStorageSync('userinfo')
				const {
					data: res
				} = await activityEnroll(hid, current_user.userName, current_user.phone)
				if (res.code == 1) {
					// // this.$api.msg(res.code.msg)
					// let msg = this.$api.msg(res.code.msg)
					// console.log("res.code.msg",res.msg)
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 2000,
						position: 'top'
					})

				} else {
					uni.navigateTo({
						url: "../free-trial/free-trial-result?id=" + this.listingsDetail.hotel.id
					})
				}
			},
			Share(){
				this.share.title = this.listingsDetail.hotel.hotelName
				this.share.path = '@/listings/listings-detail?id=' + this.listingsDetail.hotel.id
				this.share.imageUrl = this.listingsDetail.hotel.thum
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {

		padding-bottom: 120rpx;

		.bottom-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 666;
		}
	}

	.picture {
		position: relative;

		.swiper-box {
			height: 500rpx;
		}

		.swiper-item {
			height: 500rpx;
			overflow: hidden;
		}

		.swiper-item>image {
			width: 100%;
		}

		.price {
			position: absolute;
			left: 50rpx;
			bottom: 100rpx;
			background: rgba($color: #000000, $alpha: 0.6);
			color: #cccccc;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			padding: 10rpx;

			.act {
				color: #ff941d;
				font-size: 34rpx;
				font-weight: bold;
			}
		}

		/deep/.uni-swiper__dots-box {
			justify-content: flex-end !important;
			padding-right: 50rpx;
			padding-bottom: 100rpx;

		}
	}

	.detail-cont {
		margin-top: -80rpx;

		.description {
			background-color: #ffffff;
			border-radius: 50rpx 50rpx 0 0;
			padding: 30rpx;
			position: relative;
			z-index: 2;

			.info {
				font-size: 24rpx;
				padding: 10rpx 0;

				.txt {
					padding-right: 10rpx;
					user-select: none;
				}
			}

			.title {
				font-size: 34rpx;
				font-weight: bold;
				padding: 10rpx 0;
			}

			.char {
				padding: 10rpx 0;

				.char-active {
					color: #ff951d;
					background-color: #ffe9d7;
					border: 2rpx #fcc79b solid;
					border-radius: 24rpx;
					padding: 5rpx 20rpx;
					margin-right: 10rpx;
					font-size: 20rpx;
					display: inline-block;
					margin-bottom: 10rpx;
				}

				.txt {
					font-size: 20rpx;
					background-color: #f3f3f3;
					border-radius: 24rpx;
					padding: 5rpx 20rpx;
					margin-right: 10rpx;
					color: #999999;
					display: inline-block;
					margin-bottom: 10rpx;
					user-select: none;
				}
			}

			.date {
				border-top: 2rpx #f5f5f5 solid;
				border-bottom: 2rpx #f5f5f5 solid;
				margin: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;

				.reveal {
					color: #666666;

					.check-out {
						margin: 0 20rpx;
					}
				}

				.select {
					color: #ff951d;
				}
			}

			.location {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.wz {
					width: 80%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.dh {
					width: 20%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: column;
					border-left: 2rpx #f5f5f5 solid;
				}
			}
		}
	}

	.overview {
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		background-color: #ffffff;

		.icon-list {
			display: flex;
			justify-content: space-between;

			.icon-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 40rpx;

				.img {
					width: 70rpx;
				}

				.label-above {
					font-size: 24rpx;
					color: #261817;
				}

				.label-under {
					font-size: 20rpx;
					color: #666666;
				}
			}
		}

		.introduce {
			border-top: 2rpx #f5f5f5 solid;
			font-size: 24rpx;
			margin-top: 30rpx;
			padding: 20rpx;
			line-height: 40rpx;
			display: flex;
			align-items: flex-start;

			.label {
				width: 10%;
				color: #666666;
			}

			.txt {
				width: 90%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				position: relative;
				line-height: 40rpx;
				max-height: 120rpx;
				user-select: none;
			}

			.txt:after {
				content: "...";
				position: absolute;
				bottom: 0;
				right: 0;
				padding-right: 120rpx;
				padding-left: 4rpx;
				background: linear-gradient(to right, transparent, #ffffff 0%);

			}

			.more {
				color: #ff951d;
				float: right;
				position: absolute;
				bottom: 0;
				right: 5rpx;
				z-index: 9;
				cursor: pointer;
			}
		}


	}

	.facility {
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		background-color: #ffffff;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.more {
				color: #ff951d;
			}
		}

		.facility-cont-list {
			.facility-cont-item {
				display: flex;
				font-size: 24rpx;
				border-bottom: 2rpx #f5f5f5 solid;
				padding: 15rpx 0;

				.label {
					width: 20%;
					color: #261817;
					padding: 20rpx 0;
				}

				.genus-list {
					width: 80%;
					display: flex;
					flex-wrap: wrap;

					.genus-item {
						width: 33.33%;
						padding: 20rpx 0;

						.txt {
							color: #999999;
						}
					}
				}
			}

			.facility-cont-item:last-child {
				border-bottom: 0rpx #f5f5f5 solid;
			}
		}
	}

	.around {
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		background-color: #ffffff;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.more {
				color: #ff951d;
			}
		}
	}

	.notice {
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		background-color: #ffffff;

		.booking {
			border-bottom: 2rpx #f5f5f5 solid;
			padding-bottom: 10rpx;
		}

		.notice-cont {
			font-size: 24rpx;
			color: #333333;

			.notice-item {
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;
			}
		}
	}

	.recommend {
		padding: 0 20rpx;
		background-color: #ffffff;
		margin: 20rpx 0;

		.recommend-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.recommend-item {
				position: relative;
				margin-bottom: 30rpx;
				width: 49%;

				.picture {
					border-radius: 8rpx;
					height: 200rpx;
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 1;

					.img {
						width: 100%;

					}
				}

				.description {
					background-color: #ffffff;
					padding: 0;

					.cont {
						padding-top: 10rpx;

						.info {
							font-size: 22rpx;

							.txt {
								color: #666666;
								margin-right: 10rpx;
							}
						}

						.title {
							font-size: 24rpx;
							font-weight: bold;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							height: 40rpx;
							padding: 10rpx 0;
						}

						.price {
							display: flex;
							align-items: center;
							color: #999999;
							font-size: 24rpx;

							.CP {
								font-size: 38rpx;
								font-weight: bold;
								color: #ff951d;
							}

							.OP {
								font-size: 24rpx;
								color: #999999;
								text-decoration: line-through;
								margin: 0 10rpx;
							}
						}
					}
				}

				.collect {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
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
		z-index: 10;

		.left {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 22rpx;

			.price {
				display: flex;
				align-items: center;
				color: #999999;
				font-size: 24rpx;
				flex-wrap: wrap;

				.sz {
					display: flex;
					align-items: center;

					.CP {
						font-size: 38rpx;
						font-weight: bold;
						color: #ff951d;
					}

					.OP {
						font-size: 24rpx;
						color: #999999;
						text-decoration: line-through;
						margin: 0 10rpx;
					}
				}

				.yh {
					color: #ff951d;
					background-color: #ffe9d7;
					border: 2rpx #fcc79b solid;
					border-radius: 24rpx;
					padding: 2rpx 10rpx;
					margin-right: 10rpx;
					font-size: 20rpx;
					display: inline-block;

				}
			}

			.sc {
				width: 120rpx;
				font-size: 20rpx;
				text-align: center;
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

	.popup-cont {
		border-radius: 50rpx 50rpx 0 0;
		background-color: #ffffff;
		padding: 30rpx;
		overflow-y: scroll;
		background-color: #ffffff;
	}

	.shishui {
		position: fixed;
		bottom: 120rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		padding: 20rpx 2%;
		width: 90%;
		margin: 0 3%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 11;
		height: 100rpx;
		box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .1);

		.l-part {
			width: 25%;
			height: 100rpx;
			overflow: hidden;
			border-radius: 8rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;

			.img {
				width: 100%;
			}
		}

		.c-part {
			width: 50%;

			.t-txt {
				font-size: 24rpx;
				color: #666666;
			}

			.b-txt {
				font-size: 22rpx;
				color: #999999;
				font-weight: bold;
			}
		}

		.r-part {
			width: 20%;
			position: relative;

			.btn {
				border-radius: 50rpx;
				border: none;
				background-color: #ff941d;
				color: #ffffff;
				line-height: 50rpx;
				font-size: 22rpx;
			}

			.icon {
				position: absolute;
				top: -40rpx;
				right: 0;
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
