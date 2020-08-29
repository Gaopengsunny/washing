<template>
  <view class="page">
    <view v-for="(order, aa) in orderlist" :key="aa" class="v-container">
      <view class="v-header">
        <view class="v-list">
            <view class="v-item" v-for="(clothe, index) in order.list" :key="index">
              <view class="v-col1">
                <image class="v-row1" :src="clothe.imgurl"></image>
              </view>

              <view class="v-col2">
                <view class="v-row1">
                  <view class="submittedHead">
                      <view class="v-col1">
                    {{ clothe.title }}
                  </view>
                  <view class="v-col2">{{ clothe.type }}}</view>
                  </view>
                 <text>查看详情</text>
                </view>

                <view class="v-row2">
                  <view class="v-col1">{{ clothe.price }}</view>
                  <view class="v-col2">×{{ clothe.count }}</view>
                </view>

                <view class="v-row3">
                  <view class="v-col1">佣金</view>
                  <view class="v-col2">￥</view>
                  <view class="v-col3">{{ clothe.commission }}</view>
                  <view class="submitted">已提交门店</view>
                </view>
              </view>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "submit-store",
  props: {
    orderlist: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    baseFoldCount: 2,
  }),
  methods: {
    onFold(order) {
      // uni.$emit("onFold", { folder: order });
      order.list[2].isshow = true;
      order.list[3].isshow = true;
      order.list[4].isshow = true;
    },
    onChecked(order) {
      order.ischecked = !order.ischecked;
      uni.$emit("onOneCheckedChange", { data: order });
    },
  },
  mounted() {
    this.orderlist = this.orderlist;
  },
};
</script>

<style lang="scss" scoped>
.v-container {
  width: 700rpx;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 20rpx;
  margin-bottom: 24rpx;

  .v-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 702rpx;
    min-height: 180rpx;
    background: #ffffff;
    border-top: 1px solid #ffffff;
    border-radius: 20px 20px 20rpx 20rpx;

    .v-check {
      width: 78rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .v-row1 {
        width: 30rpx;
        height: 30rpx;
      }
      .v-row2 {
        width: 30rpx;
        height: 30rpx;
        border: 2rpx solid #999999;
        border-radius: 50%;
      }
    }

    .v-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      align-items: flex-start;

      .v-item {
        display: flex;
        justify-self: flex-start;
        align-items: flex-start;
        min-height: 140rpx;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        width: 100%;

        .v-col1 {
          display: flex;
          align-items: center;
          .v-row1 {
            width: 140rpx;
            height: 140rpx;
          }
          margin-right: 16rpx;
        }

        .v-col2 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 140rpx;
          .v-row1 {
            display: flex;
            justify-content: space-between;
             text{
                    color: #377BE8;
                    margin-left: 25rpx;
                }
            .submittedHead{
                display: flex;
               
            .v-col1 {
              height: 37rpx;
              font-size: 26rpx;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: 700;
              text-align: left;
              color: #333333;
              line-height: 40rpx;

              margin-right: 16rpx;
            }
            .v-col2 {
              height: 28rpx;
              font-size: 20rpx;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              text-align: left;
              color: #999999;
              line-height: 45rpx;
            }
            }
            
          }
          .v-row2 {
            display: flex;
            justify-content: flex-start;
            .v-col1 {
              height: 33rpx;
              font-size: 24rpx;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 33rpx;

              margin-right: 16rpx;
            }
            .v-col2 {
              height: 28rpx;
              font-size: 20rpx;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 28rpx;

              margin-right: 16rpx;
            }
            .v-col3 {
              height: 30rpx;
              background: #ef7373;
              border-radius: 4rpx;

              font-size: 20rpx;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #ffffff;
              line-height: 30rpx;
            }
            .v-col4 {
              height: 30rpx;
              background: rgba(47, 192, 148, 1);
              border-radius: 4rpx;

              font-size: 20rpx;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #ffffff;
              line-height: 30rpx;
            }
          }
          .v-row3 {
            display: flex;
            justify-content: flex-start;
            .v-col1 {
              height: 33rpx;
              font-size: 24rpx;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #666666;
              line-height: 23rpx;

              margin-right: 4rpx;
            }
            .v-col2 {
              height: 23rpx;
              font-size: 24rpx;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: Medium;
              text-align: right;
              color: #333333;
              line-height: 23rpx;
              margin-right: 0rpx;
            }

            .v-col3 {
              height: 23rpx;
              font-size: 32rpx;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: bold;
              text-align: right;
              color: #333333;
              line-height: 23rpx;
            }
            .submitted{
                background-color: #FF951A;
                font-size: 16rpx;
                color: #ffffff;
                height: 30rpx;
                line-height: 30rpx;
                padding:0 10rpx ;
                border-radius: 5rpx;
                margin-left: 10rpx;
            }
          }
        }
      }
    }
  }

  .v-footer {
    width: 702rpx;
    height: 50rpx;
    background: #ffffff;
    border-radius: 0px 0px 20rpx 20rpx;
    border-top: 1px solid rgba(229, 229, 229, 1);

    display: flex;
    justify-content: flex-end;
    justify-items: flex-end;

    .v-col1 {
      width: 26rpx;
      height: 26rpx;
      margin-top: 13rpx;
      margin-left: 338rpx;
    }
    .v-col2 {
      height: 33rpx;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #999999;
      margin-top: 10rpx;
      margin-left: 206rpx;
    }
    .v-col3 {
      height: 33rpx;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: rgba(55, 123, 232, 1);
      margin-top: 10rpx;
      margin-right: 20rpx;
    }
  }
}
</style>
