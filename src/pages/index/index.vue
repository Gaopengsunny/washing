<template>
	<view class="view-body">
		<view class="container">
			<scroll-view class="v-nav" scroll-x="true" :scroll-left="scrollLeft" :show-scrollbar="false"	>
				<button plain v-for="item in statusList" :key="item.index" :class="item.index === btnStatus ? 'active1' : ''"
				 @click="onClick(item.index, $event)">{{item.name}}</button>
			</scroll-view>
			<scroll-view class="orderList" scroll-y="true" :lower-threshold="50" v-if="btnStatus !== 30" @scrolltolower="orderDetailList">
				<view class="box" v-for="(item,index) in orderlist" :key="index">
					<untaken-clothes v-if="btnStatus === 6" :orderInfo="item" :index="index" @onClickOrder="onClickOrder" @onSucess="onSucess"
					 @openMap="openMap" @onFail="onFail"></untaken-clothes>
					<taken-clothes v-if="btnStatus === 7" :orderInfo="item" :index="index"  @onClickOrder="onClickOrder" @onSucess="onSucess" @sealed="sealed"
					 @goStore="goStore"></taken-clothes>
					<submit-store v-if="btnStatus === 17" :orderInfo="item" @onClickOrder="onClickOrder"></submit-store>
					<fail-taken  @openMap="openMap" v-if="btnStatus === 1" :orderInfo="item" @onClickOrder="onClickOrder"></fail-taken>
				</view>

				<view class="loading-text">{{ loadingText }}</view>
			</scroll-view>

			<oldsubmit-store v-if="btnStatus === 30"></oldsubmit-store>
		</view>

		<view class="v-row-footer1" v-if="btnStatus === 2">
			<view class="v-col1"></view>
			<view class="v-col2">全选</view>
			<view class="v-col3">已选</view>
			<view class="v-col4">{{ checkedCount }}</view>
			<view class="v-col5">件</view>
		</view>
		<view class="v-row-footer2" v-if="btnStatus === 2">
			<view class="v-col1">
				<view class="v-row1">已自送至门店</view>
				<view class="v-row2"></view>
			</view>
			<view class="v-col2">
				<view class="v-row1">填写物流信息</view>
				<view class="v-row2"></view>
			</view>
			<view class="v-col3">
				<view class="v-row1">申请平台取件</view>
			</view>
		</view>


		<uni-popup ref="dialogInput" type="dialog" class="dialogInput">
			<view class="box">
				<text class="title">
					取衣失败
				</text>
				<text class="tips">请输入取衣失败原因</text>
				<textarea value="" v-model="failParam.notes" />
				<view class="btnBox">
	  		<button @click="close()">取消</button>
	  		<button class="commit" @click="dialogInputConfirm()">确定</button>
	  	</view>
	  </view>
	</uni-popup>
	
		<uni-popup ref="dialogSeal" type="dialog" class="dialogSeal">
			<view class="box">
				<text class="title">
					封签
				</text>
				<view class="inpbox" >
					<view class="scanBox"  >
						<view class="" v-for="(item,index) in scanList" :key="index">
							<input type="text"  placeholder="请输入封签码" v-model="item.seal" />
							<image class="scan" src="../../static/images/acquirers/scan.png" mode="" @click="scan(index)"></image>
							<image class="add" v-if="index == 0"  src="../../static/images/acquirers/add.png" mode="" @click="addSeal()"></image>
							<image class="red" v-else src="../../static/images/acquirers/red.png" mode="" @click="redSeal(index)"></image>
						</view>
					</view>
				</view>
				<view class="btnBox">
					<button @click="closeel()">取消</button>
					<button class="commit" @click="submit()">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import UntakenClothes from './components/untakenClothes'
	import TakenClothes from './components/takenClothes'
	import SubmitStore from './components/submitStore'
	import oldsubmitStore from './components/oldsubmitStore.vue'
	import failTaken from './components/failTaken.vue'

	import {
		orderDetailList,
		updataOrderStatus,
		orderAbnormal,
		failOrderDetailList
	} from '@/api/index'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			UntakenClothes,
			TakenClothes,
			SubmitStore,
			uniPopup,
			oldsubmitStore,
			failTaken
		},
		data: () => ({
			shops: [],
			count: 10,
			btnStatus: 6,
			checkedCount: 0,
			orderlist: [],
			pageNum: 1,
			pages: 1,
			loadingText: '暂无更多',
			failParam: {},
			statusList: [{
					index: 6,
					name: '未取衣',
				},
				{
					index: 7,
					name: '已取衣',
				},
				{
					index: 30,
					name: '提交门店',
				},
				{
					index: 17,
					name: '已提交',
				},
				{
					index: 1,
					name: '取衣失败',
				}
			],
			sealNum: "",
			scanList:[{
				seal:""
			}],
			selParam:{},
			scrollLeft:0,
			localParam:{}
		}),
		methods: {
			...mapMutations("orderData", ['setOrderInfo']),
			moreList() {
				console.log('123123')
			},
			scan(index){
				let $this = this 
				uni.scanCode({
					success: function (res) {
						$this.$set($this.scanList,index,{"seal":res.result})
					}
				});	
			},
			addSeal(){
				this.scanList.push({"seal":""})
			},
			redSeal(index){
				this.scanList.splice(index,1)
			},
			orderDetailList(localParam) {
				if (this.pageNum > this.pages) {
					this.loadingText = '暂无更多'
				
					return false
				}
				if(this.btnStatus !=6){
					localParam={}
				}
				orderDetailList({
					status: this.btnStatus,
					pageNumber: this.pageNum,
					...localParam
				}).then(res => {
					this.orderlist.push(...res.records)
					this.pages = res.pages
					this.pageNum++
					if (res.pages == res.current) {
						this.loadingText = '暂无更多'
					} else {
						this.loadingText = '加载更多'
					}
					
						uni.stopPullDownRefresh()
				})
			},
			failOrderDetailList(){
				if (this.pageNum > this.pages) {
					this.loadingText = '暂无更多'
					return false
				}
				failOrderDetailList({
					status: this.btnStatus,
					pageNumber: this.pageNum
				}).then(res => {
					res.records.forEach(item=>{
						if(!item.isFailNotes){
							item.isFailNotes=""
						}
						
					})
					this.orderlist.push(...res.records)
					this.pages = res.pages
					this.pageNum++
					if (res.pages == res.current) {
						this.loadingText = '暂无更多'
					} else {
						this.loadingText = '加载更多'
					}
						uni.stopPullDownRefresh()
				})
			},
			closeel() {
				this.$refs.dialogSeal.close()
			},
			submit() {
			let list =[]
			this.scanList.forEach(item=>{
				list.push(item.seal)
			})
			let seal =""
			if(list.length !=0){
				seal = list.join(",")
				this.selParam.seal = seal
			}
			updataOrderStatus(this.selParam).then(res => {
				uni.showToast({
					title: '操作成功',
					duration: 2000,
				})
				this.orderlist[this.selParam.index].isSeal=1
				let obj  =this.orderlist[this.selParam.index]
				this.$set(this.orderlist,this.selParam.index,obj)
				this.closeel()
			})
			
			},
			sealed(param){
				this.scanList=[{
								seal:""
							}]
			
				this.selParam= param
				this.$refs.dialogSeal.open()
				// this.$set(this.orderlist, index, 1)
			},
			onFail(param) {
				this.failParam = param
				this.$refs.dialogInput.open()
			},
			onSucess(param) {
				updataOrderStatus(param).then(res => {
					uni.showToast({
						title: '操作成功',
						duration: 2000,
					})
					this.orderlist.splice(param.index, 1)
				})
			},
			openMap(param) {
				console.log(param)
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
			onClick(index, e) {
				console.log(index)
				this.btnStatus = index
				this.orderlist = []
				this.pageNum = 1
				if (index == 30) {
					return false
				}
				if(index == 17||index == 1){
					this.$nextTick(function() {
					this.scrollLeft = 900
					});
				}
				if(index == 6){
					this.$nextTick(function() {
					this.scrollLeft = 0
					});
					this.orderDetailList(this.localParam)
				}
				if(index == 1){
					this.failOrderDetailList()
					
				}else{
					
					this.orderDetailList(this.localParam)
				}
			},
			goStore() {
				this.onClick(30, 0)
			},
			onClickOrder(orderInfo) {
				this.setOrderInfo(orderInfo)
				uni.navigateTo({
					url: `/pages/order/index`,
				})
			},
			change() {},
			dialogInputConfirm() {
				orderAbnormal(this.failParam).then(res => {
					uni.showToast({
						title: '操作成功',
						duration: 2000,
					})
					this.$refs.dialogInput.close()
					this.orderlist.splice(this.failParam.index, 1)
				})
			},
			close(){
					this.$refs.dialogInput.close()
			},
			onOneCheckedChange(data) {
				if (data.data.ischecked) {
					this.checkedCount++
				} else {
					this.checkedCount--
				}
			},
			onFold(folder) {
				let order = folder.folder
				folder.folder.total++
				// let order = this.orderlist[0];
				order.isfold = !order.isfold
				for (let i = 0; i < order.list.length; i++) {
					if (i >= 2) {
						order.list[i].isshow = !order.isfold
					}
				}

				console.log(folder)
			},
			onAllChecked() {},
		},
		computed: {
			...mapState("orderData", ['orderDetail']),
		},
		onShow() {
			if(uni.getStorageSync('tabIndex')){
				this.onClick(30)
				uni.removeStorageSync("tabIndex")
			}
		},
		onLoad: function(options) {
			let $this = this
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					$this.localParam= res
					$this.orderDetailList($this.localParam)
			    }
			});
			
			uni.$on('onOneCheckedChange', this.onOneCheckedChange)
			uni.$on('onFold', this.onFold)
			let userInfo = uni.getStorageSync('userInfo')
			
		},
		onPullDownRefresh() {
				this.pageNum =1
				this.orderlist=[]
			if(this.btnStatus == 1){
				this.failOrderDetailList()
				
			}else{	
					this.orderDetailList(this.localParam)
			}
		},
		onReachBottom() {
			this.count += 5
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		margin-bottom: 15rpx;
	}

	.container {
		width: 702rpx;
		padding: 0rpx 24rpx;
	}

	.v-nav {
		white-space: nowrap;
	}

	.v-nav .active1 {
		background: rgba(55, 123, 232, 0.1);
		color: rgba(55, 123, 232, 1);
	}

	.orderList {
		height: calc(100vh - 100rpx);
	}

	.v-nav button {
		display: inline-block;
		background: rgba(255, 255, 255, 1);
		margin-right: 16rpx;
		margin-top: 30rpx;
		border-radius: 10rpx;
		border: none;
		width: 180rpx;
		height: 60rpx;

		font-size: 30rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		line-height: 60rpx;
		color: rgba(102, 102, 102, 1);
	}

	.v-row-footer1 {
		position: fixed;
		bottom: 100rpx;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		width: 750rpx;
		height: 80rpx;
		opacity: 0.9;
		background: #ffffff;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.09);

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

		width: 750rpx;

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
.dialogInput {
			.box {
				background-color: #FFFFFF;
				width: 600rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 40rpx 0;
				margin-bottom: 0;
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
	
				textarea {
					width: 449rpx;
					height: 158rpx;
					background: #f5f5f5;
					margin: 40rpx;
					padding: 0 20rpx;
					font-size: 26rpx;
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

	.dialogSeal {
		.box {
			background-color: #FFFFFF;
			width: 600rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40rpx 0;
			margin-bottom: 0;
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

			.inpbox {
				width: 449rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				
				.scanBox{
					display: flex;
					align-items: center;
					flex-direction: column;
					margin: 20rpx 0;
					
					view{
					display: flex;
					align-items: center;
					margin: 15rpx 0;
					.scan{
						margin: 0 20rpx;
					}
					.red{
						width: 45rpx;
						height: 45rpx;
					}
						input {
							width: 240rpx;
							height: 68rpx;
							background: #f5f5f5;
							padding: 0 10rpx;
							margin-left: 20rpx;
						}
					}
				}
				

				image {
					width: 40rpx;
					height: 40rpx;
				}
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
