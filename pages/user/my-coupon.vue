<template>
	<view class="content">
		<view style="background-color: #ffffff;">
			<uni-segmented-control :activeIndex="activeIndex" :values="items" style-type="text" active-color="#ff941d"
				@clickItem="onClickItem" />
		</view>

		<view class="coupon-list" v-if="couponList.length>0">
			<view class="coupon-item" v-for="(coupon ,key) in couponList" :key="key">
				<view class="l-part">
					<image class="img" mode="widthFix"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
					</image>
					<view class="cont" v-if="coupon.type == 2">
						<view class="t-txt">{{coupon.discount}}</view>
						<view class="b-txt">享房源{{coupon.discount}}折</view>
					</view>
					<view class="cont" v-else>
						<view class="t-txt"><text class="txt">￥</text>{{coupon.deduct}}</view>
						<view class="b-txt">满{{coupon.restrict}}-{{coupon.deduct}}</view>
					</view>
				</view>
				<view class="r-part">
					<view class="title">{{coupon.title}}</view>
					<view class="b-cont">
						<view class="l-txt">
							<text class="txt" v-if="coupon.invalidAt">有效期：{{coupon.invalidAt}}</text>
							<text class="txt" v-else>永久有效</text>
						</view>
						<!-- <view class="r-btn">
							<button class="btn" type="primary" size="default" >去使用</button>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="none-data" v-else>
			<view class="img-signal">
				<image class="img" mode="widthFix" src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/wuyouhuiquan.png">
				</image>
				<text>没有优惠券</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCouponList
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				items: ['未使用', '已使用', '已过期'],
				activeIndex: 0,
				current: 0,
				state: 0,
				couponList: [],
				loginAuth: null,
			}
		},
		watch: {
			activeIndex(value) {
				switch (value) {
					case 0:
						this.state = 0;
						break;
					case 1:
						this.state = 1;
						break;
					case 2:
						this.state = 2;
						break;

					default:
						this.state = 0;
						break;
				}
				this.getCouponList(this.state)

			},
		},
		onLoad() {
			// this.isLogin()
			this.getCouponList(0)
		},
		methods: {
			// isLogin() {
			// 	this.loginAuth = uni.getStorageSync('loginAuth')
			// 	if (!this.loginAuth) {
			// 		this.$api.msg('请先登录')
			// 		this.$api.href('../login/login')
			// 		return
			// 	}
			// },
			onClickItem(e) {
				// console.log(e.currentIndex)
				if (this.activeIndex !== e.currentIndex) {
					this.activeIndex = e.currentIndex
				}
			},
			async getCouponList(state) {
				const {
					data: res
				} = await getCouponList(state)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.couponList = res.data.rs
					console.log(res)
				}
			},
			// openListingsPage() {
			// 	uni.navigateTo({
			// 		url: '../listings/listings-list'
			// 	})
			// },

		}
	}
</script>

<style scoped lang="scss">
	.coupon-list {
		.coupon-item {
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 20rpx;
			width: 85%;
			margin: 30rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.l-part {
				width: 35%;
				position: relative;

				.img {
					width: 100%;
					display: block;
				}

				.cont {
					position: absolute;
					top: 15%;
					left: 60rpx;
					text-align: center;

					.t-txt {
						font-size: 40rpx;
						color: #ffffff;
						font-weight: bold;

						.txt {
							font-size: 24rpx;
							font-weight: 100;
						}
					}

					.b-txt {
						background-color: #e93f41;
						border-radius: 8rpx;
						font-size: 24rpx;
						color: #ffffff;
						padding: 5rpx 10rpx;
					}
				}
			}

			.r-part {
				width: 60%;

				.title {
					font-weight: bold;
					color: #333333;
					font-size: 28rpx;
				}

				.b-cont {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.l-txt {
						font-weight: bold;
						color: #ed5454;
						font-size: 28rpx;

						.txt {
							font-weight: 100;
							color: #999999;
							font-size: 24rpx;
						}
					}

					.btn {
						border-radius: 40rpx;
						border: none;
						background-color: #ed5454;
						color: #fffff;
						line-height: 50rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	.none-data {

		border-radius: 8rpx;
		padding: 20rpx;
		margin: 30rpx 0;
		text-align: center;

		.img-signal {
			width: 300rpx;
			height: 300rpx;
			margin: 0 auto;

			.img {
				width: 100%;
			}
		}

	}
</style>
