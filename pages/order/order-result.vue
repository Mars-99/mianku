<template>
	<view class="content">
		<text>支付成功</text>
		<button class="btn" type="primary" size="default" @tap="openOrderPage()">查看订单</button>
		<button class="btn" type="primary" size="default" @tap="openIndexPage()">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openOrderPage() {
				console.log("aaaa")
				uni.switchTab({
					url: './order'
				})
			
			},
			openIndexPage() {
				console.log("bbb")
				uni.switchTab({
					url: '../index/index'
				})
			
			},
		}
	}
</script>

<style>

</style>
