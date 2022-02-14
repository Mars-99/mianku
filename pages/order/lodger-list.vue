<template>
	<view class="content">
		<page-load v-if="pageshow"></page-load>
		<view v-else>
			<view class="statement">
				温馨提示：根据公安酒店管理条例，入住经营性的酒店/民宿，需要提供入住人的身份证信息。入住人身份信息只用于必要的身份核实和保险理赔事项，眠库民宿会为您严格保密。
			</view>
			<view class="add-contact" @tap="openLodgerAdd()">
				<uni-icons type="plusempty" size="18" color="#ff951d"></uni-icons>
				<text class="txt">添加入住人</text>
			</view>
			<view class="lodger-list">
				<checkbox-group @change="checkboxChange">
					<view class="lodger-item" v-if="lodgerList.length" v-for="(item ,index) in lodgerList" :key="index">
						<view class="l-part">
							<checkbox :value="item.contacts" :checked="item.checked" color="#ff951d" />
						</view>
						<view class="c-part">
							<view class="name">{{item.contacts}}</view>
							<view class="number IDcard-number">
								<text class="txt">{{item.cardType}}</text>
								<text>{{item.idCard.replace(/^(.{3}).*(.{4})$/, '$1***********$2')}}</text>
							</view>
							<view class="number tel-number">
								<text class="txt">联系电话</text>
								<text>{{item.phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}</text>
							</view>
						</view>
						<view class="r-part" @tap="delLodger(item.id)">
							<!-- <uni-icons type="compose" size="32" color="#d9d9d9"></uni-icons> -->
							<uni-icons type="closeempty" size="18" color="#d9d9d9"></uni-icons>
						</view>
			
					</view>
				</checkbox-group>
			</view>
			<view class="define">
				<button class="btn" :class="[checkedLodgerlent !=false ?'checkedBtn':'greyBtn']" type="primary" size="default"
					@tap="submit()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLodgerList,
		delLodger,
	} from '@/utils/request/manage.js'
	import pageLoad from '@/components/pageLoad/pageLoad'
	export default {
		components: {
			pageLoad
		},
		data() {
			return {
				lodgerList: [],
				checked: false,
				checkedLodgerList:[],
				checkedLodgerlent:false,
				pageshow:true,
			}
		},
		// onLoad() {
		// 	this.init()
		// },
		onShow() {
			this.init()
		},
		methods: {
			//初始化 获取入住人列表
			async init() {
				this.pageshow = true
				const {
					data: res
				} = await getLodgerList()
				this.lodgerList = res.data.rs
				console.log("getLodgerList", res, "this.lodgerList", this.lodgerList)
				this.pageshow = false
			},
			//删除入住人
			async delLodger(id) {
				const {
					data: res
				} = await delLodger(id)
				if(res.code == 1){
					return this.$api.msg(res.msg)
				}else{
					this.init()
					console.log("delLodger", res,"删除成功")
				}
			},
			openLodgerAdd() {
				uni.navigateTo({
					url: '../order/lodger-add'
				})

			},
			checkboxChange(e) {
				var items = this.lodgerList,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.contacts)) {
						this.$set(item, 'checked', true)
						this.checkedLodgerList
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.checkedLodgerList = items.filter(n=>n.checked == true)
				
				if(this.checkedLodgerList.length==0){
					this.checkedLodgerlent = false
				}else{
					this.checkedLodgerlent = true
				}
			},
			submit(){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]
				prevPage.brand = {
					checkedLodgerList: this.checkedLodgerList 	
				}
				uni.navigateBack()
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	.statement {
		background-color: #fdf9dc;
		color: #d87a44;
		padding: 30rpx;
		font-size: 24rpx;
		margin-bottom: 30rpx;
		line-height: 34rpx;
	}

	.add-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
		margin: 30rpx;
		background-color: #ffffff;
		color: #ff951d;
		font-size: 30rpx;
		font-weight: bold;

		.txt {
			margin-left: 10rpx;
		}

	}

	.lodger-list {
		padding: 30rpx;
		margin: 30rpx;
		background-color: #ffffff;

		.lodger-item {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 2rpx #f5f5f5 solid;

			.l-part {
				width: 15%;
			}

			.c-part {
				width: 70%;

				.name {
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
					padding-bottom: 10rpx;
				}

				.number {
					font-size: 28rpx;
					color: #999999;
					padding-bottom: 10rpx;

					.txt {
						margin-right: 20rpx;
					}
				}
			}

			.r-part {
				width: 15%;
			}
		}

		.lodger-item:last-child {
			border-bottom: 0rpx #f5f5f5 solid;
		}
	}

	.define {
		text-align: center;
		padding-top: 50rpx;

		.btn {
			border-radius: 90rpx;
			border: none;
			background-color: #333333;
			color: #fffff;
			width: 50%;
			line-height: 90rpx;
		}

		.btn {
			border-radius: 90rpx;
			border: none;
			width: 50%;
			line-height: 90rpx;
			border: none;
		}

		.checkedBtn {
			background-color: #333333;
			color: #ffffff;
		}

		.greyBtn {
			background-color: #ffffff;
			color: #999999;
		}

	}

	/deep/ button::after {
		border: none;
	}
</style>
