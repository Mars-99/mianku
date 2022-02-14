<template>
	<view class="content">
		<block>
			<view class="system-list-wrapper flex-row-center" v-for="item in messageList" :key="item.id" @longpress.stop="openModal($event,item.id,item.state,item.msg)"
				@click="goReadMsg(item.id,item.state)" >
				<view class="msg-icon">
					<image v-if="item.fromUid == 0"
						src="https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png" class="img"
						mode="widthFix"></image>
					<image v-else :src="item.face" class="user-img" mode="widthFix"></image>
					<view class="red-dot" v-if="item.state == 0"></view>
				</view>
				<view class="msg-content">
					<view class="msg-content-top flex-row-sb">
						<view class="msg-name">{{item.userName?item.userName:'眠库通知'}}</view>
						<view class="msg-time">{{$api.timeHandle(item.updatedAt)}}</view>
					</view>
					<view class="msg-content-bottom">{{item.msg}}</view>
				</view>
			</view>

			<!-- 底部加载更多组件 -->
			<view>
				<load-more :loadingType="loadingType"></load-more>
			</view>
		</block>
		<view class="shade" v-show="showShade" @click="hidePop" @touchstart="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap.stop="pickerMenu(item,index)"
					:data-index="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserMsgList,
		getUserMsgRead,
		getUserMsgDel
	} from '@/utils/request/manage.js'
	import {
			mapState
		} from 'vuex'
	export default {
		data() {
			return {
				messageList: [],

				winSize: {},
				/* 窗口尺寸 */
				showShade: false, // 显示遮罩
				showPop: false, // 显示操作弹窗
				popStyle: "",
				/* 弹窗定位样式 */
				popButton: ['删除该消息', '复制'],

				currentPage: 1,
				totalPage: 1,
				loadingType: 0,

				pickerMsgId: 0, // 选择的消息id
				pickedMsg: '', // 选择的消息内容
			}
		},
			computed: {
					...mapState(['hasLogin'])
				},
		onShow() {
			this.askUserNewMsg()
			this.getWindowSize()
			this.initData()
			
		},
		methods: {
			async initData() {
				const {
					data: res
				} = await getUserMsgList()
				console.log(res)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				}
				this.totalPage = res.data.pages
				if (res.data.page == 1) {
					this.messageList = res.data.rs
				} else {
					this.messageList = this.messageList.concat(res.data.rs)
				}

			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			// 弹框
			openModal(e, id, status, msg) {
				let [touches, style] = [e.touches[0], ""];
				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX}px`;
				} else {
					style += `left:${touches.clientX}px`;
				}
				this.popStyle = style;
				this.pickerMsgId = Number(id);
				this.pickedMsg = msg;
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			// 隐藏弹窗
			hidePop() {
				this.showPop = false;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			// 选择菜单
			pickerMenu(item, index) {
				if (item == '删除该消息' && index == 0) {
					this.goDelMsg()
				}
				if (item == '复制' && index == 1) {
					uni.setClipboardData({
						data: this.pickedMsg,
						showToast: true,
						success: (res) => {
							console.log(res)
						}
					})
				}
			},
			//已读消息
			async goReadMsg(id, state) {
				if (state !== 0) return
				const {
					data: res
				} = await getUserMsgRead(id)
				console.log(res)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				}
				let find_index = this.messageList.findIndex(e => e.id == id)
				if (find_index > -1) {
					this.messageList[find_index].state = 1
				}
				this.$forceUpdate()
				this.systemNum--
				let total = this.systemNum + this.friendNum
				if (total) {
					uni.setTabBarBadge({
						index: 2,
						text: total + ""
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
			},
			// 删除消息
			async goDelMsg() {
				const {
					data: res
				} = await getUserMsgDel(this.pickerMsgId)
				console.log(res)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				}
				let find_index = this.messageList.findIndex(e => e.id == this.pickerMsgId)
				if (find_index > -1) {
					this.messageList.splice(find_index, 1)
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.system-list-wrapper {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;


		.msg-icon {
			position: relative;
			width: 80rpx;
			height: 80rpx;



			.user-img,
			.img {
				width: 100%;
				border-radius: 40rpx;
			}

			.red-dot {
				position: absolute;
				right: -4rpx;
				top: -4rpx;
				width: 18rpx;
				height: 18rpx;
				border-radius: 18rpx;
				border: 4rpx solid #FFF;
				background-color: #FF2B25;
			}
		}

		.msg-content {
			padding: 0 30rpx 30rpx 30rpx;
			border-bottom: 1px solid #E1E1E1;
			width: 88%;

			.msg-content-top {

				.msg-name {
					font-size: 30rpx;
					font-weight: 700;
					color: #333;
					margin-bottom: 18rpx;
				}

				.msg-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.msg-content-bottom {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			// width: 100px;
			box-sizing: border-box;
			font-size: 14px;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.14);
			line-height: 40px;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);
			// border-radius: 4px;
			padding: 8px 5px;

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>
