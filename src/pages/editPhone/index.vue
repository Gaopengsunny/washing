<template>
  <view class="page">
    <view class="inpBox">
      <view class="inpItem">
        <view class="inpLeft">
          <text>现有绑定手机号</text>
          <input type="text" disabled v-model="param.phone" />
        </view>
      </view>
      <view class="inpItem">
        <input type="text" v-model="param.updataPhone" placeholder="输入新绑定的手机号" />
      </view>
      <view class="inpItem">
        <input type="text" placeholder="输入验证码" v-model="param.code" />
        <text class="sendCode" @click="identityCode()">获取验证码</text>
      </view>
    </view>
    <button @click="checkCode()">确认修改</button>
  </view>
</template>
<script>
import { identityCode, checkCode } from '@/api/index'
export default {
  data: () => ({
    param: {
      phone:""
    },
  }),
  onLoad(option) {
    this.param.phone = option.phone
  },
  methods: {
    identityCode() {
      identityCode(this.param).then(res => {
        uni.showToast({
          title: '发送成功',
          duration: 2000,
        })
      })
    },
    checkCode() {
      checkCode(this.param).then(res => {
        uni.showToast({
          title: '修改成功',
          duration: 2000,
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1,
          })
        }, 500)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  height: calc(100vh - 30rpx);
  padding-top: 30rpx;
  position: relative;
  .inpBox {
    width: calc(95% - 40rpx);
    padding: 20rpx;
    background-color: #ffffff;
    margin: 0 auto;

    .inpItem {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15rpx 0;
      input {
        font-size: 28rpx;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        text-align: left;
      }
      .sendCode {
        font-size: 28rpx;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: right;
        color: #377be8;
      }
      .inpLeft {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        text {
          font-size: 28rpx;
          font-weight: 400;
          text-align: left;
          color: #999999;
        }
        input {
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #333333;
          text-align: right;
        }
      }
    }
  }
  button {
    position: absolute;
    bottom: 60rpx;
    left: 2.5%;
    width: 95%;
    height: 88rpx;
    background: #377be8;
    border-radius: 20rpx;
    color: #ffffff;
    line-height: 88rpx;
    font-size: 30rpx;
  }
}
</style>