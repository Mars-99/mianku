<!--联系客服-->
<template>
	<view class="page">
		<!-- 聊天信息框 start -->
		<view class="chat-wrapper" v-if="chatList.length" :style="{'height': contentViewHeight + 'px'}">
			<view class="WeChat">
				<view class="l-part">
					<image src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png" mode="widthFix"
						class="user-img"></image>
				</view>
				<view class="c-part">
					<view class="t-part">眠库客服</view>
					<view class="b-part">
						<button class="btn" type="primary" size="default" @tap="openErweima1">
							<uni-icons style="position: absolute;" type="weixin" size="18" color="#19c4a8"></uni-icons>
							<text style="margin-left: 35rpx;">夏天</text>
						</button>
						<button class="btn" type="primary" size="default" @tap="openErweima2">
							<uni-icons style="position: absolute;" type="weixin" size="18" color="#19c4a8"></uni-icons>
							<text style="margin-left: 35rpx;">文静</text>
						</button>
						<button class="btn" type="primary" size="default" @tap="openErweima3">
							<uni-icons style="position: absolute;" type="weixin" size="18" color="#19c4a8"></uni-icons>
							<text style="margin-left: 35rpx;">嘎嘎</text>
						</button>
					</view>
				</view>
				<uni-popup ref="popup" type="bottom">
					<image :show-menu-by-longpress="true" @tap="previewImage" style="margin-top: -100px;" :src="erweima"
						mode="widthFix"></image>
				</uni-popup>
			</view>
			<scroll-view scroll-y="true" :scroll-with-animation="true" :scroll-top="scrollTop" class="chat-scroll"
				:style="{'height': contentViewHeight + 'px'}" @scrolltoupper="scrollToTop">
				<image src="@/static/image/loading.png" class="load-icon-wrapper" v-if="showLoad"></image>
				<view class="chat-items" v-for="(item,index) in chatList" :key="index">
					<view class="chat-items-time">{{item.createdAt}}</view>
					<view :class="['chat-items-body',userId == item.uid?'chat-end':'chat-start']">
						<view class="chat-items-icon" v-if="userId !== item.uid">
							<image src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png"
								mode="widthFix" class="user-img"></image>
						</view>
						<view class="chat-items-msg-wrapper">
							<view :class="['chat-items-msg',userId == item.uid?'on':'un']">
								<text style="word-wrap: break-word;">{{item.msg}}</text>
							</view>
						</view>
						<view class="chat-items-icon" v-if="userId == item.uid">
							<image :src="item.face" mode="widthFix" class="user-img"></image>
						</view>
					</view>
				</view>
				<!-- <view v-if="inputBottom == 0" :style="{'height': 'calc(' + inputBottom + 80 + 'px)'}"></view> -->
				<view :style="{'height': 'calc(0px + 70px)'}"></view>
			</scroll-view>
		</view>
		<!-- 聊天信息框 end -->

		<!-- 发布消息框 start -->
		<view class="bottom-input-wrapper">
			<input type="text" class="input" :confirm-hold="true" placeholder="请输入你要发送的内容"
				placeholder-class="input-class" @focus="inputFocus" @blur="inputBlur" @confirm="publishMsg"
				v-model="inputmsg">
			<view class="publish-btn" @click="publishMsg">发送</view>
		</view>
		<!-- 发布消息框 end -->

		<view v-if="!delay_timer && !!delay_timer"></view>
		<view v-if="!mitemHeight && !!mitemHeight"></view>
	</view>
</template>

