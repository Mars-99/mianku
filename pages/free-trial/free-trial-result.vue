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
				<view class="item">
					<view class="img-left" @tap="openListingsDetail()">
						<image mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-01.jpg">
						</image>
					</view>
					
					<view class="cont-right">
						<view class="title">
							【眠库·黑曼巴】五一广场·国金中心IFS·超级文和友·茶颜悦色·超好出片·免费寄存
						</view>
						<view class="info">
							<uni-icons type="home" size="16" color="#999999"></uni-icons>
							<text class="txt">整套</text>·
							<text class="txt">1室1厅</text>·
							<text class="txt">可住2人</text>
						</view>
						<view class="bottom-info">
							<view class="price">
								<view class="CP">￥188</view>
								<view class="wan">/晚</view>
							</view>
							<button class="btn-solid" type="default" size="mini">待开奖</button>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="img-left" @tap="openListingsDetail()">
						<image mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-01.jpg">
						</image>
					</view>
					
					<view class="cont-right">
						<view class="title">
							【眠库·黑曼巴】五一广场·国金中心IFS·超级文和友·茶颜悦色·超好出片·免费寄存
						</view>
						<view class="info">
							<uni-icons type="home" size="16" color="#999999"></uni-icons>
							<text class="txt">整套</text>·
							<text class="txt">1室1厅</text>·
							<text class="txt">可住2人</text>
						</view>
						<view class="bottom-info">
							<view class="price">
								<view class="CP">￥188</view>
								<view class="wan">/晚</view>
							</view>
							<button class="btn-solid" type="default" size="mini">未中奖</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
