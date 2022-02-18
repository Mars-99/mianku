<template>
    <view>
        <text v-if="isCounttime">{{cancelTime}}</text>
    </view>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    endTime: { }, //接收得最后时间 2021-12-17 16：29：20
  },
  data() {
    //这里存放数据
    return {
      cancelTime: '',
      isCounttime: true,
	  
    }
  },
  beforeMount() {
  	this.init()
  },
  //方法集合
  methods: {
    init(){
		let t = setInterval(() => {
			let endtime = moment(this.endTime).format(); //下单时间
			let nowtime = moment().format(); //当前时间
			// console.log("endTime", endTime)
			// console.log("nowTime", nowTime)
		
			let diff = 1800 - moment(nowtime, 'YYYY-MM-DD hh:mm:ss').diff(endtime, "seconds"); //时间差
			let days = parseInt(diff / (3600 * 24));
			diff = diff - days * 3600 * 24;
			let hour = parseInt(diff / 3600); //根据获得的秒数计算有多少小时
			diff = diff - hour * 3600;
			let minute = parseInt(diff / 60); //根据获得的秒数计算有多少分钟
			let second = diff - 60 * minute;
			this.cancelTime = minute + "分" + second+"秒"
			if (diff <= 0) {
				this.cancelTime = ' 0分0秒';
				this.isCounttime = false;
			    clearInterval(t);
			}
		
			
		}, 1000);
    },
    
  },
}
</script>
<style scoped lang='scss' >
 
</style>