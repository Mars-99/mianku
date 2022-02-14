import {getUserNewMsg} from '@/utils/request/manage.js'
export default {
	data() {
		return {
			systemNum: 0, // 系统消息数
			friendNum: 0, // 好友申请数
		}
	},
	methods: {
		// 获取全部消息数
		async askUserNewMsg() {
			const {data: res} = await getUserNewMsg()
			console.log(res)
			if (res.code == 1) {
				return this.$api.msg('查询失败!'+res.msg)
			}
			let total = 0
			if (res.data && res.data.length) {
				res.data.forEach(item => {
					if (item.type == 0) {
						this.systemNum = item.num
					}
					if (item.type == 1) {
						this.friendNum = item.num
					}
					total += item.num
				})
			}
			if (total > 0) {
				uni.setTabBarBadge({
					index: 2,
					text: total + ""
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
		},
	}
}