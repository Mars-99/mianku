<template>
	<view class="content">
		<uni-row class="demo-uni-row" :gutter="10">
			<uni-col :span="24" v-for="(item ,index) in cityData" :key="index">
				<view class="demo-uni-col city-item" @tap="chooseBrand(item)">
					<view class="city-item-img">
						<image mode="aspectFill" :src="item.thum">
						</image>
					</view>
					<view class="city-item-name">{{item.cityName}} | {{item.namePinyin}}</view>
					<view class="current-ctiy" v-if="actID === item.id">
						<uni-icons type="location-filled" size="24" color="#ffffff"></uni-icons>
					</view>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import {
		city
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
			cityData: [],
			cityID: 0,
			actID:null
			}
		},
		onLoad() {
			this.getCity()
			this.actID=Number(this.$mp.query.id)
		},
		methods: {
			async getCity() {
				const {
					data
				} = await city(this.cityID)
				this.cityData=data.data
	
			},
			//往上一页传值
			chooseBrand(item) {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]
				prevPage.brand = {
					name: item.cityName,
					id:item.id
				}
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.content {
		overflow: hidden;
	}

	.city-item {
		width: 100%;
		height: 280rpx;
		overflow: hidden;
		position: relative;
		background-color: #333333;

		.city-item-name {
			position: absolute;
			width: 100%;
			left: 0;
			top: 45%;
			z-index: 1;
			text-align: center;
			color: #ffffff;
			font-size: 34rpx;
			text-transform:Uppercase;
		}

		image {
			width: 100%;
			opacity: 0.5;
		}

		.current-ctiy {
			position: absolute;
			left: 150rpx;
			top: 46%;
			z-index: 1;
			text-align: center;
			color: #ffffff;
		}
	}
</style>
