import Vue from 'vue'
import Vuex from 'vuex'
import {
	wxLogin,
	wxInfo,
	wxPhone,
	userDetail
} from '@/utils/request/manage.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userinfo: {},
		needAuth: true,
		isLogin: false
	},
	getters: {
		getUserinfo(state) {
			return state.userInfo
		},
		getNeedAuth(state) {
			return state.needAuth
		},
		getIsLogin(state) {
			return state.isLogin
		}
	},
	mutations: {
		setUserinfo(state, userinfo) {
			state.userinfo = userinfo;
		},
		setNeedAuth(state, needAuth) {
			state.needAuth = needAuth;
		},
		setIsLogin(state, isLogin) {
			state.isLogin = isLogin;
		}
	},
	actions: {
		
		
		
		// login(context) {
		// 	return new Promise((resolve,reject) =>{
		// 		let _self = this
		// 		uni.login({
		// 			provider: 'weixin',
		// 			success: async (wxloginRes) => {
		// 				const {
		// 					data: res
		// 				} = await wxLogin(wxloginRes.code)
						
		// 				if (res.code == 1) {
		// 					return _self.$api.msg('登录失败!' + res.msg)
		// 					context.commit('setIsLogin',false)
		// 					context.commit('setNeedAuth',true)
		// 				}else{
		// 					uni.setStorageSync('token', res.data.token)
		// 					//当前登录的用户信息存在storage里
		// 					const{data:user_data} = await userDetail()
		// 					uni.setStorageSync('userinfo', user_data.data)
							
		// 					context.commit('setUserinfo',user_data.data)
		// 					context.commit('setIsLogin',true)
		// 				}
						
		// 			},
		// 			fail: (wxloginRes) => {
		// 				console.log("获取code失败")
		// 			}
		// 		})
		// 	})
		// },
		// authUserInfo(context){
		// 	return new Promise((resolve,reject) =>{
		// 		uni.getUserProfile({
		// 			desc: '注册',
		// 			lang: 'zh_CN',
		// 			success: async res => {
		// 				// console.log("a",context.state.userinfo)
		// 				// console.log("b",res)
		// 				let encryptedData = res.encryptedData
		// 				let iv = res.iv
		// 				const {data: userinfo} = await wxInfo(context.state.userinfo.token, context.state.userinfo.sessionKey, encryptedData, iv)
		// 				// console.log("userinfo",userinfo)
		// 			},
		// 		});
		// 	})
		// },
		
		
		// getPhoneNumber(e){
		// 	console.log(e)
		// 	const userinfo = uni.getStorageSync('userinfo');
		// 	const token = uni.getStorageSync('token');
		// 	console.log(userinfo)
		// 	const {data: userPhone} = wxPhone(token,userinfo.wxOpenid,userinfo.sessionKey,e.detail.encryptedData,e.detail.iv)
		// }
	
		// getPhoneNumber(context){
		//     setTimeout(() => {
		//     	console.log("wwwwwwwwwwwwwww",e.detail)
		//     },1500)
		// 	// const {data: userPhone} = wxPhone(context.state.userinfo.token,context.state.userinfo.wxOpenid,context.state.userinfo.sessionKey, encryptedData, iv)
		// }
		// authPhone(context){
		// 	return new Promise((resolve,reject) =>{
		// 		uni.getPhoneNumber({
		// 			desc: '登录后可同步数据',
		// 			lang: 'zh_CN',
		// 			success: async res => {
		// 				// console.log("a",context.state.userinfo)
		// 				console.log("PhoneNumber",res)
		// 				// let encryptedData = res.encryptedData
		// 				// let iv = res.iv
		// 				// const {data: userinfo} = await wxInfo(context.state.userinfo.token, context.state.userinfo.sessionKey, encryptedData, iv)
		// 				// console.log("userinfo",userinfo)
		// 			},
		// 		});
		// 	})
		// }
	}
})
export default store
