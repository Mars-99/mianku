<template>
	<view>
		<uni-swiper-dot :info="listingsBanner" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box">
				<swiper-item v-for="(item ,index) in listingsBanner" :key="index">
					<view class="swiper-item">
						<image mode="widthFix" :src="item.thum">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	export default {
		props: {
			listingsBanner: {
				type: Array,
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
