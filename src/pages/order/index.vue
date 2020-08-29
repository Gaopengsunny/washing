<template>
  <view class="view-body">
    <order-card :orderDetail="orderDetail" @onSucess="onSucess" @openMap="openMap"
	 @onFail="onFail" @sealed="sealed" @sendCode="sendCode"  @giveEnd="giveEnd"
	 @submitStore="submitStore" @onSend="onSend"></order-card>
  <uni-popup ref="dialogInput" type="dialog" @change="change" class="dialogInput">
   <view class="box">
   	<text class="title">
   		 {{failParam.status == 8?"送衣":"取衣"}}取衣失败
   	</text>
   	<text class="tips">请输入 {{failParam.status == 8?"送衣":"取衣"}}失败原因</text>
   		<textarea value="" v-model="failParam.notes" />
   	<view class="btnBox">
   		<button @click="close()">取消</button>
   		<button class="commit" @click="dialogInputConfirm()">确定</button>
   	</view>
   </view>
    </uni-popup>
	<uni-popup ref="dialogSuccess" type="dialog" class="pop-box">
		<view class="inner">
				<view class="ttl">收货码</view>
				<view class="text">请输入4位取衣码</view>
			<view class="enter-box">
				<valid-code ref="code" :maxlength="4" :isPwd="false" @finish="getCode"></valid-code>
			</view>
			<view class="count">
				<button v-if="btnShow">{{authTime}}S</button>
				<button v-if="!btnShow" @click="resend()" class="resend">重新发送</button>
			</view>
			<view class="close" @click="closeBtn()">
				<image src="../../static/login/close02.png"></image>
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="dialogSeal" type="dialog" class="dialogSeal">
		<view class="box">
			<text class="title">
				封签
			</text>
			<view class="inpbox" >
				<view class="scanBox"  >
					<view class="" v-for="(item,index) in scanList" :key="index">
						<input type="text"  placeholder="请输入封签码" v-model="item.seal" />
						<image class="scan" src="../../static/images/acquirers/scan.png" mode="" @click="scan(index)"></image>
						<image class="add" v-if="index == 0"  src="../../static/images/acquirers/add.png" mode="" @click="addSeal()"></image>
						<image class="red" v-else src="../../static/images/acquirers/red.png" mode="" @click="redSeal(index)"></image>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<button @click="closeel()">取消</button>
				<button class="commit" @click="submit()">确定</button>
			</view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import OrderCard from './components/orderCard'
import { getById } from '@/api/index'
	import validCode from '@/components/p-validCode/validCode.vue'
