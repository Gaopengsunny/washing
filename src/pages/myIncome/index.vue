<template>
	<view class="page">
		<view class="pageHeader">
			<view class="title">
				待提现
			</view>
			<view class="priceBox">
				<view class="zhanwei">

				</view>
				<view class="price">
					¥{{statistics.countNoCashOut/100}}
				</view>
				<view class="btn" @click="goWithdrawal()">
					提现
				</view>
			</view>
			<view class="moneyBox">
				<view class="moneyItem">
					<text class="title">总收入</text>
					<text>¥{{statistics.countIncome/100}}</text>
				</view>
				<view class="moneyItem">
					<text class="title">已提现</text>
					<text>¥{{statistics.countCashOut/100}}</text>
				</view>
			</view>

			<view class="chartBox">
				<view class="head">
					<text>收入展示</text>
					<easy-select ref="easySelect3" size="mini" :value="selecValue3" @selectOne="selectOne3"></easy-select>
					
				</view>
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
				 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchColumn" @touchmove="moveColumn" @touchend="touchEndColumn"></canvas>

			</view>

		</view>
		<view class="orderList">
			<view class="title">收入明细</view>
			<view class="orderItem" v-for="(item,index) in orderList" :key="index">
				<image src="@/static/images/income/logo.png" mode=""></image>
				<view class="content">
					<text class="head">{{item.refundType|refundType}}单完成一单</text>
					<text class="address">{{item.shopName?item.shopName:'----'}}</text>
					<text class="time">{{item.nodeCompletionTime|changeDistance}}</text>
				</view>
				<text>+{{parseInt(item.refundMoney)/100}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from './components/u-charts/u-charts.js';
	import easySelect from "./components/easy-select/easy-select.vue"
	import {
		getCountIncome,
		getCountTimeIncome,
		getIncomelist,
		getCountCashOut
	} from "@/api/index"
	let _self;
	let canvaColumn=null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				statistics: {
					countNoCashOut: 0,
					countCashOut: 0,
					countIncome: 0
				},
				selecValue3: '本日',
				orderList: [],
				chartType:1,
				canvaColumn:{},
				pageNumber: 1

			}
		},
		components:{
			easySelect
		},
		filters: {
			refundType(type) {
				switch (type) {
					case 0:
						return "取衣"
						break;
					case 1:
						return "送衣"
						break;
					case 2:
						return "开卡"
						break;
					case 3:
						return "开单"
						break;
					case 4:
						return "洗护"
						break;
					default:
						""
				}
			},
			changeDistance(distance) {
				console.log(distance)
				if (!distance) {
					return "-------"
				}
				let time = parseInt(distance)
				time = new Date(time);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				let h = time.getHours();
				let mm = time.getMinutes();
				let s = time.getSeconds();
				return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
			}
		},
		onLoad() {
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(300);
			
			this.getCountIncome();
			this.getCountTimeIncome()
			this.getIncomelist()
		},
		methods: {
			selectOne3(options) {
				console.log(options)
				this.selecValue3 = options.label
				this.chartType =options.value
				this.getCountTimeIncome()
			},
			async getCountIncome() {
				let data = await getCountIncome()
				this.statistics = data
			},
			
			async getCountTimeIncome() {
				let param = {
					"type": this.chartType
				}
				let data = await getCountTimeIncome(param)
				let categories =[]
				let series =[]
				data.forEach(item=>{
					categories.push(item.time)
					series.push(item.counter)
				})
				this.getServerData(categories,series);
			},
			async getIncomelist() {
				let data = await getIncomelist({"pageNumber":this.pageNumber})
				this.orderList = data.records
			},
			goWithdrawal() {
				uni.navigateTo({
					url: "/pages/withdrawal/index"
				})
			},
			getServerData(categories,series) {
				let data = {"categories":categories,"series":[{"name":"收入","data":series}]}

				let Column = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				Column.categories = data.categories;
				Column.series = data.series;
				this.textarea = JSON.stringify(data);
				this.showColumn("canvasColumn", Column);

			},
			showColumn(canvasId, chartData) {
				let _self = this
			 canvaColumn=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'column',
				fontSize:11,
				padding:[5,15,15,15],
				legend:{
					show:false
				},
				dataLabel:true,
				dataPointShape:true,
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true,
				xAxis: {
					disableGrid:false,
					type:'grid',
					gridType:'dash',
					itemCount:4,
					scrollShow:true,
					scrollAlign:'left',
				},
				yAxis: {
					//disabled:true
					gridType:'dash',
					splitNumber:4,
					format:(val)=>{return val.toFixed(0)+'元'}//如不写此方法，Y轴刻度默认保留两位小数
				},
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					column: {
						type:'group',
						width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
					}
				},
			});

			},
			touchColumn(e){
				canvaColumn.scrollStart(e);
			},
			moveColumn(e) {
				canvaColumn.scroll(e);
			},
			touchEndColumn(e) {
				canvaColumn.scrollEnd(e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f3f3f3;
		height: 100vh;

		.pageHeader {
			height: 472rpx;
			width: 100%;
			background-color: #FF601A;
			padding-top: 80rpx;
			position: relative;

			.title {
				font-size: 34rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;

			}

			.priceBox {
				display: flex;
				justify-content: center;
				margin-top: 50rpx;

				.zhanwei {
					width: 98rpx;
					height: 44rpx;
				}

				.price {
					font-size: 64rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					line-height: 36rpx;
					margin: 0 20rpx;
				}

				.btn {
					font-size: 21rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					width: 98rpx;
					height: 44rpx;
					background: rgba(255, 255, 255, 0.1);
					border: 1rpx solid rgba(255, 255, 255, 0.5);
					border-radius: 22rpx;
					line-height: 44rpx;
				}
			}

			.moneyBox {
				display: flex;
				width: 100%;
				justify-content: space-around;
				margin-top: 50rpx;

				.moneyItem {
					display: flex;
					flex-direction: column;
					align-items: center;

					.title {

						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 36rpx;
					}

					text {
						font-size: 34rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: center;
						color: #ffffff;
						line-height: 36rpx;

					}
				}
			}

			.chartBox {
				position: absolute;
				left: 2.5%;
				width: 95%;
				top: 400rpx;
				height: 390rpx;
				border-radius: 15rpx;
				background-color: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				.head{
					display: flex;
					width: calc(100% - 40rpx);
					padding: 20rpx;
					justify-content: space-between;
				}
			}
		}

		.orderList {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			border-radius: 10rpx;
			margin-top: 260rpx;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #666666;
				line-height: 23rpx;
				padding: 25rpx 20rpx;
			}

			.orderItem {
				display: flex;
				justify-content: space-between;
				width: calc(100% - 40rpx);
				padding: 20rpx;

				image {
					width: 55rpx;
					height: 55rpx;
				}

				text {
					font-family: PingFang SC, PingFang SC-Medium;

					text-align: left;
					line-height: 36rpx;
					font-size: 30rpx;
					font-weight: 700;
					color: #ff951a;
				}

				.content {
					display: flex;
					flex-direction: column;
					width: calc(100% - 200rpx);

					.head {
						font-weight: 500;
						font-size: 30rpx;
						color: #333333;
					}

					.address {
						font-weight: 500;
						font-size: 22rpx;
						color: #999999;
					}

					.time {
						font-weight: 500;
						font-size: 22rpx;
						color: #999999;
					}

				}

			}
		}
	}
</style>
