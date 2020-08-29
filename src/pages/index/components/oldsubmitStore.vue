<template>
	<scroll-view class="v-container" scroll-y="true">
		<view class="box" v-for="(order,index) in orderlist" :key="index">
			<view class="orderNum">
				<view class="left">
					<text class="orderId">单号：{{order.orderSn}}</text>
					<text class="date">提交时间 {{order.orderSn}}</text>
				</view>
				<view class="right">
					<text class="tips">佣金</text>
					<text class="price">￥{{order.refundMoney/100}}</text>
				</view>
			</view>
			<view  class="v-header">
				<view class="v-check" @click="onChecked(order,index)">
					<image v-if="order.ischecked" class="v-row1" src="@/static/images/tabbar/checked.png"></image>
					<view v-else class="v-row2"></view>
				</view>
				<view  :class="[order.isShow?'v-list':'closeHead v-list']">
					<view class="v-item" v-for="(orderInfo,indexs) in order.ysWashOrderServiceList" :key="indexs">
						<view class="v-col1">
							<image class="v-row1" :src="'https://yswl-3dyj.obs.cn-north-4.myhuaweicloud.com/'+orderInfo.serviceImg"></image>
						</view>
						<view class="v-col2">
							<view class="v-row1">
								<view class="v-col1">
									{{ orderInfo.name }}
								</view>
								<view class="v-col2">{{ orderInfo.typeName }}</view>
							</view>
							<view class="v-row2">
								<view class="v-col1">{{ orderInfo.price/100 }}</view>
								<view class="v-col2">×{{ orderInfo.number }}</view>
							
							</view>
							<view class="v-row3">
								<view v-if="order.isSeal == 0" class="v-col3">
									未封签
								</view>
								<view v-else class="v-col4">
									已封签
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-footer" v-if="order.ysWashOrderServiceList.length>2">
				<image class="v-col1" src="@/static/images/tabbar/store-fold.png" @click="openMore(order,index)"></image>
				<view class="v-col2">总计：</view>
				<view class="v-col3">{{ order.total }}件</view>
			</view>
		</view>
		<view class="v-row-footer1">
			<image @click="checkAll()" v-if="checkedCount != 0&&orderlist.length ==checkedCount" class="v-row1" src="@/static/images/tabbar/checked.png"></image>
			<view class="v-col1" @click="checkAll()" v-else></view>
			<view class="v-col2">全选</view>
			<view class="v-col3">已选</view>
			<view class="v-col4">{{ checkedCount }}</view>
			<view class="v-col5">件</view>
		</view>
		<view class="v-row-footer2">
			<view class="v-col1" @click="updataOrderSubmitShop(1)">
				<view class="v-row1">已自送至门店</view>
				<view class="v-row2"></view>
			</view>
			<view class="v-col2" @click="express()" v-if="userInfo.userType==0" >
				<view class="v-row1">填写物流信息</view>
				<view class="v-row2"></view>
			</view>
			<view class="v-col2 disable"  v-else>
				<view class="v-row1">填写物流信息</view>
				<view class="v-row2"></view>
			</view>
			<view class="v-col3" v-if="userInfo.userType==0"  @click="updataOrderSubmitShop(3)">
				<view class="v-row1">申请平台取件</view>
			</view>
			<view class="v-col3 disable" v-else >
				<view class="v-row1">申请平台取件</view>
			</view>
		</view>

		<uni-popup ref="dialogExpress" type="dialog" class="dialogExpress">
			<view class="box">
				<text class="title">
					填写物流信息
				</text>
				<text class="tips">请务必保留快递单</text>
				<input type="text" value="" placeholder="请输入快递单号" v-model="param.deliverCode" />
				<view class="btnBox">
					<button @click="close()">取消</button>
					<button class="commit" @click="submit()">确定</button>
				</view>
			</view>
		</uni-popup>
	</scroll-view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		sourcingOrderDetailList,
		updataOrderSubmitShop,
		getByUserId
		
	} from "@/api/index"
	export default {
		name: "submit-store",
		data: () => ({
			baseFoldCount: 2,
			orderlist: [],
			param:{
				deliverCode:""
			},
			selList:[],
			userInfo:{}
		}),
		components: {
			uniPopup
		},
		created() {
			this.sourcingOrderDetailList()
			this.getByUserId()
		},
		computed: {
			checkedCount() {
				console.log("asdasd")
					let num = 0
					let selList=[]
					this.orderlist.forEach((item,index) => {
						if (item.ischecked) {
							selList.push(item.orderId)
							num++
						}
					})
					this.selList =selList
					return num
			
			}
		},
		methods: {
			openMore(order,index){
				order.isShow =!order.isShow
				this.$set(this.orderlist,index,order)
				
			},
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},
			
			close(){
				this.$refs.dialogExpress.close()
			},
			express() {
				if(this.selList.length == 0){
					uni.showToast({
						icon:"none",
						title:"请选择商品"
					})
					return false
				}
				this.$refs.dialogExpress.open()
			},
			submit(){
				if(this.param.deliverCode ==""){
					uni.showToast({
						icon:"none",
						title:"请输入快递单号"
					})
					return false
				}
				this.updataOrderSubmitShop(2)
			},
				
			updataOrderSubmitShop(type){
				if(this.selList.length == 0){
					uni.showToast({
						icon:"none",
						title:"请选择商品"
					})
					return false
				}
				let param ={
					"orderIdList":this.selList,
					"type":type,
					"userType":this.userInfo.userType,
					...this.param
				}
				updataOrderSubmitShop(param).then(res=>{
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
						this.sourcingOrderDetailList()
				})
			},
			onFold(order) {
				// uni.$emit("onFold", { folder: order });
				order.list[2].isshow = true;
				order.list[3].isshow = true;
				order.list[4].isshow = true;
			},
			checkAll() {
				let isAll = false
				if (this.checkedCount == 0) {
					isAll = true
					// this.checkedCount = this.orderlist.length
				}
				this.orderlist.forEach((item,index) => {
					item.ischecked = isAll
					this.$set(this.orderlist,index,item)
				})
			},
			onChecked(order, index) {
				order.ischecked = !order.ischecked;
				this.$set(this.orderlist, index, order)
				
			},
			sourcingOrderDetailList() {
				sourcingOrderDetailList({
					"status": 7
				}).then(res => {
					this.orderlist = res
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.v-container {
		width: 700rpx;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 270rpx);
		white-space: nowrap;

		.box {
			width: 100%;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;

			.orderNum {
				width: calc(100% - 40rpx);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				border-bottom: 1rpx solid #e5e5e5;
					.left{
						display: flex;
						flex-direction: column;
						text {
							font-size: 30rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							color: #999999;
						}
						.orderId{
							font-size: 28rpx;
							font-weight: 500;
							color: #333333;
						}
						.date{
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							color: #999999;
							margin-top: 6rpx;
						}
					}
				

				.right {
					.tips {
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
					}

					.price {
						font-size: 30rpx;
						font-weight: 500;
						color: #333333;

					}
				}

			}
			
			
			.v-header {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 702rpx;
				min-height: 180rpx;
				background: #ffffff;
				border-top: 1px solid #ffffff;

				.v-check {
					width: 78rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.v-row1 {
						width: 30rpx;
						height: 30rpx;
					}

					.v-row2 {
						width: 30rpx;
						height: 30rpx;
						border: 2rpx solid #999999;
						border-radius: 50%;
					}
				}
.closeHead{
				max-height: 360upx;
				overflow: hidden;
			}
				.v-list {
					flex: 1;

					display: flex;
					flex-direction: column;
					justify-self: flex-start;
					align-items: flex-start;

					.v-item {
						display: flex;
						justify-self: flex-start;
						align-items: flex-start;
						min-height: 140rpx;
						margin-top: 20rpx;
						margin-bottom: 20rpx;

						.v-col1 {
							display: flex;
							align-items: center;

							.v-row1 {
								width: 140rpx;
								height: 140rpx;
							}

							margin-right: 16rpx;
						}

						.v-col2 {
							display: flex;
							flex-direction: column;
							height: 140rpx;

							.v-row1 {
								display: flex;
								justify-content: flex-start;
								margin-bottom: 22rpx;
								.v-col1 {
									height: 37rpx;
									font-size: 26rpx;
									font-family: PingFang SC, PingFang SC-Bold;
									font-weight: 700;
									text-align: left;
									color: #333333;
									line-height: 40rpx;

									margin-right: 16rpx;
								}

								.v-col2 {
									height: 28rpx;
									font-size: 20rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: left;
									color: #999999;
									line-height: 45rpx;
								}
							}

							.v-row2 {
								display: flex;
								justify-content: flex-start;
									align-items: center;
								margin-bottom: 22rpx;

								.v-col1 {
									height: 33rpx;
									font-size: 24rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: left;
									color: #333333;
									line-height: 33rpx;
									margin-right: 16rpx;
								}

								.v-col2 {
									height: 28rpx;
									font-size: 20rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: left;
									color: #333333;
									line-height: 28rpx;

									margin-right: 16rpx;
								}

								

								.v-col4 {
									height: 30rpx;
									background: rgba(47, 192, 148, 1);
									border-radius: 4rpx;

									font-size: 20rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: left;
									color: #ffffff;
									line-height: 30rpx;
								}
							}

							.v-row3 {
								display: flex;
								justify-content: flex-start;

								.v-col1 {
									height: 33rpx;
									font-size: 24rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: left;
									color: #666666;
									line-height: 23rpx;

									margin-right: 4rpx;
								}

								.v-col2 {
									height: 23rpx;
									font-size: 24rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: Medium;
									text-align: right;
									color: #333333;
									line-height: 23rpx;
									margin-right: 0rpx;
								}

								.v-col3 {
									width: 76rpx;
									height: 30rpx;
									background: #ef7373;
									border-radius: 4rpx;
									font-size: 20rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: center;
									color: #ffffff;
									line-height: 30.5rpx;
								}
								
								.v-col4 {
									width: 76rpx;
									height: 30rpx;
									background: #2fc094;
									border-radius: 4rpx;
									font-size: 20rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									font-weight: 400;
									text-align: center;
									color: #ffffff;
									line-height: 30.5rpx;
								}
							}
						}
					}
				}
			}

		}

		.v-footer {
			width: 702rpx;
			height: 50rpx;
			background: #ffffff;
			border-radius: 0px 0px 20rpx 20rpx;
			border-top: 1px solid rgba(229, 229, 229, 1);

			display: flex;
			justify-content: flex-end;
			justify-items: flex-end;

			.v-col1 {
				width: 26rpx;
				height: 26rpx;
				margin-top: 13rpx;
				margin-left: 338rpx;
			}

			.v-col2 {
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #999999;
				margin-top: 10rpx;
				margin-left: 206rpx;
			}

			.v-col3 {
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: rgba(55, 123, 232, 1);
				margin-top: 10rpx;
				margin-right: 20rpx;
			}
		}

		.v-row-footer1 {
			position: fixed;
			bottom: 100rpx;
left: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			width: 100vw;
			height: 80rpx;
			opacity: 0.9;
			background: #ffffff;
			box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.09);

			image {
				width: 30rpx;
				height: 30rpx;
			}
.v-row1{
	margin-left: 48rpx;
	margin-right: 16rpx;
}
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
			position: fixed;
			bottom: 0;
			display: flex;
			left: 0;
			width: 100vw;

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
			.disable{
				background-color: #999999;
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
	}

	.dialogExpress {
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

			input {
				width: 449rpx;
				height: 68rpx;
				background: #f5f5f5;
				margin: 40rpx;
				padding: 0 20rpx;
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
