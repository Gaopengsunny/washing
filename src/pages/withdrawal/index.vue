<template>
	<view class="page">
		<view class="box">
			<view class="cardBox">
				<text class="cardLeft">到账银行卡</text>
				<view class="bank" v-if="cardList.length == 0" @click="goAddBank()">
					添加银行卡
				</view>
				<view class="bank" @click="toggle()" v-else>
					<image src="@/static/images/bankCard/card-logo.png" mode=""></image>
					<view class="content">
						<text class="title">{{cardObj.bankName}}</text>
						<text>尾号{{cardObj.bankNumber}} 储蓄卡</text>
					</view>
				</view>
				<image src="@/static/images/bankCard/right-arrow.png" mode=""></image>
			</view>
			<view class="withdrawalBox">
				<view class="title">
					提现金额
				</view>
				<view class="price">
					<text>¥</text>
					<input type="number" value="" placeholder="0" disabled="" v-model.trim="cashOutData.countCashOut/100" />
				</view>
				<view class="tips">
					可提现金额 {{cashOutData.countCashOut/100}}元 不可提现金额  {{cashOutData.countNoCashOut/100}}元
				</view>
				<button @click="cashOut()"> 提现</button>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" :animation="true" @change="change" class="popup">
			<view class="box">
				<view class="title">
					选择到账银行卡
				</view>
				<view class="withdrawalPopup" v-for="(item,index) in cardList" :key="index" @click="changeBank(item)">
					<view class="header">
						<view class="headerLeft">
							<view>
								<text>{{item.bankName}}{{item.bankCardType|changeType}}({{item.bankNumber}})</text>
								<text class="type">审核完成后到账</text>
							</view>
						</view>
					</view>
				</view>
				<view class="add" @click="goAddBank()">
					使用新卡提现
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import {
		getUserBankList,
		cashOut,
		getCountCashOut
	} from '@/api/index'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				cardList: [],
				cardObj:{
					"countCashOut":0,
					"countNoCashOut":0
				},
				countCashOut:"",
				cashOutData:{}
			}
		},
		onLoad() {
			this.getUserBankList()
			this.getCountCashOut()
		},
		filters: {
			changeType(type) {
				if (type == 0) {
					return '借记卡'
				} else if (type == 1) {
					return '储蓄卡'
				} else {
					return '信用卡'
				}
			},
		},
		methods: {
			change() {

			},
			toggle() {
				this.$refs.popup.open()
			},
			async getCountCashOut(){
				let data = await getCountCashOut()
				this.cashOutData = data
			},
			async getUserBankList() {
				let data = await getUserBankList()
				this.cardList = data
				if(data.length == 0){
					return false
				}
				this.cardObj = data[0]
			},
			goAddBank() {
				uni.navigateTo({
					url: "/pages/addBankCard/index"
				})
			},
			
			changeBank(item){
				this.cardObj = item
			},
			cashOut(){
					if(this.cashOutData.countCashOut ==0){
						uni.showToast({
							icon:"none",
							"title":"无可提现金额"
						})
						return false
					}
				let param ={
					"bankCardId":this.cardObj.bankCardId,
					"refundTime":this.cashOutData.refundTime,
					"countCashOut":this.cashOutData.countCashOut
				}
				cashOut(param).then(res=>{
					uni.showToast({
						icon:"none",
						title:"提现成功"
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},600)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		padding-top: 30rpx;

		.box {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;

			.cardBox {
				background-color: #EBF2FD;
				padding: 30rpx 20rpx;
				width: calc(100% - 40rpx);
				display: flex;
				justify-content: space-between;

				text {
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					line-height: 36rpx;
				}

				.cardLeft {
					font-size: 28rpx;
					color: #333333;
				}

				.bank {
					display: flex;
					width: calc(100% - 200rpx);

					image {
						width: 41rpx;
						height: 41rpx;
						margin-right: 10rpx;
					}

					.content {
						display: flex;
						flex-direction: column;

						text {
							font-size: 22rpx;
							font-weight: 400;
							color: #999999;
						}

						.title {
							font-size: 28rpx;
							color: #333333;
						}
					}
				}

				image {
					width: 14rpx;
					height: 25rpx;
				}

			}

			.withdrawalBox {
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				line-height: 36rpx;
				padding-top: 20rpx;

				.title {
					font-size: 28rpx;
					color: #333333;
					padding: 20rpx;
				}

				.price {
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #e5e5e5;
					width: 100%;
					padding: 20rpx;

					text {
						font-size: 48rpx;
						font-weight: 500;
						color: #333333;
						margin-right: 15rpx;
					}

					input {
						font-size: 48rpx;
						font-weight: 500;
						color: #333333;
					}
				}

				.tips {
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 20rpx;

				}

				button {
					width: 95%;
					height: 88rpx;
					background: #377be8;
					border-radius: 20rpx;
					color: #ffffff;
					line-height: 88rpx;
					font-size: 30rpx;
					font-weight: 500;
					margin-top: 50rpx;
				}
			}
		}

		.popup {
			.box {
				background-color: #FFFFFF;

				.title {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
					background-color: #FFFFFF;
					padding: 20rpx;
				}

				.add {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #377be8;
					padding: 20rpx 0 40rpx 0;
					background-color: #FFFFFF;
				}

				.withdrawalPopup {
					width: calc(95% - 40rpx);
					padding: 20rpx;
					margin: 0 auto;
					border-radius: 10rpx;

					.header {
						display: flex;
						justify-content: space-between;
						width: 100%;
						padding: 15rpx 0;
						border-bottom: 1rpx solid #e5e5e5;

						.headerLeft {
							display: flex;

							width: 100%;

							image {
								width: 52rpx;
								height: 52rpx;
								margin-right: 15rpx;
							}

							view {
								display: flex;
								flex-direction: column;

								text {
									font-size: 32rpx;
									font-family: PingFang SC, PingFang SC-Regular;
									text-align: left;
									color: #333333;
									line-height: 36rpx;
								}

								.type {
									font-size: 26rpx;
									font-weight: 400;
									color: #999999;
								}
							}
						}

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}

					.foot {
						width: 100%;
						text-align: center;
						font-size: 48rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #ffffff;
						margin-top: 20rpx;
					}
				}
			}


		}
	}
</style>
