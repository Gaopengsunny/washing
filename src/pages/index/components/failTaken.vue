<template>
	<view style="box">
		<view class="v-header flex-between">
			<view class="flex-column-start">
				<view class="v-order-title">
					<view class="s-ordernum">单号：{{orderInfo.orderSn}}</view>
					<text class="fail">取衣失败</text>
				</view>
			</view>
			<view class="v-price">
					{{orderInfo.refundMoney/100}}元
			</view>
		</view>
		<view class="v-body">
			<view class="v-row1 v-row">
				<view class="left">
					<image class="v-col1 v-col" src="@/static/images/tabbar/pickup-user.png"></image>
						<view class="v-col2">取件用户</view>
						<view class="v-col3">{{orderInfo.consigneeName}} {{orderInfo.consigneePhone|changePhone}}</view>
				</view>
				<image
			  src="@/static/images/tabbar/order-phone.png"
			  class="call"
			  @click="callPhone()"
			></image>
			</view>
			<view class="v-row2 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-count.png"></image>
				<view class="v-col2">物品件数</view>
				<view class="v-col3">{{orderInfo.sumNumaber}}件</view>
			</view>
			<view class="v-row3 v-row">
				<view class="left">
					<image class="v-col1" src="@/static/images/tabbar/pickup-address.png"></image>
					<view class="v-col2">取货地址</view>
					<view class="v-col3">
						{{orderInfo.provinceName}} {{orderInfo.cityName}}{{orderInfo.districtName}}{{orderInfo.streetName}}{{orderInfo.consigneeAddress}} 
					</view>
				</view>
				<image
				  src="@/static/images/tabbar/coordinate.png"
				  class="img-address"
				  @click="openMap()"
				></image>
			</view>
			<view class="v-row4 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">取货时间</view>
				<view class="v-col3">{{orderInfo.pickUpTime|changeTime}}</view>
			</view>
			<view class="v-row4 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">操作时间</view>
				<view class="v-col3">{{orderInfo.updatedAt|changeTime}}</view>
			</view>
			<view class="v-row5 v-row" v-if="orderInfo.isFailNotes">
			<image src="../../../static/images/tabbar/operation.png" class="v-col1"></image>
			  <view class="v-col2">操作原因</view>
			  
				<view class="v-col3" v-if="orderInfo.isFailNotes.length <=30">
			  					{{orderInfo.isFailNotes}}
			  				</view>
				<view class="v-col3" v-if="orderInfo.isFailNotes.length >30&&!isMore">
					{{orderInfo.isFailNotes.slice(0,34)}} <text class="more" @click="showMore()"> ...展开</text>
				</view>
			  <view class="v-col3" v-if="isMore">
					{{orderInfo.isFailNotes}}<text class="more" @click="showMore()">收起</text>
				</view>
			</view>
			<view class="v-row5 v-row" v-else>
			<image src="../../../static/images/tabbar/operation.png" class="v-col1"></image>
			  <view class="v-col2">操作原因</view>
				
			  <view class="v-col3">
					-----
				</view>
			</view>
		</view>
		<!-- <view class="v-footer">
      <view class="v-col1" v-if="orderInfo.isSeal ==0">未封签</view>
      <view class="v-col2" v-else>已封签</view>
      <button type="primary" plain class="v-col3" v-if="orderInfo.isSeal ==0" @click="sealed()">
        去封签
      </button>
      <button type="primary" plain class="v-col4" @click="onSucess">
        提交门店
      </button>
    </view> -->
	</view>
</template>

<script>
	import {
		sealed
	} from "@/api/index"
	export default {
		name: "taken-clothes",
		props: {
			orderInfo: {
				type: Object
			}
		},
		data: () => ({
			isUnsealed: true,
			isMore:false
		}),
			
		watch:{
			
		},
		filters: {
			changeTime(distance) {
				if (!distance) {
					return "-----"
				}
				let time = parseInt(distance) * 1000
				let date = new Date(time);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let minute = date.getMinutes();
				let second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;

				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			changePhone(phnoe){
				if (!phnoe) {
					return "-----"
				}
				return phnoe.substring(0,3)+"****"+phnoe.substring(7,11)
			},
		},
		methods: {
			onSucess() {
				let param = {
					"orderId": this.orderInfo.orderId,
					"type": 2,
					"index": this.index
				}
				this.$emit('onSucess', param)

			},
			onClickOrder() {
				this.$emit('onClickOrder', this.orderInfo)
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			sealed() {
				sealed({
					"orderId": this.orderInfo.orderId
				}).then(res => {

				})
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
			showMore(){
				this.isMore = !this.isMore 
			}
		},
	};
</script>

<style lang="scss" scoped>
	.v-header {
		height: 110rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		border-bottom: 1px solid rgba(229, 229, 229, 1);
		background: #ffffff;
		width: 100%;
		display: flex;
		justify-content: space-between;
		
	}

	.v-order-title {
		display: flex;
		flex-direction: column;
		.fail{
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #ff3636;
		margin-left: 24rpx;
		}
	}

	.s-ordernum {
		height: 42rpx;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #999999;
		margin-left: 24rpx;
	}

	.a-detail {
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #377be8;
		margin-left: 14rpx;
	}

	.v-price {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-right: 24rpx;
		font-size: 36rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: right;
		color: #333333;
	}


	.s-price-unit {
		width: 24rpx;
		height: 33rpx;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: right;
		color: #333333;

		margin-left: 7rpx;
		line-height: 24rpx;
		margin-top: 12rpx;
	}

	.v-body {
		background: #fcfcfc;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-bottom: 20rpx;

		.v-row {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.v-row1 {
			margin-top: 19rpx;
			justify-content: space-between;
			
			.left{
				display: flex;
				align-items: center;
			}
			.call{
				width: 44rpx;
				height: 44rpx;
				margin-right: 24rpx;
			}
		}

		.v-row2 {
			margin-top: 25rpx;
		}

		.v-row3 {
			margin-top: 22rpx;
			justify-content: space-between;
			
			.left{
				width: calc(100% - 100rpx);
				display: flex;
				align-items: center;
			}
			.img-address{
				width: 44rpx;
				height: 44rpx;
				margin-right: 24rpx;
			}
			
		}

		.v-row4 {
			margin-top: 25rpx;
		}
		.v-row5{
			margin-top: 25rpx;
			align-items: flex-start;
		}

		.v-col1 {
			margin-left: 24rpx;
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}

		.v-col2 {
			width: 96rpx;
			height: 33rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;

			margin-right: 32rpx;
		}

		.v-col3 {
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
			flex: 1;
		}
	}

	.v-footer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #ffffff;
		border-radius: 0px 0px 20rpx 20rpx;

		.v-col1 {
			width: 84rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #ef7373;
			line-height: 45rpx;

			margin-left: 25rpx;
			margin-right: 21rpx;
		}

		.v-col2 {
			width: 84rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #2fc094;
			line-height: 45rpx;

			margin-left: 25rpx;
			margin-right: 30rpx;
		}

		.v-col3 {
			width: 165rpx;
			height: 60rpx;
			background: rgba(55, 123, 232, 0.1);
			border-radius: 30rpx;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #377be8;

			border: none;
			line-height: 60rpx;
			margin-right: 32rpx;
		}

		.v-col4 {
			height: 90rpx;
			background: #377be8;
			border-radius: 0px 0px 20rpx 0px;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;

			line-height: 90rpx;
			border: none;
			flex: 1;
		}
	}
</style>
