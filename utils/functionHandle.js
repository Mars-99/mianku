/**
 * @Description: 数据处理函数
 * @author rqm
 * @time 2021-10-01
 * @updateTime 2021-10-01
 */
// import askDistrict from '@/utils/city.js'
/**
 * 方法说明 时间日期处理函数
 * @param dateStr 时间毫秒数
 * @return 昨天/前天/2021-04-02
 */
function commentTimeHandle(dateStr1) {
	// let json_date = new Date(dateStr).toJSON();
	// console.log(json_date)
	// let newTime = new Date(new Date(json_date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/,
	// 	'')
	// let starttime = newTime.replace(new RegExp("-", "gm"), "/");
	// var starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
	// console.log('starttimeHaoMiao: ',starttimeHaoMiao)
	// var oldTime = (new Date("2021/04/28 14:11:11")).getTime(); //得到毫秒数  
	// //不是上面格式的时间需要转换
	// //starttime ='2021-10-01 08:00:00';
	let dateStr = dateStr1 ? dateStr1 : '2021-10-01 08:00:00'
	let starttime = dateStr.replace(new RegExp("-", "gm"), "/");
	let starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数

	// dateStr =  1619581255000 // 测试时间
	let publishTime = starttimeHaoMiao / 1000, //获取dataStr的秒数  
		date = new Date(publishTime * 1000), //获取dateStr的标准格式 console.log(date) 打印结果  Wed Apr 28 2021 11:40:55 GMT+0800 (中国标准时间)
		// 获取date 中的 年 月 日 时 分 秒
		Y = date.getFullYear(),
		M = date.getMonth() + 1,
		D = date.getDate(),
		H = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();

	// 对 月 日 时 分 秒 小于10时, 加0显示 例如: 09-09 09:01
	if (M < 10) {
		M = '0' + M;
	}
	if (D < 10) {
		D = '0' + D;
	}
	if (H < 10) {
		H = '0' + H;
	}
	if (m < 10) {
		m = '0' + m;
	}
	if (s < 10) {
		s = '0' + s;
	}
	// console.log("年", Y); // 年 2018
	// console.log("月", M); // 月 09
	// console.log("日", D); // 日 06
	// console.log("时", H); // 时 18
	// console.log("分", m); // 分 47
	// console.log("秒", s); // 秒 00
	let nowTime = new Date().getTime() / 1000, //获取此时此刻日期的秒数
		diffValue = nowTime - publishTime, // 获取此时 秒数 与 要处理的日期秒数 之间的差值
		diff_days = parseInt(diffValue / 86400), // 一天86400秒 获取相差的天数 取整
		diff_hours = parseInt(diffValue / 3600), // 一时3600秒
		diff_minutes = parseInt(diffValue / 60),
		diff_secodes = parseInt(diffValue);
	if (diff_days > 0 && diff_days < 3) { //相差天数 0 < diff_days < 3 时, 直接返出
		// if (diff_days == 1) {
		// 	return "昨天 " + H + ':' + m;
		// } else {
		// 	return "前天 " + H + ':' + m;
		// }
		return diff_days + "天前";
	} else if (diff_days > 0 && diff_days < 8) {
		return "一周前";
	} else if (diff_days <= 0 && diff_hours > 0) {
		return diff_hours + "小时前";
	} else if (diff_hours <= 0 && diff_minutes > 0) {
		return diff_minutes + "分钟前";
	} else if (diff_secodes < 60) {
		if (diff_secodes <= 0) {
			return "刚刚";
		} else {
			return diff_secodes + "秒前";
		}
	} else if (diff_days >= 3 && diff_days < 30) {
		// return M + '-' + D + ' ' + H + ':' + m;
		return M + '-' + D;
	} else if (diff_days >= 30) {
		// return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
		return Y + '-' + M + '-' + D;
	}
}

/**
 * 方法说明 报名时间处理函数
 * @param start 开始时间 end 结束时间
 * @return 2021-9-29 - 10-10 如果跨年了，都显示年份
 */
