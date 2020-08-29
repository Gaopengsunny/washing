<template>
	<view>
		<view class="card-userinfo-box">
			<view class="card-userinfo">
				<view class="card-avatar">
					<image :src="imgUrl+user.avatar" mode="aspectFill"></image>
				</view>
				<view class="card-info">
					<view class="card-name-gender">
						<view class="card-username">{{user.username}}</view>
						<view class="card-usergender">
							<image v-if="user.sex==0" src="@/static/images/tabbar/sex0.png"></image>
							<image v-if="user.sex==1" src="@/static/images/tabbar/sex0.png"></image>
						</view>
						<view class="card-userphone">{{user.mobile}}</view>
					</view>
					<view class="card-userphone">{{user.mobile}}</view>
				</view>
			</view>
			<view class="card-repeat" @click="goCard()">办卡</view>
		</view>
		<view class="goosHead">
			<view class="item">
				选购服务
			</view>
		</view>
		<view class="goodsBox">
			<view class="classificationBox">
				<view :class="[modeIndex == index?'active':'']" v-for="(item,index) in leftData" :key="index" @click="changeMode(item,index)">
					{{item.moduleName}}
				</view>
			</view>
			<view class="rightBox">
				<scroll-view class="goodsHead" scroll-x="true">
					<view :class="[classIndex == index?'active':'']" v-for="(item,index) in classList" :key="index" @click="changeClass(item,index)">
						{{item.name}}
					</view>
				</scroll-view>
				<view class="goodList">
					<view class="goodItem" v-for="(item,index) in goodsData" :key="index" @click="selGood(item)">
						<image :src="imgUrl+item.serviceImg" mode="aspectFit"></image>
						<text class="title">{{item.name}}</text>
						<text>¥{{item.price/100}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="operationBox">
			<view class="">

				<image src="@/static/images/acquirers/acq-cart.png" mode="" @click.stop="isShow=!isShow"></image>
				<text class="number">已选{{allNum}}件</text>
			</view>
			<text class="operation" @click="createWashOrder()">去下单</text>
		</view>
		<view class="mark" v-if="isShow" @click.stop="isShow=!isShow">

		</view>
		<view class="selBox" v-if="isShow">
			<view class="header">
				<text>已选服务</text>
				<text class="clear" @click="clearGoods()">一键清空</text>
			</view>
			<view class="empty" v-if="selList.length ==0">
				购物车还没有商品呦～
			</view>
			<view class="selGood" v-for="(item,index) in selList" :key="index">
				<view class="selLeft">
					<image :src="imgUrl+item.serviceImg" mode=""></image>
					<view class="content">
						<text class="title">{{item.name}}</text>
						<text>{{item.typeName}}</text>
						<text class="price">￥{{item.price/100}}</text>
					</view>
				</view>
				<view class="selRight">
					<image @click="reduceGoods(item,index)" src="@/static/images/acquirers/reduce.png" mode=""></image>
					<view class="num">{{item.selNum}}</view>
					<image @click="addGoods(item,index)" src="@/static/images/acquirers/add.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getCityShopModuleList,
		getClassList,
		getServiceList,
		createWashOrder,
		getByUserId,
		detailsById
	} from "@/api/index"
	import {imgUrl} from "@/plugins/config.js"
	export default {
		components: {},
		data: () => ({
			user: {},
			goodsList: [],
			leftData: [],
			modeIndex: 0,
			classIndex: 0,
			classList: [],
			goodsData: [],
			selList: [],
			isShow: false,
			allNum:0,
			userInfo:{},
			doorInAddressId:"",
			returnAddressId:"",
			imgUrl:imgUrl

		}),
		onLoad(options) {
			console.log(options)
			this.detailsById(options.user)
			this.getCityShopModuleList()
			this.getByUserId()
			this.doorInAddressId =options.doorInAddressId
			this.returnAddressId =options.returnAddressId
		},
		methods: {
			async detailsById(user){
				let data = await	detailsById({"ysUserId":user})
				this.user =data
			} ,
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},
			onClick(user) {

				uni.navigateTo({
					// url: "./customerChose?user=" + encodeURIComponent(JSON.stringify(user)),
				});
			},
			changeMode(item, index) {
				this.modeIndex = index
				this.getClassList(item.id, item.typeId)
			},
			changeClass(item, index) {
				this.classIndex = index
				this.goodList(this.leftData[this.modeIndex].id, item)
			},
			async getCityShopModuleList() {
				let data = await getCityShopModuleList({
					"cityCode": "370200"
				})
				this.leftData = data
				this.getClassList(data[0].id, data[0].typeId)
			},
			async getClassList(id, typeId) {
				let data = await getClassList({
					"cityCode": "370200",
					"serviceType": typeId,
					"moduleId": id
				})
				this.classList = data
				this.goodList(id, data[0])
			},
			async goodList(id, obj) {
				let data = await getServiceList({
					"classId": obj.id,
					"serviceType": 1,
					"shopId": obj.shopId,
					"moduleId": id
				})
				this.goodsData = data.records

			},
			selGood(goods) {
					this.allNum++
				if (this.selList.length == 0) {
					goods.selNum = 1
					this.selList.push(goods)
					return false
				}
				this.selList.forEach((item, index) => {
					if (item.serviceId == goods.serviceId) {
						item.selNum++
						this.$set(this.selList, index, item)
						return false
					}
					if (index == this.selList.length - 1) {
						goods.selNum = 1
						this.selList.push(goods)
					}
				})


			},
			addGoods(item, index) {
				this.allNum++
				item.selNum++
				this.$set(this.selList, index, item)
			},
			clearGoods(){
				this.selList=[]
				this.allNum =0
			},
			reduceGoods(item, index) {
				this.allNum--
				if (item.selNum == 1) {
					this.selList.splice(index,1)
				} else {
					item.selNum--
					this.$set(this.selList, index, item)
				}
			},
			createWashOrder(){
				if(this.selList.length ==0){
					uni.showToast({
						icon:"none",
						title:"请添加商品"
					})
					return false
				}
				let services=[]
				this.selList.forEach(item=>{
					let obj={
						"serviceId":item.serviceId,
						"number":item.selNum
					}
					services.push(obj)
				})
				let param={
					services:services,
					"userId":this.user.userId,
					"receiverId":this.userInfo.userId,
					doorInAddressId :this.doorInAddressId,
					returnAddressId: this.returnAddressId
				}
				createWashOrder(param).then(res=>{
					uni.navigateTo({
						url:`/pages/settlement/index?orderId=${res.orderId}&user=${this.user.userId}`
					})
				})
			},
		goCard(){
			uni.navigateTo({
				 url: `/pages/selCustomer/index?user=` + encodeURIComponent(JSON.stringify(this.user)),
			})
		}
		},
	};
