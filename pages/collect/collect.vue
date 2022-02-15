<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view style="background-color: #ffffff;">
				<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#ff941d"
					@clickItem="onClickItem" />
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="collect-list">
						<uni-title type="h4" title="3个房源 "></uni-title>
						<view v-for="item in collection_list[current]" :key="item.cid" class="collect-item">
							<view class="img-left">
								<image mode="aspectFill" :src="item.thum"></image>
							</view>
							<view class="cont-right">
								<view class="info">
									<text class="txt">{{item.cityName}}-{{item.districtName}}</text>·
									<text class="txt">整套</text>·
									<text class="txt">{{item.houseType}}{{item.bedType}}</text>·
									<text class="txt">可住{{item.occupancy}}人</text>
								</view>
								<view class="title">
									{{item.hotelName}}
								</view>
								<view class="bottom-info">
									<view class="price">
										<view class="CP">￥{{item.weekdaysActivity}}</view>
										<view class="OP">￥{{item.weekdaysOriginal}}</view>
										<view class="wan">/晚</view>
									</view>
									<view class="collect">
										<uni-icons type="star" size="24" color="#cccccc" v-if="false"></uni-icons>
										<uni-icons type="star-filled" size="24" color="#ff951d" v-else></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<!-- <view class="collect-item">
							<view class="img-left">
								<image mode="aspectFill" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/fangyuan-01.jpg">
								</image>
							</view>

							<view class="cont-right">
								<view class="info">
									<text>长沙</text>·
									<text>整套房源</text>·
									<text>1室1卫1床</text>·
									<text>可住2人</text>
								</view>
								<view class="title">
									邂逅摩洛哥 五一广场巨幕投影房·舒适乳胶床垫
								</view>
								<view class="bottom-info">
									<view class="price">
										<view class="CP">￥180</view>
										<view class="OP">￥210</view>
										<view class="wan">/晚</view>
									</view>
									<view class="collect">
										<uni-icons type="star" size="24" color="#cccccc" v-if="false"></uni-icons>
										<uni-icons type="star-filled" size="24" color="#ff951d" v-else></uni-icons>
									</view>
								</view>
							</view>

						</view>-->
					</view>
				</view>
				<view v-show="current === 1">
					<view class="history-litt">
						<view class="listings-area">
							<view class="listings-list">
								<listingsItem></listingsItem>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import listingsItem from '@/components/listings-item/listings-item.vue'
	import {mapActions,mapGetters } from 'vuex'
	import {
		getCollectionList,city
	} from '@/utils/request/manage.js'
	export default {
		components: {
			// listingsItem
		},
		data() {
			return {
				items: ['收藏', '历史浏览'],
				current: 0,
				collection_list:[[],[]],
				cityData:[],
				districtData:[],
				pages: [{currentPage: 1,totalPage: 1,loadingType: 0}],
				isLoading:false
			}
		},
		onLoad(){
			this.getCity()
			this.initData(0,1,10)
		},
		computed:{
			...mapGetters(['getUserinfo','getNeedAuth','getIsLogin'])
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			async getCity(){
				const {
					data
				} = await city(0)
				this.cityData=data.data				
				for(let i=0;i<this.cityData.length;i++){
					let district_data = await city(this.cityData[i].id)
					this.districtData = this.districtData.concat(district_data.data.data)
				}
			},
			async initData(type,page,limit){
				if (!this.getIsLogin) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
				const {data:res} = await getCollectionList(type,page,limit)				
							
				this.pages[this.current].totalPage = res.data.pages
				let list = [];
				res.data.rs.forEach(item=>{
					let selectobj = this.cityData.find(obj=>{
						return obj.id===item.cityId
					})
					if(selectobj){
						item.cityName=selectobj.cityName						
					}	
					let district_obj = this.districtData.find(obj1=>{return obj1.id === item.districtId})
					if(district_obj){
						item.districtName = district_obj.cityName
					}										
					list.push(item)
				})				
				if (page == 1) {
					this.collection_list[this.current] = list
				} else {
					this.collection_list[this.current] = this.collection_list[this.current].concat(list)
				}				
				console.log('收藏列表：',this.collection_list)
				this.isLoading = true
			},
		}
	}
</script>

<style scoped lang="scss">
	.collect-list {
		padding: 5%;
		background-color: #ffffff;
		width: 90%;

		.collect-item {
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx #f5f5f5 solid;

			.img-left {
				border-radius: 8rpx;
				overflow: hidden;
				height: 180rpx;
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

					text.txt {
						padding-right: 10rpx;
						color: #666666;
					}
				}

				.title {
					font-size: 30rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					height: 40rpx;
					padding: 10rpx 0;
					color: #333333;
				}

				.bottom-info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price {
						display: flex;
						align-items: center;
						color: #999999;
						padding-top: 10rpx;
						font-size: 24rpx;

						.CP {
							font-size: 38rpx;
							font-weight: bold;
							color: #ff951d;
						}

						.OP {
							font-size: 24rpx;
							color: #999999;
							text-decoration: line-through;
							margin: 0 10rpx;
						}

						.youhui {
							color: #ff951d;
							margin-left: 30rpx;

						}
					}

					.collect {
						padding-top: 10rpx;
					}
				}
			}
		}

	}

	.listings-area {
		padding: 30rpx;

		.listings-list {}
	}
</style>
