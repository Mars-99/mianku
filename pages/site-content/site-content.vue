<template>
	<view class="content" :style="{'min-height': swiperheight + 'px'}">
		<view class="title">{{title}}</view>
		<view class="cont">
			<rich-text :nodes="cont"></rich-text>
		</view>
	</view>
</template>

<script>
	import {
		siteContent
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				swiperheight: 0,
				title:'',
				cont:'',
				id:0,
				siteContent:{}
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
			async init(){
				this.id = this.$mp.query.id
				const {
					data: res
				} = await siteContent()
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					console.log(res)
					this.siteContent = res.data.find(item => item.id == this.id)
					this.title = this.siteContent.title
					this.cont = this.siteContent.content
					uni.setNavigationBarTitle({
					      title: this.title
					})
					console.log(this.siteContent)
					}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		background-color: #ffffff;
		padding: 30rpx;
		.title{
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 30rpx;
			line-height: 60rpx;
		}
		.cont{
			color: #666666;
			font-size: 28rpx;
		}
	}

</style>
