<template>
	<view class="page">
		<image v-if="isSuccess" src="../../static/images/payStatus/success.png" mode=""></image>
		<image v-else src="../../static/images/payStatus/fail.png" mode=""></image>
		<text v-if="isSuccess">支付成功</text>
		<text v-else>支付失败</text>
		<button @click="goIndex">返回首页</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isSuccess:true
			}
		},
		methods:{
			goIndex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		width: 100vw;
		height: calc(100vh - 380rpx);
		text-align: center;
		padding-top: 380rpx;
		image{
			width: 171rpx;
			height: 171rpx;
			margin: 0 auto 45rpx;
		}
		text{
			font-size: 48rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
		}
		button{
			position: fixed;
			bottom:80rpx ;
			width: 260rpx;
			height: 84rpx;
			background-color: #377BE8;
			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 84rpx;
			left: calc(50vw - 130rpx);
		}
	}
</style>
