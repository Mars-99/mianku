// 接口管理
import $http from './requestConfig.js'
let urlManage = {
	wxLoginUrl: 'wx/login', // 微信登录(1-1)
	wxInfoUrl: 'wx/info', // 获取用户信息(1-2)
	wxPhoneUrl: 'wx/phone', // 获取用户电话(1-3)
	userDetailUrl: 'api/user/detail', // 用户信息(24)
	userCollection: 'api/user/collection', // 收藏/取消收藏接口(30)
	userCommonIds: 'api/user/common_ids', // 用户收藏，点赞ID集合接口(32)


	roamListUrl: 'api/news/roam_list', // 逛一逛列表
	roamDetailUrl: 'api/news/roam', // 逛一逛详情

	cityUrl: 'api/home/getCity', // 获取城市
	homeUrl: 'api/home/list', // 获取首页banner,hotcity

	hotelListUrl: 'api/hotel/list', // 获取酒店列表
	hotelDetailUrl: 'api/hotel/detail', // 获取酒店列表详情
	// hotelDetailUrl: 'api/home/getCity', // 获取商圈


	activityHotelListUrl: 'api/activity/hotel_list', // 获取试睡酒店列表
	activityPrizeListUrl: 'api/activity/prize', // 获取试睡活动中奖列表
	reportListUrl: 'api/news/report_list', // 获取试睡报告列表
	reportDetailUrl: 'api/news/report', // 获取试睡报告详情

	userMsgList: 'api/user/msg_list', // 消息列表(33)
	userNewMsg: 'api/user/new_msg', // 新消息数(34)
	userMsgRead: 'api/user/msg_read', // 已读消息(35)
	userMsgDel: 'api/user/msg_del', // 删除消息(36)

	userImList: 'api/user/im_list', // 聊天信息查看(91)
	userImAdd: 'api/user/im_add', // 发布聊天信息(92)

	lodgerListUrl: 'api/user/list_reside', // 常用入住人列表
	addLodgerUrl: 'api/user/add_reside', // 添加入住人
	delLodgerUrl: 'api/user/del_reside', //删除入住人
	editLodgerUrl: 'api/user/edit_reside', // 编辑入住人

	bookingUrl: 'api/user/booking', // 下单
	payWxUrl: 'api/user/pay_for_wx', // 微信支付


	orderListUrl: 'api/user/order_list', // 订单列表
	orderDetailUrl: 'api/user/order_detail', // 订单详情
	delOrderUrl: 'api/user/del_order', // 订单删除
	cancelOrderUrl: 'api/user/cancel_order', // 订单取消	

	getCollectionList: 'api/user/collection_list', //收藏文章、酒店列表 --刘慧











}


// 微信登录(1-1)
const wxLogin = function(code, recommend) {
	return $http.post(urlManage.wxLoginUrl, {
		code: code,
		recommend: recommend,
	})

}
// 获取用户信息(1-2)
const wxInfo = function(token, sessionKey, encryptedData, iv) {
	return $http.post(urlManage.wxInfoUrl, {
		encryptedData: encryptedData,
		iv: iv,
		sessionKey: sessionKey,
	})
}

// 获取用户电话(1-3)
const wxPhone = function(token, wxOpenid, sessionKey, encryptedData, iv) {
	return $http.post(urlManage.wxPhoneUrl, {
		wxOpenid: wxOpenid,
		sessionKey: sessionKey,
		encryptedData: encryptedData,
		iv: iv,
	})
}

// 用户信息(24)
const userDetail = function() {
	return $http.get(urlManage.userDetailUrl)
}
// 用户收藏，点赞ID集合接口(32)
const getUserCommonIds = function() {
	return $http.get(urlManage.userCommonIds)
}

// 逛一逛列表
const roamList = function(cityId) {
	return $http.post(urlManage.roamListUrl, {
		cityId: cityId
	})
}
// 逛一逛详情
const roamDetail = function(id) {
	return $http.post(urlManage.roamDetailUrl, {
		id: id
	})
}

// 获取城市
const city = function(upId) {
	return $http.post(urlManage.cityUrl, {
		upId: upId
	})
}

// 获取首页banner,hotcity
const homeList = function(cityId) {
	return $http.post(urlManage.homeUrl, {
		cityId: cityId
	})
}

// 获取酒店列表
const hotelList = function(cityId, checkIn, checkOut, hotelName, label, districtId, flag, occupancy, bedNum, minPrice,
	maxPrice, infrastructure, houseNum, tag, rules, page, limit) {
	return $http.post(urlManage.hotelListUrl, {
		cityId: cityId,
		checkIn: checkIn,
		checkOut: checkOut,
		hotelName: hotelName,
		label: label,
		districtId: districtId,
		flag: flag,
		occupancy: occupancy,
		bedNum: bedNum,
		minPrice: minPrice,
		maxPrice: maxPrice,
		infrastructure: infrastructure,
		houseNum: houseNum,
		tag: tag,
		rules: rules,
		page: page,
		limit: limit

	})
}

// 获取酒店详情
const hotelDetail = function(id) {
	return $http.post(urlManage.hotelDetailUrl, {
		id: id
	})
}


