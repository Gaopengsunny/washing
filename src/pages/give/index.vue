<template>
	<view class="view-body">
		<view class="container">
			<scroll-view class="v-nav" scroll-x="true">
				<button type="primary" plain v-for="(item,index) in statusList" :key="index" :index="index" :class="item.index === btnStatus ? 'active1' : ''"
				 @click="onClick(item.index, $event)">{{item.name}}</button>
			</scroll-view>
			<scroll-view scroll-y="true" class="orderList">
				<view class=""  v-for="(clothes, index) in orderlist" :key="index">
					<un-send-card v-if="btnStatus === 4" @onClickOrder="onClickOrder" :key="index" :index="index" :clothes="clothes"
						 @onFail="onFail" @onSucess="onSucess" @onSend="onSend" @openMap="openMap"></un-send-card>
						<send-card v-if="btnStatus === 16" @onClickOrder="onClickOrder" :key="index" :clothes="clothes"></send-card>
				<fail-send v-if="btnStatus === 2" @onClickOrder="onClickOrder" :key="index" :clothes="clothes"></fail-send>
				
				</view>
			</scroll-view>

			<view class="loading-text">{{ loadingText }}</view>
		</view>

		<uni-popup ref="dialogInput" type="dialog" class="dialogInput">
			<view class="box">
				<text class="title">
					送衣失败
				</text>
				<text class="tips">请输入送衣失败原因</text>
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
	</view>
</template>

