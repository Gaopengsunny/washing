<template>
	<view class="content">
		<view class="card-userinfo-box">
			<view class="card-userinfo">
				<view class="card-avatar">

					<image :src="user.avatar" mode="aspectFill"></image>
				</view>
				<view class="card-info">
					<view class="card-name-gender">
						<view class="card-username">{{ user.username }}</view>
						<view class="card-usergender">
							<image v-if="user.sex==0" src="@/static/images/tabbar/sex0.png"></image>
							<image v-if="user.sex==1" src="@/static/images/tabbar/sex0.png"></image>

						</view>
					</view>
					<view class="card-userphone">{{ user.mobile }}</view>
				</view>
			</view>
			<view class="card-repeat" @click="again()">重新选择</view>
		</view>
		<scroll-view scroll-y="true" class="cardList" @scrolltolower="allRechargeCard">
			<view v-for="(item,index) in cardList" :key="index" @click="goSettlement(item.typeId)">
				<CardList :item="item" />
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import CardList from '@/pages/card/components/cardList'
	import {
		allRechargeCard,
		getByUserId,
		rechargeCard
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
				pageNum: 1,
				user: {}
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
		onLoad(options) {
			const user = JSON.parse(decodeURIComponent(options.user));
			this.user = user;
			// this.$set(this.user, 0, user);
			// this.getUserAddress(user);
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
					type:1
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
			fnChoseUser() {
				const url = '/subPages/apply/search/index';
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
			},
			again() {
				uni.switchTab({
					url: `/pages/acquirers/index`,
				});
			},
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},
			goSettlement(cardId) {
				this.user.cardId = cardId
				uni.navigateTo({
					url: `/pages/settlementCard/index?user=` + encodeURIComponent(JSON.stringify(this.user)),
				})
			},
			rechargeCard() {
				rechargeCard().then(res => {

				})
			}
		}
	}
</script>
<style>
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

	.card-logo image {
		width: 180rpx;
		height: 126rpx;
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
	}
</style>
