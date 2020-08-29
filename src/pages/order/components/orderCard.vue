<template>
	<view>
		<view class="v-header">
			<view class="v-row1">
				<view class="v-col1">单号：{{orderDetail.orderSn}}</view>
				<view class="v-col2">{{ orderDetail.status|changeType }}</view>
			</view>
			<view class="v-row2">
				<view class="v-col1">
					{{ orderDetail.refundMoney/100 }}
				</view>
				<view class="v-col2">元</view>
			</view>
		</view>
		<view class="v-body v-body-353">
			<view class="v-row1 v-row">
				<image class="v-col1 v-col" src="@/static/images/tabbar/pickup-user.png"></image>
				<view class="v-col2">取件用户</view>
				<view class="v-col3">{{ orderDetail.consigneeName }} {{ orderDetail.consigneePhone|changePhone }}</view>
				<image src="@/static/images/tabbar/order-phone.png" class="v-col4" @click="callPhone()"></image>
			</view>
			<view class="v-row2 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-count.png"></image>
				<view class="v-col2">物品件数</view>
				<view class="v-col3">{{ orderDetail.sumNumaber }}件</view>
			</view>
			<view class="v-row3 v-row">
				<image class="v-col1" src="@/static/images/tabbar/pickup-address.png"></image>
				<view class="v-col2">送货地址</view>
				<view class="v-col3">
					{{orderDetail.provinceName}} {{orderDetail.cityName}}{{orderDetail.districtName}}{{orderDetail.streetName}}{{orderDetail.consigneeAddress}}
				</view>
				<image src="@/static/images/tabbar/coordinate.png" class="v-col4" @click="openMap()"></image>
			</view>
			<view class="v-row4 v-row" v-if="orderDetail.status ==6">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">预约时间</view>
				<view class=" time" >
					{{ orderDetail.appointmentDoorTime }}
				</view>
	
				<view class="v-col-timeout">{{orderDetail.appointmentDoorEndTime|timedifference}}</view>
			</view>
			<view class="v-row5 v-row" v-if="orderDetail.status ==6||orderDetail.status ==7">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">取货时间</view>
				<view class="v-col3">{{ orderDetail.pickUpTime |changeDistance}}</view>
			</view>
			
			<view class="v-row5 v-row" v-if="orderDetail.status ==8||orderDetail.status ==4">
				<image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
				<view class="v-col2">签收时间</view>
				<view class="v-col3">{{ orderDetail.signUpTime |changeDistance}}</view>
			</view>
		</view>
		<!-- <view class="v-body v-body-292" v-if="getOrderStatus([2, 3, 4])">
      <view class="v-row1 v-row">
        <image
          class="v-col1 v-col"
          src="@/static/images/tabbar/pickup-user.png"
        ></image>
        <view class="v-col2">取件用户</view>
        <view class="v-col3">赵露思 182****3422</view>
        <image
          src="@/static/images/tabbar/order-phone.png"
          class="v-col4"
          v-if="getOrderStatus([orderStatus])"
        ></image>
      </view>
      <view class="v-row2 v-row">
        <image class="v-col1" src="@/static/images/tabbar/pickup-count.png"></image>
        <view class="v-col2">物品件数</view>
        <view class="v-col3">3件</view>
      </view>
      <view class="v-row3 v-row">
        <image class="v-col1" src="@/static/images/tabbar/pickup-address.png"></image>
        <view class="v-col2">送货地址</view>
        <view class="v-col3">
          青岛市李沧区九水东路130号青岛国际特别创新区1号楼洗衣先生门店
        </view>
        <image
          src="@/static/images/tabbar/coordinate.png"
          class="v-col4"
          v-if="getOrderStatus([orderStatus])"
        ></image>
      </view>
      <view class="v-row6 v-row" v-if="getOrderStatus([2, 3, 4])">
        <image class="v-col1" src="@/static/images/tabbar/pickup-time.png"></image>
        <view class="v-col2">签收时间</view>
        <view class="v-col3">{{ getOrder.takeTime }}</view>
      </view>
    </view> -->
		<view class="v-footer">
			<view class="v-row0" v-if="orderDetail.status ==6">
				<button class="v-col1" type="primary" plain @click="onFail(1)">
					取衣失败
				</button>
				<button class="v-col2" type="primary" plain @click="onSucess(1)">完成取衣</button>
			</view>

			<view class="v-row1" v-if="orderDetail.status ==7">
				<view class="v-col1" v-if="orderDetail.isSeal ==0">未封签</view>
				<view class="v-col2" v-else>已封签</view>
				<button type="primary" plain class="v-col3" v-if="orderDetail.isSeal ==0" @click="sealed()">
					去封签
				</button>
				<button type="primary" plain class="v-col4" @click="submitStore()">
					提交门店
				</button>
			</view>

			<view class="v-row2" v-if="orderDetail.status ==8">
				<button class="v-col1" type="primary" plain @click="onFail(2)">
					送衣失败
				</button>
				<button class="v-col2" type="primary" plain  @click="sendCode">我已送达</button>
			</view>
			<!-- <view class="v-row3" v-if="getOrderStatus([3])">
        已送达
      </view> -->
	  <button
	    type="primary"
	    plain
	    class="v-row4"
	    @click="onSend"
		 v-if="clothes.status === 4"
	  >
	    开始送衣
	  </button>
		</view>
		
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		updataOrderStatus
	} from "@/api/index"

	export default {
		name: "order-card",
		props: {
			orderDetail: {
				type: Object,
				default: {},
			},

		},
		filters: {
			changeType(val) {
				switch (val) {
					case 1:
						{
							return "未支付";
						}
					case 2:
						{
							return "已支付";
						}
					case 3:
						{
							return "门店已签收";
						}
					case 4:
						{
							return "未开始送衣";
						}
					case 6:
						{
							return "待取衣";
						}
					case 7:
						{
							return "已取衣";
						}
					case 8:
						{
							return "未送衣";
						}
					case 9:
						{
							return "已签收";
						}
					case 13:
						{
							return "发起退款";
						}
					case 14:
						{
							return "已退款";
						}
					case 15:
						{
							return "已取消";
						}
					case 16:
						{
							return "已完成";
						}
					case 17:
						{
							return "提交门店";
						}
					case 18:
						{
							return "失败";
						}
				}
			},
			timedifference(time) {
				let old_date = new Date().valueOf()
				console.log("sadas")
				console.log(old_date)
				let new_date = parseInt(time)*1000
				if (old_date > new_date) {
					return "已超时"
				}

			},
			changePhone(phnoe){
				return phnoe.substring(0,3)+"****"+phnoe.substring(7,11)
			},
			changeDistance(distance) {
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
		data: () => ({
			isUnsealed: true,
			// orderStatus: 4, //0,未取衣 1,已取衣 2，未送衣 3、已送达 4,未开始送衣 5,提交门店
		}),
		computed: {
			...mapState("orderData", ['orderDetail']),

		},
		computed: {
			isOutTime() {
				let old_date = new Date().valueOf()
				console.log("sadas")
				console.log(old_date)
				let new_date = parseInt(this.orderDetail.appointmentDoorEndTime)
				if (old_date > new_date) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			giveEnd(){
				let param ={
					...this.orderDetail
				}
				
				this.$emit('giveEnd', param)
			},
			getOrderStatus(e) {
				return e.indexOf(this.orderStatus) >= 0;
			},
			onSend(){
				let param ={
				  "orderId":this.orderDetail.orderId,
				   "consigneePhone":this.orderDetail.consigneePhone,
				  "type":3
				}
				this.$emit('onSend', param)
			},
			onSucess(type) {
				let param = {
					"orderId": this.orderDetail.orderId,
					"type": type
				}
				this.$emit('onSucess', param)

			},
			submitStore() {
				this.$emit('submitStore')
			},
			openMap() {
				let param = {
					latitude: parseFloat(this.orderDetail.latitude),
					longitude: parseFloat(this.orderDetail.longitude)
				}
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
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.orderDetail.consigneePhone //仅为示例
				});
			},
			sealed() {
				updataOrderStatus({
					"orderId": this.orderDetail.orderId,
					"type": 5
				}).then(res => {
					this.$emit('sealed', this.index)
				})
			},
			sendCode() {
				let param = {
					...this.orderDetail,
					"index": this.index
				}
				this.$emit('sendCode', param)
			},
			onFail(type) {
				let param = {
					"orderId": this.orderDetail.orderId,
					"type": type
				}
				this.$emit('onFail', param)
			},
			sealed() {
				let param = {
					"orderId": this.orderDetail.orderId,
					"type": 5
				}
				this.$emit('sealed', param)

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
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.v-row1 {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-tart;

			margin-top: 16rpx;

			.v-col1 {
				height: 30rpx;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #999999;
				line-height: 30rpx;

				margin-left: 24rpx;
			}

			.v-col2 {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: start;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #377be8;

				margin-left: 24rpx;
				margin-top: 6rpx;
			}
		}

		.v-row2 {
			display: flex;
			justify-content: end;
			align-items: center;

			margin-top: 30rpx;

			.v-col1 {
				width: 96rpx;
				height: 50rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: right;
				color: #333333;
			}

			.v-col2 {
				width: 24rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: right;
				color: #333333;

				margin-left: 7rpx;
				margin-right: 24rpx;
			}

			.v-col3 {
				width: 24rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: right;
				color: #333333;

				margin-left: 7rpx;
				margin-right: 24rpx;
			}

		}
	}

	.v-body {
		background: #fcfcfc;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-bottom: 44rpx;
		border-bottom: 1rpx solid #e5e5e5;

		.v-row {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			height: 33rpx;
		}

		.v-row1 {
			margin-top: 19rpx;
		}

		.v-row2 {
			margin-top: 22rpx;
		}

		.v-row3 {
			margin-top: 22rpx;
		}

		.v-row4 {
			margin-top: 22rpx;

			.v-col-timeout {
				width: 72rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #ff3636;
				margin-right: 134rpx;
			}
		}

		.v-row5 {
			margin-top: 22rpx;
		}

		.v-row6 {
			margin-top: 57rpx;
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

		.time {
			height: 33rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;

		}

		.v-col4 {
			width: 44rpx;
			height: 44rpx;
			margin-right: 24rpx;
			margin-left: 9rpx;
		}
	}

	.v-footer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #ffffff;
		border-radius: 0px 0px 20rpx 20rpx;

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

			line-height: 90rpx;
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

		.v-row0 {
			width: 750rpx;
			height: 90rpx;
			display: flex;

			.v-col1 {
				height: 90rpx;
				background: rgba(55, 123, 232, 0.1);
				border-radius: 0px 0px 0px 20rpx;

				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #377be8;

				line-height: 90rpx;
				border: none;
				flex: 1;
			}

			.v-col2 {
				width: auto;
				height: 90rpx;
				background: #377be8;
				border-radius: 0px 0px 20px 0px;

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

		.v-row1 {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #ffffff;
			border-radius: 0px 0px 20rpx 20rpx;

			width: 750rpx;

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

		.v-row2 {
			width: 750rpx;
			height: 90rpx;
			display: flex;

			.v-col1 {
				height: 90rpx;
				background: rgba(55, 123, 232, 0.1);
				border-radius: 0px 0px 0px 20rpx;

				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #377be8;

				line-height: 90rpx;
				border: none;
				flex: 1;
			}

			.v-col2 {
				width: auto;
				height: 90rpx;
				background: #377be8;
				border-radius: 0px 0px 20px 0px;

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

		.v-row3 {
			width: 702rpx;
			height: 90rpx;
			background: #ffffff;
			border-radius: 0px 0px 20rpx 20rpx;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #999999;

			line-height: 90rpx;
		}

		.v-row4 {
			width: 702rpx;
			height: 90rpx;
			background: #2fc094;
			border-radius: 0px 0px 20px 20px;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;

			line-height: 90rpx;
		}

		.v-row5 {
			width: 702rpx;
			height: 90rpx;
			background: #ffffff;
			border-radius: 0px 0px 20rpx 20rpx;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #999999;

			line-height: 90rpx;
		}
	}
	
</style>