function registrationTimeHandle(start,end) {
	let dateStartStr = start ? start : '2021-10-01 08:00:00'
	let dateEndStr = end ? end : '2021-12-31 08:00:00'
	let starttime = dateStartStr.replace(new RegExp("-", "gm"), "/")
	let endtime = dateEndStr.replace(new RegExp("-", "gm"), "/")
	let starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
	let endtimeHaoMiao = (new Date(endtime)).getTime(); //得到毫秒数
	
	// dateStr =  1619581255000 // 测试时间
	let	startDate = new Date(starttimeHaoMiao), //获取dateStr的标准格式 console.log(date) 打印结果  Wed Apr 28 2021 11:40:55 GMT+0800 (中国标准时间)
		// 获取date 中的 年 月 日 时 分 秒
		startY = startDate.getFullYear(),
		startM = startDate.getMonth() + 1,
		startD = startDate.getDate(),
		startH = startDate.getHours(),
		startm = startDate.getMinutes(),
		starts = startDate.getSeconds();
		
	let endDate = new Date(endtimeHaoMiao),
		endY = endDate.getFullYear(),
		endM = endDate.getMonth() + 1,
		endD = endDate.getDate(),
		endH = endDate.getHours(),
		endm = endDate.getMinutes(),
		ends = endDate.getSeconds();
		if (startY == endY) {
			return startY + '.' + startM + '.' + startD + ' - ' + endM + '.' + endD
		} else {
			return startY + '.' + startM + '.' + startD + ' - ' + endY + '.' + endM + '.' + endD
		}
}
/**
 * 方法说明 数量处理函数
 * @param num 具体人数
 * @return 处理后的函数
 */
function tranNumber(num) {
	if (typeof(num) !== 'number') {
		// return this.xqToast('不是数字', 'none')
		return 0
	}
	let numStr = num.toString()
	// 千以内直接返回 
	if (numStr.length < 4) {
		return numStr;
	}
	//大于4位数是万 (以1.0W分割)
	else if (numStr.length > 4) {
		let decimal = numStr.substring(numStr.length - 4, numStr.length - 3)
		return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
	}
	// 千 加逗号(暂时不加)
	else {
		let decimal = numStr.substring(numStr.length - 3, numStr.length)
		// return parseInt(num / 1000) + ',' + decimal;
		return parseInt(num / 1000) + decimal;
	}
}

/**
 * 方法说明 省市区字符串和编码互转（一般都是编码转字符串，因为后台存的只有编码）
 * @param 字符串/编码
 * @return 编码/字符串
 */
function getAreaNameOrCode(params) {
	let type = typeof(params)
	let areaObj = askDistrict
	// let areaObj = {
	// 	'芙蓉区': 430102,
	// 	'天心区': 430103,
	// 	'岳麓区': 430104,
	// 	'开福区': 430105,
	// 	'雨花区': 430111,
	// 	'望城区': 430112,
	// 	'长沙县': 430121,
	// 	'浏阳市': 430181,
	// 	'宁乡市': 430182
	// }
	if (type == 'string') {
		// for (let key in areaObj) {
		// 	if (areaObj[key] == params) {
		// 		return key
		// 	}
		// }
		return
	} else if (type == 'number') {
		let cityCode = params.toString().substring(0, 4) + '00'
		let areaName = areaObj[cityCode][params]
		return areaName
	}
}

/**
 * 方法说明 根据数组的某一项排序
 * @param  {props} 某一项
 * @param  {type} 0 降序 1 升序
 * @return 排序后的数组
 * @time 2021-07-21
 */
function sortBy(props, type) {
	return function(a, b) {
		if (type) {
			// 百分率单独处理
			if (props == 'per') {
				return Number(a[props].slice(0, -1)) - Number(b[props].slice(0, -1))
			} else {
				return a[props] - b[props]
			}
		} else {
			if (props == 'per') {
				return Number(b[props].slice(0, -1)) - Number(a[props].slice(0, -1))
			} else {
				return b[props] - a[props]
			}
		}
		// if (type) {
		// 	return a[props] - b[props]
		// } else {
		// 	return b[props] - a[props]
		// }
	}
}
/**
 * 方法说明 深拷贝
 * @param 
 * @return 
 * @time 2021-07-23
 */
function deepClone(obj) {
	let cloneObj = Array.isArray(obj) ? [] : {};
	// 也可以这么做,这种是我们没有es6方法isArray时候常用的方法判断一个对象是否是数组
	// let cloneObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			//判断对象里面的元素是不是对象
			if (obj[key] && typeof obj[key] === 'object') {
				cloneObj[key] = deepClone(obj[key]);
			} else {
				// 如果不是对象，就直接放到对象cloneObj里
				cloneObj[key] = obj[key];
			}
		}
	}
	return cloneObj;
}
/**
 * 方法说明 把当前时间格式处理成标准时间格式
 * 快速获取年月日，时分秒
 * @param dateStr 
 * @return 2021-11-17 10:07:36
 */
function handTime() {
	let d1 = new Date().toLocaleString("zh", {
	    year: "numeric",
	    month: "2-digit", 
	    day: "2-digit", 
	    minute: "2-digit",
	    hour:  "2-digit", 
	    second: "2-digit",
	    hour12: false
	})
	return d1.replace(/\//g, "-") 
}


module.exports = {
	timeHandle: commentTimeHandle,
	registrationTimeHandle: registrationTimeHandle,
	tranNumber: tranNumber,
	getAreaNameOrCode: getAreaNameOrCode,
	sortBy: sortBy,
	deepClone: deepClone,
	handTime: handTime,
}
