<template>
	<view class="filter-area">
		<view class="filter-list">
			<view class="filter-item" :class="{actNav: index === actNav }" v-for="(item ,index) in navData" :key="index"
				@tap="navClick(index)">
				<text>{{item.name}}</text>
				<uni-icons class="icon" type="top" size="12" color="#ff941d" v-if="index === actNav">
				</uni-icons>
				<uni-icons class="icon" type="bottom" size="12" color="#cfcfcf" v-else></uni-icons>
			</view>
		</view>
		<view class="condition-sort">
			<view class="mask" :class="showMask ? 'show' : 'hide'" @tap="tapMask"></view>
			<scroll-view scroll-y="true" class="popup" :class="popupShow ? 'popupShow' : ''">
				<view class="cbd" v-if="indexAct===0">
					<view class="hot-cbd" v-if="hotCBD.length">
						<h3 class="h3">热门商圈</h3>
						<view class="txt" @tap="CBDChange(hot)" v-for="(hot ,cbd) in hotCBD" :key="cbd">
							{{hot.cityName}}
						</view>

					</view>
					<view class="item-opt c-flex-align" @tap="CBDall()">
						核心商圈
					</view>
					<view class="item-opt c-flex-align" @tap="CBDChange(itemdata)" v-for="(itemdata ,key) in CBDlist"
						:key="key">
						{{itemdata.cityName}}
					</view>
				</view>
				<view class="renshu" v-if="indexAct===1">
					<view class="item-opt c-flex-align rs-flex">
						<text>入住人数</text>
						<uni-number-box v-model="rsModelValue" :max="10" :min="1" :value="rsModelValue"
							@change="renshuChange" />
					</view>
					<view class="item-opt c-flex-align rs-flex">
						<text>床铺数</text>
						<uni-number-box v-model="cpModelValue" :max="6" :min="1" :value="cpModelValue"
							@change="cpChange" />
					</view>
					<view class="operate-btn">
						<button class="btn clear-btn" plain="true" @tap="clearRS()">清除</button>
						<button class="btn save-btn" plain="true" @tap="transferRS()">查看房源</button>
					</view>
				</view>
				<view class="filter" v-if="indexAct===2">
					<view class="sx-item">
						<view class="sx-title">
							价格范围 {{`￥${priceValue[0]} ~￥${priceValue[1]}`}}
						</view>
						<view class="sx-cont">
							<view class="cj-slider">
								<cj-slider v-model="priceValue" :min="0" :max="1000" :step="50" :blockWidth="40"
									@start="blockStart" @moving="blockMoving" @end="blockEnd" />
							</view>
						</view>
					</view>
					<view class="sx-item">
						<view class="sx-title">
							房源户型
						</view>
						<view class="sx-cont">
							<view :class="[curIndex===index?'selde':'noselde']"
								v-for="(houseitem ,index) in houseNumList" :key="index" @tap="houseNum(index)">{{houseitem.name}}</view>
						</view>
					</view>
					<view class="sx-item">
						<view class="sx-title">
							设施
						</view>
						<view class="sx-cont">
							<view :class="[facility.selected?'selde':'noselde']" @tap="facility(facilityIndex)"
								v-for="(facility ,facilityIndex) in facilityList" :key="facilityIndex">
								{{facility.name}}</view>
						</view>
					</view>
					<view class="sx-item">
						<view class="sx-title">
							周边
						</view>
						<view class="sx-cont">
							<view :class="[rim.selected?'selde':'noselde']" @tap="rim(rimIndex)"
								v-for="(rim ,rimIndex) in rimList" :key="rimIndex">
								{{rim.name}}</view>
						</view>
					</view>
					<view class="sx-item">
						<view class="sx-title">
							入住守则
						</view>
						<view class="sx-cont">
							<view :class="[rules.selected?'selde':'noselde']" @tap="rules(rulesIndex)"
								v-for="(rules ,rulesIndex) in rulesList" :key="rulesIndex">
								{{rules.name}}</view>
						</view>
					</view>
					<view class="operate-btn">
						<button class="btn clear-btn" plain="true" @tap="clearfilterData()">清除</button>
						<button class="btn save-btn" plain="true" @tap="filterData()">查看房源</button>
					</view>
				</view>
				<view class="tejia" v-if="indexAct===3">
					<view class="item-opt c-flex-align" @tap="flagAll()">
						特惠
					</view>
					<view class="item-opt c-flex-align" @tap="flagChange(flag)" v-for="(flag ,tj) in flagData"
						:key="tj">
						{{flag.name}}
					</view>
				</view>

			</scroll-view>
		</view>

	</view>
