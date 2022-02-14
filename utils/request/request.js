export default class request {
	constructor(options) {
	  //请求公共地址
		this.baseUrl = options.baseUrl || ''
		// 默认请求头
		this.headers = options.headers || {}
		// 默认配置
		// 是否提示--默认提示
		this.isPrompt = options.isPrompt || false
		// 是否显示请求动画
		this.load = options.load || true
		// 是否使用处理数据模板
		this.isFactory = options.isFactory || false
		// 列表接口是否有加载判断
		this.loadMore = options.loadMore || true
	}
	// 获取默认信息
	getDefault(url, options, type) {
		// 判断url是不是链接
		var urlType = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/.test(url)
		let httpUrl
		httpUrl = urlType ? url : this.baseUrl + url
		let config = Object.assign({
			isPrompt: this.isPrompt,
			load: this.load,
			isFactory: this.isFactory,
			loadMore: this.loadMore
		}, options)
		// 请求地址
		config.httpUrl = httpUrl
		// 请求头
		config.headers = Object.assign(this.headers, options.headers)
		return config
	}
	
	// get请求
	get(url = '', data = {}, options = {}) {
		let requestInfo = this.getDefault(url, options, 'data')
		requestInfo.data = data
		return new Promise((resolve, reject) => {
			this.getRequest('GET', requestInfo, (state, response) => {
				// 是否用外部的数据处理方法
				if (state && requestInfo.isFactory && this.dataFactory) {
					// 数据处理
					var factoryInfo = this.dataFactory(requestInfo, response)
					factoryInfo.success ? resolve(factoryInfo.result) : reject(factoryInfo.result)
				} else {
					state ? resolve(response) : reject(response)
				}
			})
		})
	}
	
	// post请求
	post(url = '', data = {}, options = {}) {
		let requestInfo = this.getDefault(url, options, "data");
		requestInfo.data = data;
		// requestInfo.data = JSON.stringify(data);
		return new Promise((resolve, reject) => {
			this.getRequest("POST", requestInfo, (state, response) => {
				//是否用外部的数据处理方法
				if (state && requestInfo.isFactory && this.dataFactory) {
					//数据处理
					var factoryInfo = this.dataFactory(requestInfo, response);
					factoryInfo.success ? resolve(factoryInfo.result) : reject(factoryInfo.result);
				} else {
					state ? resolve(response) : reject(response);
				}
			});
		});
	}
	
	//put请求
	put(url = '', data = {}, options = {}) {
		let requestInfo = this.getDefault(url, options, "data");
		requestInfo.data = data;
		return new Promise((resolve, reject) => {
			this.getRequest("PUT", requestInfo, (state, response) => {
				//是否用外部的数据处理方法
				if (state && requestInfo.isFactory && this.dataFactory) {
					//数据处理
					var factoryInfo = this.dataFactory(requestInfo, response);
					factoryInfo.success ? resolve(factoryInfo.result) : reject(factoryInfo.result);
				} else {
					state ? resolve(response) : reject(response);
				}
			});
		});
	}
	
	//delete请求
	delete(url = '', data = {}, options = {}) {
		let requestInfo = this.getDefault(url, options, "data");
		requestInfo.data = data;
		return new Promise((resolve, reject) => {
			this.getRequest("DELETE", requestInfo, (state, response) => {
				//是否用外部的数据处理方法
				if (state && requestInfo.isFactory && this.dataFactory) {
					//数据处理
					var factoryInfo = this.dataFactory(requestInfo, response);
					factoryInfo.success ? resolve(factoryInfo.result) : reject(factoryInfo.result);
				} else {
					state ? resolve(response) : reject(response);
				}
			});
		});
	}
	
	// 资源上传
	upload(url = '', data = '', options = {}) {
		let requestInfo = this.getDefault(url, options, "data");
		requestInfo.data = data;
		return new Promise((resolve, reject) => {
			this.getRequest("UPLOAD", requestInfo, (state, response) => {
				//是否用外部的数据处理方法
				if (state && requestInfo.isFactory && this.dataFactory) {
					//数据处理
					var factoryInfo = this.dataFactory(requestInfo, response);
					factoryInfo.success ? resolve(factoryInfo.result) : reject(factoryInfo.result);
				} else {
					state ? resolve(response) : reject(response);
				}
			});
		});
	}
	
	// 接口请求方法
	getRequest(ajaxType, options, callback) {
		// 请求前回调
		if (this.requestStart) {
			options.method = ajaxType
			var requestStart = this.requestStart(options)
			if (typeof requestStart == 'object') {
				options.data = requestStart.data
				options.headers = requestStart.headers
				options.isPrompt = requestStart.isPrompt
				options.load = requestStart.load
				options.isFactory = requestStart.isFactory
			} else {
				callback(false, '请求开始拦截器未通过')
				return
			}
		}
		if (ajaxType == 'UPLOAD') {
			uni.uploadFile({
				url: options.httpUrl,
				methods: 'POST',
				header: options.headers, // 加入请求头
				filePath: options.data, // 类型要求 String
				name: 'file',					
				success: res => {
					// 请求完成回调
					this.requestEnd && this.requestEnd(options, res)
					callback(true, res)
				},
				fail: (err) => {
					// 请求完成回调
					this.requestEnd && this.requestEnd(options, err)
					callback(false, err)
				}
			})
		} else {
			uni.request({
				url: options.httpUrl,
				data: options.data,
				sslVerify: false,
				method: ajaxType, // 请求类型
				header: options.headers, // 加入请求头
				success: (res) => {
					// 请求完成回调
					this.requestEnd && this.requestEnd(options, res)
					callback(true, res)
				},
				fail: (err) => {
					// 请求完成回调
					this.requestEnd && this.requestEnd(options, err)
					callback(false, err)
				}
			})
		}
	}
}