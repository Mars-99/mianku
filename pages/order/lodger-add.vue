<template>
	<view class="content" :style="{'min-height': swiperheight + 'px'}">
		<view class="statement">
			温馨提示：根据公安酒店管理条例，入住经营性的酒店/民宿，需要提供入住人的身份证信息。入住人身份信息只用于必要的身份核实和保险理赔事项，眠库民宿会为您严格保密。
		</view>
		<view class="form-cont">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="证件类型" name="idtype">
					<picker @change="credentialsTypeChange" :value="credIndex" :range="credTypeList">
						<view class="uni-input credType">{{credTypeList[credIndex]}}</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item label="证件号码" name="credNumber">
					<uni-easyinput type="idcard" @blur="Listeningfocus()"  v-model="formData.credNumber" placeholder="请输入证件号码" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" name="telNumber">
					<uni-easyinput type="number" @blur="checkMobile(formData.telNumber)" v-model="formData.telNumber" placeholder="请输入联系电话号码" />
				</uni-forms-item>

			</uni-forms>
			<button class="btn" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		addLodger
	} from '@/utils/request/manage.js'
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					name: '',
					credNumber:'',
					telNumber:'',
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
					credNumber: {
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
				credTypeList: ['身份证', '外国护照', '港澳居民往来内地通行证', '台湾居民往来内地通行证'],
				credIndex: 0,
				credType:'',
				swiperheight: 0,
			}
		},
		mounted() {
			// 注意，这里要用个变量存this，不然进到getSystemInfo后this指向会变化，找不到data变量
			var _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.swiperheight = res.windowHeight
				}
			})
		},
		onLoad() {
			this.credType=this.credTypeList[0]
		},
		methods: {
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			// binddata(name,value){
			// 通过 input 事件设置表单指定 name 的值
			//   this.$refs.form.setValue(name, value)
			// },
			// 触发提交表单
			submit() {
				
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					this.add()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
				console.log("aaaaa",this.formData.name,this.formData.telNumber,this.credType,this.formData.credNumber)
			},
			credentialsTypeChange(e) {
				this.credIndex = e.target.value
				this.credType=this.credTypeList[e]
				console.log('picker发送选择改变，携带值为', e.target.value)
			},
			async add(){
				const {
					data:res
				} = await addLodger(this.formData.name,this.formData.telNumber,this.credType,this.formData.credNumber)
				if(res.code == 1){
					return this.$api.msg(res.msg)
				}else{
					console.log("getLodgerList",res)
					uni.navigateBack({
						success: function() {
						        beforePage.onShow(); // 执行上一页的onLoad方法
						    }
					})
				}
			},
			// 1、监听身份证输入
			Listeningfocus(){
			    console.log(this.formData.credNumber)
			    if(this.formData.credNumber!=''){
				this.getCardTypeNumber(this.formData.credNumber)
			    }
			},
			// 2、检验身份证是否正确
			getCardTypeNumber(value){
			    const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;		          
			    if( reg.test(value) === false && value){
			        uni.showToast({
				    icon: "none",
				    title:'请输入正确格式的身份证号码',
			            duration: 2000,
			            position: 'top'
				})
			    }else {
				console.log('身份证号码格式正确')
			    }
			},
			checkMobile(str) {
			    if(str==""){
					uni.showToast({
					    icon: "none",
					    title:'手机号不能为空！',
					        duration: 2000,
					        position: 'top'
					})
			    }
			    else{
			        var re = /^1\d{10}$/   
			        if (re.test(str)) {
			            console.log("正确");
			        } else {
						uni.showToast({
						    icon: "none",
						    title:'手机号格式错误！！',
						        duration: 2000,
						        position: 'top'
						})
						
			        }
			    }
				}

		},

	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;

		.statement {
			background-color: #fdf9dc;
			color: #d87a44;
			padding: 30rpx;
			font-size: 24rpx;
			margin-bottom: 30rpx;
			line-height: 34rpx;
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
	}
	/deep/ button::after {
		border: none;
	}
</style>