</template>

<script>
	import cjSlider from '@/components/cj-slider/cj-slider.vue'
	export default {
		components: {
			cjSlider
		},
		props: {
			CBDlist: {
				type: Array,
			},
			hotCBD: {
				type: Array,
			},
		},
		data() {
			return {
				navData: [{
						name: '核心商圈',
					},
					{
						name: '人数',
					}, {
						name: '筛选',
					}, {
						name: '特惠活动',
					}
				],
				flagData: [{
						name: '首单立减',
					},
					{
						name: '今日特价',
					}, {
						name: '新房优惠',
					}
				],
				houseNumList: [{
						name: '一室',
						houseNum: 1,
					},
					{
						name: '两室',
						houseNum: 2,
					}, {
						name: '三室',
						houseNum: 3,
					},
					{
						name: '四室及以上',
						houseNum: 4,
					}
				],
				curIndex:-1,
				houseSelect:0,
				facilityList: [{
						name: '电视机',
						selected: false,
					},
					{
						name: '空调',
						selected: false,
					}, {
						name: '洗衣机',
						selected: false,
					},
					{
						name: '无线网络',
						selected: false,
					},
					{
						name: '电梯',
						selected: false,
					},
					{
						name: '投影仪',
						selected: false,
					}
				],
				facilitySelect: [],
				newfacilityList:[],
				newfacilityName:[],
				rimList: [{
						name: '环境安静',
						selected: false,
					},
					{
						name: '近地铁',
						selected: false,
					}
				],
				rimSelect: [],
				newRimList:[],
				newRimName:[],
				rulesList: [{
						name: '可带宠物',
						selected: false,
					},
					{
						name: '允许聚会',
						selected: false,
					}
				],
				rulesSelect: [],
				newRulesList:[],
				newRulesName:[],
				rsModelValue: 0,
				cpModelValue: 0,
				priceValue: [0, 1000], // 可以指定默认值
				popupShow: false,
				showMask: false,
				actNav: null,
				indexAct: null,
			}
		},
		methods: {
			CBDall() {
				this.navData[0].name = '核心商圈'
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.$emit('districtId', 0)
			},
			CBDChange(e) {
				this.navData[0].name = e.cityName
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.$emit('districtId', e.id)
			},
			flagAll() {
				this.navData[3].name = '特惠活动'
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.$emit('flag', '')
			},
			flagChange(e) {
				this.navData[3].name = e.name
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.$emit('flag', e.name)

			},
			renshuChange(value) {
				if (value >= 10) {
					wx.showToast({
						title: '最多人数10人',
						icon: 'none',
						duration: 1500
					})
					return
				} else {
					this.rsModelValue = value;
				}
			},
			cpChange(value) {
				if (value >= 6) {
					wx.showToast({
						title: '最多床铺6床',
						icon: 'none',
						duration: 1500
					})
					return
				} else {
					this.cpModelValue = value;
					console.log("this.cpModelValue", this.cpModelValue)
				}
			},
			transferRS() {
				this.navData[1].name = this.rsModelValue + "人-" + this.cpModelValue + "床"
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.$emit('occupancy', this.rsModelValue)
				this.$emit('bedNum', this.cpModelValue)
				if (this.cpModelValue == 0 || this.rsModelValue == 0) {
					this.navData[1].name = '人数'
				}
				// if (this.cpModelValue == 0) {
				// 	this.navData[1].name = this.cpModelValue + "床"
				// }
				// if (this.rsModelValue == 0) {
				// 	this.navData[1].name = this.rsModelValue + "人"
				// }
				// this.navData[1].name = this.rsModelValue + "人-" + this.cpModelValue + "床"
			},
			clearRS() {
				this.navData[1].name = "人数"
				this.cpModelValue = 0
				this.rsModelValue = 0
			},
			houseNum(index){
				this.curIndex = index
				this.houseSelect = this.houseNumList[index].houseNum
				console.log("houseSelect", this.houseSelect)
			},
			facility(index) {
				if (this.facilityList[index].selected == true) {
					this.facilityList[index].selected = false;
					
				} else {
					this.facilityList[index].selected = true;
				}
			},
			rim(index) {
				if (this.rimList[index].selected == true) {
					this.rimList[index].selected = false;
				} else {
					this.rimList[index].selected = true;
					
				}
			},
			rules(index) {
				if (this.rulesList[index].selected == true) {
					this.rulesList[index].selected = false;
				} else {
					this.rulesList[index].selected = true;
				}
			},
			
			filterData() {
				this.showMask = false
				this.popupShow = false
				this.actNav = null;
				this.newfacilityList = this.facilityList.filter(item=>item.selected ==true)
				this.newfacilityName = []
				for (var i = 0; i < this.newfacilityList.length; i++) {
					if(this.newfacilityList[i].selected==true){
						this.newfacilityName.push(this.newfacilityList[i].name)
					}
				}
				// console.log("newfacilityList",this.newfacilityName)
				this.newRimList = this.rimList.filter(item=>item.selected ==true)
				this.newRimName = []
				for (var i = 0; i < this.newRimList.length; i++) {
					if(this.newRimList[i].selected==true){
						this.newRimName.push(this.newRimList[i].name)
					}
				}
				// console.log("newRimName",this.newRimName)
				this.newRulesList = this.rulesList.filter(item=>item.selected ==true)
				this.newRulesName = []
				for (var i = 0; i < this.newRulesList.length; i++) {
					if(this.newRulesList[i].selected==true){
						this.newRulesName.push(this.newRulesList[i].name)
					}
				}
				// console.log("newRulesName",this.newRulesName)
				this.$emit('priceValue', this.priceValue)
				this.$emit('infrastructure', this.newfacilityName)
				this.$emit('tag', this.newRimName)
				this.$emit('rules', this.newRulesName)
				this.$emit('houseNum', this.houseSelect)
			},
			clearfilterData() {
				this.priceValue=[0,1000]
				this.facilityList=[{
						name: '电视机',
						selected: false,
					},
					{
						name: '空调',
						selected: false,
					}, {
						name: '洗衣机',
						selected: false,
					},
					{
						name: '无线网络',
						selected: false,
					},
					{
						name: '电梯',
						selected: false,
					},
					{
						name: '投影仪',
						selected: false,
					}
				]
				this.rimList= [{
						name: '环境安静',
						selected: false,
					},
					{
						name: '近地铁',
						selected: false,
					}
				]
				this.rulesList= [{
						name: '可带宠物',
						selected: false,
					},
					{
						name: '允许聚会',
						selected: false,
					}
				],
				this.curIndex = -1
				this.houseSelect=0
				this.facilitySelect=[]
				this.rimSelect=[]
				this.rulesSelect=[]
				this.$emit('priceValue', this.priceValue)
				this.$emit('infrastructure', '')
				this.$emit('tag', [])
				this.$emit('rules', [])
				this.$emit('houseNum', this.houseSelect)
			},
			blockStart() {
				// console.log('滑动触发')
			},
			blockMoving() {
				// console.log('正在滑动中')
			},
			blockEnd() {
				console.log('滑动结束', this.priceValue)
			},
			navClick(index) {
				if (index === this.actNav) {
					this.tapMask();
					return;
				}
				this.popupShow = true;
				this.showMask = true;
				this.actNav = index;
				this.indexAct = index;
			},
			tapMask() {
				this.showMask = false;
				this.popupShow = false;
				this.actNav = null;
			},
		}
	}
