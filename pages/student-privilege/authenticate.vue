<template>
	<view>
		<view style="background-color: #ffffff;">
			<uni-segmented-control :activeIndex="activeIndex" :values="items" style-type="text" active-color="#ff941d"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-show="current === 0">
				<view class="current-students">
					<view class="form-cont">
						<uni-forms ref="form" :modelValue="formData" :rules="rules">
							<uni-forms-item label="真实姓名" name="name">
								<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="身份证号码" name="idCardNumber">
								<uni-easyinput type="idcard" @blur="Listeningfocus()" v-model="formData.idCardNumber"
									placeholder="请输入证件号码" />
							</uni-forms-item>
							<uni-forms-item label="入学年份" name="years">
								<view>
									<picker @change="yearsChange" :value="yearsIndex" :range="years" range-key="name">
										<view style="padding: 20rpx;background-color: white;">
											{{ years[yearsIndex].name }}
										</view>
									</picker>
								</view>
							</uni-forms-item>
							<uni-forms-item label="学历" name="education">
								<view>
									<picker @change="educationChange" :value="educationIndex" :range="education"
										range-key="name">
										<view style="padding: 20rpx;background-color: white;">
											{{ education[educationIndex].name }}
										</view>
									</picker>
								</view>
							</uni-forms-item>
							<uni-forms-item label="学校" name="telNumber">
								<view>
									<uni-data-picker placeholder="请选择学校" popup-title="请选择所在地区" :localdata="dataTree"
										v-model="classes" @change="onchange" @nodeclick="onnodeclick"
										@popupopened="onpopupopened" @popupclosed="onpopupclosed">
									</uni-data-picker>
								</view>
							</uni-forms-item>
							<uni-forms-item label="上传学生证" name="telNumber">
								<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select"
									@progress="progress" @success="success" @fail="fail" />
							</uni-forms-item>

						</uni-forms>
						<button class="btn" @click="submit">提交</button>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="gaokao-students">
					<view class="form-cont">
						<uni-forms ref="form" :modelValue="formData" :rules="rules">
							<uni-forms-item label="真实姓名" name="name">
								<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="身份证号码" name="idCardNumber">
								<uni-easyinput type="idcard" @blur="Listeningfocus()" v-model="formData.idCardNumber"
									placeholder="请输入证件号码" />
							</uni-forms-item>
							<uni-forms-item label="学历" >
								<view style="padding: 20rpx;background-color: white;">
									应届高考生
								</view>
							</uni-forms-item>
							<uni-forms-item label="上传准考证" name="telNumber">
								<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select"
									@progress="progress" @success="success" @fail="fail" />
							</uni-forms-item>
						</uni-forms>
						<button class="btn" @click="submit">提交</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUniversit
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				items: ['在校生', '应届高考生'],
				current: 0,
				// 表单数据
				formData: {
					name: '',
					idCardNumber: '',
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 1,
								errorMessage: '不能为空',
							}
						]
					},
					idCardNumber: {
						rules: [{
								required: true,
								errorMessage: '请输入身份证号',
							},
							{
								minLength: 1,
								errorMessage: '不能为空',
							}
						]
					},

				},
				imageValue: [],
				years: [{
					name: '2021'
				}, {
					name: '2020'
				}, {
					name: '2019'
				}, {
					name: '2018'
				}],
				yearsIndex: 1,
				education: [{
					name: '大专'
				}, {
					name: '本科'
				}, {
					name: '硕士'
				}, {
					name: '博士'
				}],
				educationIndex: 1,
				// multiArray: [
				// 	['亚洲', '欧洲'],
				// 	['中国', '日本'],
				// 	['北京', '上海', '广州']
				// ],
				// multiIndex: [0, 0, 0]
				classes: '0-0',
				dataTree: [{
						text: "上海",
						value: "1-0",
						children: [{
								text: "学校名称",
								value: "1-1"
							},
							{
								text: "学校名称",
								value: "1-2"
							}
						]
					},
					{
						text: "北京",
						value: "2-0",
						children: [{
								text: "学校名称",
								value: "2-1"
							},
							{
								text: "学校名称班",
								value: "2-2"
							}
						]
					}
				],
				universitData: []
			}
		},
		onLoad() {
			this.universit()
		},
		methods: {
			async universit() {
				const {
					data: res
				} = await getUniversit()
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					this.universitData = res.data

					console.log("universit", this.universitData)

				}
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 1、监听身份证输入
			Listeningfocus() {
				console.log(this.formData.credNumber)
				if (this.formData.credNumber != '') {
					this.getCardTypeNumber(this.formData.credNumber)
				}
			},
			// 2、检验身份证是否正确
			getCardTypeNumber(value) {
				const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if (reg.test(value) === false && value) {
					uni.showToast({
						icon: "none",
						title: '请输入正确格式的身份证号码',
						duration: 2000,
						position: 'top'
					})
				} else {
					console.log('身份证号码格式正确')
				}
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			yearsChange(e) {
				this.yearsIndex = e.detail.value;
				console.log(this.years[e.detail.value].name)
			},
			educationChange(e) {
				this.educationIndex = e.detail.value;
				console.log(e.detail)
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('---------onchange:', e);
			},
			onchange(e) {
				const value = e.detail.value
			},
			onnodeclick(node) {}
			// bindMultiPickerColumnChange: function(e) {
			// 	this.multiIndex[e.detail.column] = e.detail.value;
			// 	switch (e.detail.column) {
			// 		case 0: //拖动第1列
			// 			switch (this.multiIndex[0]) {
			// 				case 0:
			// 					this.multiArray[1] = ['中国', '日本'];
			// 					this.multiArray[2] = ['北京', '上海', '广州'];
			// 					break;
			// 				case 1:
			// 					this.multiArray[1] = ['英国', '法国'];
			// 					this.multiArray[2] = ['伦敦', '曼彻斯特'];
			// 					break;
			// 			}
			// 			this.multiIndex.splice(1, 1, 0);
			// 			this.multiIndex.splice(2, 1, 0);
			// 			break;
			// 		case 1: //拖动第2列
			// 			switch (
			// 				this.multiIndex[0] //判断第一列是什么
			// 			) {
			// 				case 0:
			// 					switch (this.multiIndex[1]) {
			// 						case 0:
			// 							this.multiArray[2] = ['北京', '上海', '广州'];
			// 							break;
			// 						case 1:
			// 							this.multiArray[2] = ['东京', '北海道'];
			// 							break;
			// 					}
			// 					break;
			// 				case 1:
			// 					switch (this.multiIndex[1]) {
			// 						case 0:
			// 							this.multiArray[2] = ['伦敦', '曼彻斯特'];
			// 							break;
			// 						case 1:
			// 							this.multiArray[2] = ['巴黎', '马赛'];
			// 							break;
			// 					}
			// 					break;
			// 			}
			// 			this.multiIndex.splice(2, 1, 0);
			// 			break;
			// 	}
			// 	this.$forceUpdate();
			// }
		}
	}
</script>

<style scoped lang="scss">
	.current-students {
		margin: 30rpx;
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
	}
	.gaokao-students{
		margin: 30rpx;
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
	}
	.form-cont {
		background-color: #ffffff;
		padding: 30rpx;
	
		.credType {
			display: flex;
			box-sizing: border-box;
			flex-direction: row;
			align-items: center;
			border: 1px solid #F0F0F0;
			border-radius: 4px;
			border-color: #e5e5e5;
			line-height: 72rpx;
			padding-left: 10rpx;
		}
	
		.choose-school {
			line-height: 72rpx;
		}
	}
	
	.btn {
		border-radius: 90rpx;
		border: none;
		width: 50%;
		line-height: 90rpx;
		border: none;
		background-color: #333333;
		color: #ffffff;
	}

	/deep/ .is-input-border {

		border: 0px;

	}

	/deep/ .input-value-border {
		border: 0px !important;
	}
	/deep/ .uni-forms-item__inner {
	    display: flex;
	    padding: 10px;
	    border-bottom: 1px #f5f5f5 solid;
	}
</style>
