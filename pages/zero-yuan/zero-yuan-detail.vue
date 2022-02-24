<template>
	<view class="content">
		<view class="banner">
			<image class="img" mode="widthFix"
				src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-banner-detail.jpg">
			</image>
			<view class="user-cont">
				<view class="avatar">
					<image class="img" mode="widthFix" :src="userinfo.face">
					</image>
				</view>
				<view class="name">{{userinfo.userName}}</view>
				<view class="slogan">“朋友们,求点击助力！”</view>
				<!-- <view class="countdown">助力倒计时：<span>23</span>:<span>18</span>:<span>08</span></view> -->
			</view>
		</view>
		<view class="main-box">
			<view class="coupon-list">
				<view class="coupon-item">
					<view class="l-part">
						<image class="img" mode="widthFix"
							src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/coupon-bg.png">
						</image>
						<view class="cont" v-if="detail_info.prize.type == 2">
							<view class="t-txt">{{detail_info.prize.discount}}</view>
							<view class="b-txt">全场通用</view>
						</view>
						<view class="cont" v-else>
							<view class="t-txt"><text class="txt">￥</text>{{detail_info.prize.deduct}}</view>
							<view class="b-txt">满{{detail_info.prize.restrict}}-{{detail_info.prize.deduct}}</view>
						</view>
					</view>
					<view class="r-part">
						<view class="title">{{detail_info.prize.title}}</view>
						<view class="b-cont">
							<view class="l-txt" v-if="detail_info.prize.type == 2">
								<text class="txt">享所有房源</text>
								{{detail_info.prize.discount}}折
							</view>
							<view class="l-txtK" v-else>
								<text class="txt">价值</text>
								￥{{detail_info.prize.deduct}}
							</view>
							<view class="r-btn" v-if="can_receive">
								<button class="btn" type="primary" size="default" @tap="share_price()">领取</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="help-box">
				<view class="title">
					{{target}}人完成助力可领优惠券
				</view>
				<view class="help-mian">
					<view class="help-list">
						<view class="help-item" v-for="item in helpuserlist" :key="item.userName">
							<view class="avatar">
								<image class="img" mode="widthFix" :src="item.face">
								</image>
							</view>
							<view class="name">{{item.userName}}</view>
						</view>
					</view>
					<view class="txt" v-if="remain===0">
						已助力完成
					</view>
					<view class="txt" v-else>
						{{helpuserlist.length}}位好友已完成助力,还差{{target - helpuserlist.length}}位
					</view>					
					<view class="help-btn" v-if="type===0">
						<button class="btn" type="primary" size="default" @tap="Help()">帮ta助力</button>
					</view>
					<view class="help-btn" v-else>
						<button class="btn" type="primary" size="default" @tap="Share()">分享领助力包</button>
					</view>
				</view>
			</view>

		</view>
		<view class="bottom-zw">
			<image class="img" mode="widthFix"
				src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-b-bg.jpg">
			</image>
		</view>
		<view class="help-rule">
			<view class="title">活动规则</view>
			<view class="cont" v-html="detail_info.share.remark">
				<!-- 1.免单攻略：<br>
				1） 选择心仪的民宿券，点击免费拿;<br>
				2）分享微信好友；<br>
				3）好友进入小程序，完成授权，并点击助力，助力成功；<br>
				4）达到规则要求，即可免费拿；<br>
				5）一位好友助力成功，可领取5个助力包；<br>
				2. 活动期间，每个用户仅限成功领取3张礼券（礼券可重复）超过3次后，将无法发起活动，同一眠库城市民宿账号、手机号、移动设备、银行卡、支付账号、身份证以及其他信息相同均视为同一用户；
				3. 每个用户可助力一次，同一手机号、移动设备、微信号视为同一用户；<br>
				4. 民宿优惠券使用说明：活动期间，用户可以通过邀请好友为自己助力，邀请相应人数好友助力即可领取相对应的眠库城市民宿优惠券：【民宿券】满300领10 新老客均可使用/【民宿券】满700领30
				新老客均可使用/【民宿券】满1000领50 新老客均可使用。优惠券仅限中奖用户账号可使用，用户中奖后，对应优惠券将自动发放到用户账户中，有效期7天，过期失效，平台不予补发。<br>
				5.活动过程中，如果出现因网络攻击、黑客攻击、数据泄露等原因导致活动无法继续，眠库城市民宿有权利提前终止活动；<br>
				6.活动过程中，用户不得使用任何外挂、插件以及其他破坏活动规则、违背活动公平原则的方式参加本次活动<br>
				（如批量注册、恶意购买、虛假分享、倒买倒卖、虛假交易等）用户和商户不得进行有组织的作弊行为，否则眠库有权取消用户、商户参与活动资格，取消己经领取的商品，必要时取消后续参与眠库任意活动的权利，并追究法律责任7．对优惠券有疑问，可联系眠库城市民宿客服，
				电话：15364037300/15580819506.

 -->

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getShareDetail,
		getUserShare,
		getUserSharePrice,
		userHelp,
		getHelpUserList,
		userDetail
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				detail_info: {
					share: {},
					prize: {}
				},
				userinfo: {},
				helpuserlist: [],
				type: 0, //0为分享1为助力
				can_receive: false, //是否可领取
				share: {
					title: '0元领福利',
					path: '/pages/index/index',
					imageUrl: '',
					desc: '',
					content: ''
				},
				target:0,//目标数
				remain:0 //剩余助力人数
			}
		},
		onLoad() {
			this.initData()
		},
		computed: {
			...mapGetters(['getUserinfo', 'getNeedAuth', 'getIsLogin'])
		},
		methods: {
			async initData() {
				console.log('被助力用户id:', this.$mp.query.recommend)
				this.loginAuth = uni.getStorageSync('loginAuth')
				if (!this.loginAuth) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
			   const{data:user_data} = await userDetail()
			   this.userinfo = user_data.data
				const {
					data:sharedetail
				} = await getShareDetail() //助力活动详情		
				let user_share_list = await getUserShare() // 助力活动用户数据
				let userdata = user_share_list.data.data;
				
				this.detail_info.share = sharedetail.data.share		
				this.detail_info.prize = sharedetail.data['prize'+(userdata.rewards+1)][0]
				this.target = this.detail_info.share['target'+(userdata.rewards+1)]
				if (this.$mp.query.recommend) {
					this.type = 1
				}
				//获取助力用户信息列表
				const { data:userlist } = await getHelpUserList(1, 999)
				console.log('bbb:',userlist)
				let start = userdata.rewards === 0 ? 0 : this.detail_info.share['target'+userdata.rewards]
				let end =  this.detail_info.share['target'+(userdata.rewards+1)]
				this.helpuserlist = userlist.data.rs.slice(start,end) //获取显示的用户列表
				
				if(this.detail_info.share["target"+(userdata.rewards+1)]<=userdata.shareNum){
					this.can_receive=true
				}else{
					this.remain = this.target - userdata.shareNum
				}

				this.Share()
			},
			Share() {
				this.share.title = '0元领福利'
				this.share.path = '@/zero-yuan/zero-yuan-detail?id=' + this.detail_info.share.id + '&recommend=' + this
					.userinfo.id
				this.share.imageUrl = ''
			},
			async Help() {
				if (this.$mp.query.recommend) {
					const {
						data
					} = await userHelp(Number(this.$mp.query.recommend), 2)
					console.log('助力活动返回结果：', data)
				}
			},
			async share_price() {
				//领取助力奖励
				const {
					data
				} = await getUserSharePrice()
				console.log('领取助力奖励返回结果：', data)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #b90d1d;

		.banner {
			position: relative;

			.img {
				width: 100%;
				display: block;
			}

			.user-cont {
				position: absolute;
				top: 10%;
				text-align: center;
				display: flex;
				justify-content: center;
				flex-direction: column;
				width: 100%;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					margin: 0 auto;
					overflow: hidden;
					border-radius: 120rpx;

					.img {
						width: 100%;
					}
				}

				.name {
					font-size: 32rpx;
					color: #ffffff;
					font-weight: bold;
				}

				.slogan {
					font-size: 28rpx;
					color: #ffffff;
					font-weight: bold;
				}

				.countdown {
					background-color: #d13030;
					border: 10rpx #b91300 solid;

					border-radius: 50rpx;
					margin: 40rpx auto;
					padding: 20rpx 20rpx;
					color: #FFFFFF;

					span {
						background-color: #ff8727;
						border-radius: 6rpx;
						padding: 5rpx 10rpx;
						margin: 10rpx;
						border: 2rpx #ebbb66 solid;
					}
				}
			}
		}

		.main-box {
			background: url(https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/0yuan-bg.jpg) repeat-y;
			background-position: center;
			background-size: 100%;
			padding: 20rpx 20rpx 50rpx 20rpx;
			position: relative;

			.coupon-list {
				margin-top: -80px;

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
						}
					}
				}

			}

			.help-box {
				background-color: #ffffff;
				border-radius: 8rpx;
				padding: 20rpx;
				width: 85%;
				margin: 30rpx auto 0 auto;
				text-align: center;

				.title {
					font-size: 28rpx;
					color: #e13c3c;
					font-weight: bold;
				}

				.help-mian {
					margin: 30rpx 0;
					.help-list{
						display: flex;
						justify-content: center;
						
						.help-item{
							width: 20%;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction: column;
							.avatar {
								width: 80rpx;
								height: 80rpx;
								margin: 0 10rpx;
								overflow: hidden;
								border-radius: 80rpx;
							
								.img {
									width: 100%;
								}
							}
							
							.name {
								font-size: 24rpx;
								color: #E09014;
							}
						}
					}
					.txt{
						font-size: 24rpx;
						color:#e13c3c;
						margin: 20rpx 0;
					}
				}

				.help-btn {
					margin: 0 auto -90rpx auto;

					.btn {
						border-radius: 80rpx;
						border: none;
						background-color: #ed5454;
						color: #fffff;
						line-height: 80rpx;
						font-size: 34rpx;
						width: 80%;
						font-weight: bold;
					}
				}
			}

		}

		.bottom-zw {
			.img {
				width: 100%;
			}
		}

		.help-rule {
			padding: 30rpx;

			.title {
				font-size: 38rpx;
				font-weight: bold;
				color: #ffe0cd;
				margin-bottom: 30rpx;
				text-align: center;
			}

			.cont {
				font-size: 24rpx;
				color: #ffe0cd;
			}
		}
	}
	/deep/ button::after {
		border: none;
	}
</style>