// 获取必睡榜单列表
const bsHotelList = function(cityId, label, page, limit) {
	return $http.post(urlManage.hotelListUrl, {
		cityId: cityId,
		label: label,
		page: page,
		limit: limit
	})
}

// 获取试睡酒店列表
const activityHotelList = function(cityId, page, limit) {
	return $http.post(urlManage.activityHotelListUrl, {
		cityId: cityId,
		page: page,
		limit: limit
	})
}
// 获取试睡活动中奖列表
const activityPrizeList = function(page, limit) {
	return $http.post(urlManage.activityPrizeListUrl, {
		page: page,
		limit: limit
	})
}
// 获取试睡报告列表
const reportList = function(cityId, limit) {
	return $http.post(urlManage.reportListUrl, {
		cityId: cityId,
		// page:page,
		limit: limit
	})
}

// 获取试睡报告详情
const reportDetail = function(id) {
	return $http.post(urlManage.reportDetailUrl, {
		id: id
	})
}
// 收藏/取消收藏接口(30)
const getUserCollection = function(id, type) {
	return $http.post(urlManage.userCollection, {
		id: id, // 收藏的ID
		type: type // 收藏类型 0，商品  1,活动 2，新闻 3,帖子
	})
}

// 消息列表(33)
const getUserMsgList = function(page, limit) {
	return $http.post(urlManage.userMsgList, {
		page: page,
		limit: limit
	})
}
// 新消息数(34)
const getUserNewMsg = function() {
	return $http.post(urlManage.userNewMsg)
}
// 已读消息(35)
const getUserMsgRead = function(id) {
	return $http.post(urlManage.userMsgRead, {
		id: id // 消息ID （全部已读传 0）
	})
}
// 删除消息(36)
const getUserMsgDel = function(id) {
	return $http.post(urlManage.userMsgDel, {
		id: id // 消息ID （全部删除传 0）
	})
}
// 聊天信息查看(91)
const getUserImList = function(tid, type) {
	return $http.post(urlManage.userImList, {
		tid: tid, // 聊天信息ID，当看历史记录时，传递最小记录ID，当查看最新时，传最大记录ID，首次进入不传，或传0，显示最新10条聊天信息
		type: type, // 类型 0，最新信息 1，历史信息
	})
}
// 发布聊天信息(92)
const getUserImAdd = function(msg) {
	return $http.post(urlManage.userImAdd, {
		msg: msg
	})
}

// 常用入住人
const getLodgerList = function() {
	return $http.post(urlManage.lodgerListUrl, {})
}
// 常用入住人添加
const addLodger = function(contacts, phone, cardType, idCard) {
	return $http.post(urlManage.addLodgerUrl, {
		contacts: contacts,
		phone: phone,
		cardType: cardType,
		idCard: idCard,
	})
}
// 删除入住人
const delLodger = function(id) {
	return $http.post(urlManage.delLodgerUrl, {
		id: id,
	})
}
// 编辑入住人
const editLodger = function(id, contacts, phone, cardType, idCard) {
	return $http.post(urlManage.editLodgerUrl, {
		id: id,
		contacts: contacts,
		phone: phone,
		cardType: cardType,
		idCard: idCard,
	})
}


// 下单
const booking = function(hid, couponId, nums, contacts, phone, checkIn, checkOut, arriveAt, reside) {
	return $http.post(urlManage.bookingUrl, {
		hid: hid,
		couponId: couponId,
		nums: nums,
		contacts: contacts,
		phone: phone,
		checkIn: checkIn,
		checkOut: checkOut,
		arriveAt: arriveAt,
		reside: reside,
	})
}
// 微信支付
const payWX = function(id) {
	return $http.post(urlManage.payWxUrl, {
		id: id,
	})
}

// 订单列表
const orderList = function(state, page, limit) {
	return $http.post(urlManage.orderListUrl, {
		state: state,
		page: page,
		limit: limit,
	})
}
// 订单详情
const orderDetail = function(id) {
	return $http.post(urlManage.orderDetailUrl, {
		id: id,
	})
}
// 订单删除
const delOrder = function(id) {
	return $http.post(urlManage.delOrderUrl, {
		id: id,
	})
}
// 订单取消
const cancelOrder = function(id) {
	return $http.post(urlManage.cancelOrderUrl, {
		id: id,
	})
}

// 收藏文章、酒店列表 刘慧
const getCollectionList = function(type, page, limit) {
	return $http.post(urlManage.getCollectionList, {
		type: type, //收藏类型 0、酒店; 1、文章
		page: page,
		limit: limit
	})
}


export {
	wxLogin,
	wxInfo,
	wxPhone,
	userDetail,
	getUserCommonIds,
	roamList,
	roamDetail,
	city,
	homeList,
	hotelList,
	hotelDetail,
	bsHotelList,
	activityHotelList,
	activityPrizeList,
	reportList,
	reportDetail,

	getUserMsgList,
	getUserNewMsg,
	getUserMsgRead,
	getUserMsgDel,

	getUserImList,
	getUserImAdd,

	getLodgerList,
	addLodger,
	delLodger,
	editLodger,

	booking,
	payWX,

	orderList,
	orderDetail,
	delOrder,
	cancelOrder,
	getCollectionList,
	getUserCollection,
}
