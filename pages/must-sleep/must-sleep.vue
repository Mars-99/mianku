<template>
	<view class="content" :style="{'min-height': swiperheight + 'px'}">
		<view class="banner-area">
			<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/bishui-banner.png">
			</image>
			<view class="rule-link">
				<text class="txt" @tap="openSiteContent()">必睡榜单评分标准</text>
				<view class="icon">
					<uni-icons type="right" size="12" color="#666666"></uni-icons>
				</view>
			</view>
			<view class="intro">
				首期推荐网红城市长沙的必睡民宿，本次入选的有10间民宿，让更多消费者轻松享受一站式品质服务。
			</view>
		</view>
		<view class="listings-area">
			<view class="city-list">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#6f7377"></uni-segmented-control>
				<view class="content">
					<view >
						<listingsItem :listingsList="listingsList" :bsOrigin="bsOrigin"></listingsItem>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listingsItem from '@/components/listings-item/listings-item.vue'
	import {
		bsHotelList,
		getCollectionList
	} from '@/utils/request/manage.js'
	export default {
		components: {
			listingsItem
		},
		data() {
			return {
				items: ['全国', '长沙'],
				current: 0,
				listingsList: [],
				bsOrigin:true,
				cityID:0,
				swiperheight:0,
				
				isCollect: -1,
				collectionList: []
			}
		},
		onLoad() {
			this.init()
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
		methods: {
			
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					switch(e.currentIndex){
						case 3:
							//这里是值对应的处理
							this.cityID = 7
							this.getBsHotelList()
							console.log("1234566")
							break
						case 4:
							//这里是值对应的处理
							this.cityID = 8
							this.getBsHotelList()
							break
						default:
							//这里是没有找到对应的值处理
							this.cityID = e.currentIndex
							this.getBsHotelList()
							break
					}
					
				}
			},
			async getBsHotelList() {
				const {
					data
				} = await bsHotelList(this.cityID,"必睡精品")
				this.listingsList = data.data.hotels
				console.log(data.data.hotels)
			},
			init(){
				this.cityID = this.$mp.query.curCityId
				
				if(this.cityID == 7){
					this.current =2
				}
				if(this.cityID == 8){
					this.current =3
				}
				this.current = this.cityID
				this.getBsHotelList()
				this.getCollectionList(0)
			},
			async getCollectionList(type) {
				const {
					data: res
				} = await getCollectionList(type)
				if (res.code == 1) {
					this.$api.msg(data.code.msg)
				} else {
					this.collectionList = res.data.rs
					this.collec()
					// console.log("收藏列表", this.collectionList)
				}
				
				
			},
			collec(){
				let that = this
				this.listingsList.forEach(item=>{
					let isCollect = this.collectionList.find(_item => _item.cid === item.id)
					if (isCollect) {
						if (isCollect.cid == item.id) {
							item.isCollect = 0
						} else {
							item.isCollect = -1
						}
					} else {
						return
					}
				})
			},
			openSiteContent() {
				uni.navigateTo({
					url: '../site-content/site-content?id=7' 
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #2a2c34;

		.banner-area {
			position: relative;
			height: 620rpx;
			overflow: hidden;

			.img {
				width: 100%;
				display: flex;
				align-items: center;
			}

			.rule-link {
				position: absolute;
				top: 50rpx;
				right: 30rpx;
				background-color: rgba($color: #ffffff, $alpha: 0.6);
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

			.intro {
				padding: 0 80rpx;
				position: absolute;
				top: 340rpx;
				color: #ffffff;
				font-size: 28rpx;
				line-height:50rpx;
			}
		}

		.listings-area {
			padding: 0 30rpx 60rpx 30rpx;
			margin-top: -40rpx;
			position: relative;

			.city-list {
				margin-bottom: 30rpx;
			}
		}
	}

	/deep/ .segmented-control {
		background-color: #989798;
		height: 42px;
		border-radius: 5px;
		margin-bottom: 30rpx;
		color: #ffffff;
	}

	/deep/ .segmented-control__item--button {
		border-style: solid;
		border-top-width: 0px;
		border-bottom-width: 0px;
		border-right-width: 1px;
		border-left-width: 0;
	}

	/deep/ .segmented-control__item--button--last {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-right-width: 0px;
	}


	/deep/ .segmented-control__text {
		font-size: 28rpx;
		font-weight: bold;
		line-height: 40rpx;
		text-align: center;
		color: #ffffff;
	}
</style>
