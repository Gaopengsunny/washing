<template>
  <view>
    <view style="height:60rpx"></view>
    <view class="login-bg">
      <text style="margin-top:150rpx;">为了给您提供更好的服务</text>
      <text>我们需要您的授权</text>
      <button
        class="uni-flex info-btn"
        lang="zh_CN"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >授 权</button>
    </view>
  </view>
</template>

<script>
import { zbWxmini } from '@/api/index'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data: () => ({
    infoShow: true,
    param: {},
  }),
  onLoad(option) {
    console.log('123123')
    console.log(option)
    this.param = option
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getPhoneNumber(e) {
      console.log(e.detail)
      this.param.encryptedData = e.detail.encryptedData
      this.param.ivStr = e.detail.iv
      zbWxmini(this.param).then(res => {
        uni.setStorageSync('token', res.token)
        uni.setStorageSync('userInfo', res.user)
        this.setUserInfo(res.user)
        uni.switchTab({
          url: '/pages/mine/index',
        })
      })
    },
  },
}
</script>

<style lang="scss">
.login-bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 480rpx;
  border-radius: 20upx;
  text {
    line-height: 2;
  }
}
.info-btn {
  margin-top: 80rpx;
  font-size: 30rpx;
  width: 334rpx;
  height: 74rpx;
  justify-content: center;
  background: linear-gradient(135deg, rgba(239, 215, 162, 1) 0%, rgba(205, 175, 107, 1) 100%);
  border-radius: 38rpx;
  color: #fff;
}
</style>
