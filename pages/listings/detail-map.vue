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
				latitude: 0,
				longitude: 0,
				markers: [],
				swiperheight: 0,
				// markers:[]
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
		  onShow() {
		  	// console.log(this.$mp.query.markers)
			if(this.$mp.query.markers){
				this.markers = JSON.parse(this.$mp.query.markers)
				console.log("this.markers", this.markers)
			}
			this.latitude = this.markers[0].latitude
			this.longitude =this.markers[0].longitude
		  }
	}
</script>

<style>

</style>
