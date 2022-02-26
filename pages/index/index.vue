<template>
	<view style="margin-bottom: 120rpx;">
		<!-- 首页轮播图 -->
		<view>
			<uni-swiper-dot :info="listingsBanner" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" :autoplay="true" :interval="3000">
					<swiper-item v-for="(item ,index) in listingsBanner" :key="index">
						<view class="swiper-item">
							<image mode="widthFix" :v-if="item.thum" :src="item.thum">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>

		<!-- 首页筛选区域 -->
		<listingsFilter :curCityName="curCityName" :curCityId="curCityId" :checkIn="checkIn" :checkOut="checkOut"
			:dayCount="dayCount" :choiceDateArr="choiceDateArr" @keywords="getChild" @changeData="getHomeList">
		</listingsFilter>

		<!-- 首页金刚区 -->
		<view class="king-kong">
			<view class="kk-item" @tap="openStudentPrivilege()">
				<view class="kk-title">学生特权</view>
				<view class="kk-img">
					<image mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/kingkong-icon-student.png">
					</image>
				</view>
			</view>
			<view class="kk-item" @tap="openFreeTrialPage()">
				<view class="kk-title">民宿免费住</view>
				<view class="kk-img">
					<image mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/kingkong-icon-mfz.png">
					</image>
				</view>
			</view>
			<view class="kk-item" @tap="openZeroYuanPage()">
				<view class="kk-title">0元领福利</view>
				<view class="kk-img">
					<image mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/kingkong-icon-fuli.png">
					</image>
				</view>
			</view>
			<view class="kk-item" @tap="openListingsTopPage()">
				<view class="kk-title">TOP美宿</view>
				<view class="kk-img">
					<image mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/kingkong-icon-top.png">
					</image>
				</view>
			</view>
		</view>

		<!-- 首页精选民宿 -->
		<view class="choice">
			<view>
				<uni-title type="h1" title="精选民宿 "></uni-title>
			</view>
			<view class="main-picture" @tap="openFindPage()">
				<view>
					<image mode="widthFix" :v-if="choicData[choicCurrentIndex].image"
						:src="choicData[choicCurrentIndex].image">
					</image>
				</view>
				<view class="main-text">
					<h3>{{choicData[choicCurrentIndex].title}}</h3>
					<p>{{choicData[choicCurrentIndex].explanation}}</p>
				</view>
			</view>
			<uni-row class="demo-uni-row" :gutter="10">
				<uni-col :span="8" v-for="(choic ,index) in choicData" :key="index" @tap="clickTba(index)">
					<view class="demo-uni-col">
						<view class="choice-item">
							<image mode="widthFix" :v-if="choic.image" :src="choic.image"
								:style="choicCurrentIndex == index?'opacity: 0.5':'opacity: 0.8'">
							</image>
							<h3>{{choic.title}}</h3>
						</view>
					</view>
				</uni-col>
			</uni-row>
		</view>

		<!-- 首页新品特惠 -->
		<view class="special-column">
			<view>
				<uni-title type="h1" title="新品特惠 "></uni-title>
			</view>
			<uni-row class="demo-uni-row" :gutter="10">
				<uni-col :span="14">
					<view class="demo-uni-col">
						<view class="special-item" @tap="openListingsDiscountPage('h')">
							<image mode="heightFix"
								src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/sdlj-bg.png">
							</image>
							<view class="main-text">
								<h3>首单立减</h3>
								<p>新用户首单最高立减60元</p>
							</view>
						</view>
					</view>
				</uni-col>
				<uni-col :span="10">
					<view class="demo-uni-col">
						<view class="special-item">
							<view class="item" @tap="openListingsDiscountPage('c')">
								<image mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/jrtj-bg.png">
								</image>
								<view class="main-text">
									<h3>今日特价</h3>
									<p>性价比超过房源</p>
								</view>
							</view>
							<view class="item" @tap="openListingsDiscountPage('j')">
								<image mode="widthFix"
									src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/xfth-bg.png">
								</image>
								<view class="main-text">
									<h3>新房特惠</h3>
									<p>每日更新特价房源</p>
								</view>
							</view>
						</view>
					</view>
				</uni-col>
			</uni-row>
		</view>

		<!-- 热门城市 -->
		<view class="hot-city">
			<view>
				<uni-title type="h1" title="热门城市 "></uni-title>
			</view>
			<uni-row class="demo-uni-row" :gutter="10">
				<uni-col :span="6" v-for="(item ,index) in hotCityData" :key="index" @tap="clickHotCity(item)">
					<view class="demo-uni-col city-item">
						<view class="city-item-img">
							<image mode="widthFix" :src="item.thum">
							</image>
						</view>
						<view class="city-item-name">{{item.cityName}}</view>
					</view>
				</uni-col>
				<uni-col :span="6" v-for="(item ,index) in developCity" :key="index" @tap="clickDevelopCity()">
					<view class="demo-uni-col city-item">
						<view class="city-item-img">
							<image mode="widthFix" :src="item.thum">
							</image>
						</view>
						<view class="city-item-name">{{item.cityName}}</view>
					</view>
				</uni-col>

			</uni-row>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import listingsFilter from '../../components/listings-filter/listings-filter.vue'
	import {
		homeList
	} from '@/utils/request/manage.js'
	import getDateTime from '@/common/getdateTime.js';
	export default {
		components: {
			listingsFilter,
		},
		data() {
			return {
				listingsBanner: [], //轮播图
				current: 0,
				mode: 'round',


				checkIn: '选择入住日期',
				checkOut: '选择离店日期',
				dayCount: 1,
				curCityName: '长沙',
				curCityId: 1,
				keywords: '',
				choicCurrentIndex: 0,
				timer: null, //定时器
				choicData: [{
						title: '必睡精品',
						explanation: '最新榜单新鲜出炉',
						image: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/bishui.jpg',
						url: '../must-sleep/must-sleep?curCityId='
					},
					{
						title: '去逛逛',
						explanation: '超多旅游住房攻略推荐',
						image: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/faxian.png',
						url: '../find/find-list?curCityId='
					},
					{
						title: '安心民宿',
						explanation: '安心房源，品质优选',
						image: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/anxin.jpg',
						url: '../listings/listings-list?cityId='
					}
				],
				choicURL: "bbb",
				hotCityData: [],
				staticCity: [{
						cityName: '西安',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/xian.jpg',
					}, {
						cityName: '厦门',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/xiamen.jpg',
					},
					{
						cityName: '青岛',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/qingdao.jpg',
					},
					{
						cityName: '大理',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/dali.jpg',
					}, {
						cityName: '丽江',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/lijiang.jpg',
					},
					{
						cityName: '杭州',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/hangzhou.jpg',
					},
					{
						cityName: '三亚',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/sanya.jpg',
					},
					{
						cityName: '武汉',
						thum: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/wuhan.jpg',
					}
				],
				developCity: [],
				check: [],
				brand: [],
				choiceDateArr: [],
				share: {
					title: '眠库小程序',
					path: '/pages/index/index',
					imageUrl: '',
					desc: '',
					content: ''
				}

			}
		},
		computed: {
			...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
		},
		onLoad() {
			this.init()

		},
		onShow() {

			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 1]
			this.brand = prevPage.brand
			if (this.brand) {
				console.log("bbb", this.brand)
				if (this.brand.name) {
					this.curCityName = this.brand.name
					this.curCityId = this.brand.id;
					this.getHomeList(this.curCityId)
				}
				if (this.brand.choiceDate) {
					var checkIn = this.brand.choiceDate[0].re
					var checkOut = this.brand.choiceDate[1].re
					this.dayCount = this.brand.dayCount
					this.checkIn = checkIn
					this.checkOut = checkOut
					this.choiceDateArr = this.brand.choiceDateArr
				}
			} else {
				return
			}
		},
		computed: {
			// 计算当前图片位置
			choicCurrent() {
				// 如果当前index等等于数组length-1 就return0 否则就当前index加1
				if (this.choicCurrentIndex == this.choicData.length - 1) {
					return 0;
				} else {
					return this.choicCurrentIndex + 1;
				}
			}
		},
		mounted() {
			// 执行定时器
			this.autoPlay();
			this.choicURL = this.choicData[0].url
		},
		methods: {
			// 初始化数据
			init() {
				this.curCityId = 1,
					this.curCityName = '长沙'
				this.getHomeList(this.curCityId)
				this.getTimeandWeek()
			},
			//获取首页数据
			async getHomeList(id) {
				const {
					data
				} = await homeList(id)
				this.listingsBanner = data.data.slide
				this.hotCityData = data.data.hotCity
				let newArr = this.staticCity.filter((x) => !this.hotCityData.some((item) => x.cityName === item
					.cityName));
				this.developCity = newArr

			},
			// 当点击后 当前索引等于点击的index
			clickTba(index) {
				this.keywords = ''
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				this.choicCurrentIndex = index;
				this.choicURL = this.choicData[index].url + this.curCityId
				if (index === 2) {
					this.choicURL = this.choicData[index].url + this.curCityId + '&checkIn=' + this.checkIn +
						'&checkOut=' + this.checkOut + '&curCityName=' + this.curCityName + '&keywords=' + this
						.keywords + '&dayCount=' + this.dayCount + '&choiceDateArr=' + choiceDateArr + '&label=安心民宿'
				}

			},
			getChild(v) {
				this.keywords = v;
			},
			// 定时器函数
			autoPlay() {
				this.timer = setInterval(() => {
					this.clickTba(this.choicCurrent)
				}, 5000)
			},
			openFindPage() {
				uni.navigateTo({
					url: this.choicURL
				})
			},
			openZeroYuanPage() {
				uni.navigateTo({
					url: '../zero-yuan/zero-yuan'
				})
			},
			openFreeTrialPage() {
				uni.navigateTo({
					url: '../free-trial/free-trial?cityId=' + this.curCityId
				})
			},
			openStudentPrivilege() {
				uni.navigateTo({
					url: '../student-privilege/student-privilege'
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
			},
			openListingsTopPage() {
				this.keywords = ''
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				uni.navigateTo({
					url: '../listings/listings-list?cityId=' + this.curCityId + '&checkIn=' + this.checkIn +
						'&checkOut=' + this.checkOut + '&curCityName=' + this.curCityName + '&keywords=' + this
						.keywords + '&dayCount=' + this.dayCount + '&choiceDateArr=' + choiceDateArr +
						'&label=top美宿'
				})
			},
			openListingsDiscountPage(flag) {
				this.keywords = ''
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				uni.navigateTo({
					url: '../listings/listings-list?cityId=' + this.curCityId + '&checkIn=' + this.checkIn +
						'&checkOut=' + this.checkOut + '&curCityName=' + this.curCityName + '&keywords=' + this
						.keywords + '&dayCount=' + this.dayCount + '&choiceDateArr=' + choiceDateArr + '&flag=' +
						flag
				})
			},
			clickHotCity(item) {
				this.curCityId = item.id
				this.curCityName = item.cityName
				this.getHomeList(item.id)
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200,
				});

			},
			clickDevelopCity() {
				wx.showToast({
					title: '房源还在开发中，敬请期待！',
					icon: 'none'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.swiper-box {
		height: 500rpx;
	}

	.swiper-item {
		height: 500rpx;
		overflow: hidden;
		border-radius: 0 0 80rpx 80rpx;
	}

	.swiper-item>image {
		width: 100%;
	}

	.king-kong {
		margin: 32rpx 32rpx 0 32rpx;
		display: flex;
		justify-content: space-between;

		.kk-item {
			width: 21%;
			height: 120rpx;
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 10rpx;

			.kk-title {
				text-align: left;
			}

			.kk-img {
				text-align: right;
			}

			image {
				width: 90rpx;
			}
		}
	}

	.choice {
		margin: 0 32rpx;

		h3 {
			font-weight: bold;
			font-size: 28rpx;
		}

		.main-picture {
			border-radius: 8rpx;
			height: 380rpx;
			overflow: hidden;
			position: relative;

			.main-text {
				position: absolute;
				width: 100%;
				bottom: 10rpx;
				color: #ffffff;
				z-index: 1;
				left: 10rpx;
				padding-bottom: 20rpx;
				font-size: 24rpx;

			}

			image {
				width: 100%;
			}
		}

		.choice-item {
			height: 120rpx;
			overflow: hidden;
			border-radius: 8rpx;
			background-color: #000000;
			display: block;
			margin: 10rpx 0;
			position: relative;
			font-size: 24rpx;

			image {
				width: 100%;
				opacity: 0.6;
			}

			h3 {
				position: absolute;
				top: 40%;
				left: 0;
				width: 100%;
				text-align: center;
				color: #ffffff;
			}
		}

		.current {
			opacity: 0.4;
		}

	}

	.special-column {
		margin: 0 32rpx;

		h3 {
			font-weight: bold;
			font-size: 28rpx;
		}

		.special-item {
			border-radius: 8rpx;
			height: 300rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			image {
				width: 100%;
			}

			.item {
				border-radius: 8rpx;
				height: 145rpx;
				overflow: hidden;
				width: 100%;
				position: relative;
			}

			.main-text {
				position: absolute;
				width: 100%;
				bottom: 10rpx;
				color: #333333;
				z-index: 1;
				left: 10rpx;
				padding-bottom: 20rpx;
				font-size: 24rpx;
			}
		}
	}

	.hot-city {
		margin: 0 32rpx;

		.city-item {
			height: 110rpx;
			overflow: hidden;
			border-radius: 8rpx;
			margin: 5rpx 0;
			position: relative;
			background-color: #333333;

			.city-item-name {
				position: absolute;
				width: 100%;
				left: 0;
				top: 35%;
				z-index: 1;
				text-align: center;
				color: #ffffff;
			}

			image {
				width: 100%;
				opacity: 0.8;
			}
		}
	}
</style>
