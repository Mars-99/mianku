<template>
	<view class="content">
		<view class="banner">
			<image class="img" mode="widthFix"
				src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/privilege-banner.png">
			</image>
			<view class="rule-link">
				<text class="txt" @tap="openSiteContent()">规则说明</text>
				<view class="icon">
					<uni-icons type="right" size="12" color="#666666"></uni-icons>
				</view>
			</view>
		</view>
		<view class="king-kong">
			<view class="youhui-box">
				<view class="youhui-item">
					<view class="icon">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/tq-xszk-icon.png">
						</image>
					</view>
					<view class="youhui-name">学生折上折</view>
					<view class="youhui-info">专享9.5折</view>
				</view>
				<view class="youhui-item" @tap="openListingsDiscountPage()">
					<view class="icon">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/tq-xkyh-icon.png">
						</image>
					</view>
					<view class="youhui-name">新客优惠</view>
					<view class="youhui-info">首单最高立减60</view>
				</view>
				<view class="youhui-item">
					<view class="icon">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/tq-srzk-icon.png">
						</image>
					</view>
					<view class="youhui-name">生日85折</view>
					<view class="youhui-info">生日专享折扣85折</view>
				</view>
			</view>
			<view class="bulletin">
				<!-- <uni-notice-bar scrollable="true" single="true"
					text="用户小小眠 认证了学生特权卡 下单了【眠库·克莱因蓝bearbrick】五一广场·国金中心IFS·超级文和友·茶颜悦色·免费寄存·一居两床 房源"></uni-notice-bar> -->
					<maoScroll v-if="ordermsg.length>0" :data="data" :showNum="showNum" :lineHeight="lineHeight"
						:animationScroll="animationScroll" :animation="animation">
						<template v-slot="{line}">
							<view class="line">
								{{line.msg}}
							</view>
						</template>
					</maoScroll>
			</view>
			<view class="approve">
				<button class="btn" type="primary" size="default" v-if="userDetail.examine == 1">认证已通过</button>
				<button class="btn" type="primary" size="default" @tap="openAuthenticate()" v-else>立即认证</button>
				<view class="prompt" v-if="userDetail.examine == 3">你的认证信息已提交，我们将在1-3个工作日完成审核。</view>
				<view class="prompt" v-if="userDetail.examine == 2">很抱歉，因信息不符合要求，您的学生认证暂不通过。</view>
			</view>
		</view>
		<view class="discount-list">
			<view class="title-h1">
				眠库优惠包
			</view>
			<view class="aui-flex" v-for="(item ,key) in couponList" :key="key">
				<view class="aui-price-nub">
					<view class="aui-digit">
						<view class="h2">{{item.discount}}</view>
						<view class="txt">折</view>
					</view>
				</view>
				<view class="aui-flex-box">
					<view class="h2">{{item.title}}</view>
					<view class="txt" v-if="item.title.indexOf('生日') != -1">生日专享券,可在生当月享用。</view>
					<view class="txt" v-else>全场通用,首单最高立减60</view>
				</view>
				<view class="rzbtn">
				    <button class="btn" type="primary" size="default" v-if="userDetail.examine == 1">已享有</button>
					<button class="btn" type="primary" size="default" @tap="openAuthenticate()" v-else>认证领取</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userDetail,
		privilegeCoupon,
		orderMsg,
	} from '@/utils/request/manage.js'
	import maoScroll from '@/components/mao-scroll/mao-scroll.vue';
	export default {
		components: {
			maoScroll
		},
		data() {
			return {
				userDetail:{},
				couponList:[],
				checkIn: '选择入住日期',
				checkOut: '选择离店日期',
				check:[],
				ordermsg:[],
				data: [],
				showNum: 1,
				lineHeight: 40,
				animationScroll: 800,
				animation: 2000,
				
			}
		},
		onLoad() {
			this.getTimeandWeek()
			this.getOrderMsg()
			let self = this;
			setTimeout(function() {
				self.createData();
			}, 1000);
		},
		onShow() {
			this.getUserDetail()
			this.getPrivilegeCoupon()
		},
		methods: {
			openAuthenticate() {
				if(this.userDetail.examine == 3){
					uni.showToast({
					    icon: "none",
					    title:'认证已提交，1-3个工作日完成认证审核',
					        duration: 3000,
					        position: 'top'
					})
				}else{
					uni.navigateTo({
						url: "../student-privilege/authenticate"
					})
				}
			},
			async getUserDetail() {
				const {
					data: res
				} = await userDetail()
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.userDetail = res.data
					console.log(this.userDetail)
				}
			
			},
			async getPrivilegeCoupon() {
				const {
					data: res
				} = await privilegeCoupon()
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.couponList = res.data
					console.log("getPrivilegeCoupon",res)
				}
			
			},
			async getOrderMsg() {
				const {
					data: res
				} = await orderMsg(1,5)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.ordermsg= res.data.rs
				}
				const {
					data: res2
				} = await orderMsg(0,5)
				if (res2.code == 1) {
					return this.$api.msg(res2.msg)
				} else {
					this.ordermsg= this.ordermsg.concat(res2.data.rs)
					console.log("orderMsg",this.ordermsg)
				}
			
			
			},
			openSiteContent() {
				uni.navigateTo({
					url: '../site-content/site-content?id=5' 
				})
			},
			getTimeandWeek() {
				//获取当前时间
				var now = new Date();
				//往后几天就循环几次
				for (let i = 0; i < 7; i++) {
					//24 * 3600 * 1000 就是计算一天的时间  
					var date = new Date(now.getTime() + i * 24 * 3600 * 1000);
					var year = date.getFullYear();
					var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
					var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
					var dt2 = new Date(now.getTime() + i * 24 * 3600 * 1000);
					var weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
					//把七天的时间和星期添加到数组中
					this.check.push({
						date: year + '-' + month + '-' + day,
						week: weekDay[dt2.getDay()],
						checked: false
			
					});
				}
				this.checkIn = this.check[0].date
				this.checkOut = this.check[1].date
			},
			openListingsDiscountPage() {
				uni.navigateTo({
					url: '../listings/listings-list?cityId=1&curCityName=长沙&flag=h&checkIn=' + this.checkIn +
						'&checkOut=' + this.checkOut
				})
			},
			createData() {
				for (let i = 0; i <= this.ordermsg.length + 1; i++) {
					if (this.ordermsg[i]) {
						this.data.push({
							msg: this.ordermsg[i].msg,
						})
					}
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 30rpx;

		.banner {
			position: relative;
			width: 100%;

			.img {
				width: 100%;
				display: flex;
				align-items: center;
			}

			.rule-link {
				position: absolute;
				top: 30rpx;
				right: 20rpx;
				background-color: rgba($color: #333333, $alpha: 0.6);
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				color: #ffffff;
				border-radius: 30rpx;
				line-height: 40rpx;
				font-size: 24rpx;

				.icon {
					width: 30rpx;
					height: 30rpx;
					border-radius: 30rpx;
					background-color: #ffffff;
					margin-left: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.king-kong {
			padding: 20rpx;
			background-color: #ffffff;
			border-radius: 8rpx;
			margin: 20rpx 0;

			.youhui-box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.youhui-item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					.icon {
						width: 80rpx;
						height: 80rpx;

						.img {
							width: 100%;
						}
					}

					.youhui-name {
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}

					.youhui-info {
						font-size: 22rpx;
						color: #666666;
					}
				}
			}

			.bulletin {
				border-radius: 20rpx;
				margin: 40rpx 0;
				padding: 20rpx;
				background-color: #fcf3e6;
				color: #fb8e39;
				.line {
					height: 40rpx;
					line-height: 40rpx;
					width: 100%;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					}
			}

			.approve {
				margin-bottom: 20rpx;

				.btn {
					border-radius: 80rpx;
					border: none;
					background-color: #333333;
					color: #fffff;
					line-height: 80rpx;
				}
				.prompt{
					padding: 20rpx;
					font-size: 24rpx;
					color: #fb8e39;
				}
			}
		}

		.discount-list {
			padding: 20rpx;
			margin: 20rpx 0;
			background-color: #ffffff;
			border-radius: 8rpx;

			.title-h1 {
				font-size: 36rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 30rpx;
			}

			.aui-flex {
				width: 100%;
				height: 140rpx;
				position: relative;
				background: radial-gradient(circle at right top, transparent 8px, #fb8e39 0) top left / 30% 51% no-repeat,
					radial-gradient(circle at right bottom, transparent 8px, #fb8e39 0) bottom left /30% 51% no-repeat,
					radial-gradient(circle at left top, transparent 8px, #fcf3e6 0) top right /70% 51% no-repeat,
					radial-gradient(circle at left bottom, transparent 8px, #fcf3e6 0) bottom right /70% 51% no-repeat;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 16rpx;
				margin-bottom: 30rpx;



				.aui-price-nub {
					width: 30%;
					height: 140rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;

					.aui-digit {

						.h2 {
							font-size: 60rpx;
							font-weight: bold;
							color: #ffffff;
							display: inline-block;

						}

						.txt {
							font-size: 28rpx;
							font-weight: bold;
							color: #ffffff;
							display: inline-block;

						}
					}
				}


				.aui-flex-box {
					width: 40%;
					height: 100rpx;
					padding: 20rpx 20rpx 20rpx 40rpx;
					display: flex;
					align-items: center;
					flex-direction: column;
					text-align: left;
					justify-content: flex-start;

					.h2 {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						padding-bottom: 10rpx;
						width: 100%;

					}

					.txt {
						font-size: 22rpx;
						color: #666666;
						width: 100%;


					}

				}

				.rzbtn {
					width: 30%;
					display: flex;
					align-items: center;

					.btn {
						border-radius: 30rpx;
						border: none;
						background-color: #fcf3e6;
						color: #fb8e39;
						margin-right: 20rpx;
						border: 2rpx #fb8e39 solid;
						padding: 10rpx 20rpx;
						line-height: 30rpx;
						font-size: 24rpx;

					}
				}


			}


		}
	}

	.popup-cont {
		border-radius: 50rpx 50rpx 0 0;
		background-color: #ffffff;
		padding: 30rpx;
		overflow-y: scroll;
		background-color: #ffffff;
	}
</style>
