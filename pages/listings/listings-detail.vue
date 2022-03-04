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
					<text class="act">￥{{unitPrice}}</text>
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
						<text class="txt">可住{{listingsDetail.hotel.occupancy}}人</text>
					</view>
					<view class="char">
						<text class="char-active" v-for="(bq ,key) in flag" :key="key" v-if="bq">{{bq|flag}}</text>
						<view class="txt" :v-if="listingsDetail.hotel.infrastructure.indexOf('投影仪') != -1">投影仪</view>
						<view class="txt" v-if="listingsDetail.hotel.tag.indexOf('近地铁') != -1">近地铁</view>
						<view class="txt" v-if="listingsDetail.hotel.service.indexOf('自主入住') != -1">自主入住</view>
						<view class="txt" v-if="listingsDetail.hotel.rules.indexOf('允许聚会') != -1">允许聚会</view>
					</view>
					<!-- 优惠券领取功能，暂时不需要 -->
					<!-- <view class="coupon" v-if="couponList.length>0">
						<view class="coupon-item" v-for="(coupon ,key) in couponList" :key="key">
							<view class='l-part'>
								<text class='txt'>{{coupon.type==0?"满减":coupon.type==1?"抵扣":"打折"}}</text>
								<text class='txt'>{{coupon.restrict}}减{{coupon.deduct}}</text>
							</view>
							<view class='r-part'>
								<button class="btn" type="default" size="mini" @tap="receiveCoupon(coupon.id)">领取</button>
							</view>
						</view>
					</view> -->
					<view class="date">
						<view class="reveal">
							<text class="txt check-in">入住{{checkInYH}}</text>
							<text class="txt check-out">离店{{checkOutYH}}</text>
							<text class="txt">共{{dayCount}}晚</text>
						</view>
						<view class="select" @tap="selectDate()">修改日期</view>
					</view>
					<view class="location">
						<view class="wz" @tap="openNavigationMap()">
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
					<button class="btn" type="primary" size="default" v-if="wufang"
						@tap="selectDate()">选择日期暂无房源</button>
					<button class="btn" type="primary" size="default" v-else @tap="openOrderConfirm()">立即预定</button>
				</view>
			</view>

			<view class="shishui" v-if="freeTrialShow">
				<view class='l-part'>
					<image class="img" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/shishui.jpg">
					</image>
				</view>
				<view class='c-part'>
					<view class='t-txt'>试睡活动正在火热报名中...</view>
					<view class='b-txt'>品质民宿免费住</view>
				</view>
				<view class="r-part">
					<button class="btn" type="primary" size="default"
						@tap="freeTrialApply(listingsDetail.hotel.id)">{{isApply?"查看报名":"去报名"}}</button>
					<view class="icon" @tap="freeTrialClose()">
						<uni-icons type="closeempty" size="14" color="#ffffff"></uni-icons>
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
		userDetail,
		getEnrollList,
		getCoupon,
	} from '@/utils/request/manage.js'
	import gcoord from '@/common/gcoord.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	import moment from 'moment'
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
				key:'46ABZ-J7NCF-F4HJ4-N2TB6-T5636-7OBA3',
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

				unitPrice: 0,
				originalPrice: 0,

				brand: 0,
				choiceDateArr: [],
				totalPice: 0,

				isCollect: -1,
				collectionList: [],

				freeTrialPage: "",
				freeTrialShow: false,
				isApply: false,

				orderDate: [],
				newArrDate: [],
				assign: [],
				wufang: false,
				couponList:[],

				share: {
					title: '眠库城市民宿',
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
					if(this.choiceDateArr.length>0){
						this.wufang = false
					}
					this.getTotalPice()
					this.listingStatus()
				} else {
					return
				}
			} else {
				return
			}
		},
		methods: {
			async getHotelDetail() {

				const {
					data
				} = await hotelDetail(Number(this.$mp.query.id))
				this.checkIn = this.$mp.query.checkIn
				this.checkOut = this.$mp.query.checkOut
				if (this.$mp.query.dayCount) {
					this.dayCount = this.$mp.query.dayCount
				}
				if (this.checkOut || this.checkIn) {
					this.checkInYH = this.checkIn.slice(5)
					this.checkOutYH = this.checkOut.slice(5)
				} else {
					this.getTimeandWeek()
				}
				this.freeTrialPage = this.$mp.query.pageRoot
				this.freeTrial()
				if (this.$mp.query.choiceDateArr) {
					this.choiceDateArr = JSON.parse(decodeURIComponent(this.$mp.query.choiceDateArr))
				}
				// console.log("choiceDateArr",this.choiceDateArr)
				this.listingsDetail = data.data
				this.orderDate = data.data.onOrder
				this.assign = data.data.assign
				this.couponList = data.data.beforeCoupon
				//根据名称转换坐标，数据传得坐标值需要做转换，就直接获取新得坐标更方便
				// uni.request({
				// 	url:'https://apis.map.qq.com/ws/geocoder/v1/?address='+this.listingsDetail.hotel.address +'&key='+ this.key,
				// 	success: res=>{
				// 		console.log("res",res)
				// 		this.latitude = res.data.result.location.lat;
				// 		this.longitude = res.data.result.location.lng;
				// 		this.markers[0].latitude = this.latitude
				// 		this.markers[0].longitude = this.longitude;
						
				// 	}
				// })
				// this.markers[0].callout.content = data.data.hotel.address
				// console.log("orderDate", this.orderDate)
				this.getCollectionList(0)
				this.dealPrice()
				this.getTotalPice()
				// if (this.dayCount == 1) {
				// 	this.totalPice = this.unitPrice
				// } else {
				// 	this.getTotalPice()
				// }

				this.flag = data.data.hotel.flag.split(',')
				this.security = data.data.hotel.security.split(',')
				this.service = data.data.hotel.service.split(',')
				this.tag = data.data.hotel.tag.split(',')
				this.infrastructure = data.data.hotel.infrastructure.split(',')
				// 百度坐标转高德坐标
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
				this.listingStatus()
			},
			change(e) {
				this.current = e.detail.current;
			},
			openM(e) {
				this.show = e.show
			},
			openListingsDetail(item) {
				this.checkIn = this.checkIn
				this.checkOut = this.checkOut
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
			openNavigationMap() {
				let markers = JSON.stringify(this.markers)
				uni.navigateTo({
					url: '../listings/navigation-map?markers=' + markers
				})
			},
			openOrderConfirm() {
				let loginAuth = uni.getStorageSync('loginAuth')
				if (!loginAuth) {
					this.$api.href('../login/login')
					return
				}
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
			dealPrice() {
				let day = moment().format("YYYY-MM-DD");
				let assign = this.assign.find(item => item.hDate == day)
				if (assign) {
					this.unitPrice = assign.activityPrice
					this.originalPrice = assign.originalCost
				} else {
					let d = moment().format("d");
					if (d == 5 || d == 6) {
						this.unitPrice = this.listingsDetail.hotel.weekendActivity
						this.originalPrice = this.listingsDetail.hotel.weekendOriginal
					} else {
						this.unitPrice = this.listingsDetail.hotel.weekdaysActivity
						this.originalPrice = this.listingsDetail.hotel.weekdaysOriginal
					}
				}
			},
			call_phone() {
				uni.makePhoneCall({
				 	
				 // 手机号
				    phoneNumber: '15364037300', 
				// 成功回调
				success: (res) => {
				console.log('调用成功!')	
				},
				// 失败回调
				fail: (res) => {
				console.log('调用失败!')
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
				let assign = JSON.stringify(this.assign)
				uni.navigateTo({
					url: '../select-date/select-date?pageSource=listingsDetail' + '&weekendActivity=' + this
						.listingsDetail.hotel.weekendActivity + '&weekdaysActivity=' + this.listingsDetail.hotel
						.weekdaysActivity + '&orderDate=' + orderDate + '&assign=' + assign
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
					this.choiceDateArr.forEach(item => {
						let assign = this.listingsDetail.assign.find(a => a.hDate == item.re)
						if (assign) {
							item.price = assign.activityPrice
						} else {
							if (item.week == "五" || item.week == "六") {
								item.price = this.listingsDetail.hotel.weekendActivity
							} else {
								item.price = this.listingsDetail.hotel.weekdaysActivity
							}
						}
					})
					this.totalPice = null
					for (var i = 0; i < this.choiceDateArr.length - 1; i++) {
						this.totalPice += this.choiceDateArr[i].price
					}
					this.totalPice = this.totalPice.toFixed(2)
				} else {
					this.totalPice = this.unitPrice
				}
				// console.log("price", this.totalPice)
			},
			// 收藏点击事件 刘慧
			async getUserCollection() {
				this.isCollect
				let loginAuth = uni.getStorageSync('loginAuth')
				if (!loginAuth) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
				const {
					data
				} = await getUserCollection(this.listingsDetail.hotel.id, 0)
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
				let loginAuth = uni.getStorageSync('loginAuth')
				if (loginAuth) {
					const {
						data: res
					} = await getCollectionList(type)
					if (res.code == 1) {
						this.$api.msg(data.code.msg)
					} else {
						this.collectionList = res.data.rs
						// console.log("收藏列表", this.collectionList)
						let isCollect = this.collectionList.find(item => item.cid == this.listingsDetail.hotel.id)
						if (isCollect) {
							// console.log("isCollect", isCollect)
							if (isCollect.cid == this.listingsDetail.hotel.id) {
								this.isCollect = 0
							} else {
								this.isCollect = -1
							}
						} else {
							return
						}
					}
				}
			},
			freeTrial() {
				if (this.freeTrialPage == "试睡") {
					this.freeTrialShow = true
					// const {
					// 	data: res
					// } = await getEnrollList()
					let state = this.$mp.query.state
					// let startAt = this.$mp.query.startAt
					
					if (state == 1) {
						this.isApply = true
					}
				} else {
					this.freeTrialShow = false
				}
			},
			freeTrialClose() {
				this.freeTrialShow = false
			},
			async freeTrialApply(hid) {
				if (this.isApply) {
					uni.navigateTo({
						url: "../free-trial/free-trial-result?id=" + this.listingsDetail.hotel.id
					})
				} else {
					const {
						data: res2
					} = await userDetail()
					const {
						data: res
					} = await activityEnroll(hid, res2.data.userName, res2.data.phone)
					if (res.code == 1) {
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
				}
			},
			Share() {
				this.share.title = this.listingsDetail.hotel.hotelName
				this.share.path = '/pages/listings/listings-detail?id=' + this.listingsDetail.hotel.id
				this.share.imageUrl = this.listingsDetail.hotel.thum
			},
			getdiffdate(stime, etime) {
				//初始化日期列表，数组
				var diffdate = new Array();
				var i = 0;
				//开始日期小于等于结束日期,并循环
				while (stime <= etime) {
					diffdate[i] = stime;

					//获取开始日期时间戳
					var stime_ts = new Date(stime).getTime();
					// console.log('当前日期：'+stime   +'当前时间戳：'+stime_ts);

					//增加一天时间戳后的日期
					var next_date = stime_ts + (24 * 60 * 60 * 1000);

					//拼接年月日，这里的月份会返回（0-11），所以要+1
					var next_dates_y = new Date(next_date).getFullYear() + '-';
					var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() +
						1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
					var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() :
						new Date(next_date).getDate();

					stime = next_dates_y + next_dates_m + next_dates_d;

					//增加数组key
					i++;
				}
				diffdate.pop();
				// console.log(diffdate);
				return diffdate;
			},
			listingStatus() {
				if (this.orderDate.length > 0) {
					let orderDate = this.orderDate
					let dateArr = []
					let dateArr2 = []
					orderDate.forEach(date => {
						dateArr.push({
							checkIn: date.checkIn,
							checkOut: date.checkOut
						})
					})
					dateArr.forEach(date2 => {
						dateArr2 += this.getdiffdate(date2.checkIn, date2.checkOut) + ","
					})
					if (dateArr2) {
						this.newArrDate = dateArr2.split(",")
					}
					let choiceDateArr222 = this.choiceDateArr.concat()
					choiceDateArr222.pop()
					choiceDateArr222.forEach(item => {
						let aaa = this.newArrDate.find(order => order == item.re)
						if (aaa) {
							this.wufang = true
						}
					})
					let bbb = this.newArrDate.find(order => order == this.checkIn)
					if (bbb) {
						this.wufang = true
					}
				}
			},
			async receiveCoupon(id){
				const {
					data
				} = await getCoupon(id)
				if (data.code == 1) {
					this.$api.msg(data.code.msg)
					uni.showToast({
						icon: "none",
						title: data.msg,
						duration: 2000,
						position: 'top'
					})
				} else{
					uni.showToast({
						icon: "none",
						title: "领取成功",
						duration: 2000,
						position: 'top'
					})
				}
			},
			// openMap () {
			//       // 选择地图
			//       const self = this
			//       uni.chooseLocation({
			//         success: function (res) {
			//           const { address, latitude, longitude, name } = res
			//           self.markers = {
			//             address, latitude, longitude, name
			//           }
			//         }
			//       })
			//     },
				openLocation () {
				      const { latitude, longitude, name } = this.markers
				      // 打开地图并导航
				      uni.openLocation({
				        latitude,
				        longitude,
				        name,
				        fail: () => {
				          uni.showModal({
				            content: '打开地图失败,请重'
				          })
				        }
				      })
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

			.coupon {
				background-color: #faf4f4;
				padding: 10rpx 20rpx;
				border-radius: 8rpx;
				.coupon-item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 10rpx 0;
					.l-part{
						.txt{
							border: 2rpx #ea7156 solid;
							margin-right: 10rpx;
							font-size: 20rpx;
							padding: 2rpx 10rpx;
							color: #ea7156;
							border-radius: 6rpx;
							
						}
					}
					.r-part{
						.btn{
							border-radius: 30rpx;
							border: none;
							background-color: #ea7156;
							color: #ffffff;
							margin: 0 10rpx;
							font-size: 24rpx;
							padding: 0rpx 20rpx;
							line-height: 40rpx;
						}
					}
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
		background-image: linear-gradient(to left,#ffc312,#ff941d);
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
			width: 45%;

			.t-txt {
				font-size: 24rpx;
				color: #ffffff;
				margin-bottom: 10rpx;
			}

			.b-txt {
				font-size: 22rpx;
				color: #f5f5f5;
				font-weight: bold;
			}
		}

		.r-part {
			width: 25%;
			position: relative;

			.btn {
				border-radius: 50rpx;
				border: none;
				background-color: #333333;
				color: #ffffff;
				line-height: 50rpx;
				font-size: 22rpx;
				padding: 10rpx 0;
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
