<template>
	<view class="content">
		<view class="banner">
			<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/privilege-banner.png">
			</image>
			<view class="rule-link">
				<text class="txt">规则说明</text>
				<view class="icon">
					<uni-icons type="right" size="12" color="#666666"></uni-icons>
				</view>
			</view>
		</view>
		<view class="king-kong">
			<view class="youhui-box">
				<view class="youhui-item">
					<view class="icon">
						<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/image/tq-xszk-icon.png">
						</image>
					</view>
					<view class="youhui-name">学生折上折</view>
					<view class="youhui-info">专享9.5折</view>
				</view>
				<view class="youhui-item">
					<view class="icon">
						<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/tq-xkyh-icon.png">
						</image>
					</view>
					<view class="youhui-name">新客优惠</view>
					<view class="youhui-info">首单最高立减60</view>
				</view>
				<view class="youhui-item">
					<view class="icon">
						<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/tq-srzk-icon.png">
						</image>
					</view>
					<view class="youhui-name">生日85折</view>
					<view class="youhui-info">生日专享折扣85折</view>
				</view>
			</view>
			<view class="bulletin">
				<uni-notice-bar scrollable="true" single="true"
					text="用户小小眠 认证了学生特权卡 下单了【眠库·克莱因蓝bearbrick】五一广场·国金中心IFS·超级文和友·茶颜悦色·免费寄存·一居两床 房源"></uni-notice-bar>
			</view>
			<view class="approve">
				<button class="btn" type="primary" size="default" @tap="">立即认证</button>
			</view>
		</view>
		<view class="discount-list">
			<view class="title-h1">
				眠库优惠包
			</view>
			<view class="aui-flex">
				<view class="aui-price-nub">
					<view class="aui-digit">
						<view class="h2">8.8</view>
						<view class="txt">折</view>
					</view>
				</view>
				<view class="aui-flex-box">
					<view class="h2">学生首单优惠</view>
					<view class="txt">全场通用,首单最高立减60</view>
				</view>
				<view class="rzbtn">
					<button class="btn" type="primary" size="default" @tap="">认证领取</button>
				</view>
			</view>
			
			<view class="aui-flex">
				<view class="aui-price-nub">
					<view class="aui-digit">
						<view class="h2">8.5</view>
						<view class="txt">折</view>
					</view>
				</view>
				<view class="aui-flex-box">
					<view class="h2">生日专享折扣</view>
					<view class="txt">生日当月使用,最高立减60</view>
				</view>
				<view class="rzbtn">
					<button class="btn" type="primary" size="default" @tap="">认证领取</button>
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
	.content {
		padding: 30rpx;

		.banner {
			position: relative;
			width: 100%;

			.img {
				width: 100%;
				display: flex;
				align-items: center;
			}

			.rule-link {
				position: absolute;
				top: 30rpx;
				right: 20rpx;
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

		.king-kong {
			padding: 20rpx;
			background-color: #ffffff;
			border-radius: 8rpx;
			margin: 20rpx 0;

			.youhui-box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.youhui-item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					.icon {
						width: 80rpx;
						height: 80rpx;

						.img {
							width: 100%;
						}
					}

					.youhui-name {
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}

					.youhui-info {
						font-size: 22rpx;
						color: #666666;
					}
				}
			}

			.bulletin {
				border-radius: 20rpx;
				margin: 40rpx 0;
			}

			.approve {
				margin-bottom: 20rpx;

				.btn {
					border-radius: 80rpx;
					border: none;
					background-color: #333333;
					color: #fffff;
					line-height: 80rpx;
				}
			}
		}

		.discount-list {
			padding: 20rpx;
			margin: 20rpx 0;
			background-color: #ffffff;
			border-radius: 8rpx;

			.title-h1 {
				font-size: 36rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 30rpx;
			}

			.aui-flex {
				width: 100%;
				height: 140rpx;
				position: relative;
				background: radial-gradient(circle at right top, transparent 8px,  #fb8e39 0) top left / 30% 51% no-repeat,
					radial-gradient(circle at right bottom, transparent 8px,  #fb8e39 0) bottom left /30% 51% no-repeat,
					radial-gradient(circle at left top, transparent 8px, #fcf3e6 0) top right /70% 51% no-repeat,
					radial-gradient(circle at left bottom, transparent 8px, #fcf3e6 0) bottom right /70% 51% no-repeat;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 16rpx;
				margin-bottom: 30rpx;



				.aui-price-nub {
					width: 30%;
					height: 140rpx;
					position: relative;
					display: flex;
					    align-items: center;
					    justify-content: center;
					.aui-digit{
						
						.h2{
							font-size: 60rpx;
							font-weight: bold;
							color: #ffffff;
							display: inline-block;
							
						}
						.txt{
							font-size: 28rpx;
							font-weight: bold;
							color: #ffffff;
							display: inline-block;
							
						}
					}
				}


				.aui-flex-box {
					width: 40%;
					height: 100rpx;
					padding: 20rpx 20rpx 20rpx 40rpx;
					display: flex;
					    align-items: center;
						flex-direction: column;
						text-align: left;
						justify-content: flex-start;
					.h2{
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						padding-bottom: 10rpx;
						width: 100%;
						
					}
					.txt{
						font-size: 22rpx;
						color: #666666;
						width: 100%;
						
						
					}

				}
				.rzbtn{
					width: 30%;
					display: flex;
					    align-items: center;
						.btn{
							border-radius: 30rpx;
							border: none;
							background-color: #fcf3e6;
							color: #fb8e39;
							margin-right: 20rpx;
							border: 2rpx #fb8e39 solid;
							padding: 10rpx 20rpx;
							line-height: 30rpx;
							font-size: 24rpx;
							
						}
				}


			}

			.aui-flex:before {
				// content: '';
				// height: 80px;
				// border: 1px dashed #fff;
				// position: absolute;
				// left: 30%;
				// top: 0;
				// bottom: 0;
				// margin: auto;
				// background-image: linear-gradient(to bottom, #eeeeee 5px, transparent 5px, transparent),
				// 	radial-gradient(10px circle at 5px 10px, transparent 5px, #eeeeee 5px);
				// background-size: 5px 15px;
			}

			// .aui-flex:after {
			//      content: '';
			//         position: absolute;
			//         height: 100%;
			//         width:5px;
			//         top: 0;
			//         right: -5px;
			//         background-image: linear-gradient(to bottom, #eeeeee 5px, transparent 5px, transparent),
			//         radial-gradient(10px circle at 5px 10px, transparent 5px, #eeeeee 5px);
			//         background-size: 5px 15px;
			// }
		}
	}
</style>
