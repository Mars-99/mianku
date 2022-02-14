<template>
	<view>
		<uni-swiper-dot :info="listingsBanner" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box">
				<swiper-item v-for="(item ,index) in listingsBanner" :key="index">
					<view class="swiper-item">
						<image mode="widthFix" :src="item.src">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listingsBanner: [{
						src: '../../static/image/fangyuan-01.jpg',
					}, {
						src: '../../static/image/fangyuan-05.jpg',
					},
					{
						src: '../../static/image/fangyuan-07.jpg',
					}
				],
				current: 0,
				mode: 'round',
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.swiper-box {
		height: 500rpx;
	}
	
	.swiper-item {
		height: 500rpx;
		overflow: hidden;
		border-radius: 0 0 60rpx 60rpx;
	}
	
	.swiper-item>image {
		width: 100%;
	}

</style>
