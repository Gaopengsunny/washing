<template>
	<view class="content">
		<view class="top-bar">
			<view class="left-button"></view>
			<view class="center-title">{{title}}</view>
			<view class="right-button"></view>
		</view>
		<scroll-view scroll-y="true" class="cardList" @scrolltolower="allRechargeCard">
			<view v-for="(item,index) in cardList" :key="index" @click="fnChoseUser(item.typeId)">
				<CardList :item="item" />
			</view>
			<view class="noCard" v-if="cardList.length ==0">
				<image src="../../static/images/card/noCard.png" mode=""></image>
				<text>暂无卡片数据</text>
			</view>
		</scroll-view>

	</view>
</template>
<script>
	import CardList from './components/cardList'
	import {
		allRechargeCard
	} from "@/api/index"
	export default {
		data() {
			return {
				leftButton: "选择顾客",
				title: "办卡",
				pages: 1,
				hasUser: false,
				selectUser: {
					"username": "测试1",
					"gender": 1,
					"phone": "1888888888"
				},
				cardList: [],
				pageNum: 1
			}
		},
		components: {
			CardList
		},
		onLoad() {
			if (this.hasUser) {
				this.leftButton = "";
			} else {
				this.leftButton = "选择顾客"
			}

		},
		onShow() {
			this.allRechargeCard()
		},
		methods: {
			allRechargeCard() {
				if (this.pageNum > this.pages) {
					this.loadingText = '暂无更多'
					return false
				}
				allRechargeCard({
					pageNumber: this.pageNum,
					"type": 1
				}).then(res => {
					this.cardList.push(...res.records)
					this.pages = res.pages
					this.pageNum++
					if (res.pages == res.current) {
						this.loadingText = '暂无更多'
					} else {
						this.loadingText = '加载更多'
					}
				})
			},
			fnChoseUser(id) {
				const url = `/pages/selAcquirers/index?id=${id}`
				uni.navigateTo({
					url
				});
			},
			fnToCreatOrder(item) {
				if (this.hasUser) {
					const url = `/subPages/apply/settlement/index`
					uni.navigateTo({
						url,
					})
				} else {
					console.log("请选择用户");
				}
			}
		}
	}
</script>
<style lang="scss">
	.content {}

	.top-bar {
		width: 100%;
		height: 146rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #377be8;
		color: #ffffff;
		padding-top: 30rpx;
	}

	.cardList {

		height: calc(100vh - 20rpx);
		

	}
.noCard {
	margin: 0 auto;
	margin-top:200rpx;
	text-align: center;
			image {
				width: 593rpx;
				height: 356rpx;
				margin: 0 auto;
			}

			text {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #999999;
			}
		}
	.center-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #ffffff;
	}


	.left-button {
		font-size: 30rpx;
		font-weight: 400;
		color: #ffffff;
		margin-left: 30rpx;
	}

	.right-button {
		font-size: 30rpx;
		font-weight: 400;
		color: #ffffff;
		margin-right: 30rpx;
		visibility: hidden;
	}

	.card-userinfo-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 120rpx;
		background: #377be8;
	}

	.card-userinfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 24rpx;
	}

	.card-avatar {
		width: 86rpx;
		height: 86rpx;
		border-radius: 43rpx;
	}

	.card-avatar image {
		width: 86rpx;
		height: 86rpx;
	}

	.card-info {
		margin-left: 15rpx;
	}

	.card-name-gender {
		display: flex;
		align-items: center;
		justify-content: left;
	}

	.card-username {
		height: 42rpx;
		font-size: 30rpx;
		font-weight: 500;
		text-align: left;
		color: #ffffff;
		line-height: 36rpx;
	}

	.card-usergender {
		width: 30rpx;
		height: 42rpx;
		margin-left: 10rpx;
		line-height: 42rpx;
	}

	.card-usergender image {
		width: 30rpx;
		height: 30rpx;
	}

	.card-userphone {
		height: 33rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 36rpx;
	}

	.card-repeat {
		width: 146rpx;
		height: 54rpx;
		border: 2rpx solid #ffffff;
		border-radius: 10rpx;
		font-size: 28rpx;
		margin-right: 24rpx;
		text-align: center;
		line-height: 54rpx;
		color: #ffffff;
	}

	.card-list {
		height: 174rpx;
		background: #ffffff;
		margin: 36rpx 25rpx 0rpx 25rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.card-list-content {
		display: flex;
		justify-content: space-between;
	}

	.card-logo {
		width: 180rpx;
		height: 126rpx;
		margin-left: 25rpx;
		position: relative;
		overflow: hidden;
	}

	.card-logo image {
		width: 180rpx;
		height: 126rpx;
	}

	.card-logo .logoPrice {
		position: absolute;
		color: #FEAD30;
		bottom: -22rpx;
		font-size: 50rpx;

	}

	.card-logo .penguin {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		z-index: 99;
	}

	.card-name {
		font-size: 32rpx;
		font-weight: 700;
		text-align: left;
		color: #333333;
		line-height: 24rpx;
		margin-left: 16rpx;
		margin-top: 20rpx;
	}

	.card-name text {
		color: #FF3636;
	}

	.card-price {
		width: 136rpx;
		height: 46rpx;
		border: 1rpx solid #051878;
		border-radius: 10rpx;
		position: absolute;
		right: 31rpx;
		bottom: 24rpx;
		color: #051878;
		line-height: 46rpx;
		text-align: center;
	}
</style>
