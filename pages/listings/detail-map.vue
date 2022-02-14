<template>
	<view>
		<view class="cont-map">
			<map style="width: 100%" :style="{ 'height': swiperheight + 'px' }" :latitude="latitude" :longitude="longitude"
				:markers="markers">
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 28.192118928215603,
				longitude: 112.97686562469652,
				markers: [{
					width: 40,
					height: 40,
					latitude: 28.192118928215603,
					longitude: 112.97686562469652,
					iconPath: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/map-icon.png',
					"callout": {
						"content": "中国, 湖南省, 长沙市, 芙蓉区, IFS国金中心",
						"borderRadius": 5,
						"display": "ALWAYS",
						"padding": 7,
						"bgColor": "#FFFFFF",
						"textAlign":"center",
					}
				}],
				swiperheight: 0,
			}
		},
		  mounted () {
		    
		
		    // 注意，这里要用个变量存this，不然进到getSystemInfo后this指向会变化，找不到data变量
		    var _this = this
		    uni.getSystemInfo({
		      success: function (res) {
		        _this.swiperheight = res.windowHeight
		      }
		    })
		  },
	}
</script>

<style>

</style>
