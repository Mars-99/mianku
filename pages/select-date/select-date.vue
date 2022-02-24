<template>
	<view class="content">
		<calendar ref="calendar" :pageSource="pageSource" :weekendActivity="weekendActivity"
			:weekdaysActivity="weekdaysActivity" :orderDate="orderDate" :assign="assign" @change="change"></calendar>
	</view>
</template>

<script>
	import calendar from '../../components/date-picker/date-picker';
	export default {
		components: {
			calendar
		},
		data() {
			return {
				showCaledar: false,
				dateStr: '',
				pageSource: '',
				weekendActivity: 0,
				weekdaysActivity: 0,
				orderDate: [],
				assign:[],
			};

		},
		onLoad() {
			this.pageSource = this.$mp.query.pageSource
		},
		onShow() {
			this.pageSource = this.$mp.query.pageSource
			this.weekendActivity = this.$mp.query.weekendActivity
			this.weekdaysActivity = this.$mp.query.weekdaysActivity
			if(this.$mp.query.orderDate){
				this.orderDate = JSON.parse(this.$mp.query.orderDate)
			}
			if(this.$mp.query.assign){
				this.assign = JSON.parse(this.$mp.query.assign)
			}
			// this.pageshow = false
			
		},
		methods: {

			change({
				choiceDate,
				dayCount
			}) {
				//参数解释
				//1.choiceDate 时间区间（开始时间和结束时间）
				//2.dayCount 共多少晚

				console.log(choiceDate, dayCount);
				console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
			},
			change2({
				choiceDate,
				dayCount
			}) {
				this.dateStr = '入住从 ' + choiceDate[0].re + ' (星期' + choiceDate[0].week + ')  到 ' + choiceDate[1].re +
					'(星期' + choiceDate[1].week + ')' + '  共 ' + dayCount + ' 晚 ';
			},
			// chooseBrand() {
			// 	// var shequ = getCurrentPages();
			// 	// var prevShequ = shequ[shequ.length - 2];
			// 	// prevShequ.brand = {
			// 	// 	name: item.cityName,
			// 	// 	id:item.id
			// 	// }
			// 	// uni.navigateBack()
			// }
		}
	};
</script>

<style>
	view {
		display: flex;
	}

	.content {
		justify-content: center;
		flex-direction: column;
		/* padding: 0 20rpx; */
	}

	.sliderBox {
		justify-content: center;
		margin-right: 50rpx;
	}

	.text-center {
		justify-content: center;
	}

	.title {
		font-size: 48rpx;
		/* font-weight: bold; */
		text-align: center;
		margin-top: 50rpx;
	}

	.subTitle {
		margin-top: 70rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}

	.desc {
		color: #999999;
		font-size: 30rpx;
	}

	.dateStr {
		font-size: 32rpx;
		margin-top: 30rpx;
	}

	.rowBox {
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.mrg50T {
		margin-top: 50rpx;
	}

	.tips {
		color: #999;
		font-size: 24rpx;
		text-align: center;
		margin-top: 100rpx;
	}

	.btn {
		margin-top: 50rpx;
	}
</style>
