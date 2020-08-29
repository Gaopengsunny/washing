<template>
  <view>
    <view class="v-header flex-between">
      <view class="flex-column-start">
        <view class="v-order-title">
          <text class="s-ordernum">单号：{{orderInfo.orderSn}}</text>
          <text href="#" class="a-detail" @click="onClickOrder">查看详情</text>
        </view>
        <view class="PriceBox">
          <view class="v-item2">
            <text class="s-time">{{orderInfo.appointmentDoorEndTime|timedifference}}</text>
            <text class="s-take-clothes">待取衣</text>
          </view>
          <view class="v-price">
            <text class="s-price">{{orderInfo.refundMoney/100}}</text>
            <text class="s-price-unit">元</text>
          </view>
        </view>
      </view>
    </view>
    <view class="v-body">
      <view class="v-row1">
        <text class="s-distant">{{orderInfo.distance|changeDistance}}km</text>
        <text class="s-user-info">{{orderInfo.consigneeName}} {{orderInfo.consigneePhone|changePhone}}</text>
        <image
          src="@/static/images/tabbar/order-phone.png"
          class="img-phone"
          @click="callPhone()"
        ></image>
      </view>
      <view class="v-row2">
        <text class="s-user-take-clothes">取衣</text>
        <text
          class="s-address"
        >{{orderInfo.provinceName}} {{orderInfo.cityName}}{{orderInfo.districtName}}{{orderInfo.streetName}}{{orderInfo.consigneeAddress}} </text>
        <image
		
          src="@/static/images/tabbar/coordinate.png"
          class="img-address"
          @click="openMap()"
        ></image>
      </view>
    </view>
    <view class="v-footer">
      <button type="primary" plain class="btn-faile" @click="onFail">取衣失败</button>
      <button type="primary" plain class="btn-sucess" @click="onSucess">完成取衣</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'untaken-clothes',
  props: {
    orderInfo: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data: () => ({}),
  watch: {},
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
    timedifference(time) {
      let old_date = new Date().valueOf()
      let new_date =parseInt(time)*1000
	  
      console.log(new_date)
      console.log(old_date)
    if(old_date>new_date){
       return '已超时'
    }

      let difftime = (new_date - old_date) / 1000
      let days = parseInt(difftime / 86400)
      let hours = parseInt(difftime / 3600) - 24 * days
      let minutes = parseInt((difftime % 3600) / 60)
      let seconds = parseInt(difftime % 60)
      // return +days + '天 ' + hours + '小时 ' + minutes + '分钟 ' + seconds + '秒'
      if(days>0){
        return days+'天 '
      }else if(hours>0){
        return hours+'小时 '
      }else if(minutes>0){
        return minutes+'分钟 '
      }
     
    },
  },
  methods: {
    onClickOrder() {
      this.$emit('onClickOrder', this.orderInfo)
    },
    onSucess(){
      let param ={
        "orderId":this.orderInfo.orderId,
        "type":1,
        "index":this.index
      }
        this.$emit('onSucess', param)
     
    },
    openMap(){
       let param ={
        latitude: parseFloat(this.orderInfo.latitude),
        longitude:  parseFloat(this.orderInfo.longitude)
      }
      this.$emit('openMap', param)
    },
    callPhone(){
       uni.makePhoneCall({
            phoneNumber: this.orderInfo.consigneePhone //仅为示例
        });  
    },
    onFail(){
       let param ={
        "orderId":this.orderInfo.orderId,
        "type":1,
        "index":this.index
      }
      this.$emit('onFail', param)
    }
     
  },
}
</script>

<style lang="scss" scoped>
.v-header {
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  background: #ffffff;
  padding-top: 20rpx;
}
.v-item2 {
  margin-top: 6rpx;
}
.flex-column-start {
  width: 100%;
}

.v-order-title {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
}

.s-ordernum {
  font-size: 22rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  margin-left: 24rpx;
}

.a-detail {
  width: 88rpx;
  height: 30rpx;
  font-size: 22rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #377be8;
  margin-left: 14rpx;
}
.PriceBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 15rpx;
}

.s-time {
  width: 183rpx;
  height: 40rpx;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #f0880e;
  margin-left: 24rpx;
  margin-right: 14rpx;
}

.v-price {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 24rpx;
  margin-top: 6rpx;
}

.s-price {
  width: 96rpx;
  height: 50rpx;
  font-size: 36rpx;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  color: #f0880e;
  text-align: right;
  line-height: 33rpx;
}
.s-price-unit {
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: right;
  color: #f0880e;
  margin-left: 7rpx;
  line-height: 24rpx;
  padding-bottom: 20rpx;
}

.v-body {
  height: 195rpx;
  background: #fcfcfc;
}

.v-row1,
.v-row2 {
  display: flex;
  justify-content: flex-start;
}

.s-distant {
  min-width: 91rpx;
  height: 37rpx;
  font-size: 26rpx;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: left;
  color: #333333;
  margin-top: 35rpx;
  margin-left: 24rpx;
  margin-right: 29rpx;
}

.s-user-info {
  height: 44rpx;
  font-size: 34rpx;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: left;
  color: #333333;
  min-width: 450rpx;
  margin-top: 30rpx;
  flex: 1;
}

.img-phone {
  width: 44rpx;
  height: 44rpx;
  margin-top: 30rpx;
  margin-right: 24rpx;
  margin-left: 40rpx;
}

.s-user-take-clothes {
  min-width: 91rpx;
  height: 30rpx;
  font-size: 22rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  display: inline-block;
  margin-left: 27rpx;
  margin-top: -10rpx;
  margin-right: 29rpx;
}

.s-address {
  display: inline-block;
  flex: 1;
  height: 61rpx;
  font-size: 22rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-top: 15rpx;
}

.img-address {
  width: 44rpx;
  height: 44rpx;
  margin-top: 10rpx;
  margin-right: 24rpx;
  margin-left: 40rpx;
}
.v-footer {
  display: flex;
}

.v-footer button {
  width: 351rpx;
  height: 90rpx;
  line-height: 90rpx;
  background: rgba(55, 123, 232, 0.1);
  border: none;
  border-radius: 0px 0px 0px 20rpx;
  font-size: 30rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  color: #377be8;
}

.v-footer button:last-child {
  width: 351rpx;
  height: 90rpx;
  background: #377be8;
  border: none;
  border-radius: 0px 0px 20rpx 0px;

  font-size: 30rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
}
</style>
