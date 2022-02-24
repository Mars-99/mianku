<template>
  <view class="imglistbx">
    <view :class="['imglist-item',columnNum == 3?'column3':'column4']" v-for="(item,index) in showList" :key='index'>
      <image :src="item" class="item-img" @click="previewImage(index)" mode="aspectFill"></image>
			<uni-icons class="cancel-btn" type="closeempty" size="18" color="#d9d9d9" @click="deleteImg(index)" v-if="deleteBtn"></uni-icons>
    </view>
    <!-- 上传控件 -->
    <view :class="['imglist-item',columnNum == 3?'column3':'column4']" @click="uploadImg" v-if="showUploadControl">
      <view class="item-img uploadControl">+</view>
    </view>
  </view>
</template>

<script>
	import {getUpload} from '@/utils/request/manage.js'
	
	import {mapState} from 'vuex'
  export default {
		name: 'upload-img',
    props: {
      //是否显示上传控件
      control: {
        type: Boolean,
        default: true
      },
      //是否显示上删除按钮
      deleteBtn: {
        type: Boolean,
        default: true
      },
      //行数量 
      columnNum: {
        type: [Number, String],
        default: 3
      },
      //album 从相册选图，camera 使用相机
      sourceType: {
        type: Array,
        default: function() {
          return ['camera', 'album']
        }
      },
      //最大上传数量
      maxCount: {
        type: [Number, String],
        default: 9
      },
      //服务返回回调的图片数组--回填
      mode: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data() {
      return {
        imgList: [], // 临时路径集合
        showList: [], // 展示用路径集合
        showUploadControl: true
      }
    },
    watch: {
      mode(v) {
        this.init(v)
      },
      control(v) {
        this.showUploadControl = v
      },
    },
		computed: {
			...mapState(['getUserinfo','getNeedAuth','getIsLogin'])
		},
    created() {
      this.init(this.mode)
    },
    methods: {
      init(v) {
        if (this.mode.length != 0) {
          this.showList = v;
          return
        };
        this.showList = this.imgList;
      },
      // 上传图片
      uploadImg() {
				let loginAuth = uni.getStorageSync('loginAuth')
				if (!loginAuth) {
					this.$api.msg('请先登录')
					this.$api.href('../login/login')
					return
				}
        uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择或拍摄
          count: this.maxCount,
          success: async (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '正在上传中...',
							mask:true
						});
						for (let temp of tempFilePaths) {
							const res1 = await getUpload(temp)
							let res = JSON.parse(res1.data)
							
							console.log('res: ', res);
							if (res.code == 1) {
								uni.hideLoading()
								return this.$api.msg('上传失败' + res.msg)
							}
							if (res.code == -1) {
								uni.hideLoading()
								return this.$api.msg('请先登录')
							}
							// this.imgList.push(temp)
							this.imgList.push(res.data.url)
							this.isMaxNum();
						}
						uni.hideLoading()
            this.$emit("chooseFile", this.imgList, tempFilePaths[0])
          }
        });
      },
      //删除图片
      deleteImg(eq) {
        let getUrl = this.handleImg();
        uni.showModal({
          title: '提示',
          content: '您确定删除吗？',
          success: (res)=> {
            if (res.confirm) {
             getUrl.splice(eq, 1);
             this.$emit("imgDelete", getUrl, eq);
             this.isMaxNum();
            }
          }
        });
      },
      // 预览图片
      previewImage(eq) {
        let getUrl = this.handleImg();
        uni.previewImage({
          current: getUrl[eq],
          urls: getUrl
        })
      },
      //返回需要操作的图片数组
      //如果是回调了则操作回填后的数组 否则操作临时路径的图片数组
      handleImg() {
        return this.mode.length > 0 ? this.showList : this.imgList
      },
      //判断图片数量是否已经到最大数量
      isMaxNum() {
        if (this.imgList.length >= this.maxCount) {
          this.showUploadControl = false
        } else {
          this.showUploadControl = true
        }
      }
    }
  }
</script>

<style scoped>
  /* 上传  str */
  .imglistbx {
    width: 100%;
    height: 100%;
		/* padding: 0 20rpx; */
		display: flex;
		flex-wrap: wrap;
  }

	.imglistbx:after {
		content: "";
		height: 0;
		width: 160rpx;
	}
  .imglist-item {
    position: relative;
    overflow: hidden;
    border-radius: 8rpx;
    margin-bottom: 10rpx;
  }

  .column3 {
    width: 160rpx;
    height: 160rpx;
  }

  .column4 {
    width: 25%;
    height: 160rpx;
  }

  .item-img {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }

  .cancel-btn {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
		width: 44rpx;
		height: 44rpx;
		/* background: url(~@/static/icons/sc-uploadimg.png) no-repeat; */
		background-size: cover;
  }

  /* 上传控件 */
  .uploadControl {
    font-size: 50rpx;
    color: #888;
    background-color: #F6F7FB;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
