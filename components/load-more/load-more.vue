<template>
	<view class="load-more" :style="{backgroundColor: bgc,height: height + 'rpx'}">
		<view class="mix-load-icon hticon icon-zhongxinjiazai" v-if="[1].includes(loadingType)"></view>
		<text class="mix-load-text">
			{{loadingType === 0 ? contentText[0] : (loadingType === 1 ? contentText[1] : contentText[2])}}
		</text>
	</view>
</template>

<script>
	export default {
		name: "load-more",
		props: {
			// 加载状态
			loadingType: {
				type: Number,
				default: 0
			},
			bgc: {
				type: String,
				default: "#FFF"
			},
			height: {
				type: Number,
				default: 100
			}
		},
		data() {
			return {
				// 加载提示
				contentText: ["上拉加载更多","加载中ing...","——— 已经到底了 ———"]
			}
		}
	}
</script>

<style>
.load-more {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	/* height: 100rpx; */
	text-align: center;
	line-height: 100rpx;
	color: #999;
	/* background-color: #f5f5f5; */
}
.mix-load-icon {
	margin-right: 12rpx;
	animation: load 0.8s cubic-bezier(.37,1.08,.7,.74) infinite;
}
.mix-load-text{
	font-size: 28rpx;
	color: #999;
}
@-webkit-keyframes load {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
