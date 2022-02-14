<template>
	<view class="content">
		<view class="find-list">
			<view class="find-item" v-for="(item ,index) in findData" :key="index" @tap="openFindDetail(item.id)">
				<view class="picture">
					<image class="img" mode="aspectFill" :src="item.thum">
					</image>
				</view>
				<view class="cont">
					<view class="title">{{item.title}}</view>
					<view class="info">
						<view class="user">
							<view class="avatar">
								<image class="img" mode="aspectFill" :src="item.face">
								</image>
							</view>
							<view class="name">{{item.writer}}</view>
						</view>
						<!-- <view class="great">
							<uni-icons type="heart" size="14" color="#fd4747"></uni-icons>
							<text>{{item.greatNumber}}</text>
						</view> -->
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		roamList
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				findData:[],
				curCity:1
				
			}
		},
		onLoad() {
			this.getRoamList()
		},
		methods: {
			openFindDetail(id){
				uni.navigateTo({
					url: '../find/find-detail?id='+id
				})
			},
			async getRoamList(){
				const {
					data:data
				} = await roamList(this.curCity)
				this.findData=data.data.news
				console.log(this.findData)
			}
		}
	}
</script>

<style scoped lang="scss">
	.find-list{
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
		justify-content: space-between;
		.find-item{
			width: 47%;
			margin: 10rpx;
			border-radius: 8rpx;
			overflow: hidden;
			height: 480rpx;
			background-color: #ffffff;
			
			.picture{
				width: 100%;
				height: 340rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			.img{
				width: 100%;
			}
			}
			.cont{
				padding: 0 20rpx;
				.title{
					font-size: 26rpx;
					color: #333333;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
					padding-top: 15rpx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 10rpx;
					.user{
						font-size: 20rpx;
						display: flex;
						align-items: center;
						.avatar{
							width: 40rpx;
							height:40rpx;
							border-radius: 40rpx;
							overflow: hidden;
							margin-right: 10rpx;
							.img{
								width: 100%;
							}
						}
						.name{
							color: #999999;
						}
					}
					.great{
						color: #666666;
						    font-size: 20rpx;
						    display: flex;
						    align-items: center;
					}
				}
			}
		}
	}

</style>