<script>
	import UnSendCard from './components/unsendCard'
	import SendCard from './components/sendCard'
	import failSend from './components/failSend'
	import {
		orderDetailList,
		updataOrderStatus,
		orderAbnormal,
		crowdsourcingCode,
		crowdsourcingcheckCode,
		failOrderDetailList
	} from '@/api/index'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import validCode from '@/components/p-validCode/validCode.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			UnSendCard,
			SendCard,
			uniPopup,
			validCode,
			failSend
		},
		data: () => ({
			btnStatus: 4,
			statusList: [{
					index: 4,
					name: '未送衣',
				},
				{
					index: 16,
					name: '已送衣',
				},
				{
					index: 2,
					name: '送衣失败',
				},
			],
			pageNum: 1,
			pages: 1,
			orderlist: [],
			failParam: {},
			loadingText: "暂无更多",
			list: [{
					val: '',
					fs: true
				},
				{
					val: '',
					fs: false
				},
				{
					val: '',
					fs: false
				},
				{
					val: '',
					fs: false
				}
			],
			// 输入框显示
			show: false,
			successParam: {},
			authTime: 60,
			btnShow: false,
			localParam:{}

		}),
		methods: {
			...mapMutations("orderData", ['setOrderInfo']),
			onClick(index, e) {
				this.pageNum = 1
				this.btnStatus = index
				this.orderlist = []
				if(index == 2){
				this.failOrderDetailList()
				}else{this.orderDetailList(this.localParam)
				}
			},
			onClickOrder(orderInfo) {
				this.setOrderInfo(orderInfo)
				uni.navigateTo({
					url: '/pages/order/index',
				})
			},
			orderDetailList(localParam) {
		
				if (this.pageNum > this.pages) {
					this.loadingText = '暂无更多'
					return false
				}
				if(this.btnStatus!=4){
					localParam={}
				}
				orderDetailList({
					status: this.btnStatus,
					pageNumber: this.pageNum,
					...localParam
				}).then(res => {
					this.orderlist.push(...res.records)
					this.pages = res.pages
					this.pageNum++
					if (res.pages == res.current) {
						this.loadingText = '暂无更多'
					} else {
						this.loadingText = '加载更多'
					}
						uni.stopPullDownRefresh()
				})
			},
			openMap(param) {
				console.log(param)
				uni.openLocation({
					latitude: param.latitude,
					longitude: param.longitude,
					success: function() {
						console.log('success')
					},
					complete: function(e) {
						console.log(e)
					},
				})
			},
			failOrderDetailList(){
				if (this.pageNum > this.pages) {
					this.loadingText = '暂无更多'
					return false
				}
				failOrderDetailList({
					status: this.btnStatus,
					pageNumber: this.pageNum
				}).then(res => {
					res.records.forEach(item=>{
						if(!item.isFailNotes){
							item.isFailNotes=""
						}
						
					})
					this.orderlist.push(...res.records)
					this.pages = res.pages
					this.pageNum++
					if (res.pages == res.current) {
						this.loadingText = '暂无更多'
					} else {
						this.loadingText = '加载更多'
					}
						uni.stopPullDownRefresh()
				})
			},
			onFail(param) {
				this.failParam = param
				this.$refs.dialogInput.open()
			},
			onSend(param) {
				updataOrderStatus(param).then(res => {
					let obj = this.orderlist[param.index]
					obj.status = 8
					this.$set(this.orderlist, param.index, obj)
				})
			},
			dialogInputConfirm(){
				orderAbnormal(this.failParam).then(res => {
					uni.showToast({
						title: '操作成功',
						duration: 2000,
					})
					this.$refs.dialogInput.close()
					this.orderlist.splice(this.failParam.index, 1)
				})
			},
			close(){
					this.$refs.dialogInput.close()
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
			onSucess(param) {
				this.successParam = param
				crowdsourcingCode({
					"phone": param.consigneePhone,
					"orderSn": param.orderSn,
					"name": param.consigneeName
				}).then(res => {
					this.send()
					this.$refs.dialogSuccess.open()
					this.clearCode()
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
					updataOrderStatus({"orderId":this.successParam.orderId,"type":4}).then(res => {
					  uni.showToast({
					    title: '操作成功',
					    duration: 2000,
					  })
					this.$refs.dialogSuccess.close()
					this.orderlist.splice(this.successParam.index, 1)
					})
				})
			},
			change(e) {
				console.log('是否打开:' + e.show);
			},
		},
		computed: {

		},
		onLoad: function(options) {
			let $this = this
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					$this.localParam= res
					$this.orderDetailList($this.localParam)
			    }
			});
			
		},
		onPullDownRefresh() {
			if(this.btnStatus == 2){
				this.failOrderDetailList()
				
			}else{this.orderDetailList(this.localParam)
			}
		},
		onReachBottom() {
			this.count += 5
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 400upx;
	}

	.orderList {
		height: calc(100vh - 170rpx);
		// word-wrap: a;
	}
	button {
		margin-top: 30upx;
	}

	.container {
		width: 700rpx;
		padding: 0rpx 24rpx;
	}

	.v-nav {
		margin:0 0 15rpx 0;
		white-space: nowrap;
		.active1 {
			background: rgba(55, 123, 232, 0.1);
			color: rgba(55, 123, 232, 1);
		}

		button {
			display: inline-block;
			background: rgba(255, 255, 255, 1);
			margin-right: 16rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			border: none;
			width: 180rpx;
			height: 60rpx;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			line-height: 60rpx;
			color: rgba(102, 102, 102, 1);
		}
	}

	.v-row-footer1 {
		position: fixed;
		bottom: 100rpx;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		width: 750rpx;
		height: 80rpx;
		opacity: 0.9;
		background: #ffffff;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.09);

		.v-col1 {
			width: 30rpx;
			height: 30rpx;
			border: 1px solid black;
			border-radius: 50%;

			margin-left: 48rpx;
			margin-right: 16rpx;
		}

		.v-col2 {
			width: 56rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;

			margin-right: 24rpx;
		}

		.v-col3 {
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;

			margin-right: 10rpx;
		}

		.v-col4 {
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: rgba(55, 123, 232, 1);

			margin-right: 4rpx;
		}

		.v-col5 {
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
		}
	}

	.v-row-footer2 {
		position: absolute;
		bottom: 0;
		display: flex;

		width: 750rpx;

		.v-col1,
		.v-col2,
		.v-col3 {
			width: 250rpx;
			height: 100rpx;
			background: #377be8;
			line-height: 100rpx;
			text-align: center;
			display: flex;
			align-items: center;
		}

		.v-col1,
		.v-col2,
		.v-col3 {
			.v-row1 {
				height: 100rpx;
				color: #ffffff;
				line-height: 100rpx;
				flex: 1;
			}

			.v-row2 {
				width: 1px;
				height: 48rpx;
				opacity: 0.2;
				background: #ffffff;
			}
		}
	}

	/* 验证码弹窗 */
	.pop-box .inner {
		padding: 30upx;
		width: 100%;
		position: relative;
		border-radius: 14upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.pop-box .ttl {
		margin-bottom: 20upx;
		color: #141414;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
	}

	.pop-box .text {
		padding: 20upx 0;
		font-size: 30upx;
		color: #666;
		text-align: center;
	}

	.pop-box .enter-box {
		margin-bottom: 50upx;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.pop-box .code {
		display: flex;
		justify-content: space-between;
	}

	.pop-box .code text {
		width: 70upx;
		height: 48upx;
		line-height: 48upx;
		border-bottom: 6upx solid #F0F0F0;
		text-align: center;
		color: #141414;
		font-size: 32upx;
	}

	.pop-box .code text.focus {
		border-color: #3C70FF;
	}

	.pop-box .input {
		position: absolute;
		width: 100%;
		height: 48upx;
		left: 0;
		top: 0;
		opacity: 0;
	}

	/* 实际input高度 必须 > 显示input高度 */
	.pop-box .input input {
		width: 100%;
		height: 60upx;
		outline: none;
		border: none;
		background: none;
	}

	.pop-box .count button {
		color: #999;
		font-size: 32upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 8upx;
		background-color: #F0F0F0;
	}

	.pop-box .count button::after {
		display: none;
	}

	.pop-box .count .resend {
		color: #3C70FF;
	}

	.pop-box .close {
		padding: 10upx;
		position: absolute;
		right: 10upx;
		top: 10upx;
	}

	.pop-box .close image {
		width: 48upx;
		height: 48upx;
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
	
</style>
