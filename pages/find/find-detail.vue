<template>
	<view class="content">
		<view>
			<uni-swiper-dot :info="pictureList" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in pictureList" :key="index">
						<view class="swiper-item">
							<image mode="widthFix" :src="item.url">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="article">
			<view class="title">
				{{articleInfo.title}}
			</view>
			<view class="user-info">
				<view class="user">
					<view class="avatar">
						<image class="img" mode="aspectFill" :src="articleInfo.face">
						</image>
					</view>
					<view class="name">{{articleInfo.writer}}</view>
				</view>
				<view class="date">
					<text>发布于：{{articleInfo.updatedAt}}</text>
				</view>
			</view>
			<view class="article-cont">
				<!-- 	{{articleInfo.content}} -->
				<rich-text :nodes="articleInfo.content"></rich-text>
			</view>
		</view>
		<view class="mention">
			<uni-title type="h3" title="文中提及" align="left"></uni-title>
			<view class="mention-homestay">
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
							<view class="CP">￥{{aboutHotel[0].weekdaysActivity}}</view>
							<view class="OP">￥{{aboutHotel[0].weekdaysOriginal}}</view>
							<view class="wan">/晚</view>
						</view>
						<view class="reserve">
							<button class="reserve-btn" type="primary" size="mini"
								@tap="openListingsDetail(8)">去预定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="recommend">
			<uni-title type="h3" title="热门推荐" align="left"></uni-title>
			<view class="recommend-list">
				<view class="recommend-item" @tap="openListingsDetail(item.id)" v-for="(item ,index) in recommendList"
					:key="index">
					<view class="picture">
						<image class="img" mode="widthFix" :src="item.thum">
						</image>
					</view>
					<view class="description">
						<view class="cont">
							<view class="info">
								<text>长沙</text>·
								<text>整套房源</text>·
								<text>{{item.houseType}}</text>·
								<text>可住{{item.occupancy}}人</text>
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
		<view class="bottom-nav">
			<view class="left">
				<uni-icons type="star" size="30"></uni-icons> 收藏提及房源
			</view>
			<view class="right">
				<button class="btn" type="primary" size="default" @tap="openListingsDetail(aboutHotelID)">文中提及</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		roamDetail
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				//轮播图
				pictureList: [],
				// 文章信息
				articleInfo: {},
				findDatailData: {
					title: "长沙民宿| 山间超适合聚会的温暖庭院民宿,山间超适合聚会的温暖庭院民宿,",
					image: [{
							img: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-07.jpg",
						}, {
							img: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-08.jpg",
						},
						{
							img: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-09.jpg",
						}
					],
					user: {
						name: "小小眠",
						avatar: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/avatar.jpg"
					},
					date: "2021-12-31"
				},
				current: 0,
				mode: 'round',
				recommendData: [{
						title: "邂逅摩洛哥 五一广场巨幕投影房·舒适乳胶床垫",
						picture: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-04.jpg",
						priceC: 180,
						priceO: 210,
						info: ['整套房源', '1室1卫1床', '可住2人']
					},
					{
						title: "五一广场巨幕投影房·舒适乳胶床垫",
						picture: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-05.jpg",
						priceC: 140,
						priceO: 180,
						info: ['整套房源', '1室1卫1床', '可住2人']
					},
					{
						title: "邂逅摩洛哥 五一广场巨幕投影房·舒适乳胶床垫",
						picture: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-06.jpg",
						priceC: 140,
						priceO: 180,
						info: ['整套房源', '1室1卫1床', '可住2人']
					},
					{
						title: "邂逅摩洛哥 五一广场巨幕投影房·舒适乳胶床垫",
						picture: "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-03.jpg",
						priceC: 140,
						priceO: 180,
						info: ['整套房源', '1室1卫1床', '可住2人']
					}
				],
				aboutHotel: [],
				aboutHotelID: 0,
				recommendList:[]
			}
		},
		onLoad() {
			this.getRoamDetail()
			// console.log(this.$mp.query.id+0)
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
			async getRoamDetail() {
				const {
					data
				} = await roamDetail(Number(this.$mp.query.id))
				console.log(data.data),
				this.pictureList = data.data.pics
				this.articleInfo = data.data.news
				this.aboutHotel = data.data.about_hotel
				this.aboutHotelID = data.data.about_hotel[0].id
				this.recommendList=data.data.recommend
			},
		}
	}
</script>
<style scoped lang="scss">
	.content {
		padding-bottom: 100rpx;
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

	.swiper-box {
		height: 800rpx;
	}

	.swiper-item {
		height: 800rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.swiper-item>image {
		width: 100%;
	}

	.article {
		padding: 0 20rpx;
		background-color: #ffffff;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			padding: 20rpx 0;
		}

		.user-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 0;

			.user {
				font-size: 20rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 40rpx;
					overflow: hidden;
					margin-right: 10rpx;

					.img {
						width: 100%;
					}
				}

				.name {
					color: #999999;
				}
			}

			.date {
				color: #666666;
				font-size: 22rpx;
			}
		}

		.article-cont {
			padding: 10rpx;
			color: #666666;
		}
	}

	.mention {
		padding: 0 20rpx 20rpx 20rpx;
		background-color: #ffffff;
		margin: 20rpx 0;

		.mention-homestay {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.img-left {
				border-radius: 8rpx;
				overflow: hidden;
				height: 180rpx;
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

					text {
						padding-right: 10rpx;
						color: #666666;
					}
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

					.OP {
						font-size: 24rpx;
						color: #999999;
						text-decoration: line-through;
						margin: 0 10rpx;
					}

					.youhui {
						color: #ff951d;
						margin-left: 30rpx;

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

					.img {
						width: 100%;

					}
				}

				.description {
					background-color: #ffffff;

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
</style>
