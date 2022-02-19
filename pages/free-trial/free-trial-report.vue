<template>
	<view class="content">
		<view>
			<uni-swiper-dot :info="reportDatailData.pics" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in reportDatailData.pics" :key="index">
						<view class="swiper-item">
							<image mode="widthFix" :src="item.url">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="user-info">
			<view class="user">
				<view class="avatar">
					<image class="img" mode="aspectFill" :src="reportDatailData.news.face">
					</image>
				</view>
				<view class="name">{{reportDatailData.news.writer}}</view>
			</view>
			<view class="date">
				<text>发布于：{{reportDatailData.news.updatedAt}}</text>
			</view>
		</view>
		<view class="report-cont">
			<view class="title">
				{{reportDatailData.news.title}}
			</view>
			<view class="report-item">
				<view class="label">
					<uni-icons class="icon" type="heart" size="18"></uni-icons>
					<text>入住感受</text>
				</view>
				<view class="desc">
					{{reportDatailData.news.feel}}
				</view>
			</view>
			<view class="report-item">
				<view class="label">
					<uni-icons class="icon" type="home" size="18"></uni-icons>
					<text>配套设施</text>
				</view>
				<view class="desc">
					{{reportDatailData.news.facilities}}
				</view>
			</view>
			<view class="report-item">
				<view class="label">
					<uni-icons class="icon" type="location" size="18"></uni-icons>
					<text>地理位置</text>
				</view>
				<view class="desc">
					{{reportDatailData.news.location}}
				</view>
			</view>
		</view>

		<view class="listings">
			<view class="img-left">
				<image mode="aspectFill" :src="aboutHotel[0].thum">
				</image>
			</view>
			<view class="cont-right">
				<view class="info">
					<text>长沙</text>·
					<text>整套房源</text>·
					<text>{{aboutHotel[0].houseType}}</text>·
					<text>可住{{aboutHotel[0].occupancy}}人</text>
				</view>
				<view class="title">
					{{aboutHotel[0].hotelName}}
				</view>
				<view style="display:flex; justify-content:space-between; align-items: center;">
					<view class="price">
						<view class="CP">￥{{aboutHotel[0].weekdaysOriginal}}</view>
						<view class="wan">/晚</view>
					</view>
					<view class="reserve">
						<button class="reserve-btn" type="primary" size="mini"
							@click="openListingsDetail(aboutHotelID)">去预定</button>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-nav">
			<view class="left" @tap="getUserCollection()">
				<uni-icons :type="isCollect==0?'star-filled':'star'" size="30"
					:color="isCollect==0?'#ff941d':'#333333'"></uni-icons>
					 收藏房源
			</view>
			<view class="right">
				<button class="btn" type="primary" size="default" @tap="openListingsDetail(aboutHotelID)">体验同款民宿</button>
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
		reportDetail,
		getUserCollection,
		getCollectionList,
	} from '@/utils/request/manage.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				reportDatailData:{},
				aboutHotel:[],
				current: 0,
				mode: 'round',
				aboutHotelID:0,
				userInfo: '',
				commonIds: [], // 所有id集合
				isCollect: -1,
				collectionList: [],
			}
		},
		onLoad() {
			this.getReportDetail()
		},
	computed: {
		...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
	},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			openListingsDetail(id) {
				uni.navigateTo({
					url: '../listings/listings-detail?id='+id
				})
			},
			async getReportDetail() {
				const {
					data
				} = await reportDetail(Number(this.$mp.query.id))
				this.reportDatailData = data.data;
				this.aboutHotel =  data.data.about_hotel;
				this.aboutHotelID=data.data.about_hotel[0].id
				this.getCollectionList(0)
			},
			async getUserCollection() {
				this.isCollect
				let current_user = uni.getStorageSync('userinfo')
				if (!current_user) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
				const {
					data
				} = await getUserCollection(this.aboutHotelID, 0)
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
				let current_user = uni.getStorageSync('userinfo')
				if(current_user){
					const {
						data: res
					} = await getCollectionList(type)
					if (res.code == 1) {
						this.$api.msg(data.code.msg)
					} else {
						this.collectionList = res.data.rs
						// console.log("收藏列表", this.collectionList)
						let isCollect = this.collectionList.find(item => item.cid == this.aboutHotelID)
						if (isCollect) {
							// console.log("isCollect", isCollect)
							if (isCollect.cid == this.aboutHotelID) {
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
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		padding-bottom: 100rpx;
	}

	.swiper-box {
		height: 500rpx;
	}

	.swiper-item {
		height: 500rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.swiper-item>image {
		width: 100%;
	}

	.user-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;

		.user {
			font-size: 24rpx;
			display: flex;
			align-items: center;

			.avatar {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
				overflow: hidden;
				margin-right: 10rpx;

				.img {
					width: 100%;
				}
			}

			.name {
				color: #333333;
				font-weight: bold;
			}
		}

		.date {
			color: #666666;
			font-size: 22rpx;
		}
	}

	.report-cont {
		padding: 0 30rpx;
		color: #333333;

		.title {
			font-size: 34rpx;
			font-weight: bold;
			padding: 0 0 20rpx 0;
		}

		.report-item {
			padding: 20rpx 0;

			.label {
				padding: 10rpx 0;
				font-size: 28rpx;
				font-weight: bold;
				display: flex;
				align-items: center;

				.icon {
					margin-right: 10rpx;
				}
			}

			.desc {
				font-size: 24rpx;
				color: #666666;
			}
		}
	}

	.listings {
		padding: 10rpx;
		margin: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
		border-radius: 8rpx;

		.img-left {
			border-radius: 8rpx;
			overflow: hidden;
			height: 160rpx;
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
				font-size: 22rpx;
			}

			.title {
				font-size: 30rpx;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				height: 40rpx;
				padding: 10rpx 0;
				color: #333333;
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
			}

			.reserve {
				.reserve-btn {
					padding: 10rpx 20rpx;
					background-color: #ff951d;
					font-size: 20rpx;
					line-height: 24rpx;
					border: none;
					color: #ffffff;
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
			display: flex;
			align-items: center;
			font-size: 22rpx;
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
</style>
