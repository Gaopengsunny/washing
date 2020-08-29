<template>
  <view class="page">
	  <scroll-view class="Box" scroll-y="true"  @scrolltolower="selectByUserIdList">
	  <view class="withdrawalBox" v-for="(item,index) in cardList" :key="index">
	    <view class="header">
	      <view class="headerLeft">
	        <image src="@/static/images/card/card-time.png" mode />
	        <text>{{item.cashOutTime|changeDistance}}</text>
	      </view>
	      <text>{{item.status|changeStatus}}</text>
	    </view>
	  
	    <view class="main">
	      <text class="title">提现金额：</text>
	      <text class="price">¥{{item.cashOutAmount/100}}</text>
	    </view>
	    <view class="foot">到账银行卡：{{item.cashOutBankName}} 储蓄卡（{{item.cashOutBankNumber|changeBnak}}）</view>
	  </view>
	  </scroll-view>
  </view>
</template>

<script>
	import {selectByUserIdList} from "@/api/index"
export default {
	data(){
		return{
			pageNum:1,
			pages:1,
			cardList:[]
		}
	},
	filters:{
		changeStatus(status){
			     switch (status) {
			      case 0: {
			        return "未支付";
			      }
			      case 1: {
			        return "已支付";
			      }
			       case 2: {
			        return "已驳回";
			      }
			  }
			
		},
		 changeDistance(distance) {
		  console.log(distance)
		       let  time = parseInt(distance)
		       time = new Date(time);
		       let y = time.getFullYear();
		       let m = time.getMonth()+1;
		       let d = time.getDate();
		       let h = time.getHours();
		       let mm = time.getMinutes();
		       let s = time.getSeconds();
		       return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
		},
		changeBnak(str){
			let start = str.length-4
			let end = str.length
			return str.slice(start,end)
		}
	},
	onLoad() {
		this.selectByUserIdList()
	},
	methods:{
		selectByUserIdList(){
				if (this.pageNum > this.pages) {
				  this.loadingText = '暂无更多'
				  return false
				}
				selectByUserIdList({ pageNumber: this.pageNum }).then(res => {
				  this.cardList.push(...res.records)
				  this.pages = res.pages
				  this.pageNum++
				  if (res.pages == res.current) {
				    this.loadingText = '暂无更多'
				  } else {
				    this.loadingText = '加载更多'
				  }
				})
		}
	}
	
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  height: calc(100vh - 30rpx);
  padding-top: 30rpx;
  .Box{
	  height: 100vh;
  }
  .withdrawalBox {
    width: calc(95% - 40rpx);
    padding: 20rpx;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 10rpx;
    .header {
      display: flex;
      justify-content: space-between;
      .headerLeft {
        display: flex;
        image {
          width: 37rpx;
          height: 37rpx;
          margin-right: 10rpx;
        }
        text {
          font-size: 26rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
        }
      }
      text {
        font-size: 26rpx;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: right;
        color: #377be8;
      }
    }
    .main {
      width: 100%;
      border-bottom: 1rpx solid #e5e5e5;
      padding: 20rpx 5rpx;
      .title {
        font-size: 26rpx;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
      }

      .price {
        font-size: 35rpx;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 600;
        text-align: left;
        color: #333333;
      }
    }
    .foot{

font-size: 24rpx;
font-family: PingFang SC, PingFang SC-Regular;
font-weight: 400;
text-align: left;
color: #999999;
padding: 5rpx;
padding-top: 20rpx;
    }
  }
}
</style>