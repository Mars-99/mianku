import request from './request.js'

let baseUrl = 'https://api.mianku.vip/' // 服务器地址 正式环境

let $http = new request({
	// 接口请求地址
	baseUrl: baseUrl,
	// 设置请求头
	headers: {
		// 'Content-Type': 'application/x-wwwform-urlencoded',
		'content-type': 'application/json'
	},
	// 以下是默认值可不写
	// 是否提示--默认提示
	isPrompt: false,
	// 是否显示请求动画
	load: true,
	// 是否使用处理数据模板
	isFactory: false,
	// 列表接口是否有加载判断
	loadMore: true

})
// 当前接口请求数
let requestNum = 0
let num = 0
// 请求开始拦截器
$http.requestStart = function(options) {
	if (requestNum <= 0) {
		if (options.load) {
			// 打开加载动画
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true
			// })
		}
	}
	requestNum += 1
	// 请求前加入token
	options.headers['token'] = uni.getStorageSync('token')
	return options
}
// 请求结束
$http.requestEnd = function(options, resolve) {
	// 判断当前接口是否需要加载动画
	requestNum = requestNum - 1
	if (requestNum <= 0) {
		// uni.hideLoading()
	}
	if (resolve.data.code == -1 || resolve.data.code == -2) {
		num += 1
		console.log("num",num)
		if(num<200){
			uni.navigateTo({
				url: '/pages/login/login'
			
			})
		}
	}
}
export default $http
