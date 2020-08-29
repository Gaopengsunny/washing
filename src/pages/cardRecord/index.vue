<template>
  <view class="page">
    <view class="recordBox"  v-for="(item,index) in cardRecordList" :key="index">
      <view class="recordPrice">{{item.amount}}</view>
      <view class="recordContent">
        <view class="recordHead">
          <text class="faceValue">
            {{item.amount}} {{item.typeName}}
          </text>
          <text class="number">￥{{item.saleAmount}} ×1</text>
        </view>
        <view class="recordTime">
          <image src="@/static/images/card/card-time.png" ></image>
          <text>{{item.createdAt}}</text>
        </view>
        <view class="recordFoot">
          <text class="commission">佣金</text>
          <text class="price">￥{{item.refundMoney}}</text>
        </view>
      </view>
    </view>
	<view class="title" v-if="cardRecordList.length ==0">
		暂无记录
	</view>
  </view>
</template>
<script>
import { getCardRecordlist } from "@/api/index"

export default {
    data() {
        return {
            pages: 1,
            hasUser: false,
            cardRecordList: [],
            pageNum: 1
        }
    },
    onLoad() {
    this.getCardRecordlist()  
    },

    methods: {
        getCardRecordlist() {
            if (this.pageNum > this.pages) {
                this.loadingText = '暂无更多'
                return false
            }
            getCardRecordlist({ pageNumber: this.pageNum }).then(res => {

                this.cardRecordList.push(...res.records)
                this.pages = res.pages
                this.pageNum++
                if (res.pages == res.current) {
                    this.loadingText = '暂无更多'
                } else {
                    this.loadingText = '加载更多'
                }

            })
        },

        fnChoseUser() {
            const url = '/subPages/apply/search/index';
            uni.navigateTo({
                url
            });
        },
        fnToCreatOrder(item) {
            if (this.hasUser) {
                const url = `/subPages/apply/settlement/index`
                uni.navigateTo({
                    url,
                })
            } else {
                console.log("请选择用户");
            }
        }
    }
}
  

</script>
<style lang="scss" scoped>
.page {
    background-color: #F3F3F3;
	.title{
		width: 100%;
		text-align: center;
		color: #666666;
		font-size: 26rpx;
		background-color:#FFFFFF ;
		margin-top: 30rpx;
	}
  .recordBox {
      width: calc(96% - 40rpx);
      display: flex;
      background-color: #ffffff;
      padding: 20rpx;
      margin: 0 auto;
      border-radius: 15rpx;
      margin-bottom: 20rpx;
    .recordPrice {
      width: 140rpx;
      height: 140rpx;
      background: #377be8;
      color: #ffffff;
      font-size: 34rpx;
      text-align: center;
      line-height: 140rpx;

    }
    .recordContent {
      width: calc(100% - 160rpx);
      margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
      
      .recordHead {
          display: flex;
          justify-content: space-between;
        .faceValue {
          font-size: 26rpx;
          font-weight: 700;
          color: #333333;
        }
        .number {
          font-size: 24rpx;
          font-weight: 400;
          color: #333333;
        }
      
      }

      .recordTime {
          display: flex;
          align-items: center;
        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 15rpx;
        }
        text {
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
        }
      }
      .recordFoot {
        .commission {
          font-size: 24rpx;
          font-weight: 400;
          color: #666666;
        }
        .price {
          font-size: 28rpx;
          font-weight: 500;
          color: #333333;
        }
      }
    }
  }
}
</style>