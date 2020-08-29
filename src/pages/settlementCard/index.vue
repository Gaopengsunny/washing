<template>
	<view class="view-body">
		<view class="v-body100">
			<image class="v-col1 head" :src="imgUrl+user.avatar"></image>
			<view class="v-col2">
				<view class="v-row1">
					<view class="v-col1">{{ user.username }}</view>
					<image v-if="user.sex==0" class="v-col2" src="@/static/images/tabbar/sex0.png"></image>
					<image v-if="user.sex==1" class="v-col2" src="@/static/images/tabbar/sex0.png"></image>
				</view>
				<view class="v-row2">{{ user.mobile }}</view>
			</view>
		</view>
		<view class="goodsBox">
			<view class="goodsHead">
				<view class="goodsLeft">
					<image src="@/static/images/collection/card-pay.png" mode=""></image>
					<view class="content">
						<text class="title"><text class="price">￥{{parseInt(cardInfo.amount)/100}}</text>{{cardInfo.typeName}}</text>
						<text class="color">￥{{parseInt(cardInfo.saleAmount)/100}}</text>
					</view>
				</view>
				<view class="goodsRight">
					<text class="num">×1</text>
				</view>
			</view>
			<view class="goodsFoot">
				<text>小计</text>
				<text class="price">￥{{parseInt(cardInfo.saleAmount)/100}}</text>
			</view>
		</view>
		<view class="discountBox">
			<view class="discountItem">
				<text>支付方式</text>
				<view class="right">
					<text>微信支付</text>
				</view>
			</view>
		</view>

		<view class="discountBox">
			<view class="discountItem">
				<text>备注（选填）</text>
				<view class="right">
					<text class="deno">完成</text>
				</view>
			</view>
			<textarea  placeholder="备注" v-model="remark" />
			</view>
			<view class="operationBox">
				<text >合计:￥{{parseInt(cardInfo.saleAmount)/100}}</text>
				<view class="" @click="rechargeCard()">
					收款
				</view>
			</view>
	</view>
</template>
<script>
	// import CmdIcon from "@/components/cmd-icon.vue";
	import {
		acqGetAddress,
		getCardType,
		rechargeCard,
		getByUserId
	} from "@/api/index"
	import {imgUrl} from "@/plugins/config.js"
	export default {
		// components: { CmdIcon },
		data: () => ({
			user: {},
			addressList: [],
			cardInfo:{},
			remark:"",
			userInfo:{}
		}),
		onLoad(options) {
			const user = JSON.parse(decodeURIComponent(options.user));
			this.user = user;
			// this.$set(this.user, 0, user);
			console.log(user)
			this.getUserAddress(user);
			this.getCardType(user)
			this.getByUserId()
		},
		methods: {
			getUserAddress(user) {
				acqGetAddress({
					"userId": user.userId
				}).then(res => {
					console.log(res),
						this.addressList = res
				})
			},
			fnAdd() {
				uni.navigateTo({
					url: `/pages/acqAddAddress/index?userId=${this.user.userId}`
				});
			},
			fnToChooseGoods() {
				uni.navigateTo({
					url: `/pages/acqChooseGoods/index?user=` + encodeURIComponent(JSON.stringify(this.user)),
				});
			},
			next() {
				uni.navigateTo({
					url: `/pages/acqChooseGoods/index?user=` + encodeURIComponent(JSON.stringify(this.user)),
				});
			},
			async getCardType(card){
				let data =await	getCardType({"typeId":card.cardId})
				this.cardInfo = data
			},
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},
			rechargeCard(){
				let param ={
					orderCards:[
						{
							cardId:this.cardInfo.typeId,
							number:1
						}
					],
						"userId":this.user.userId,
						"remark":this.remark,
						"commissionId":this.userInfo.userId
				}
				rechargeCard(param).then(res=>{
					console.log(`/pages/collection/index?price=${this.cardInfo.amount}&url='${res.codeUrl}'`)
					let option ={
						"price":this.cardInfo.amount,
						"url":res.codeUrl,
						"orderSn":res.orderSn
					}
					uni.setStorageSync("payParam",option)
					uni.navigateTo({
						url:`/pages/collection/index`
					})
				})
			}
		},
	};
