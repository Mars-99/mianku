<template>
	<view class="order-page">
		<view class="order-state">
			<view class="state-txt">
				{{ orderDetail.state | payStatus }}
			</view>
			<view class="hint-txt" v-if="orderDetail.state == 0">订单已提交，24分18秒 后未支付订单将自动取消</view>
			<view class="hint-txt" v-if="orderDetail.state == 1">订单已支付，眠库民宿等待您的入住！</view>
			<view class="hint-txt" v-if="orderDetail.state == 5">订单已退款，款项将在1-3个工作日内原来返回。</view>
			<view class="hint-txt" v-if="orderDetail.state == 9">订单完成，眠库民宿期待您的再次到了。</view>
			<view class="hint-txt" v-if="orderDetail.state == 3||orderDetail.state == 4">订单已取消。</view>
			<view class="operate" v-if="orderDetail.state == 0">
				<button class="btn-solid" type="primary" size="default" @tap="">立即支付</button>
				<button class="btn-hollow" type="primary" size="default" @tap="">取消</button>
			</view>
		</view>
		<view class="column-box">
			<view class="item">
				<text class="label">入离日期</text>
				<text class="val">{{orderDetail.checkIn}}至{{orderDetail.checkOut}}</text>
			</view>
			<view class="item">
				<text class="label">支付金额</text>
				<text class="val">房费 ￥{{orderDetail.price}}</text>
			</view>
		</view>
		<view class="column-box">
			<view class="pack-item">
				<view class="img-left">
					<image mode="aspectFill" :src="orderDetail.thum">
					</image>
				</view>
				<view class="cont-right">
					<view class="title">
						{{orderDetail.title}}
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
				<text class="val">{{orderDetail.orderId}}</text>
			</view>
			<view class="item">
				<text class="label">入住人</text>
				<text class="val" v-for="(item ,index) in reside" :key="index">{{item.contacts}}</text>
			</view>
			<view class="item">
				<text class="label">联系电话</text>
				<text class="val">{{orderDetail.phone}}</text>
			</view>
			<view class="item">
				<text class="label">支付方式</text>
				<text class="val">在线支付</text>
			</view>
			<view class="item">
				<text class="label">下单时间</text>
				<text class="val">{{orderDetail.createdAt}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderDetail
	} from '@/utils/request/manage.js'
	import djs from '@/components/djs/djs'
	export default {
		components: {
			djs:djs
		},
		data() {
			return {
				orderDetail: {},
				reside: [],
				rocallTime: ''
			}
		},
		onLoad() {
			this.getOrderDetail()
		},
		filters: {
			payStatus(value) {
				let obj = {
					0: '待支付',
					1: '已支付',
					2: '支付失败',
					3: '用户取消',
					4: '平台取消',
					5: '已退款',
					9: '已完成',
				}
				return obj[value]
			},
		},
		methods: {
			async getOrderDetail() {
				const {
					data: res
				} = await orderDetail(Number(this.$mp.query.id))
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.orderDetail = res.data.order
					this.reside = res.data.reside
					console.log("res", this.orderDetail)

				}
				// this.pageshow = false
			},
			ComputetTime(data) {
				let st = data.currentTime.replace(/\-/g, "/"), //当前服务器时间
					ct = data.formatCreateTime.replace(/\-/g, "/"); //创建订单时间
				let ts = new Date(st).getTime(),
					tc = new Date(ct).getTime();
				let cm = 15 * 60 * 1000 - (ts - tc);
				this.runBack(cm);
			},
			runBack(cm) {
				if (cm > 0) {
					cm > 60000 ?
						(this.rocallTime =
							(new Date(cm).getMinutes() < 10 ?
								"0" + new Date(cm).getMinutes() :
								new Date(cm).getMinutes()) +
							":" +
							(new Date(cm).getSeconds() < 10 ?
								"0" + new Date(cm).getSeconds() :
								new Date(cm).getSeconds())) :
						(this.rocallTime =
							"00:" +
							(new Date(cm).getSeconds() < 10 ?
								"0" + new Date(cm).getSeconds() :
								new Date(cm).getSeconds()));
					let _msThis = this;
					setTimeout(function() {
						cm -= 1000;
						_msThis.runBack(cm);
					}, 1000);
				} else {
					this.changeOrderState(); //调用改变订单状态接口
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.order-page {
		padding-bottom: 100rpx;

		.order-state {
			// background-color: #333333;
			// background-color: #ffffff;
			background-color: #ffe9d7;
			display: flex;
			flex-direction: column;
			// align-items: center;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 8rpx;

			.state-txt {
				color: #ff951d;
				font-size: 30rpx;
				font-weight: bold;
				padding-bottom: 20rpx;
			}

			.hint-txt {
				color: #666666;
				font-size: 24rpx;
			}

			.operate {
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

			.item {
				display: flex;
				align-items: center;
				padding: 15rpx 0;
				font-size: 24rpx;

				.label {
					color: #999999;
					width: 20%;
				}

				.val {
					color: #333333;
				}
			}
		}
	}

	/deep/ button::after {
		border: none;
	}
</style>
