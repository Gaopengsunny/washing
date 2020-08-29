<template>
	<view style="box">
		<view class="v-header flex-between">
			<view class="flex-column-start">
				<view class="v-order-title">
					<view class="s-ordernum">单号：{{orderInfo.orderSn}}</view>
					<view class="a-detail" @click="onClickOrder">详情</view>
				</view>
			</view>
			<view class="v-price">
				<view class="s-price">
					{{orderInfo.refundMoney/100}}
				</view>
				<view class="s-price-unit">元</view>
			</view>
		</view>
		<view class="v-body">
			<view class="v-row1 v-row">
				<image class="v-col1 v-col" src="@/static/images/tabbar/pickup-user.png"></image>
				<view class="v-col2">取件用户</view>
				<view class="v-col3">{{orderInfo.consigneeName}} {{orderInfo.consigneePhone|changePhone}}</view>
			</view>
			<view class="v-row2 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-count.png"></image>
				<view class="v-col2">物品件数</view>
				<view class="v-col3">{{orderInfo.sumNumaber}}件</view>
			</view>
			<view class="v-row3 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-address.png"></image>
				<view class="v-col2">取货地址</view>
				<view class="v-col3">
					{{orderInfo.provinceName}} {{orderInfo.cityName}}{{orderInfo.districtName}}{{orderInfo.streetName}}{{orderInfo.consigneeAddress}} 
				</view>
			</view>
			<view class="v-row4 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">取货时间</view>
				<view class="v-col3">{{orderInfo.pickUpTime|changeTime}}</view>
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
		}),

		filters: {
			changePhone(phnoe){
				return phnoe.substring(0,3)+"****"+phnoe.substring(7,11)
			},
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
			}
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
	}

	.v-order-title {
		display: flex;
	}

	.s-ordernum {
		height: 42rpx;
		font-size: 30rpx;
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
	}

	.s-price {
		width: 96rpx;
		height: 50rpx;
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
		height: 292rpx;
		background: #fcfcfc;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.v-row {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.v-row1 {
			margin-top: 19rpx;
		}

		.v-row2 {
			margin-top: 25rpx;
		}

		.v-row3 {
			margin-top: 22rpx;
		}

		.v-row4 {
			margin-top: 25rpx;
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
			height: 33rpx;
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