</script>

<style scoped lang="scss">
	.c-flex-align {
		display: flex;
		align-items: center;
	}

	.c-flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.filter-area {
		padding: 30rpx 50rpx;

		.filter-list {
			display: flex;
			justify-content: space-between;

			.filter-item {
				font-size: 24rpx;
				font-weight: bold;

				.icon {
					display: inline-flex;
					width: 18rpx;
					height: 18rpx;
					border-radius: 18rpx;
					background-color: #f6f7fa;
					margin: 0 10rpx;
					padding: 5rpx;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	.condition-sort {}

	.navs {
		position: relative;
		height: 110rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		border-bottom: 2rpx solid #f5f6f9;
		color: #8b9aae;
		z-index: 999;
		box-sizing: border-box;

		// &>view {
		// 	flex: 1;
		// 	height: 100%;
		// 	flex-direction: row;
		// 	z-index: 999;
		// }

		.date {
			justify-content: flex-end;
		}

	}

	.actNav {
		color: #ff941d;
		font-weight: bold;
	}

	.mask {
		z-index: 666;
		position: fixed;
		top: calc(var(--status-bar-height) + 150rpx);
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.15s linear;

		&.show {
			background-color: rgba(0, 0, 0, 0.4);
		}

		&.hide {
			display: none;
		}
	}

	.popup {
		z-index: 667;
		position: fixed;
		top: calc(var(--status-bar-height) + 150rpx);
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 600rpx;
		background-color: #ffffff;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		overflow: scroll;
		transition: all 1s linear;
		opacity: 0;
		display: none;
		width: 100%;
		padding: 0 0 30rpx 0;
		border-top: 1px #f0f0f1 solid;

		.item-opt {
			height: 80rpx;
			padding: 0rpx 30rpx;
			line-height: 80rpx;
			color: #666666;
			border-bottom: 1rpx solid #f0f0f1;
		}

		.actOpt {
			color: #4d7df9;
			font-weight: bold;
			position: relative;

			&::after {
				content: '✓';
				font-weight: bold;
				font-size: 36rpx;
				position: absolute;
				right: 40rpx;
			}
		}

		.hot-cbd {
			border-bottom: 1rpx solid #f0f0f1;
			padding: 0 30rpx 30rpx 30rpx;

			.h3 {
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
				padding: 20rpx 0;
			}

			.txt {
				background-color: #f6f7fa;
				border-radius: 8rpx;
				padding: 10rpx 30rpx;
				margin: 10rpx;
				display: inline-flex;
				color: #ff941d;
				font-size: 24rpx;
			}
		}

		.rs-flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.filter {
			.sx-item {
				padding: 30rpx;

				.sx-title {
					font-size: 28rpx;
					color: #333333;
					font-weight: bold;
					padding: 0 0 20rpx 0;
				}

				.sx-cont {
					.noselde {
						background-color: #f6f7fa;
						border-radius: 8rpx;
						padding: 10rpx 30rpx;
						margin: 10rpx;
						display: inline-flex;
						color: #666666;
						font-size: 24rpx;
					}

					.selde {
						background-color: #ff941d;
						border-radius: 8rpx;
						padding: 10rpx 30rpx;
						margin: 10rpx;
						display: inline-flex;
						color: #ffffff;
						font-size: 24rpx;
					}
				}

				.cj-slider {
					width: 90%;
					margin: auto;
					margin-top: 20rpx;
				}

				.cj-slide__text {
					text-align: center;
					padding: 20rpx;
				}
			}
		}

		.operate-btn {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btn {
				margin: 50rpx 30rpx;
				border: none;
			}

			.clear-btn {
				width: 35%;
				border: 1px #cccccc solid;
				;
			}

			.save-btn {
				width: 60%;
				background-color: #ff941d;
				color: #ffffff;
			}
		}
	}

	.popupShow {
		display: block;
		opacity: 1;
	}
</style>
