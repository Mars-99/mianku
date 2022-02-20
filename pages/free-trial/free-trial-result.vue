<template>
	<view class="content">
		<view class="result-box">
			<view class="icon">
				<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/apply-success.png">
				</image>
			</view>
			<view class="title">报名成功</view>
			<view class="explan">恭喜你，报名已经成功，本期活动截止日期为2.28，结果将在活动结束的第二个工作日公布，您可以在“我报名的民宿”查看是否中奖。</view>
		</view>
		<view class="homestay">
			<view class="title">我报名的民宿</view>
			<view class="list">
				<view class="item" v-for="(item ,key) in applyList" :key="key">
					<view class="img-left" @tap="openListingsDetail()">
						<image mode="widthFix" :src="item.thum">
						</image>
					</view>
					
					<view class="cont-right">
						<view class="title">
							{{item.hotelName}}
						</view>
						<view class="info">
							<uni-icons type="home" size="16" color="#999999"></uni-icons>
							<text class="txt">整套</text>·
							<text class="txt">{{item.houseType}}</text>·
							<text class="txt">可住{{item.occupancy}}人</text>
						</view>
						<view class="bottom-info">
							<view class="price">
								<view class="CP">￥{{week==5||week==6?item.weekendActivity:item.weekdaysActivity}}</view>
								<view class="wan">/晚</view>
							</view>
							<button class="btn-solid" type="default" size="mini" v-if="item.state==0">{{item.state==0?"未开奖":"未中奖"}}</button>
							<button class="btn-solid" type="default" size="mini"  v-else>{{item.state==1?"已中奖":"未中奖"}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getEnrollList,
	} from '@/utils/request/manage.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				applyList:[],
				week:0,
			}
		},
		onLoad() {
			this.init()
			this.getWeek()
		},
		methods: {
			async init() {
				const {
					data: res
				} = await getEnrollList()
				this.applyList = res.data.rs
				console.log("this.applyList",this.applyList)
			},
			getWeek(){
				this.week = moment().format("d")
				console.log(this.week)
			}
		}
	}
</script>

<style scoped lang="scss">
	.result-box{
		background-color: #ffffff;
		border-radius: 8rpx;
		margin: 20rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.icon{
			width: 160rpx;
			height: 160rpx;
			.img{
				width: 100%;
			}
		}
		.title{
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			margin: 10rpx 0;
		}
		.explan{
			font-size: 24rpx;
			color: #ff951d;
		}
	}
	.homestay{
		border-radius: 8rpx;
		margin: 0 20rpx;
		background-color: #ffe4db;
		padding: 20rpx;
		.title{
			font-size: 32rpx;
			color: #fb5235;
			font-weight: bold;
			margin: 0 0 20rpx 0;
		}
		.list{
			.item{
				background-color: #ffffff;
				border-radius: 8rpx;
				padding: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
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
						margin: 0;
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
							background-color: #fb5338;
							color: #ffffff;
							margin: 0 10rpx;
							line-height: 50rpx;
							font-size: 24rpx;
							border: none;
						}
					}
				}
			}
		}
	}
	/deep/ button::after {
		border: none;
	}
</style>