<script>
	import {
		handTime
	} from '@/utils/functionHandle.js'
	import {
		getUserImList,
		getUserImAdd
	} from '@/utils/request/manage.js'
	import {
		userDetail
	} from '@/utils/request/manage.js'

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				type: '',
				userId: 0, // 该用户id
				userinfo: {},
				face: '', // 该用户头像
				chatList: [],
				inputBottom: 0,
				inputmsg: '',
				scrollTop: 0,
				mitemHeight: 0,
				contentViewHeight: 0,
				showLoad: false,
				delay_timer: {}, // 定时器
				erweima: '',
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		// onLoad() {
		// 	this.getUserDetail()
		// },
		onShow() {
			uni.onKeyboardHeightChange(res => {
				console.log("aaaaa", res.height)
				if (res.height > 0) {
					this.inputBottom = res.height - 40
				} else {
					this.inputBottom = 0
				}
			})
		},
		onUnload() {
			console.log('清除定时器')
			clearInterval(this.delay_timer)
		},
		mounted() {
			const resSystem = uni.getSystemInfoSync()
			console.log('resSystem: ', resSystem)
			this.contentViewHeight = resSystem.windowHeight //像素   因为给出的是像素高度 然后我们用的是rpx  所以换算一下 
			let createdAt = handTime()
			// 第一次进入该页面，自动发一条消息
			let isFirstInKefu = uni.getStorageSync('chatFlag')
			console.log('isFirstInKefu: ', isFirstInKefu)
			if (!isFirstInKefu) {
				// setTimeout(() => {
				// 					this.chatList.push({id:9999,uid:this.userId,face: this.face,userName: userName,msg: '您好，有些问题想要咨询你',createdAt: createdAt})
				// 				},500)
				setTimeout(() => {
					this.chatList.push({
						id: 99998,
						uid: 1,
						face: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png',
						userName: '眠库客服',
						msg: '你可以通过联系客服电话15364037300、15580819506与我们联系。添加客服微信获取专属服务 VX：123456789',
						createdAt: createdAt
					})
					let array = [{
						id: 99998,
						uid: 1,
						face: 'https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png',
						userName: '眠库客服',
						msg: '你可以通过联系客服电话15364037300、15580819506与我们联系。添加客服微信获取专属服务 VX：123456789',
						createdAt: createdAt
					}]
					uni.setStorage({
						key: 'chatFlag',
						data: array,
						success(res) {
							console.log('res: ', res)
						}
					})
				}, 1000)
			}
			this.initData(0, 0)
			this.getUserDetail()
			this.delay_timer = setInterval(() => {
				this.askNewMsg(this.chatList[this.chatList.length - 1].id)
				// this.initData(0,0)
			}, 15000)
		},
		methods: {
			async getUserDetail() {
				const {
					data
				} = await userDetail()
				this.userinfo = data.data
				this.userId = this.userinfo.id
				console.log("userinfo", data.data, this.userId)
			},
			async initData(tid, type) {

				const {
					data: res
				} = await getUserImList(tid, type)
				console.log('res: ', res)
				if (res.code == -1) {
					this.showLoad = false
					return this.$api.msg('获取聊天信息列表失败!' + res.msg, 'none')
				}
				console.log("res.data.rs.length", res.data.rs.length)
				if (res.data.rs.length) {
					if (type == 1) {
						// 历史消息
						this.chatList = res.data.rs.reverse().concat(this.chatList)

					} else {
						// 最新消息
						this.chatList = this.chatList.concat(res.data.rs.reverse())
					}
					if (res.data.rs.length < 10) {
						let isFirstInKefu = uni.getStorageSync('chatFlag')
						if (isFirstInKefu) {
							this.chatList = isFirstInKefu.concat(this.chatList)
						}
						this.showLoad = false
					}
				} else {
					let isFirstInKefu = uni.getStorageSync('chatFlag')
					if (isFirstInKefu) {
						this.chatList = isFirstInKefu.concat(this.chatList)
					}
				}
				if (type == 0) {
					this.$nextTick(function() {
						this.pageScrollToBottom()
					})
				}


			},
			// 每隔15s请求最新的消息
			async askNewMsg(tid) {
				const {
					data: res
				} = await getUserImList(tid, 0)
				console.log('最新的消息res: ', res)
				if (res.code == 1) {
					return this.$api.msg('获取聊天信息列表失败!' + res.msg, 'none')
				}
				if (res.data.rs.length) {
					this.chatList = this.chatList.concat(res.data.rs.reverse())
				}
			},
			inputFocus(e) {
				if (e.detail.height > 0) {
					this.inputBottom = e.detail.height - 40
				} else {
					this.inputBottom = 0
				}
				this.$nextTick(function() {
					this.pageScrollToBottom()
				})
			},
			inputBlur() {
				this.inputBottom = 0
			},
			// 发布消息
			async publishMsg() {
				if (!this.inputmsg.trim()) return
				const {
					data: res
				} = await getUserImAdd(this.inputmsg)
				console.log('res: ', res)
				if (res.code == 1) {
					return this.$api.msg('发送信息失败!' + res.msg, 'none')
				}
				let obj = {
					id: res.data.id,
					uid: this.userId,
					face: this.userinfo.face,
					msg: this.inputmsg,
					createdAt: handTime()
				}
				this.chatList.push(obj)
				this.inputmsg = ''
				this.$nextTick(function() {
					this.pageScrollToBottom()
				})
			},
			pageScrollToBottom() {
				let _self = this
				let query = uni.createSelectorQuery();
				query.selectAll('.chat-items').boundingClientRect();
				query.select('.chat-scroll').boundingClientRect();
				query.exec((res) => {
					_self.mitemHeight = 0
					console.log("res", res)
					res[0].forEach((rect) => _self.mitemHeight = _self.mitemHeight + rect.height +
						60) //获取所有内部子元素的高度
					console.log('inputBottom', _self.inputBottom)
					// _self.mitemHeight = _self.mitemHeight + _self.inputBottom
					console.log('mitemHeight', _self.mitemHeight)
					console.log('contentViewHeight', _self.contentViewHeight)
					// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout
					setTimeout(() => {
						if (_self.mitemHeight > _self.contentViewHeight) { //判断子元素高度是否大于显示高度
							console.log("_self.scrollTop1", _self.scrollTop)
							_self.scrollTop = _self.mitemHeight - _self
								.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
							console.log("_self.scrollTop2", _self.scrollTop)
						} else {
							console.log("_self.scrollTop3", _self.scrollTop)
						}
					}, 100)
				})
			},
			scrollToTop() {
				if (this.chatList[0].id == 99998) {
					return
				}
				console.log('滑到顶部了')
				this.showLoad = true
				this.initData(this.chatList[0].id, 1)
			},
			openErweima1() {
				this.erweima = "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/erweima-xiatian.png"
				this.$refs.popup.open('center')
			},
			openErweima2() {
				this.erweima = "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/erweima-wenjing.png"
				this.$refs.popup.open('center')
			},
			openErweima3() {
				this.erweima = "https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/erweima-gaga.png"
				this.$refs.popup.open('center')
			},
			// shibie(){
			// 	uni.scanCode({
			// 	onlyFromCamera: true,
			// 		success: function (res) {
			// 			console.log('条码类型：' + res.scanType);
			// 			console.log('条码内容：' + res.result);
			// 			// 跳转提示页面==>请求数据(成功)==>显示数据;(失败)=>返回工作页面
			// 			plus.runtime.openURL(res.result);
			// 		}
			// 	});
			// }
			previewImage(e) {
				console.log('e', e);
				uni.previewImage({
					// 需要预览的图片链接列表
					urls: [],
					// 为当前显示图片的链接/索引值
					current: this.erweima,
					// 图片指示器样式	
					indicator: 'default',
					// 是否可循环预览
					loop: false,
					// 长按图片显示操作菜单，如不填默认为保存相册
					// longPressActions:{
					// 	itemList:[this.l('发送给朋友'),this.l]
					// },
					success: res => {
						console.log('res', res);
					},
					fail: err => {
						onsole.log('err', err);
					}
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	@-webkit-keyframes load {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	// 聊天信息框 start
	.chat-wrapper {
		position: relative;
		height: 100vh;
		background-color: #F6F7FB;

		.chat-scroll {
			margin-top: 160rpx;
			height: calc(100vh - 150rpx);
			padding: 0 0 env(safe-area-inset-bottom);
		}

		.load-icon-wrapper {
			display: block;
			width: 30rpx;
			height: 30rpx;
			margin-right: 12rpx;
			animation: load 0.8s cubic-bezier(.37, 1.08, .7, .74) infinite;
			margin: 0 auto 20rpx;
		}

		.chat-items {
			margin-bottom: 20rpx;
			padding: 0 20rpx;

			.chat-items-time {
				width: 100%;
				text-align: center;
				font-size: 24rpx;
				color: #999;
				margin-bottom: 20rpx;
			}

			.chat-items-body {
				width: 100%;

				.chat-items-icon {
					width: 84rpx;
					height: 84rpx;
					border-radius: 42rpx;
					overflow: hidden;

					.user-img {
						border-radius: 42rpx;
						width: 100%;
					}
				}

				.chat-items-msg {
					// flex: 1;
					position: relative;
					max-width: 500rpx;
					margin: 0 20rpx;
					border-radius: 8rpx;
					padding: 20rpx;
					font-size: 32rpx;
					color: #333;
					background-color: #FFF;
				}

				.on {
					background-color: #CFE2FF;
				}

				.on::after {
					content: '';
					position: absolute;
					right: -10rpx;
					top: 32rpx;
					width: 0;
					height: 0;
					border-top: 10rpx solid transparent;
					border-left: 10rpx solid #CFE2FF;
					border-bottom: 10rpx solid transparent;
				}

				.un::before {
					content: '';
					position: absolute;
					left: -10rpx;
					top: 32rpx;
					width: 0;
					height: 0;
					border-top: 10rpx solid transparent;
					border-right: 10rpx solid #FFF;
					border-bottom: 10rpx solid transparent;
				}
			}

			.chat-start {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: flex-start;
			}

			.chat-end {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: flex-start;
			}
		}

		.bottom {
			width: 100vw;
			height: 20rpx;
		}
	}

	// 聊天信息框 end

	// 发布消息框 start
	.bottom-input-wrapper {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 92%;
		height: 40px;
		background-color: #FFF;
		padding: 10px 4%;
		z-index: 999;

		.input {
			height: 40px;
			font-size: 32rpx;
			color: #333;
			background-color: #F6F7FB;
			border-radius: 20px;
			padding-right: 150rpx;
			padding-left: 40rpx;
		}

		.input-class {
			font-size: 32rpx;
			color: #969AB0;
		}

		.publish-btn {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			height: 40px;
			padding: 0 40rpx;
			text-align: center;
			line-height: 40px;
			border-radius: 20px;
			background-color: #ff941d;
			font-size: 32rpx;
			font-weight: 700;
			color: #FFF;
		}
	}

	.WeChat {
		position: fixed;
		top: 0;
		height: 110rpx;
		background-color: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;
		z-index: 9999;
		padding: 20rpx;

		.l-part {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			overflow: hidden;

			.user-img {
				border-radius: 42rpx;
				width: 100%;
			}
		}

		.c-part {
			width: 75%;
			margin-left: 20rpx;
			display: flex;
			justify-content: space-between;

			.t-part {
				font-size: 30rpx;
				display: flex;
				align-items: center;
				color: #ff941d;
			}

			.b-part {
				display: flex;
				align-items: center;

				.btn {
					font-size: 24rpx;
					background-color: #d1f3ee;
					color: #19c4a8;
					line-height: 70rpx;
					border-radius: 70rpx;
					padding: 0 15rpx;
					margin: 0 10rpx;
				}
			}
		}
	}

	/deep/ button::after {
		border: none;
	}

	// 发布消息框 end
</style>
