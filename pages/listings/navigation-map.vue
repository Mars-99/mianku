<template>
	<view class="content">
		<map id="myMap" class="cont-map" :latitude="latitude" :longitude="longitude" :markers="markers" show-location
			@updated="lodingmap">
		</map>
		<view class="tobus">
			<image @click="loding" class="dw" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/dingwei.png" mode=""></image>
			<view class="tobus_box">
				<text class="tobus_box_title">{{city}}</text>
				<view class="txt_list">
					<text>{{address}}</text>
				</view>
				<button type="default" @click="tobus">到这去</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 经纬度是自己的
				latitude: 0,
				longitude: 0,
				// 这里经纬度是到店铺的位置
				markers: [{
					id: 1,
					width: 50,
					height: 50,
					iconPath: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/map-icon.png',
					latitude: 0,
					longitude: 0,
				}],
				// 1是开启导航 0是不开启
				num: 1,
				// 标记点的地址
				city: '',
				address:'',
				flag: false,
				key: '46ABZ-J7NCF-F4HJ4-N2TB6-T5636-7OBA3'

			}
		},
		// 页面初次渲染完成
		onReady() {
			// 获取地图实例，绑定到id叫myMap上面
			this.mapCtx = wx.createMapContext('myMap')
		},

		onLoad() {

			if (this.$mp.query.markers) {
				this.markers = JSON.parse(this.$mp.query.markers)
				// console.log("this.markers", this.markers)
			}
			// 把标记坐标转换成地址（逆解析）
			uni.request({
				// 此处的key需要填写
				url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' +
					this.markers[0].latitude + ',' + this.markers[0].longitude +
					'&key=' + this.key + '&get_poi=1',
				success: res => {
					this.city = res.data.result.formatted_addresses.recommend
					this.address = res.data.result.address_component.city+'/'+res.data.result.address_component.district+'/'+res.data.result.address_component.street
					// console.log(res.data.result);
				}
			})
			//进入地图页面后获取自己的坐标
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					// 获取到坐标后存起来
					var that = this
					this.latitude = res.latitude
					this.longitude = res.longitude
					// 使用地图实例中的方法，让标记和我的位置都在可视区域里显示
					
					setTimeout(function (){
						that.mapCtx.includePoints({
							padding: [140, 50, 140, 50],
							points: [
								// 第一个是我的位置数据
								{
									latitude: that.latitude,
									longitude: that.longitude
								},
								// 第二个是店铺位置数据
								{
									latitude: that.markers[0].latitude,
									longitude: that.markers[0].longitude
								}
							]
						})
					},"1000")
				},
			});
		},
		methods: {
			// 当地图加载完成后触发
			lodingmap() {
				this.flag = true
			},
			// 点击回到自己的位置
			loding() {
				if (this.flag) {
					this.mapCtx.moveToLocation()
				}
			},
			tobus() {
				if (this.flag) {
					let plugin = requirePlugin('routePlan');
					// 这里的k自己在腾讯地图api上申请
					let key = this.key; //使用在腾讯位置服务申请的key
					let referer = 'mianku'; //调用插件的app的名称
					let endPoint = JSON.stringify({ //终点
						'name': this.city,
						'latitude': this.markers[0].latitude,
						'longitude': this.markers[0].longitude
					});
					wx.navigateTo({
						url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' +
							endPoint + '&navigation=' + this.num
					});
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.cont-map {
		width: 100%;
		height: calc(100vh - 226rpx);
	}

	.tobus {
		height: 266rpx;
		box-sizing: border-box;
		padding: 20rpx 30rpx 30rpx 30rpx;
		background-color: #fff;
		margin: 0 0rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 10rpx 10rpx 0 0;
	}

	.tobus_box_title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.txt_list {
		display: flex;
		margin: 30rpx 0;
	}

	.txt_list text {
		font-size: 24rpx;
		color: #333;
		margin-right: 14rpx;
	}

	.tobus .tobus_box button {
		height: 84rpx;
		background: #261817;
		border-radius: 10rpx;
		color: #fff;
		font-size: 32rpx;
	}

	.dw {
		transform: translateY(-100%);
		top: -30rpx;
		position: absolute;
		right: 20rpx;
		width: 50rpx;
		height: 50rpx;
		bottom: 400rpx;
	}
</style>
