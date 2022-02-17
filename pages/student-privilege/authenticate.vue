<template>
	<view>
		<view style="background-color: #ffffff;">
			<uni-segmented-control :activeIndex="activeIndex" :values="items" style-type="text" active-color="#ff941d"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
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
								<view style="padding-left: 10rpx">
									<uni-data-picker placeholder="请选择学校" popup-title="请选择学校" :localdata="dataTree"
										v-model="school" @change="schoolChange">
									</uni-data-picker>
								</view>
							</uni-forms-item>
							<uni-forms-item label="上传学生证" name="telNumber">
								<upload-img ref="gUpload" :mode="imgList" @chooseFile="chooseFile"
									@imgDelete="imgDelete" :control="control"></upload-img>
							</uni-forms-item>

						</uni-forms>
						<button class="btn" @click="submit">提交认证</button>
					</view>
				</view>
			</view>
				<view v-if="current === 1">
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
							<uni-forms-item label="学历">
								<view style="padding: 20rpx;background-color: white;">
									应届高考生
								</view>
							</uni-forms-item>
							<uni-forms-item label="上传准考证" name="telNumber">
								<upload-img ref="gUpload" :mode="imgList" @chooseFile="chooseFile"
									@imgDelete="imgDelete" :control="control"></upload-img>
							</uni-forms-item>
						</uni-forms>
						<button class="btn" @click="submit">提交认证</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUniversit,
		authenticationUpdateUrl
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
					name: '请选择入学年份'
				}, {
					name: '2021'
				}, {
					name: '2020'
				}, {
					name: '2019'
				}, {
					name: '2018'
				}],
				yearsIndex: 0,
				education: [{
					name: '请选择学历'
				}, {
					name: '大专'
				}, {
					name: '本科'
				}, {
					name: '硕士'
				}, {
					name: '博士'
				}],
				educationIndex: 0,
				school: '0-0',
				dataTree: [],
				universitData: [],
				parameter: {
					frontView: '',
					realName: '',
					school: '',
					education: '',
					enrollmentYear: ''
				},
				licenseUrl: []
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
					let i = 0;
					for (let key in this.universitData) {
						i++;
						let children_arr = []
						this.universitData[key].forEach((item, index) => {
							children_arr.push({
								text: item.schoolName,
								value: `${i}-${index+1}`
							})
						})
						children_arr.sort((a, b) => a.text.localeCompare(b.text, 'zh'))
						let tree_obj = {
							text: key,
							value: `${i}-0`,
							children: children_arr
						}
						this.dataTree.push(tree_obj)
					}
					this.dataTree.sort((a, b) => a.text.localeCompare(b.text, 'zh'))
				}
				console.log("universit", this.dataTree)
			},
			async getAuthenticationUpdateUrl() {
				const {
					data: res
				} = await authenticationUpdateUrl(this.formData.idCardNumber, this.parameter.frontView, this.formData
					.name, this.parameter.school, this.parameter.education, this.parameter.enrollmentYear)
				if (res.code == 1) {
					return this.$api.msg(res.msg)
				} else {
					uni.showToast({
					    icon: "none",
					    title:'认证已提交，1-3个工作日完成认证审核',
					        duration: 3000,
					        position: 'top'
					})
                    uni.navigateBack({
                    	success: function() {
                    	        beforePage.onShow(); // 执行上一页的onLoad方法
                    	    }
                    })
				}

			},
			submit() {

				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					this.getAuthenticationUpdateUrl()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			onClickItem(e) {
				this.formData.name=''
				this.formData.idCardNumber=''
				this.licenseUrl = ''
				this.yearsIndex = 0
				this.educationIndex = 0,
				this.school= '0-0'
				
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 1、监听身份证输入
			Listeningfocus() {
				console.log(this.formData.idCardNumber)
				if (this.formData.idCardNumber != '') {
					this.getCardTypeNumber(this.formData.idCardNumber)
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
			yearsChange(e) {
				this.yearsIndex = e.detail.value;
				this.parameter.enrollmentYear = this.years[e.detail.value].name
				console.log("this.parameter.enrollmentYear", this.parameter.enrollmentYear)
			},
			educationChange(e) {
				this.educationIndex = e.detail.value;
				this.parameter.education = this.education[e.detail.value].name
				console.log("this.parameter.education", this.parameter.education)
			},
			schoolChange(e) {
				const value = e.detail.value
				this.parameter.school = value[1].text
			},
			chooseFile(list, v) {
				this.licenseUrl = list.join(',')
				this.parameter.frontView = this.licenseUrl
				console.log("this.licenseUrl1111", this.licenseUrl)
			},
			imgDelete(list, eq) {
				this.licenseUrl = list.join(',')
				console.log("this.licenseUrl2222", this.licenseUrl)
			},
			onnodeclick(node) {},
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

	.gaokao-students {
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
		width: 100%;
		line-height: 90rpx;
		border: none;
		background-color: #333333;
		color: #ffffff;
		margin-top: 60rpx;
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
