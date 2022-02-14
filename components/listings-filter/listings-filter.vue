<template>
	<view class="listings-filter-area">
		<uni-card>
			<view class="select-city">
				<view class="current-city" @click="openCtiy(cityid)">{{cityname}}</view>
				<!-- <view class="location" @tap="getLocation()">
					<uni-icons type="location" size="16" color="#ff941d"></uni-icons>重新定位
				</view> -->
			</view>
			<view class="select-date">
				<view class="check-in" @tap="selectDate()">{{checkIn}}</view>
				<view class="period">共{{dayCount}}晚</view>
				<view class="check-out" @tap="selectDate()">{{checkOut}}</view>
			</view>
			<view class="search-key">
				<uni-easyinput suffixIcon="closeempty" v-model="keywords" placeholder="核心商圈/房源名/地址" @input="input"
					@iconClick="iconClick">
				</uni-easyinput>
			</view>

			<button class="search-btn" type="primary" size="default" @tap="openListingsPage()">查找房源</button>
			<view class="official-desc">
				<uni-icons type="medal-filled" size="14" color="#ff941d"></uni-icons>
				<view>官方渠道预订享低价保证</view>
			</view>
		</uni-card>
	</view>

</template>

<script>
	import {
		city
	} from '@/utils/request/manage.js'
	export default {
		props: {
			curCityName: {
				type: String,
			},
			curCityId: {
				type: String,
			},
			checkIn: {
				type: String,
			},
			checkOut: {
				type: String,
			},
			dayCount: {
				type: String,
			},
			choiceDateArr:{
				type: Array,
			}

		},
		data() {
			return {
				keywords: '',
				name: '',
				address: '',
				latitude: '',
				longitude: '',
				// locationCityName:''
				cityname: this.curCityName,
				cityid: this.curCityId,
				cityList:[]
			}
		},
		watch: {
			curCityName(newVal) {
				this.cityname = newVal
			},
			curCityId(newVal) {
				this.cityid = newVal
			},
		},

		onShow() {
			this.getSetting()
			this.init()
			console.log("cc", this.choiceDate)

		},
		methods: {
			async init(){
				const {data} = await city(0)
				this.cityList=data.data
			},
			input(e) {
				this.keywords = e
				this.$emit('keywords', e)
				console.log(e)
			},
			iconClick(type) {
				this.keywords = ''
				this.$emit('keywords', '')
			},
			openCtiy(id) {
				uni.navigateTo({
					url: '../ctiy/ctiy?id=' + id
				})
				console.log("aaa")
			},
			selectDate() {
				uni.navigateTo({
					url: '../select-date/select-date'
				})
			},
			openListingsPage() {
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				uni.navigateTo({
					url: '../listings/listings-list?cityId=' + this.cityid + '&checkIn=' + this.checkIn +
						'&checkOut=' + this.checkOut + '&curCityName=' + this.cityname + '&keywords=' + this
						.keywords+'&dayCount='+this.dayCount+'&choiceDateArr='+choiceDateArr
				})
			},

			//  获取用户的地理位置，
			 getLocation() {
				 this.init()
				let that = this
				uni.getLocation({
					type: 'wgs84',
					altitude: true,
					isHighAccuracy: true, //开启高精度定位
					success(res) {
						uni.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=46ABZ-J7NCF-F4HJ4-N2TB6-T5636-7OBA3`,
							data: {},
							success: (res2) => {
								let cityname = res2.data.result.address_component.city
							     that.cityname = cityname.slice(0, cityname.length - 1)
								 that.cityid = that.cityList.filter(item=>item.cityName==that.cityname)[0].id
								 that.$emit('changeData', that.cityid)
							},
							
						});
					}
				});
				// console.log("rrrrr",that.cityid)
				// this.$emit('changeData', that.cityid)
				
			},
		},
	}
</script>

<style scoped lang="scss">
	/deep/ .is-input-border {
		border: none;
	}

	.listings-filter-area {
		margin-top: -120rpx;

		.select-city {
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx #f7f7f7 solid;
			padding: 20rpx 0;

			.location {
				border-left: 1rpx #f7f7f7 solid;
				padding-left: 20rpx;
			}
		}

		.select-date {
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx #f7f7f7 solid;
			padding: 20rpx 0;

			.period {
				border: 1rpx #f7f7f7 solid;
				border-radius: 30rpx;
				padding: 0 20rpx;
				font-weight: bold;
				font-size: 24rpx;
			}
		}

		.search-key {
			padding: 20rpx 0;

		}

		.search-btn {
			border-radius: 60rpx;
			border: none;
			background-color: #261817;
			color: #fffff;
		}

		.official-desc {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			font-size: 24rpx;
		}
	}
</style>
