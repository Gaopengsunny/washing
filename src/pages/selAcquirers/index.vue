<template>
	<view class="view-body">
		<!-- <view class="v-top">
      <view class="v-title">收单</view>
    </view> -->
		<view class="v-header">
			<input type="text" class="v-col1" placeholder="请输入用户名或手机号" placeholder-class="placeholder-class" maxlength="30"
			 confirm-type="search" v-model="param.search" @confirm="acqSearchUser()" />

			<view class="v-col2">
				<button type="primary" plain class="v-search" @click="acqSearchUser()">
					查询
				</button>
			</view>
			<button type="primary" plain class="v-col3" @click="goAdd()">新增顾客</button>
		</view>
	<view class="v-body" v-for="(user, index) in list" :key="index">
		<image class="v-col1" v-if="user.avatar" :src="imgUrl+user.avatar"></image>
		<image class="v-col1" v-else src="@/static/images/tabbar/take-order-01.png"></image>
		
		<view class="v-col2">
			<view class="v-row1">
				<view class="v-col1 name">{{ user.username }}</view>
				<image class="v-col2" v-if="user.sex == 1" src="@/static/images/tabbar/sex1.png"></image>
				<image class="v-col2" v-else src="@/static/images/tabbar/sex0.png"></image>
				
			</view>
			<view class="v-row2">{{ user.mobile }}</view>
		</view>
		<button class="v-col3" type="primary" plain @click="onClick(user)">
			选择
		</button>
	</view>
	<view class="footTitle" v-if="list.length == 0">
		暂无顾客
	</view>
	</view>
</template>

<script>
	import {
		acqSearchUser
	} from "@/api/index"
	import {imgUrl} from "@/plugins/config.js"
	export default {
		components: {},
		data: () => ({
			list: [
			],
			param :{
				search:""
			},
			imgUrl:imgUrl,
			cardId:""
		}),
		onLoad(option) {
			console.log(option)
			this.cardId =option.id
		},
		methods: {
			async acqSearchUser() {
				let data = await acqSearchUser(this.param)
				this.list =data.records
			},
			onClick(user) {
				user.cardId =this.cardId
				uni.navigateTo({
					url: `/pages/settlementCard/index?user=` + encodeURIComponent(JSON.stringify(user)),
				})
			},
			
			goAdd() {
				uni.navigateTo({
					url: `/pages/acqAddUser/index?isNext=${this.cardId}`
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.v-top {
		//   width: 750rpx;
		//   height: 128rpx;
		//   background: #377be8;
		//   box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.06);
		//   color: rgba(255, 255, 255, 1);
		//   display: flex;
		//   justify-content: center;
		//   align-items: center;

		//   .v-title {
		//     width: 68rpx;
		//     height: 48rpx;
		//     font-size: 34rpx;
		//     font-family: PingFang SC, PingFang SC-Bold;
		//     font-weight: 700;
		//     text-align: center;
		//     color: #ffffff;
		//     line-height: 36rpx;
		//   }
		color: black;
	}

	.v-header {
		width: 750rpx;
		height: 120rpx;
		background: #377be8;

		display: flex;
		justify-content: space-around;
		align-items: start;

		margin-bottom: 40rpx;

		.v-col1 {
			width: 516rpx;
			height: 72rpx;
			background: #ffffff;
			border-radius: 36rpx;
			padding-left: 40rpx;

			font-size: 26rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
			line-height: 36rpx;
			caret-color: blue;

			margin-left: 24rpx;
			margin-top: 24rpx;
		}

		.v-col2 {
			width: 120rpx;
			height: 72rpx;
			background: #ffffff;
			border-radius: 36rpx;
			padding-left: 40rpx;
			margin-left: -160rpx;
			margin-top: 24rpx;
			z-index: 999;

			.v-search {
				width: 120rpx;
				height: 54rpx;
				background: #377be8;
				border-radius: 27rpx;
				border: none;

				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 54rpx;

				float: right;
				margin-right: 10rpx;
				margin-top: 9rpx;
			}
		}

		.v-col3 {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 36rpx;
			border: none;
			padding: 0;

			margin-right: 24rpx;
			margin-top: 40rpx;
			margin-left: 34rpx;
		}
	}

	.v-body {
		width: 702rpx;
		height: 146rpx;
		background: #ffffff;
		border-radius: 20rpx;

		margin-left: 24rpx;
		margin-bottom: 20rpx;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: nowrap;

		.v-col1 {
			width: 86rpx;
			height: 86rpx;

			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 18rpx;
			border-radius: 43rpx;
		}

		.v-col2 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;

			.v-row1 {
				display: flex;
				justify-content: start;
				align-items: flex-start;

				.v-col1 {
					height: 42rpx;
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
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
			.name{
				width: auto !important;
			}

			.v-row2 {
				width: 149rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 36rpx;

				margin-top: 6rpx;
				margin-left: 0rpx;
			}
		}

		.v-col3 {
			height: 58rpx;
			background: rgba(55, 123, 232, 0.1);
			border-radius: 10rpx;

			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #377be8;
			line-height: 58rpx;

			border: none;
			margin-top: 44rpx;
			margin-right: 24rpx;
		}
		
	}
.footTitle{
			width: 100%;
			text-align: center;
			
		}
</style>