</script>
<style lang="scss" scoped>
	.view-body{
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
	.v-body100 {
		width: 750rpx;
		height: 146rpx;
		background: rgba(55, 123, 232, 1);

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: nowrap;
		.head{
			width: 86rpx;
		}
		.v-col1 {
			height: 86rpx;
			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 18rpx;
		}

		.v-col2 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;

			.v-row1 {
				width: 149rpx;
				display: flex;
				justify-content: start;
				align-items: flex-start;

				.v-col1 {
					height: 42rpx;
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #ffffff;
					line-height: 42rpx;
					white-space: nowrap;

					margin-top: 33rpx;
					margin-left: 0rpx;
					margin-right: 10rpx;
				}

				.v-col2 {
					width: 30rpx;
					height: 30rpx;
					margin-top: 39rpx;
				}
			}

			.v-row2 {
				width: 149rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
				line-height: 36rpx;

				margin-top: 6rpx;
				margin-left: 0rpx;
			}
		}

		.v-col3 {
			width: 145rpx;
			height: 54rpx;
			border: 2rpx solid #ffffff;
			border-radius: 10rpx;

			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 54rpx;
			padding: 0rpx;

			margin-top: 44rpx;
			margin-right: 24rpx;

			::after {}
		}

		.v-col4 {
			width: 145rpx;
			height: 54rpx;
			border: 2rpx solid #ffffff;
			border-radius: 10rpx;

			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 54rpx;
			padding: 0rpx;


			margin-top: 44rpx;
			// margin-right: 24rpx;
		}
	}

	.goodsBox {
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		width: calc(95% - 60rpx);
		padding: 30rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: 30rpx;
		.goodsHead {	
			padding-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #e1e1e1;
			.goodsLeft {
				display: flex;

				image {
					width: 150rpx;
					height: 150rpx;
					margin-right: 10rpx;
				}

				.content {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {

						font-size: 30rpx;
						font-weight: 700;
						color: #333333;
					}

					.color {
						font-size: 24rpx;
						font-weight: 500;
						color: #e83737;
					}
					.price{
						font-size: 30rpx;
						font-weight: 700;
						color: #FF951A;
					}
				}
			}

			.goodsRight {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: flex-end;
				.price {
					font-size: 24rpx;
					font-weight: 500;
					color: #e83737;
				}

				.num {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #666666;
				}
			}


		}
		.goodsFoot{
			padding-top: 30rpx;
			text-align: right;
			text{
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
			}
			.price{
				
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
			}
		}
	}
	.discountBox{
		width: calc(95% - 50rpx);
		padding: 15rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		.first{
			border-bottom: 1rpx solid #e1e1e1;
		}
		textarea {
			width: 100%;
			height: 112rpx;
			background: #f5f5f5;
		}
		.discountItem{
			line-height: 34px;
			display: flex;
			justify-content: space-between;
			text{
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #666666;
			}
				
			.right{
				display: flex;
				align-items: center;
				text{				
					font-size: 24rpx;
					color: #999999;
				}
				.price{
					font-size: 26rpx;
					font-weight: 500;
					color: #ff3636;
				}
				image{
					width: 14rpx;
					height: 25rpx;
					margin-left: 15rpx;
				}
				.deno{
					font-size: 26rpx;
					color: #377BE8;
				}
			}
		}
		
	}
	
.operationBox{
	position: fixed;
	bottom: 0;
	width: calc(100vw - 40rpx);
	left: 0;
	padding: 20rpx;
	display: flex;
	background-color: #FFFFFF;
	justify-content: space-between;
	align-items: center;
	text{
	font-size: 32rpx;
	font-family: PingFang SC, PingFang SC-Medium;
	font-weight: 500;
	text-align: left;
	color: #333333;
		
	}
	view{
		width: 180rpx;
		height: 66rpx;
		background: #377be8;
		border-radius: 33rpx;
		line-height: 66rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
	}
}
</style>