</script>
<style lang="scss" scoped>
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
		border-radius: 43rpx;
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
		margin-right: 15rpx;
	}

	.card-usergender image {
		width: 30rpx;
		height: 30rpx;
	}

	.card-userphone {
		height: 42rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 42rpx;
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
	.goosHead{
		display: flex;
		padding-bottom: 3rpx;
		border-bottom: 1rpx solid #e1e1e1;
		.item{
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #377be8;
			padding: 15rpx 0;
			margin-left: 28rpx;
			border-bottom: 6rpx solid #377be8;
		}
	}

	.goodsBox {
		height: calc(100vh - 200rpx);
		display: flex;

		.classificationBox {
			height: 100%;
			width: 160rpx;
			background: #f7f8f9;

			view {
				height: 91rpx;
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #666666;
				line-height: 91rpx;
			}

			.active {
				color: #377be8;
				background-color: #FFFFFF;

			}
		}

		.rightBox {
			width: calc(100vw - 160rpx);
			height: 100%;
			background-color: #FFFFFF;

			.goodsHead {
				padding: 20rpx 0;
				width: 100%;
				white-space: nowrap;

				view {
					display: inline-block;
					padding: 0 20rpx;
					height: 40rpx;
					border-radius: 20rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					line-height: 40rpx;
					color: #333333;
					margin: 0 20rpx;
				}

				.active {
					background: #377be8;
					color: #ffffff;
				}
			}

			.goodList {
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				.goodItem {
					width: 33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 15rpx 0;

					image {
						width: 150rpx;
						height: 150rpx;
					}

					text {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #e83737;
					}

					.title {
						color: #333333;
					}
				}
			}
		}
	}

	.operationBox {
		position: fixed;
		width: calc(95vw - 60rpx);
		height: 84rpx;
		z-index: 99;
		bottom: 20rpx;
		padding: 0 30rpx;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 42rpx;
		left: 2.5vw;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			display: flex;
			align-items: center;

			image {
				width: 88rpx;
				height: 88rpx;
				margin: 0 20rpx 44rpx 20rpx;

			}
		}

		text {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #ffffff;
			line-height: 23rpx;
		}

		.operation {}
	}

	.mark {
		background-color: rgba(0, 0, 0, 0.3);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 88;
	}

	.selBox {
		position: fixed;
		width: 100vw;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		min-height: 377rpx;
		z-index: 90;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		padding-bottom: 120rpx;
		max-height: 600rpx;
		overflow-y: auto;

		.header {
			width: calc(100% - 50rpx);
			padding: 25rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #e1e1e1;

			text {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #333333;
			}

			.clear {
				color: #999999;
			}
		}

		.empty {
			width: 100%;
			padding: 30rpx 0;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #999999;
		}

		.selGood {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 25rpx;

			.selLeft {
				display: flex;

				image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 15rpx;
				}

				.content {
					display: flex;
					flex-direction: column;

					text {
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #999999;
						font-size: 20rpx;
					}

					.title {
						font-size: 28rpx;
						color: #333333
					}

					.price {
						font-size: 24rpx;
						font-weight: 700;
						color: #e83737;
					}
				}
			}

			.selRight {
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				.num {
					width: 100rpx;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #333333;
				}
			}

		}
	}
</style>
