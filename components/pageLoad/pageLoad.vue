<template>
	<view class='load' :style="{'height': swiperheight + 'px'}">
		<view class="spinner">
			<view class="rect rect1"></view>
			<view class="rect rect2"></view>
			<view class="rect rect3"></view>
			<view class="rect rect4"></view>
			<view class="rect rect5"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pageLoad",
		data() {
			return {
				swiperheight: 0,
			};
		},
		onLoad() {
			this.getUserDetail()
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
	}
</script>

<style scoped lang="scss">
	.load {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111;

	}

	.spinner {
		margin: 200px auto;
		width: 50px;
		height: 60px;
		text-align: center;
		font-size: 10px;
	}

	.spinner .rect {
		background-color: #ff941d;
		height: 100%;
		width: 6px;
		border-radius: 3rpx;
		display: inline-block;
		margin: 0 3rpx;

		-webkit-animation: stretchdelay 1.2s infinite ease-in-out;
		animation: stretchdelay 1.2s infinite ease-in-out;
	}

	.spinner .rect2 {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}

	.spinner .rect3 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}

	.spinner .rect4 {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}

	.spinner .rect5 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}

	@-webkit-keyframes stretchdelay {

		0%,
		40%,
		100% {
			-webkit-transform: scaleY(0.4)
		}

		20% {
			-webkit-transform: scaleY(1.0)
		}
	}

	@keyframes stretchdelay {

		0%,
		40%,
		100% {
		 transform: scaleY(0.4);
			-webkit-transform: scaleY(0.4);
		}

		20% {
			transform: scaleY(1.0);
			-webkit-transform: scaleY(1.0);
		}
	}
</style>
