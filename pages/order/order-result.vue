<template>
	<view class="content" :style="{'height': swiperheight + 'px'}">
		<view class="pay-result">
			<view class="success" v-if="state == 'success'">
				<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/pay-result-success.png">
				</image>
				<view class="txt">支付成功</view>
			</view>
			<view class="fail" v-else>
				<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/pay-result-fail.png">
				</image>
				<view class="txt">支付失败</view>
			</view>
		</view>
		<view class="operate">
			<button class="order-btn btn" type="primary" size="default" @tap="openOrderPage()">查看订单</button>
			<button class="home-btn btn" type="primary" size="default" @tap="openIndexPage()">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperheight: 0,
				state:'',
			}
		},
		mounted() {
			// 注意，这里要用个变量存this，不然进到getSystemInfo后this指向会变化，找不到data变量
			var _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.swiperheight = res.windowHeight
				}
			})
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(){
				this.state = this.$mp.query.state
			},
			openOrderPage() {
				console.log("aaaa")
				uni.switchTab({
					url: './order'
				})
			
			},
			openIndexPage() {
				console.log("bbb")
				uni.switchTab({
					url: '../index/index'
				})
			
			},
		}
	}
</script>

<style scoped lang="scss">
	.content{
		background-color: #ffffff;
		.pay-result{
			padding: 50rpx;
			.success{
				width: 40%;
				margin: 0 auto;
				.img{
					width: 100%;
				}
			}
			.fail{
				width: 40%;
				margin: 0 auto;
				.img{
					width: 100%;
				}
			}
			.txt{
				font-size: 32rpx;
				color: #333333;
				text-align: center;
			}
		}
		.operate{
			margin: 200rpx auto 0 auto;
			width: 80%;
			
			.btn{
				border-radius: 90rpx;
				border: none;
				margin-right: 20rpx;
				line-height: 90rpx;
				margin-bottom: 30rpx;
			}
			.order-btn{
				background-color: #333333;
				color: #fffff;
			}
			.home-btn{
				background-color: #ffffff;
				border: 2rpx #333333 solid;
				color: #333333;
			}
		}
	}


</style>
