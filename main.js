
import Vue from 'vue'
import App from './App'

import store from './store'
import { timeHandle,tranNumber,registrationTimeHandle } from "@/utils/functionHandle.js"
import getMsgNum from '@/utils/mixins/getMsgNum.js'
Vue.prototype.$store = store
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
const href = (url) => {
	uni.navigateTo({
		url: url
	})
}
const backs = () => {
	uni.navigateBack({
		delta: 1
	})
}
Vue.config.productionTip = false
Vue.prototype.$api = {msg, prePage,href,backs,timeHandle,tranNumber,registrationTimeHandle}
Vue.mixin(getMsgNum)
App.mpType = 'app'


const app = new Vue({
    ...App,
	store
})
app.$mount()


