<template>
  <view class="v-contant">
    <view class="v-header">
      <view class="v-col1">单号：{{ clothes.orderSn }}</view>
      <view class="v-col2" @click="onClickOrder">详情</view>
      <text class="v-col3">
        {{ clothes.refundMoney/100 }}
      </text>
      <text class="v-col4">元</text>
    </view>
    <view class="v-body">
      <view class="v-row1 v-row">
       <image src="../../../static/images/acquirers/acq-add-name.png" class="v-col1"></image>
        <view class="v-col2">收件人</view>
        <view class="v-col3">{{ clothes.consigneeName }} {{ clothes.consigneePhone|changePhone }}</view>
      </view>
      <view class="v-row2 v-row">
       <image src="../../../static/images/tabbar/pickup-count.png" class="v-col1"></image>
        <view class="v-col2">物品件数</view>
        <view class="v-col3">{{ clothes.sumNumaber }}件</view>
      </view>
      <view class="v-row3 v-row">
      <image src="../../../static/images/acquirers/acq-add-city.png" class="v-col1"></image>
        <view class="v-col2">收货地址</view>
        <view class="v-col3">
		{{clothes.provinceName}} {{clothes.cityName}}{{clothes.districtName}}{{clothes.streetName}}{{clothes.consigneeAddress}} 
		</view>
      </view>
      <view class="v-row4 v-row">
        <image src="../../../static/images/card/card-time.png" class="v-col1"></image>
        <view class="v-col2">取货时间</view>
        <view class="v-col3" v-if="clothes.appointmentDoorTime">{{clothes.appointmentDoorTime}}</view>
		<view class="v-col3" v-else >---</view>
	  </view>
    </view>
    <view class="v-footer">
      <view type="primary" plain class="v-col1">
        已送达
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "send-card",
  props: {
    clothes: {},
  },
  data: () => ({
    status: 2,
  }),
  filters:{
	  
	  changePhone(phnoe){
	  	return phnoe.substring(0,3)+"****"+phnoe.substring(7,11)
	  },
  },
  methods: {
    onClickOrder() {
      this.$emit("onClickOrder", this.clothes);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-contant {
  margin-bottom: 24rpx;
}

.v-header {
  height: 108rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0px 0px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid rgba(229, 229, 229, 1);

  .v-col1 {
    height: 42rpx;
    font-size: 30rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #999999;

    margin-left: 24rpx;
    margin-top: 36rpx;
    margin-right: 21rpx;
  }
  .v-col2 {
    height: 37rpx;
    font-size: 26rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #377be8;
    margin-top: 39rpx;
  }
  .v-col3 {
    width: 96rpx;
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: right;
    color: rgba(51, 51, 51, 1);

    margin-top: 30rpx;
  }
  .v-col4 {
    width: 24rpx;
    height: 33rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: right;
    color: rgba(51, 51, 51, 1);

    margin-top: 41rpx;
    margin-right: 24rpx;
  }
}

.v-body {
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 292rpx;

  .v-row {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 33rpx;
  }

  .v-row1 {
    margin-top: 19rpx;
  }

  .v-row2 {
    margin-top: 22rpx;
  }

  .v-row3 {
    margin-top: 29rpx;
  }

  .v-row4 {
    margin-top: 29rpx;
  }

  .v-col1 {
    margin-left: 24rpx;
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
  }

  .v-col2 {
    width: 96rpx;
    height: 33rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;

    margin-right: 32rpx;
  }
  .v-col3 {
    height: 33rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
    flex: 1;
    margin-right: 70rpx;
  }
}

.v-footer {
  width: 702rpx;
  height: 90rpx;
  background: #ffffff;
  border-top: 1px solid rgba(229, 229, 229, 1);
  border-radius: 0px 0px 20rpx 20rpx;

  display: flex;
  justify-content: center;
  align-items: center;

  .v-col1 {
    background: #ffffff;
    border-radius: 0px 0px 20px 20px;
    border: none;
    flex: 1;

    font-size: 30rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 90rpx;
    color: #999999;
  }
}
</style>
