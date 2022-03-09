<template>
	<view class="content">
		<view class="banner-area">
			<image class="img" mode="widthFix"
				:src="sleepDetail.thum">
			</image>
			<view class="rule-link">
				<text class="txt" @tap="openSiteContent()">试住规则</text>
				<view class="icon">
					<uni-icons type="right" size="12" color="#666666"></uni-icons>
				</view>
			</view>
		</view>
		<view class="winning-info">
			<view class="winner-box">
				<maoScroll v-if="prizeList.length>0" :data="data" :showNum="showNum" :lineHeight="lineHeight"
					:animationScroll="animationScroll" :animation="animation">
					<template v-slot="{line}">
						<view class="line">
							<view class="winner-info">
								<view class="avatar">
									<image class="img" mode="widthFix" :src="line.avatar">
									</image>
								</view>
								<view class="right-info">
									<view class="user-info">
										<view class="name">{{line.name}}</view>
										<view class="tel">{{line.tel}}</view>
									</view>
									<view class="prize-info">{{line.prize}}</view>
								</view>
							</view>
						</view>
					</template>
				</maoScroll>
				<view class="" v-else>还没有人中奖</view>
			</view>
			<view class="winner-number">
				<text class="number">{{prizeTotal}}</text>
				<text class="txt">中奖人数</text>
			</view>
		</view>

		<view class="try-apply">
			<uni-title type="h2" title="试住报名"></uni-title>
			<view class="city-list">
				<view class="city-item" :class="{'city-act':current===index}" v-for="(item ,index) in cityList"
					:key="index" @tap="clickCity(index)">{{item.cityName}}</view>
				<!-- 	<view class="more">
					<text class="txt">更多</text>
					<view class="icon">
						<uni-icons type="right" size="12" color="#ffffff"></uni-icons>
					</view>
				</view> -->
			</view>
			<view class="try-listings" v-if="listingsList.length">
				<view class="try-listings-item" v-for="(listingsItem ,list) in listingsList" :key="list">
					<view class="img-left" @tap="openListingsDetail(listingsItem)">
						<image mode="widthFix" :src="listingsItem.thum">
						</image>
					</view>

					<view class="cont-right">
						<view class="title">
							{{listingsItem.hotelName}}
						</view>
						<view class="info">
							<uni-icons type="home" size="16" color="#999999"></uni-icons>
							<text class="txt">整套</text>·
							<text class="txt">{{listingsItem.houseType}}</text>·
							<text class="txt">可住{{listingsItem.occupancy}}人</text>
						</view>
						<!-- <view class="info">
							<uni-icons type="location" size="16" color="#999999"></uni-icons>
							<text class="txt">长沙</text>·
							<text class="txt">五一广场</text>
						</view> -->
						<view class="bottom-info">
							<view class="price">
								<view class="CP">￥{{listingsItem.weekdaysOriginal}}</view>
								<view class="wan">/晚</view>
							</view>
							<button :class="[isStart?'btn-solid':'btn-gray']" type="default" size="mini"
								@tap="openListingsDetail(listingsItem)">免费住</button>
						</view>
					</view>
				</view>
				<view class="more" @tap="loadMore()" v-if="moreBtn">
					<text class="txt">{{loadText}}</text>
					<view class="icon">
						<uni-icons type="bottom" size="12" color="#ffffff"></uni-icons>
					</view>

				</view>
				<!-- <view class='more' @click="setLoading()">
				  <button >{{loadText}}</button>
				</view> -->
			</view>
			<view class="none-data" v-else>
				<view class="img-signal">
					<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/no-data.png">
					</image>
					<text>没有试睡房源</text>
				</view>
			</view>
		</view>
		<view class="feedback">
			<uni-title type="h2" title="往期试住报告"></uni-title>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view id="demo1" class="scroll-view-item_H" v-for="(reportItem,index) in reportList" :key="index"
					@tap="openFreeTrial(reportItem.id)">
					<view class="image-area">
						<view class="left">
							<image class="img" mode="aspectFill" :src="reportItem.pics[0].url">
							</image>
						</view>
						<view class="right">
							<view class="top">
								<image class="img" mode="widthFix" :src="reportItem.pics[1].url">
								</image>
							</view>
							<view class="bottom">
								<image class="img" mode="widthFix" :src="reportItem.pics[2].url">
								</image>
							</view>
						</view>
					</view>
					<view class="title">{{reportItem.title}}</view>
					<view class="source">--{{reportItem.writer}}的眠库民宿试住体验</view>
					<view class="user">
						<view class="avatar">
							<image class="img" mode="widthFix" :src="reportItem.face">
							</image>
						</view>
						<view class="right-info">
							<view class="name">{{reportItem.writer}}</view>
							<view class="date">幸运试睡官</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		activityHotelList,
		activityPrizeList,
		reportList,
		sleepDetail
	} from '@/utils/request/manage.js'
	import maoScroll from '@/components/mao-scroll/mao-scroll.vue';
	import moment from 'moment'
	export default {
		components: {
			maoScroll
		},
		data() {
			return {
				title: 'Hello',
				data: [],
				showNum: 1,
				lineHeight: 80,
				animationScroll: 800,
				animation: 2000,
				cityList: [{
						cityName: '全国',
					},
					{
						cityName: '长沙'
					},
					{
						cityName: '重庆'
					},
					{
						cityName: '成都'
					},
					{
						cityName: '西安'
					}
				],
				current: 0,
				btnnum: 0,

				cityId: 1, //当前城市id
				pageIndex: 1, //当前页码
				pageSize: 5, //每页条数
				totalPages: 0,
				hasMore: true, //是否加载更多
				listingsList: [],
				moreBtn: true,

				loadText: '加载更多',
				ranklist: [],

				prizeList: [],
				prizeTotal: 0,
				count: 1,
				limit: 5,

				reportList: [],
				sleepDetail:{},
				isStart:false,



			}
		},
		onShow() {
			this.init()
			// this.loadMore()
			let self = this;
			setTimeout(function() {
				self.createData();
			}, 1000);
		},
		methods: {
			init() {
				// let loginAuth = uni.getStorageSync('loginAuth')
				// let token = uni.getStorageSync('token')
				// if (!loginAuth || !token) {
				// 	this.$api.href('../login/login')
				// }
				this.cityId = Number(this.$mp.query.cityId)
				this.getActivityHotelList()
				this.getActivityPrizeList()
				this.getReportList()
				this.getSleepDetail()
			},
			createData() {
				for (let i = 0; i <= this.prizeList.length + 1; i++) {
					if (this.prizeList[i]) {
						this.data.push({
							avatar: this.prizeList[i].face,
							name: this.prizeList[i].userName,
							tel: this.prizeList[i].phone,
							prize: '获得' + this.prizeList[i].hotelName + '试住资格',
						})
					}
				}
			},
			clickCity(index) {
				this.current = index
				switch (index) {
					case 3:
						//这里是值对应的处理
						this.cityId = 7
						this.pageIndex = 1, //当前页码
							this.pageSize = 5, //每页条数
							this.getActivityHotelList()
						break
					case 4:
						//这里是值对应的处理
						this.cityId = 8
						this.pageIndex = 1, //当前页码
							this.pageSize = 5, //每页条数
							this.getActivityHotelList()
						break
					default:
						//这里是没有找到对应的值处理
						this.cityId = index
						this.pageIndex = 1, //当前页码
							this.pageSize = 5, //每页条数
							this.getActivityHotelList()
						break
				}
			},
			async getActivityHotelList() {
				const {
					data
				} = await activityHotelList(this.cityId, this.pageIndex, this.pageSize)
				this.listingsList = data.data.rs;
				this.ApplyState = data.data.state
			},
			async getActivityPrizeList() {
				const {
					data
				} = await activityPrizeList(this.count, this.limit)
				this.prizeList = data.data.rs;
				this.prizeTotal = data.data.count
				// console.log("prizeList", this.prizeList)

			},
			async getReportList() {
				const {
					data
				} = await reportList(0, 3)
				this.reportList = data.data.news.slice(0,3);
				console.log(data.data)
			},
			async getSleepDetail() {
				const {
					data:res
				} = await sleepDetail()
				this.sleepDetail = res.data
				
				let today = moment().format('YYYY-MM-DD')
				let start = this.sleepDetail.startAt
				
				console.log("today",today)
				console.log("start",start)
				const diff1 = moment(start).diff(moment(today))
				console.log("diff1",diff1)
				
				if(diff1 <= 0 ){
					this.isStart =true
				}
				console.log("isStart",this.isStart)
			},
			async loadMore(e) {
				// let _this = this;
				// let _page = this;
				// 暂存数据
				let ranklistBefore = this.listingsList;
				// 每次加载数据条数(10)
				let num = this.pageIndex++ * 5;
				const {
					data
				} = await activityHotelList(this.cityId, this.pageIndex, num)
				let eachData = data.data.rs;
				if (eachData.length == 0) {
					wx.showToast({
						title: '没有更多数据了!~',
						icon: 'none',
					})
				} else {
					wx.showToast({
						title: '数据加载中...',
						icon: 'none'
					})
				}
				this.loadText = "数据请求中",
					this.loading = true,
					this.listingsList = ranklistBefore.concat(eachData),
					this.loadText = "加载更多",
					this.loading = false

			},
			openFreeTrial(id) {
				uni.navigateTo({
					url: '../free-trial/free-trial-report?id=' + id
				})
			},
			openListingsDetail(item) {
				if(this.isStart == true){
					uni.navigateTo({
						url: '../listings/listings-detail?id=' + item.id + '&pageRoot=试睡'+'&state='+this.ApplyState+'&startAt'+this.sleepDetail.startAt
					})
				}else{
					wx.showToast({
						title: '活动将于'+this.sleepDetail.startAt+'开始，敬请期待。',
						icon: 'none',
					})
				}
			},
			openSiteContent() {
				uni.navigateTo({
					url: '../site-content/site-content?id=6' 
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.banner-area {
		position: relative;
		height: 520rpx;
		overflow: hidden;

		.img {
			width: 100%;
			display: flex;
			align-items: center;
		}

		.rule-link {
			position: absolute;
			top: 50rpx;
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

	.winning-info {
		position: relative;
		margin: -60rpx 30rpx 0 30rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 30rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.winner-box {
			width: 75%;
			border-right: 2rpx #f5f5f5 solid;
		}

		.line {
			height: 80rpx;
			line-height: 80rpx;
			width: 100%;

			.winner-info {
				display: flex;
				align-items: center;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 10rpx;

					.img {
						width: 100%;
					}
				}

				.right-info {
					width: 80%;
					display: flex;
					flex-direction: column;

					.user-info {
						height: 40rpx;
						line-height: 40rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333333;

						.name {
							margin-right: 10rpx;
						}

						.tel {}
					}

					.prize-info {
						height: 40rpx;
						line-height: 40rpx;
						color: #ff951d;
						font-size: 22rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}

		.winner-number {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.number {
				font-size: 34rpx;
				font-weight: bold;
				color: #333333;
			}

			.txt {
				font-size: 28rpx;
				color: #666666;
			}
		}

	}

	.try-apply {
		padding: 0 30rpx;

		.city-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 4%;

			.city-item {
				padding: 6px 0;
				border-bottom-style: solid;
				border-bottom-width: 2px;
				border-bottom-color: transparent;
			}

			.city-act {
				color: #ff951d;
				font-weight: bold;
				border-bottom-style: solid;
				border-bottom-width: 2px;
				border-bottom-color: #ff951d;
				padding: 6px 0;
			}

			.more {
				background-color: #ffffff;
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				color: #ff951d;
				border-radius: 30rpx;
				line-height: 40rpx;
				font-size: 24rpx;

				.icon {
					width: 30rpx;
					height: 30rpx;
					border-radius: 30rpx;
					background-color: #ff951d;
					margin-left: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.try-listings {
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 20rpx;
			margin: 30rpx 0;

			.try-listings-item {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx #f5f5f5 solid;

				.img-left {
					border-radius: 8rpx;
					overflow: hidden;
					height: 160rpx;
					width: 35%;
					display: flex;
					align-items: center;

					image {
						width: 100%;
					}
				}

				.cont-right {
					width: 55%;
					margin: 0 5%;

					.info {
						font-size: 24rpx;
						line-height: 34rpx;

						.txt {
							padding: 0 10rpx 10rpx 10rpx;
							color: #666666;
						}
					}

					.title {
						font-size: 28rpx;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 0 0 10rpx 0;
						color: #333333;
					}

					.bottom-info {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							display: flex;
							align-items: center;
							color: #999999;
							padding-top: 10rpx;
							font-size: 24rpx;

							.CP {
								font-size: 34rpx;
								font-weight: bold;
								color: #ff951d;
							}
						}

						.btn-solid {
							border-radius: 50rpx;
							border: none;
							background-color: #333333;
							color: #ffffff;
							margin: 0 10rpx;
							line-height: 50rpx;
							font-size: 26rpx;
							border: none;
						}
						.btn-gray {
							border-radius: 50rpx;
							border: none;
							background-color: #cccccc;
							color: #ffffff;
							margin: 0 10rpx;
							line-height: 50rpx;
							font-size: 26rpx;
							border: none;
						}
					}
				}
			}

			.try-listings-item:last-child {
				border-bottom: 2rpx #ffffff solid;
			}

			.more {
				padding: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ff951d;
				border-radius: 30rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-weight: bold;

				.icon {
					width: 30rpx;
					height: 30rpx;
					border-radius: 30rpx;
					background-color: #ff951d;
					margin-left: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.none-data {
			background-color: #ffffff;
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
	}

	.feedback {
		padding: 0 30rpx 30rpx 30rpx;

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;

		}

		.scroll-view-item_H {
			display: inline-block;
			width: 90%;
			height: 620rpx;
			font-size: 36rpx;
			margin: 0 1% 10% 1%;
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 20rpx;

			.image-area {
				width: 100%;
				height: 400rpx;

				.left {
					width: 48%;
					display: inline-block;
					overflow: hidden;
					height: 400rpx;
					margin-right: 2%;

				}

				.right {
					width: 50%;
					display: inline-block;

					.top {
						width: 100%;
						height: 195rpx;
						overflow: hidden;
						margin-bottom: 10rpx;
					}

					.bottom {
						width: 100%;
						height: 195rpx;
						overflow: hidden;
					}
				}

				.img {
					width: 100%;
				}
			}

			.title {
				font-size: 38rpx;
				font-weight: bold;
				color: #333333;
				padding: 20rpx 0 10rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.source {
				font-size: 28rpx;
				font-weight: bold;
				color: #666666;
				padding-bottom: 20rpx;
			}

			.user {
				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
					display: inline-block;
					float: left;

					.img {
						width: 100%;
					}
				}

				.right-info {
					width: 80%;
					display: inline-block;
					height: 80rpx;
					float: left;

					.name {
						margin-right: 10rpx;
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
						line-height: 40rpx;
					}

					.date {
						height: 40rpx;
						line-height: 40rpx;
						color: #666666;
						font-size: 22rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

		}

	}

	/deep/ button::after {
		border: none;
	}
</style>
