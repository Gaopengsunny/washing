<template>
  <view class="page">
    <view class="inpBox">
      <view class="inpItem">
        <view class="inpLeft">
          <!-- <image src="" mode="" ></image>  -->
          <image src="@/static/images/information/username.png" mode />
          <text>用户名</text>
        </view>
        <view class="inp">
          <input type="text" disabled v-model="userInfo.userName" />
        </view>
      </view>
      <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/information/tel.png" mode="" ></image> 
          <text>手机号码</text>
        </view>
        <view class="inp">
          <input type="text" disabled v-model="userInfo.phone" />
          <text v-if="userInfo.isModifyPhone != 1" @click="editPhone()">修改</text>
        </view>
      </view>
      <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/information/sex.png" mode="" ></image> 
          <text>性别</text>
        </view>
        <view class="inp">
          <text>{{userInfo.sex == 0?"女":"男"}}</text>
        </view>
      </view>
      <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/information/username.png" mode="" ></image> 
          <text>身份证号</text>
        </view>
        <view class="inp">
			<text>{{userInfo.userIdCard?userInfo.userIdCard:"------"}}</text>
        </view>
      </view>
    </view>
    <view class="tipsBox">
        <image src="@/static/images/information/tips.png" mode="" ></image> 
        <text>手机号码只能修改一次，请谨慎修改</text>
    </view>
  </view>
</template>
<script>
import {zbWebAccess,getByUserId} from "@/api/index"
export default {
  data: () => ({
   
    userInfo:{}
  }),
  onLoad(){
    this.getByUserId()
  },
  methods: {
      editPhone(){
          uni.navigateTo({
               url: `/pages/editPhone/index?phone=${this.userInfo.phone}`
          });
      },
     async  getByUserId(){
       let data = await getByUserId()
      this.userInfo = data
      }
  },
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  height: calc(100vh - 30rpx);
  padding-top: 30rpx;
  .inpBox {
    width: calc(95% - 40rpx);
    padding: 20rpx;
    background-color: #ffffff;
    margin: 0 auto;

    .inpItem {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10rpx 0;
      .inpLeft {
        display: flex;
        align-items: center;
        width: 160rpx;
        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
        text {
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
        }
      }
      .inp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 200rpx);
        input {
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #333333;
          text-align: left;
        }
        text {
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: right;
          color: #377be8;
        }
      }
    }
  }
  .tipsBox {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 20rpx;
    image {
      width: 36rpx;
      height: 36rpx;
      margin-right: 5rpx;
    }
    text {
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
    }
  }
}
</style>