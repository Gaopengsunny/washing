<template>
	<view class="page">
		<view class="withdrawalBox" v-for="(item,index) in cardList" :key="index">
			<view class="header">
				<view class="headerLeft">
					<!-- <image src="@/static/images/card/card-time.png" mode /> -->
					<view>
						<text>{{item.bankName}}</text>
						<text class="type">{{item.bankCardType|changeType}}</text>
					</view>
				</view>
				<image src="@/static/images/bankCard/del.png" @click="deleteUserBankList(item.bankCardId)" mode />
			</view>
			<view class="foot">**** **** **** {{item.bankNumber}}</view>
		</view>
		<view class="addCard" @click="goAdd()">+ 添加银行卡</view>
	</view>
</template>

<script>
	import {
		getUserBankList,
		deleteUserBankList
	} from '@/api/index'
	export default {
		data() {
			return {
				cardList: [],
			}
		},
		onShow() {
			this.getUserBankList()
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
			goAdd() {
				uni.navigateTo({
					url: '/pages/addBankCard/index',
				})
			},
			async getUserBankList() {
				let data = await getUserBankList()
				this.cardList = data
			},
			deleteUserBankList(id) {
				deleteUserBankList({
					"bankCardId": id
				}).then(res => {

				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	.page {
		background-color: #f5f5f5;
		height: calc(100vh - 30rpx);
		padding-top: 30rpx;

		.withdrawalBox {
			width: calc(95% - 40rpx);
			padding: 20rpx;
			background-color: #407cdd;
			margin: 0 auto;
			border-radius: 10rpx;

			.header {
				display: flex;
				justify-content: space-between;

				.headerLeft {
					display: flex;

					image {
						width: 52rpx;
						height: 52rpx;
						margin-right: 15rpx;
					}

					view {
						display: flex;
						flex-direction: column;

						text {
							font-size: 28rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							text-align: left;
							color: #ffffff;
							line-height: 36rpx;
						}

						.type {
							font-size: 22rpx;
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

		.addCard {
			width: calc(95% - 60rpx);
			padding: 30rpx;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 10rpx;
			margin-top: 30rpx;
		}
	}
</style>
