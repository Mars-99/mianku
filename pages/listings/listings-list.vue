<template>
	<view class="content">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="top-bar">
				<view class="search-area">
					<view class="city" @click="openCtiy(cityId)">{{curCityName}}</view>
					<view class="data" @tap="selectDate()">
						<view class="item">入 <text>{{checkInYH}}</text></view>
						<view class="item">离 <text>{{checkOutYH}}</text></view>
					</view>
					<!-- <view class="enter">搜索房源名称/商圈</view> -->
					<!-- <input class="enter" type="text" v-model="keywords" placeholder="核心商圈/房源名/地址" @input="input" /> -->
					<uni-easyinput class="enter" styles="border: none; float:right;" :suffixIcon="closeempty"
						:clearable="false" v-model="keywords" placeholder="核心商圈/房源名/地址" @input="input">
					</uni-easyinput>
				</view>
				<filterArea :CBDlist="CBDlist" :hotCBD="hotCBD" :week="week" @districtId="getDistrictId" @flag="getFlag"
					@occupancy="getOccupancy" @bedNum="getBedNum" @priceValue="getPrice"
					@infrastructure="getInfrastructure" @houseNum="getHouseNum" @tag="getTag" @rules="getRules">
				</filterArea>
			</view>
			<view class="listings-area" v-if="listingsList.length">
				<listingsItem :listingsList="listingsList" :checkIn="checkIn" :checkOut="checkOut"
					:choiceDateArr="choiceDateArr" :dayCount="dayCount"></listingsItem>
			</view>
			<view v-else>暂无房源</view>
		</view>
	</view>
</template>