import { mapState,mapMutations } from 'vuex'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import { orderDetailList, updataOrderStatus, orderAbnormal,crowdsourcingCode,crowdsourcingcheckCode } from '@/api/index'
export default {
  name: 'order',
  components: { OrderCard, uniPopup,validCode },
  data: () => ({
    isUnsealed: false,
    orderStatus: 0,
    orderId: '',
	successParam:{},
	sealNum: "",
	scanList:[{
		seal:""
	}],
	selParam:{},
	authTime:60
  }),
  onLoad(options) {
    this.orderStatus = options.orderStatus
    console.log(options.id)
  },
  computed: {
     ...mapState("orderData",['orderDetail']),
  },
  methods: {
      ...mapMutations("orderData",['setOrderInfo']),
	  giveEnd(param) {
	  	updataOrderStatus(param).then(res => {
	  		uni.showToast({
	  			title: '操作成功',
	  			duration: 2000,
	  		})
			this.orderDetail.status =8
			this.setOrderInfo(this.orderDetail)
			
	  	})
	  },
    statuschange() {
      this.orderStatus = Math.floor(Math.random() * 6)
    },
	onSend(param) {
		updataOrderStatus(param).then(res => {
			this.orderDetail.status =8
			this.setOrderInfo(this.orderDetail)
		})
	},
    
    onFail(param) {
      this.failParam = param
      this.$refs.dialogInput.open()
    },
    scan(index){
    	let $this = this 
    	uni.scanCode({
    		success: function (res) {
    			$this.$set($this.scanList,index,{"seal":res.result})
    		}
    	});	
    },
    addSeal(){
    	this.scanList.push({"seal":""})
    },
    redSeal(index){
    	this.scanList.splice(index,1)
    },
	sealed(param){
		this.selParam= param
		this.$refs.dialogSeal.open()
	},
	closeel() {
		this.$refs.dialogSeal.close()
	},
	submit() {
	let list =[]
	this.scanList.forEach(item=>{
		list.push(item.seal)
	})
	let seal =""
	if(list.length !=0){
		seal = list.join(",")
		this.selParam.seal = seal
	}
	updataOrderStatus(this.selParam).then(res => {
		uni.showToast({
			title: '操作成功',
			duration: 2000,
		})
        this.orderDetail.isSeal =1
        this.setOrderInfo(this.orderDetail)
		this.closeel()
	})
	
	},
     dialogInputConfirm() {
      orderAbnormal(this.failParam).then(res => {
        uni.showToast({
          title: '操作成功',
          duration: 2000,
        })
          this.orderDetail.status =18
          this.setOrderInfo(this.orderDetail)
        this.$refs.dialogInput.close()
      })
    },
	close(){
        this.$refs.dialogInput.close()
	},
    onSucess(param) {
      updataOrderStatus(param).then(res => {
        uni.showToast({
          title: '操作成功',
          duration: 2000,
        })
        if(param.type ==1){
          this.orderDetail.status =7
          this.setOrderInfo(this.orderDetail)
        }
         if(param.type ==2){
          this.orderDetail.status =17
          this.setOrderInfo(this.orderDetail)
        }
      })
    },
	sendCode(param) {
		this.successParam = param
		crowdsourcingCode({
			"phone": param.consigneePhone,
			"orderSn": param.orderSn,
			"name": param.consigneeName
		}).then(res => {
			this.send()
			this.clearCode()
			this.$refs.dialogSuccess.open()
		})
	
	},
	clearCode() {
		this.$refs.code.clear();
	},
	submitStore(){
		uni.setStorageSync("tabIndex",2)
		uni.switchTab({
			url:"/pages/index/index"
		})
	},
	resend(){
		let param =this.successParam
		crowdsourcingCode({
			"phone": param.consigneePhone,
			"orderSn": param.orderSn,
			"name": param.consigneeName
		}).then(res => {
			this.send()
		})
	},
	send() {
		let _this = this;
		_this.authTime = 60;
		_this.btnShow = true;
	
		console.log('调用验证码接口');
	
		// 倒计时计数器
		var sendTimer =
			setInterval(() => {
				_this.authTime--;
				if (_this.authTime <= 0) {
					_this.btnShow = false;
					clearInterval(sendTimer);
				};
			}, 1000);
	},
	getCode(val) {
		console.log(val);
		this.crowdsourcingcheckCode(val)
	},
	//获取密码
	getPwd(val) {
		console.log(val);
	},
	// 清空验证码
	clearCode() {
		this.$refs.code.clear();
	},
	// 清空密码
	clearPwd() {
		this.$refs.pwd.clear();
	},
	crowdsourcingcheckCode(code) {
		crowdsourcingcheckCode({
			"phone": this.successParam.consigneePhone,
			"code": code
		}).then(res => {
			this.$refs.dialogSuccess.close()
			updataOrderStatus({"orderId":this.orderDetail.orderId,"type":4}).then(res => {
			  uni.showToast({
			    title: '操作成功',
			    duration: 2000,
			  })
				this.orderDetail.status =9
				this.setOrderInfo(this.orderDetail)
			})
		})
	},
  },
}
</script>

<style lang="scss" scoped>
.view-body {
  padding: 24rpx 24rpx;
}

.dialogInput {
			.box {
				background-color: #FFFFFF;
				width: 600rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 40rpx 0;
	
				text {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #333333;
				}
	
				.title {}
	
				.tips {
					font-size: 22rpx;
					font-weight: 400;
					color: #ff9021;
					margin-top: 20rpx;
				}
	
				textarea {
					width: 449rpx;
					height: 158rpx;
					background: #f5f5f5;
					margin: 40rpx;
					padding: 0 20rpx;
					font-size: 26rpx;
				}
	
				.btnBox {
					display: flex;
	
					button {
						width: 150rpx;
						height: 56rpx;
						background: #f5f5f5;
						border-radius: 4rpx;
						font-size: 26rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #666666;
						margin-right: 30rpx;
						line-height: 56rpx;
					}
	
					.commit {
						background: #377be8;
						color: #ffffff;
						border-radius: 4px;
						margin-left: 30rpx;
					}
				}
			}
		}
		.dialogSeal {
				.box {
					background-color: #FFFFFF;
					width: 600rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 40rpx 0;
					margin-bottom: 0;
					text {
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #333333;
					}
		
					.title {}
		
					.tips {
						font-size: 22rpx;
						font-weight: 400;
						color: #ff9021;
						margin-top: 20rpx;
					}
		
					.inpbox {
						width: 449rpx;
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
						
						.scanBox{
							display: flex;
							align-items: center;
							flex-direction: column;
							margin: 20rpx 0;
							
							view{
							display: flex;
							align-items: center;
							margin: 15rpx 0;
							.scan{
								margin: 0 20rpx;
							}
							.red{
								width: 45rpx;
								height: 45rpx;
							}
								input {
									width: 240rpx;
									height: 68rpx;
									background: #f5f5f5;
									padding: 0 10rpx;
									margin-left: 20rpx;
								}
							}
						}
						
		
						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
		
		
					.btnBox {
						display: flex;
		
						button {
							width: 150rpx;
							height: 56rpx;
							background: #f5f5f5;
							border-radius: 4rpx;
							font-size: 26rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							text-align: center;
							color: #666666;
							margin-right: 30rpx;
							line-height: 56rpx;
						}
		
						.commit {
							background: #377be8;
							color: #ffffff;
							border-radius: 4px;
							margin-left: 30rpx;
						}
					}
				}
			}
		
</style>
