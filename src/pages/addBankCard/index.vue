<template>
  <view class="page">
    <view class="inpBox">
      <view class="inpItem">
        <view class="inpLeft">
          <!-- <image src="" mode="" ></image>  -->
          <image src="@/static/images/bankCard/bank.png" mode />
          <text>开户行</text>
        </view>
        <view class="inp">
          <input type="text" v-model="param.bankName" placeholder="请输入开户银行"  />
        </view>
      </view>
      <!-- <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/bankCard/name.png" mode="" ></image> 
          <text>姓名</text>
        </view>
        <view class="inp">
          <input type="text" placeholder="请输入姓名" />
        </view>
      </view> -->
      <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/bankCard/cardId.png" mode="" ></image> 
          <text>银行卡类型 </text>
        </view>
        <view class="inp">
           <picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
                        <view class="uni-input">{{array[index].name}}</view>
             </picker>

        </view>
      </view>
      <view class="inpItem">
        <view class="inpLeft">
          <image src="@/static/images/bankCard/cardId.png" mode="" ></image> 
          <text>银行账号</text>
        </view>
        <view class="inp">
          <input type="text"  v-model="param.bankNumber"  placeholder="请输入银行账号" />
        </view>
      </view>
    </view>
    <button @click="insertUserBankList()">添加</button>
  </view>
</template>
<script>
import { insertUserBankList } from "@/api/index";
export default {
  data: () => ({
    param: {
      bankName: '',
      bankNumber: '',
      bankCardType:0
    },
     array: [{
       index:0,
       name:"借记卡"
     },
     {
       index:1,
       name:"储蓄卡"
     }
     ,
     {
       index:3,
       name:"信用卡"
     }
     ],
    index:0
  }),
  onLoad(){
   
  },
  methods: {
      insertUserBankList(){
		  if(this.param.bankName == ""){
			  uni.showToast({
			  	icon:"none",
				title:"请输入开户行"
			  })
			  return false
		  }
		  
		  if(this.param.bankNumber == ""){
			  uni.showToast({
			  	icon:"none",
				title:"请输入银行卡号"
			  })
			  return false
		  }
		  
		  
        insertUserBankList(this.param).then(res=>{
          uni.showToast({
            title: '添加成功',
            duration: 2000
          });
          uni.navigateBack({
             delta: 1
          });
        })
        
      },
       bindPickerChange: function(e) {
            this.index = e.target.value
            this.param.bankCardType =this.array[this.index].index
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
      padding: 20rpx 0;
      .inpLeft {
        display: flex;
        align-items: center;
        width: 180rpx;
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
        width: calc(100% - 220rpx);
        input {
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #333333;
          text-align: left;
        }
        .plg{
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
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