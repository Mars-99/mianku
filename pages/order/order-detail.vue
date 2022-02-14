<template>
	<view class="order-page">
		<view class="order-state">
			<view class="state-txt">
				待支付
			</view>
			<view class="hint-txt">订单已提交，24分18秒 后未支付订单将自动取消</view>
			<view class="operate">
				<button class="btn-solid" type="primary" size="default" @tap="">立即支付</button>
				<button class="btn-hollow" type="primary" size="default" @tap="">取消</button>
			</view>
		</view>
		<view class="column-box">
			<view class="item">
				<text class="label">入离日期</text>
				<text class="val">01月04日(14:00)至01月05日(12:00)</text>
			</view>
			<view class="item">
				<text class="label">支付金额</text>
				<text class="val">房费 ￥110.00</text>
			</view>
		</view>
		<view class="column-box">
			<view class="pack-item">
				<view class="img-left">
					<image mode="aspectFill" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-01.jpg">
					</image>
				</view>
				<view class="cont-right">
					<view class="title">
						邂逅摩洛哥 五一广场巨幕投影房·舒适乳胶床垫
					</view>
					<view class="info">
						<text class="txt">整套房源</text>·
						<text class="txt">1室1卫1床</text>·
						<text class="txt">可住2人</text>
					</view>
				</view>
			</view>
		</view>

		<view class="column-box">
			<uni-title type="h4" title="订单信息" align="left"></uni-title>
			<view class="item">
				<text class="label">订单号</text>
				<text class="val">1235454145</text>
			</view>
			<view class="item">
				<text class="label">入住人</text>
				<text class="val">小小眠</text>
			</view>
			<view class="item">
				<text class="label">联系电话</text>
				<text class="val">186****4310</text>
			</view>
			<view class="item">
				<text class="label">支付方式</text>
				<text class="val">在线支付</text>
			</view>
			<view class="item">
				<text class="label">下单时间</text>
				<text class="val">2022-01-05 22:15</text>
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
	.order-page {
		padding-bottom: 100rpx;
		.order-state{
			// background-color: #333333;
			// background-color: #ffffff;
			background-color: #ffe9d7;
			display: flex;
			flex-direction: column;
			// align-items: center;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 8rpx;
			.state-txt{
				color: #ff951d;
				font-size: 30rpx;
				font-weight: bold;
				padding-bottom: 20rpx;
			}
			.hint-txt{
				color: #666666;
				font-size: 24rpx;
			}
			.operate{
				display: flex;
				// justify-content: center;
				padding-top: 20rpx;
				
				.btn-solid {
					border-radius: 8rpx;
					border: none;
					background-color: #ff951d;
					color: #ffffff;
					margin: 0 10rpx;
					font-size: 24rpx;
					border: none;
				}
				.btn-hollow {
					border-radius: 8rpx;
					border: none;
					background-color: transparent;
					color: #ff951d;
					border: 2rpx #ff951d solid;
					margin: 0 10rpx;
					font-size: 24rpx;
				}
			}
		}

		.column-box {
			background-color: #ffffff;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 8rpx;

			.pack-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.img-left {
					border-radius: 8rpx;
					overflow: hidden;
					height: 150rpx;
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
						font-size: 24rpx;
						padding: 20rpx 0;

						.txt {
							padding-right: 10rpx;
							color: #666666;
						}
					}

					.title {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						font-weight: bold;
						color: #333333;
						font-size: 30rpx;
					}
				}
			}
		.item{
			display: flex;
			align-items: center;
			padding: 15rpx 0;
			font-size: 24rpx;
			.label{
				color: #999999;
				width: 20%;
			}
			.val{
				color: #333333;
			}
		}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
