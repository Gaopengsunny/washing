<template>
	<view class="page">
		<view class="flex-row me-top" v-if="isLogin">
			<image v-if="!userInfo.headImage" class="image-round head" src="../../static/images/me/me-head.png" @click="login()"></image>
			<image v-else class="image-round head" :src="userInfo.headImage" ></image>
			<view class="flex-wrap">
				<view style="font-size: 36rpx;">{{userInfo.userName}}</view>
				<view class="phone">{{userInfo.phone}}</view>
			</view>
			<view class="flex-between income" @click="goIncome()">
				<view>
					<view>我的收入</view>
					<view class="money">¥{{countIncome/100}}</view>
				</view>
				<image class="arrow-white" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
		</view>
		<view class="flex-row me-top" v-else>
			<view class="flex-wrap">
				<view style="font-size: 36rpx;width: 100%;text-align: center;" @click="login()">请登录</view>
			</view>
		</view>
		<view class="white-view" style="margin-top: -110rpx;">
			<view class="flex-row title-view">
				<image class="icon-img" src="../../static/images/me/me-pick.png"></image>
				<view class="flex-wrap">我的取衣</view>
				<image class="arrow-gray" @click="goTake(0)" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
			<view class="flex-row">
				<view class="flex-column-center card-view" v-for="(item, index) in myPick" :key="index" @click="goTake(index)">
					<view class="imgBox">
						<view class="imgNum" v-if="index == 0">{{countObtain.notObtainCount}}</view>
						<view class="imgNum" v-if="index == 1">{{countObtain.obtainCount}}</view>
						<view class="imgNum" v-if="index == 2">{{countObtain.arriveCount}}</view>
						<image :src="item.img"></image>
					</view>
					<view>{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="white-view">
			<view class="flex-row title-view">
				<image class="icon-img" src="../../static/images/me/me-send.png"></image>
				<view class="flex-wrap">我的送衣</view>
				<image class="arrow-gray" @click="goGive(0)" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
			<view class="flex-row">
				<view class="flex-column-center card-view" v-for="(item, index) in mySend" :key="index" @click="goGive(index)">
					<view class="imgBox">
						<view class="imgNum" v-if="index == 0">{{countTransport.notTransportCount}}</view>
						<view class="imgNum" v-if="index == 1">{{countTransport.transportCount}}</view>
						<image :src="item.img" />
					</view>
					<view>{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="white-view">
			<view class="flex-row title-view list-item" @click="goReceipt()">
				<image class="icon-img" src="../../static/images/me/me-order.png"></image>
				<view class="flex-wrap">我的收单</view>
				<image class="arrow-gray" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
			<view class="line"></view>
			<view class="flex-row title-view list-item" @click="goRecord()">
				<image class="icon-img" src="../../static/images/me/me-card.png"></image>
				<view class="flex-wrap">办卡记录</view>
				<image class="arrow-gray" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
		</view>
		<view class="white-view ">
			<view class="flex-row title-view list-item" @click="goInformation()">
				<image class="icon-img" src="../../static/images/me/me-info.png"></image>
				<view class="flex-wrap">基本信息</view>
				<image class="arrow-gray" src="../../static/images/me/arrow-right-gray.png"></image>


			</view>
			<view class="line"></view>
			<view class="flex-row title-view list-item" @click="gowithdrawal()">
				<image class="icon-img" src="../../static/images/me/me-tixian.png"></image>
				<view class="flex-wrap">提现信息</view>
				<image class="arrow-gray" src="../../static/images/me/arrow-right-gray.png"></image>
			</view>
		</view>
		<view class="flex-between white-view switch-view">
			<view>接单开关</view>
			<switch :checked="userInfo.status == 1" @change="switch1Change" />
		</view>
		<view class="white-view quit" @click="loginOut()">退出登录</view>
	</view>
</template>

<script>
	import {
		zbWebAccess,
		getByUserId,
		updataUser,
		countObtainOrder,
		countTransportOrder,
		getCountIncome
	} from "@/api/index"
	export default {
		data: () => ({
			shops: [],
			myPick: [{
					img: '../../static/images/me/me-unsend.png',
					text: '未取衣',
				},
				{
					img: '../../static/images/me/me-alsend.png',
					text: '已取衣',
				},
				{
					img: '../../static/images/me/me-store.png',
					text: '已提交',
				},
			],
			mySend: [{
					img: '../../static/images/me/me-unsend.png',
					text: '未送衣',
				},
				{
					img: '../../static/images/me/me-alsend.png',
					text: '已送衣',
				},
			],
			ordersOpen: true,
			userInfo: {},
			countObtain: {},
			countTransport: {},
			isLogin: false,
			countIncome:0

		}),
		onLoad() {

		},
		onShow() {
			if (uni.getStorageSync("token")) {
				this.isLogin = true
			}
			this.getByUserId()
			this.countObtainOrder()
			this.countTransportOrder()
			this.getCountIncome()
		},
		methods: {
			login() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						zbWebAccess({
							"code": loginRes.code
						}).then(res => {
							uni.navigateTo({
								url: `/pages/login/index?openid=${res.openid}&sessionKey=${res.session_key}`
							});
						})
					}
				});
			},
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},

			async countObtainOrder() {
				let data = await countObtainOrder()
				this.countObtain = data
			},
			async countTransportOrder() {
				let data = await countTransportOrder()
				this.countTransport = data
			},
			async getCountIncome() {
				let data = await getCountIncome()
				this.countIncome = data.countIncome
			},
			goIncome(){
				uni.navigateTo({
					url: '/pages/myIncome/index'
				});
			},
			goTake() {
				uni.navigateTo({
					url: '/pages/myTakeClothes/index'
				});
			},
			goGive() {
				uni.navigateTo({
					url: '/pages/myGive/index'
				});
			},
			goReceipt() {
				uni.navigateTo({
					url: '/pages/myReceipt/index'
				});
			},
			goRecord() {
				uni.navigateTo({
					url: '/pages/cardRecord/index'
				});
			},
			goInformation() {
				uni.navigateTo({
					url: '/pages/information/index'
				});
			},

			gowithdrawal() {
				uni.navigateTo({
					url: '/pages/myWithdrawal/index'
				});
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				console.log(this.userInfo)
				let status = e.target.value ? '1' : '0'
				updataUser({
					"status": status
				}).then(res => {

				})
			},
			loginOut(){
				let $this= this
				uni.showModal({
				    title: '提示',
				    content: '是否退出登录',
				    success: function (res) {
				        if (res.confirm) {
							uni.removeStorageSync("token")
							$this.isLogin = false
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}


		},

	};
</script>

<style lang="scss" scoped>
	.me-top {
		width: 100%;
		height: 470rpx;
		background-image: url('../../static/images/me/me-bg.png');
		background-size: 100% 100%;
		color: white;

		.head {
			width: 136rpx;
			height: 136rpx;
			margin-left: 30rpx;
			margin-right: 20rpx;
		}

		.phone {
			font-size: 26rpx;
			width: 186rpx;
			height: 50rpx;
			line-height: 50rpx;
			margin-top: 20rpx;
			background: rgba(255, 255, 255, 0.05);
			border: 2rpx solid rgba(255, 255, 255, 0.5);
			border-radius: 10rpx;
			text-align: center;
		}

		.income {
			width: 170rpx;
			height: 90rpx;
			background: #3745e8;
			border-radius: 46rpx 0px 0px 46rpx;
			padding: 0 30rpx;
			font-size: 28rpx;

			.money {
				font-size: 20rpx;
				line-height: 20rpx;
			}

			.arrow-white {
				width: 14rpx;
				height: 26rpx;
			}
		}
	}

	.white-view {
		background: white;
		border-radius: 20rpx;
		margin: 0 24rpx 24rpx;

		.title-view {
			height: 80rpx;
			border-bottom: 2rpx solid #e5e5e5;

			.icon-img {
				width: 36rpx;
				height: 36rpx;
				margin: 0 10rpx 0 40rpx;
			}

			.arrow-gray {
				width: 14rpx;
				height: 26rpx;
				margin-right: 16rpx;
			}
		}

		.card-view {
			flex: 1;
			height: 140rpx;
			font-size: 26rpx;
			border-left: 2rpx solid #e5e5e5;

			.imgBox {
				position: relative;

				image {
					width: 44rpx;
					height: 44rpx;
					margin-bottom: 10rpx;
				}

				.imgNum {
					position: absolute;
					font-size: 16rpx;
					width: 26rpx;
					height: 26rpx;
					line-height: 26rpx;
					background-color: #377be8;
					color: #FFFFFF;
					border-radius: 13rpx;
					text-align: center;
					right: -10rpx;
					top: -5rpx;
				}
			}

			&:first-child {
				border-left: none;
			}
		}

		.line {
			width: 640rpx;
			height: 2rpx;
			background: #e5e5e5;
			margin: 0 auto;
		}

		.list-item {
			height: 88rpx;
			border-bottom: none;
		}
	}

	.switch-view {
		height: 90rpx;
		padding: 0 24rpx;

		switch {
			transform: scale(0.7);
		}
	}

	.quit {
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin-top: 40rpx;
		margin-bottom: 70rpx;
		box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.06);
	}
</style>
