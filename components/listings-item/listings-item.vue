<template>
	<view class="listings-list">
		<view class="listings-item" @tap="openListingsDetail(item)" v-for="(item ,index) in listingsList" :key="index">
			<view class="top-label" v-if="item.label && item.label.indexOf('top美宿') != -1">TOP<br>美宿</view>
			<view class="picture">
				<image class="img" mode="widthFix" :src="item.thum">
				</image>
			</view>
			<view class="description">
				<view class="tag" v-if="item.label && item.label.indexOf('安心民宿') != -1">
					<uni-icons type="vip-filled" size="20" color="#c35123"></uni-icons>
					<text class="txt">安心民宿，品质优选</text>
				</view>
				<view class="cont">
					<view class="info">
						<text class="txt">整套房源</text> ·
						<text class="txt">{{item.houseType}}</text> ·
						<text class="txt">可住{{item.occupancy}}人</text>
					</view>
					<view class="title">
						{{item.hotelName}}
					</view>
					<view class="char" v-if="!bsOrigin">
						<view class="char-active" v-for="(bq ,key) in item.flag.split(',')" :key="key"
							v-if="item.flag">{{bq | flag}}</view>
						<view class="txt" v-if="item.infrastructure.indexOf('投影仪') != -1">投影仪</view>
						<view class="txt" v-if="item.tag.indexOf('近地铁') != -1">近地铁</view>
						<view class="txt" v-if="item.service.indexOf('自主入住') != -1">自主入住</view>
						<view class="txt" v-if="item.rules.indexOf('允许聚会') != -1">允许聚会</view>
					</view>
					<view class="price">
						<view class="CP">￥{{week===6 ||week===5?item.weekendActivity:item.weekdaysActivity}}</view>
						<view class="OP">￥{{week===6 ||week===5?item.weekendOriginal:item.weekdaysOriginal}}</view>
						<view class="wan">/晚</view>
						<view class="youhui" v-if="item.firstReduce">
							首单立减{{item.firstReduce}}元
						</view>
					</view>
					<view class="rec-reason" v-if="bsOrigin">
						{{item.reason}}
					</view>
				</view>
			</view>
			<view class="collect">
				<uni-icons :type="item.isCollect==0?'star-filled':'star'" size="30"
					:color="item.isCollect==0?'#ff941d':'#333333'"></uni-icons>
				<!-- <uni-icons :type="star" size="30" color="#ffffff" v-if="true"></uni-icons>
				<uni-icons type="star-filled" size="30" color="#ff951d" v-else></uni-icons> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listingsList: {
				type: Array,
			},
			bsOrigin: {
				type: Boolean,
			},
			checkIn: {
				type: String,
			},
			checkOut: {
				type: String,
			},
			dayCount: {
				type: Number,
			},
			week: {
				type: Number,
			},
			choiceDateArr: {
				type: Array,
			}


		},
		data() {
			return {

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
	
		methods: {
			openListingsDetail(item) {
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				uni.navigateTo({
					url: '../listings/listings-detail?id=' + item.id + '&checkIn=' + this.checkIn + '&checkOut=' +
						this.checkOut + '&dayCount=' + this.dayCount+'&choiceDateArr='+choiceDateArr
				})
			},	
		}
	}
</script>

<style scoped lang="scss">
	.listings-list {
		.listings-item {
			position: relative;
			margin-bottom: 30rpx;
			.top-label {
			  display: inline-block;
			  width: 80rpx;
			  padding: 10rpx 0;
			  background: #fdd000;
			  color: #333333;
			  top: -6rpx;
			  left: 25rpx;
			  position: absolute;
			  text-align: center;
			  border-top-left-radius: 3rpx;
			  font-size: 24rpx;
			  // border-radius: 10rpx;
			  border-bottom-left-radius: 10rpx;
			  border-bottom-right-radius: 10rpx;
			}
			.top-label:before {
			   height: 0;
			   width: 0;
			   border-bottom: 6rpx solid #dddddd;
			   border-right: 6rpx solid transparent;
			   right: -6rpx;
			   top: 0;
			}
			.top-label:before, .top-label:after {
			    content: "";
			    position: absolute;
			}
			// .top-label:after {
			//     height: 0;
			//     width: 40rpx;
			//     border-left: 20rpx solid #ffffff;
			//     border-right: 20rpx solid #ffffff;
			//     border-bottom: 20rpx solid transparent;
			//     bottom: -20rpx;
			//     left: 0;
			// }
			.picture {
				border-radius: 16rpx;
				height: 350rpx;
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
				border-radius: 0 0 16rpx 16rpx;

				.tag {
					border-radius: 16rpx;
					height: 60rpx;
					background-color: #f5d5b0;
					margin-top: -20rpx;
					color: #c35123;
					padding: 20rpx 30rpx 0 30rpx;
					display: flex;
					align-items: center;

					.txt {
						margin-left: 10rpx;
						font-size: 24rpx;
					}
				}

				.cont {
					padding: 30rpx 20rpx 30rpx 20rpx;
					border-radius: 16rpx;
					margin-top: -20rpx;


					.info {
						font-size: 24rpx;

						.txt {
							padding-right: 10rpx;
						}
					}

					.title {
						font-size: 34rpx;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						height: 40rpx;
						padding: 10rpx 0;
					}

					.char {
						padding: 10rpx 0;
						display: flex;
						flex-wrap: wrap;

						.char-active {
							color: #ff951d;
							background-color: #ffe9d7;
							border: 1rpx #fcc79b solid;
							border-radius: 24rpx;
							padding: 5rpx 20rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;
							font-size: 20rpx;
						}

						.txt {
							font-size: 20rpx;
							background-color: #f3f3f3;
							border-radius: 24rpx;
							padding: 5rpx 20rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;
							color: #999999;
						}
					}

					.price {
						display: flex;
						align-items: center;
						color: #999999;
						padding: 0;
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

					.rec-reason {
						font-size: 24rpx;
						color: #c19b6e;
						border-top: 2rpx #f5f5f5 solid;
						padding-top: 20rpx;
						margin-top: 20rpx;
					}
				}
			}

			.collect {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
			}
		}

	}
</style>
