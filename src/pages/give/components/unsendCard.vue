<template>
  <view class="v-contant">
    <view class="v-header">
      <!--  -->
	  <view class="left">
	  	<view class="v-col1">单号：{{ clothes.orderSn }}</view>
	  	<view class="v-col2" @click="onClickOrder">详情</view>
	  </view>
      <text class="v-col3">
        {{ clothes.refundMoney/100 }}元
      </text>
    </view>
    <view class="v-body">
      <view class="v-row1">
        <view class="v-col1">{{clothes.distance|changeDistance}}km</view>
        <view class="v-col2">{{ clothes.consigneeName }} {{ clothes.consigneePhone|changePhone }}</view>
        <image src="@/static/images/tabbar/order-phone.png" class="v-col3" @click="callPhone()"></image>
      </view>
      <view class="v-row2">
        <view  style="width: 120rpx;">送衣</view>
        <view class="v-col2">		{{clothes.provinceName}} {{clothes.cityName}}{{clothes.districtName}}{{clothes.streetName}}{{clothes.consigneeAddress}} 

        </view>
        <image src="@/static/images/tabbar/coordinate.png" @click="openMap()" class="v-col3"></image>
      </view>
    </view>
    <view class="v-footer">
      <button
        type="primary"
        plain
        class="v-col1"
        @click="onFail"
        v-if="clothes.status === 8"
      >
        送衣失败
      </button>
      <button
        type="primary"
        plain
        class="v-col2"
        @click="onSucess"
        v-if="clothes.status === 8"
      >
        我已送达
      </button>
      <button
        type="primary"
        plain
        class="v-col3"
        @click="onSend"
        v-if="clothes.status === 4"
      >
        开始送衣
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: "unsend-card",
  props: {
    clothes: {},
	index:0
  },
  data: () => ({
    status: 2,
	
  }),
   filters: {
    changeDistance(distance) {
      if (isNaN(distance)) {
        return 0
      } else {
        return (distance / 1000).toFixed(2)
      }
    },
	
	changePhone(phnoe){
		return phnoe.substring(0,3)+"****"+phnoe.substring(7,11)
	},
	
    },
  methods: {
    onClickOrder() {
      this.$emit("onClickOrder", this.clothes);
    },
	onFail(){
	   let param ={
	    "orderId":this.clothes.orderId,
	    "type":2,
	    "index":this.index
	  }
	  this.$emit('onFail', param)
	},
	openMap(){
	   let param ={
	    latitude: parseFloat(this.clothes.latitude),
	    longitude:  parseFloat(this.clothes.longitude)
	  }
	  this.$emit('openMap', param)
	},
	callPhone(){
	   uni.makePhoneCall({
	        phoneNumber: this.clothes.consigneePhone //仅为示例
	    });  
	},
	onSend(){
		let param ={
		  "orderId":this.clothes.orderId,
		   "consigneePhone":this.clothes.consigneePhone,
		  "type":3,
		  "index":this.index
		}
		this.$emit('onSend', param)
	},
	onSucess(){
		let param ={
			...this.clothes,
			"index":this.index
		}
		
		this.$emit('onSucess', param)
	}
  },
};
</script>

<style lang="scss" scoped>
.v-contant {
  margin-bottom: 24rpx;
}

.v-header {
  width: 654rpx;
  height: 108rpx;
  padding: 0 24rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
.left{
	display: flex;
	align-items: center;
	.v-col1 {
	  height: 42rpx;
	  font-size: 30rpx;
	  font-family: PingFang SC, PingFang SC-Medium;
	  font-weight: 500;
	  text-align: left;
	  color: #999999;
	  margin-right: 21rpx;
	}
	.v-col2 {
	  height: 37rpx;
	  font-size: 26rpx;
	  font-family: PingFang SC, PingFang SC-Medium;
	  font-weight: 500;
	  text-align: left;
	  color: #377be8;
	  // margin-right: 96rpx;
	}
}
  
  .v-col3 {
    height: 50rpx;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: right;
    color: #f0880e;
  }
  .v-col4 {
    width: 24rpx;
    height: 33rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: right;
    color: #f0880e;

    margin-top: 41rpx;
    margin-right: 24rpx;
  }
}

.v-body {
  width: 702rpx;
  height: 195rpx;
  background: #fcfcfc;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .v-row1 {
	width: calc(100% - 30rpx);
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: flex-start;
    .v-col1 {
		
	width: 120rpx;
      font-size: 26rpx;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: left;
      color: #333333;
      margin-top: 44rpx;
    }
    .v-col2 {
      width: 450rpx;
      height: 44rpx;
      font-size: 34rpx;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: left;
      color: #333333;

      margin-top: 40rpx;
      margin-right: 40rpx;
    }
    .v-col3 {
      width: 44rpx;
      height: 44rpx;
      margin-top: 40rpx;
      margin-right: 24rpx;
      flex: 1;
      align-self: end;
    }
  }

  .v-row2 {
    width: calc(100% - 30rpx);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    .v-col1 {
      width: 44rpx;
      height: 30rpx;
      font-size: 22rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #999999;

      margin-left: 47rpx;
      margin-right: 53rpx;
    }
    .v-col2 {
      width: 450rpx;
      height: 61rpx;
      font-size: 22rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;

      margin-top: 15rpx;
      margin-right: 40rpx;
    }
    .v-col3 {
      width: 44rpx;
      height: 44rpx;
      margin-top: 16rpx;
      margin-right: 24rpx;
    }
  }
}
.v-footer {
  width: 702rpx;
  height: 90rpx;
  background: #ffffff;
  border-radius: 0px 0px 20rpx 20rpx;

  display: flex;
  justify-content: center;
  align-items: center;

  .v-col1 {
    // width: 351px;
    height: 90rpx;
    background: rgba(55, 123, 232, 0.1);
    border-radius: 0px 0px 0px 20rpx;
    border: none;
    flex: 1;

    font-size: 30rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 90rpx;
    color: #377be8;
  }
  .v-col2 {
    // width: 351px;
    height: 90rpx;
    background: #377be8;
    border-radius: 0px 0px 20rpx 0rpx;
    border: none;
    flex: 1;

    font-size: 30rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 90rpx;
    color: #ffffff;
  }
  .v-col3 {
    width: 702rpx;
    height: 90rpx;
    background: #2fc094;
    border-radius: 0px 0px 20rpx 20rpx;
    border: none;
    flex: 1;

    font-size: 30rx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 90rpx;
    color: #ffffff;
  }
}
</style>