<script>
	import filterArea from '@/components/filter-area/filter-area.vue'
	import listingsItem from '@/components/listings-item/listings-item.vue'
	import pageLoad from '@/components/pageLoad/pageLoad'
	import {
		hotelList,
		city,
		getCollectionList
	} from '@/utils/request/manage.js'
	export default {
		components: {
			filterArea,
			listingsItem,
			pageLoad
		},
		data() {
			return {
				listingsList: [],
				cityId: 1,
				checkIn: 0,
				choiceDateArr: [],
				dayCount: 0,
				checkOut: 0,
				checkInYH: 0,
				checkOutYH: 0,
				curCityName: '',
				keywords: '',
				label: '',

				districtId: 0,
				CBDlist: [],
				hotCBD: [],
				flag: '',
				occupancy: 0,
				bedNum: 0,
				priceValue: [],
				infrastructure: '',
				houseNum: 0,
				tag: '',
				rules: '',

				totalPage: 1,
				currentPage: 1,
				loadingType: 0,
				page: 1,
				limit: 5,
				totalPage: 0,

				week: 0,
				pageshow: true,

				isCollect: -1,
				collectionList: []


			}
		},
		onLoad() {
			this.init()
			this.getCity()
			this.getWeeK()
		},
		onShow() {
			// this.getCollectionList(0)
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 1]
			this.brand = prevPage.brand
			if (this.brand) {

				if (this.brand.name) {
					this.curCityName = this.brand.name
					this.cityId = this.brand.id;
					this.page = 1
					this.gethotelList()
				}
				if (this.brand.choiceDate) {
					var checkIn = this.brand.choiceDate[0].re
					var checkOut = this.brand.choiceDate[1].re
					this.dayCount = this.brand.dayCount
					this.checkIn = checkIn
					this.checkOut = checkOut
					this.choiceDateArr = this.brand.choiceDateArr
					this.checkInYH = this.checkIn.slice(5)
					this.checkOutYH = this.checkOut.slice(5)
					this.page = 1
					this.gethotelList()
				}
			} else {
				return
			}
		},
		methods: {
			async gethotelList() {
				const {
					data
				} = await hotelList(Number(this.cityId), this.checkIn, this.checkOut, this.keywords, this.label, this
					.districtId, this.flag, this.occupancy, this.bedNum, this.priceValue[0], this.priceValue[1],
					this.infrastructure, this.houseNum, this.tag, this.rules, this.page, this.limit)
				this.totalPage = data.data.pages
				if (this.page == 1) {
					this.listingsList = data.data.hotels
					this.pageshow = false

				} else {
					this.listingsList = this.listingsList.concat(data.data.hotels)
					this.pageshow = false
				}
				this.getCollectionList(0)

			},
			async getCity() {
				const {
					data
				} = await city(Number(this.cityId))
				this.CBDlist = data.data
				this.hotCBD = this.CBDlist.filter(item => item.hot == 1)
				// console.log("cityData", this.CBDlist)
				// console.log("hotCBD", this.hotCBD)

			},
			init() {
				this.cityId = this.$mp.query.cityId
				this.curCityName = this.$mp.query.curCityName
				this.checkIn = this.$mp.query.checkIn
				this.checkOut = this.$mp.query.checkOut
				this.dayCount = this.$mp.query.dayCount
				this.keywords = this.$mp.query.keywords
				this.label = this.$mp.query.label
				this.flag = this.$mp.query.flag
				this.choiceDateArr = JSON.parse(decodeURIComponent(this.$mp.query.choiceDateArr))
				// console.log("this.choiceDateArraaaaa",this.choiceDateArr)

				this.checkInYH = this.checkIn.slice(5)
				this.checkOutYH = this.checkOut.slice(5)
				this.page = 1
				this.gethotelList()
			},
			openCtiy(id) {
				uni.navigateTo({
					url: '../ctiy/ctiy?id=' + id
				})
			},
			selectDate() {
				uni.navigateTo({
					url: '../select-date/select-date'
				})
			},
			input(e) {
				this.keywords = e
				// console.log(e)
			},
			getDistrictId(data) {
				this.page = 1
				this.districtId = data
				this.gethotelList()
			},
			getFlag(data) {
				if (data == "首单立减") {
					this.page = 1
					this.flag = "h"
					// console.log("this.flag", this.flag)
					this.gethotelList()
					return
				}
				if (data == "今日特价") {
					this.page = 1
					this.flag = "c"
					// console.log("this.flag", this.flag)
					this.gethotelList()
					return
				}
				if (data == "新房优惠") {
					this.page = 1
					this.flag = "j"
					this.gethotelList()
					return
				}
				this.page = 1
				this.flag = ''
				this.gethotelList()

			},
			getOccupancy(data) {
				this.page = 1
				this.occupancy = data
				this.gethotelList()
			},
			getBedNum(data) {
				this.page = 1
				this.bedNum = data
				this.listingsList = []
				this.gethotelList()
			},
			getPrice(data) {
				this.page = 1
				this.priceValue = data
				// console.log("this.priceValue", this.priceValue)
				this.gethotelList()
			},
			getInfrastructure(data) {
				this.page = 1
				this.infrastructure = data.toString()
				// console.log("this.infrastructure", this.infrastructure)
				this.gethotelList()
			},
			getHouseNum(data) {
				this.page = 1
				this.houseNum = data
				this.gethotelList()
			},
			getTag(data) {
				this.page = 1
				this.tag = data.toString()
				this.gethotelList()
			},
			getRules(data) {
				this.page = 1
				this.rules = data.toString()
				this.gethotelList()
			},
			getWeeK() {
				var now = new Date();
				var num = now.getDay(now)
				this.week = num
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
			collec() {
				let that = this
				this.listingsList.forEach(item => {
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
			}
		},
		onReachBottom() {

			if (this.page >= this.totalPage) {
				return
			} else {
				this.page += 1
				this.gethotelList()
			}
		},

	}
</script>
<style scoped lang="scss">
	/deep/ .is-input-border {
		border: none;
	}

	.content {
		width: 100%;

		.top-bar {
			background-color: #ffffff;
			display: block;
			padding: 30rpx 0 0 0;
		}

		.search-area {
			margin: 0 20rpx;
			background-color: #f6f7fa;
			border-radius: 8rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;

			.city {
				color: #ff941d;
				padding-right: 50rpx;
				border-right: 2rpx #f0f0f1 solid;
				line-height: 80rpx;
			}

			.data {
				padding: 0 20rpx 0 20rpx;
				border-right: 2rpx #f0f0f1 solid;
				line-height: 80rpx;
				display: flex;
				flex-direction: column;
				font-size: 24rpx;

				.item {
					line-height: 30rpx;
					padding: 5rpx 0;
					color: #7d7e80;

					text {
						color: #ff941d;
						font-weight: bold;
					}
				}
			}

			.enter {
				padding: 0 20rpx 0 20rpx;
				color: #7d7e80;
			}
		}



		.listings-area {
			padding: 30rpx;

		}
	}
</style>
