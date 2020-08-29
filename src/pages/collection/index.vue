<template>
	<view class="page">
		<view class="box">
			<view class="title">
				向客户收款
			</view>
			<text class="weixin">微信支付</text>
			<text class="price">￥{{parseInt(price)/100}}</text>
			<canvas class="canvas" canvas-id="myQrcode"></canvas>
			
			<text class="tips">订单提交成功，等待用户扫描…</text>
		</view>
	</view>
</template>

<script>import drawQrcode from "./components/weapp.qrcode";
import {getTradeInfo} from '@/api/index.js'
	export default{
		data(){
			return{
				codeUrl:"",
				price:0,
				orderNumber:"",
				timer:{}
			}
		},
		onLoad() {
				let option = uni.getStorageSync("payParam")
			drawQrcode({
			  width: 179,
			  height: 179,
			  canvasId: 'myQrcode',
			  text: option.url
			});
			console.log(option)
			this.codeUrl = option.url
			this.price = option.price
			this.orderNumber = option.orderSn
				this.timer =	setInterval(()=>{
				this.getTradeInfo()
			},2000)
		},
		methods:{
			getTradeInfo() {
				getTradeInfo({"orderNumber":this.orderNumber}).then(res=>{
						if(res.status == 1){
							clearInterval(this.timer)
							uni.reLaunch({
								url:"/pages/paySuccess/index?isSuccess=1"
							})
						}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		background-color: #F3F3F3;
		width: 100vw;
		height: 100vh;

		.box {
			width: 95%;
			border-radius: 15rpx;
			background-color: #ffffff;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20rpx;

			.title {
				width: 490rpx;
				height: 100rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url(../../static/images/collection/bac.png);
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #377be8;
				text-align: center;
				line-height: 100rpx;
			}

			.weixin {
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #999999;
				margin-top: 40rpx;
			}

			.price {
				font-size: 56rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #000000;
				margin-top: 30rpx;
			}

			.canvas {
				width: 420rpx;
				height: 420rpx;
				margin-top: 30rpx;
			}

			.tips {
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
				margin: 40rpx 0;
			}
		}
	}
</style>
