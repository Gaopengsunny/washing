<template>
	<view class="view-body">
		<view class="v-body100">
			<image class="v-col1 header" :src="imgUrl+user.avatar"></image>
			<view class="v-col2">
				<view class="v-row1">
					<view class="v-col1">{{ user.username }}</view>
					<image v-if="user.sex==0" class="sex" src="@/static/images/tabbar/sex0.png"></image>
					<image v-else class="sex" src="@/static/images/tabbar/sex1.png"></image>
				<view class="v-row2">{{ user.mobile }}</view>
				</view>
				<view class="v-row2">{{ user.mobile }}</view>
			</view>
		</view>
		<view class="goodsBox">
			<view class="goodsHead" v-for="(item,index) in orderDetail.ysWashOrderServiceList" :key="index">
				<view class="goodsLeft">
						<image :src="imgUrl+item.serviceImg" mode=""></image>
					<view class="content">
						<text class="title">{{item.name}}</text>
						<text class="color">{{item.typeName?item.typeName:''}}</text>
						<view class="btn" @click="edit(index,item)">填写瑕疵信息</view>
					</view>
				</view>
				<view class="goodsRight">
					<text class="price">￥{{item.shopPrice/100}}</text>
					<text class="num">×{{item.number}}</text>
				</view>
			</view>
			<view class="goodsFoot">
				<text>小计</text>
				<text class="price">￥{{orderDetail.orderAmount/100}}</text>
			</view>
		</view>
		<view class="discountBox">
			<view class="discountItem first">
				<text>平台卡</text>
				<view class="right">
					<text class="price">-¥{{balanceprice/100}}</text>
					<image src="@/static/images/me/arrow-right-gray.png" mode=""></image>
				</view>
			</view>
			<view class="discountItem" @click="toggle()">
				<text>优惠劵</text>
				<view class="right">
					<text v-if="available.length == 0">暂无可用</text>
					<text v-else>{{available.length}}张可用</text>
					<image src="@/static/images/me/arrow-right-gray.png" mode=""></image>
				</view>
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

		<view class="discountBox remaker">
			<view class="discountItem">
				<text>备注（选填）</text>
				<view class="right">
					<!-- <text class="deno">完成</text> -->
				</view>
			</view>
			<textarea value="" placeholder="备注" v-model="notes" />
			</view>
				<view class="operationBox">
							<text >合计:￥{{price/100}}</text>
							<view class="" @click="collection()">
								收款
							</view>
						</view>
			<uni-popup ref="popup" type="bottom" :animation="true" @change="change" class="popup">
				<view class="box">
				<view class="title">
					优惠券
				</view>
				<view class="tabBox">
					<view :class="[activeIndex==0?'active':'']" @click="changeCoupon(0)">可用优惠券（{{available.length}}）</view>
					<view :class="[activeIndex==1?'active':'']" @click="changeCoupon(1)">不可用优惠券（{{unavailable.length}}）</view>
				</view>
				<scroll-view class="couponBox"  scroll-y="true">   
						<view  :class="[activeIndex==0?'use couponItem':'unUse couponItem']" class="couponItem" v-for="(item,index) in availableList" :key="index">
							<view class="">
								<view class="left">
									<text class="price">￥{{item.price/100}}</text>
									<text>满{{item.minGoodsAmount/100}}使用</text>
								</view>
								<view class="content">
									<text class="title">{{item.bonusTypeName}}</text>
									<text class="date">{{item.expireTime|changeDistance}}到期</text>
									<view class="type">
										<text>洗护周边商品不可用</text>
									</view>
								</view>
							</view>
							<view v-if="activeIndex== 0">
							<image v-if="couponIndex == index" src="@/static/images/coupon/select.png" mode="" @click="selCoupon(-1)"></image>
							<image v-else src="@/static/images/coupon/unSelect.png" mode="" @click="selCoupon(index)"></image>
						</view>
						</view>
				</scroll-view>
				<button type="default" class="submit" @click="submit()">确定</button>
				</view>
			</uni-popup>
			<uni-popup ref="dialogSuccess" type="dialog" class="pop-box">
			<view class="inner">
				<view class="ttl">发送验证码</view>
				<view class="text">验证码已发送至 {{user.mobile}}</view>
				<view class="enter-box">
					<view class="code">
						<text v-for="(o, i) in list" :key="i" :class="{focus: o.fs}" v-text="o.val"></text>
					</view>
					<view class="input">
						<input type="number" focus="true" :maxlength="list.length" @input="onInput" @blur="onBlur" />
					</view>
				</view>
				<view class="count">
					<button v-if="btnShow">{{authTime}}S</button>
					<button v-if="!btnShow" @click="resend()" class="resend">重新发送</button>
				</view>
				<view class="close" @click="closeBtn()">
					<image src="../../static/login/close02.png"></image>
				</view>
			</view>
			</uni-popup>
			<uni-popup ref="dialogInput" type="dialog" class="dialogInput" @change="popupChang">
					<view class="box">
						<text class="title">
							填写瑕疵信息
						</text>
						<view class="tips">	填写瑕疵信息</view>
						<textarea value="" v-model="flawsParam.flawInfo" />
						<view class="imgBox">
							<view class="imageBox"  v-for="(item,index) in flawImgList" :key="index" >
								<image @click="delImg(index)" class="close" src="../../static/images/settlement/close.png" mode=""></image>
								<image :src="imgUrl+item" mode=""></image>
							</view>
							<view class="upBox" @click="upImage()">
								<image src="../../static/images/settlement/camera.png" mode=""></image>
							</view>
						</view>
						<view class="btnBox">
			  		<button @click="close()">取消</button>
			  		<button class="commit" @click="dialogInputConfirm()">确定</button>
			  	</view>
			  </view>
			</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {imgUrl} from "@/plugins/config.js"
	import {
		acqGetAddress,
		orderServiceDetailList,
		detailsById,
		orderBonusList,
		confirmOrder,
		paymentWashOrder,
		getByUserId,
		WashidentityCode,
		WashcheckCode,
		upImage
	} from "@/api/index"
	export default {
		// components: { CmdIcon },
		data: () => ({
			user: {},
			addressList: [],
			orderDetail:{},
			availableList:[],
			available:[],
			unavailable:[],
			activeIndex:0,
			balance:0,
			couponIndex:-1,
			couponPrice:0,
			platformBonusId:"",
			userInfo:{},
			list: [
				{ val: '', fs: true }, 
				{ val: '', fs: false },
				{ val: '', fs: false },
				{ val: '', fs: false }
			],
			authTime:0,
			btnShow:false,
			notes:"",
			imgUrl:imgUrl,
			flaws:[],
			flawsParam:{},
			flawImgList:[],
			
			
		}),
		computed:{
			price(){
			let price =	this.orderDetail.orderAmount - this.balance - this.couponPrice
			if(price<0){
				return 0
			}
			return price
			},
			balanceprice(){
				if(this.balance>0){
						if(this.orderDetail.orderAmount - this.couponPrice>0){
							return this.orderDetail.orderAmount - this.couponPrice
							
						}else{
						return 0
						}
				}else{
					return 0
				} 
			}
		},
		onLoad(options) {
			// const user = JSON.parse(decodeURIComponent(options.user));
			// this.user = user;
			// options.orderId="c036a1c855a51abe4157b0b26ca03ad5"
			// options.user="04ad0740e1c711eaba54a35723b62a96"
			// this.$set(this.user, 0, user);
			
			this.orderServiceDetailList(options.orderId)
			this.detailsById(options.user)
			this.orderBonusList(options.user,options.orderId)
			this.confirmOrder(options.orderId)
			this.getByUserId()
		},
		filters:{
			changeDistance(distance) {
			  console.log(distance)
			       let  time = parseInt(distance)
			       time = new Date(time);
			       let y = time.getFullYear();
			       let m = time.getMonth()+1;
			       let d = time.getDate();
			       let h = time.getHours();
			       let mm = time.getMinutes();
			       let s = time.getSeconds();
			       return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
			 }
			},
			
		methods: {
			selCoupon(index){
				this.couponIndex = index
				if(index>-1){
					this.couponPrice = this.available[index].price
					this.platformBonusId = this.available[index].bonusId
					
				}
			},
			popupChang(e){
				if(!e.show){
					console.log("asdas")
					this.flawImgList=[]
					this.flawsParam={}
					this.$set(this.flawsParam,"flawInfo","")
				}
			},
			async upImage(){
				let data =	await upImage() 
				this.flawImgList.push(data.fileUrl)
			},
			edit(index,item){
					console.log(this.flawsParam)
					this.flawsParam.orderServiceId= item.id
					this.flawsParam.indexs= index
					if(item.flaws){
						console.log(111111)
						this.flawsParam.flawInfo =item.flaws.flawInfo
						this.flawImgList =this.flawImgList
					}
					this.$refs.dialogInput.open()
			},
			close(){
				this.$refs.dialogInput.close()
			},
			dialogInputConfirm(){
				let index =this.flawsParam.indexs
				let obj ={
					...this.orderDetail.ysWashOrderServiceList[index],
					flaws:{
						...this.flawsParam,
						"flawImgList":this.flawImgList
					}
					
				}
				this.$set(this.orderDetail.ysWashOrderServiceList,index,obj)
				this.$refs.dialogInput.close()
			},
			delImg(index){
				this.flawImgList.splice(index,1)
			},
			WashidentityCode(){
				let param ={
					"userId":this.user.userId
					
				}
				WashidentityCode(param).then(res=>{
					this.send()
					this.$refs.dialogSuccess.open()
				})
			},
			send() {
				let _this = this;
				_this.authTime = 60;
				_this.btnShow = true;
				
				console.log('调用验证码接口');
				
				// 倒计时计数器
				var sendTimer = 
				setInterval(() => {
					_this.authTime--;
					if (_this.authTime <= 0) {
						_this.btnShow = false;
						clearInterval(sendTimer);
					};
				}, 1000);
			},
			onInput(e) {
				let lists = this.list,
					values = e.target.value;
				for (let i = 0; i < lists.length; i++) {
					lists[i].fs = false;
					lists[i].val = values[i];
					if (!values[i]) {
						lists[i].val = '';
					};
				};
				let len = values.length;
				if (len > 0 && len <= 5) {
					lists[len-1].fs = true;
				} else if (len == 6) {
					lists[5].fs = true;
				} else if (len == 0) {
					lists[0].fs = true;
				};
				
				// 验证码输入值与后台返回验证码进行比较
				// 此处示例123456即为后台获取的验证码值,替换即可
				let _this = this;
				if (len == 4) {
					console.log(values)
			        _this.$refs.dialogSuccess.close();
					_this.WashcheckCode(values)
					
				};
			},
			WashcheckCode(code){
				let param ={
					"code":code,
					"userId":this.user.userId
					
				}
				WashcheckCode(param).then(res=>{
					this.paymentWashOrder()
				})	
			},
				
			onBlur(){
			},
			collection(){
				console.log("asdas")
				if(this.balance>0&&this.couponPrice<=this.orderDetail.orderAmount){
					this.WashidentityCode()
				}else{
					this.paymentWashOrder()
				}
			},
			async getByUserId() {
				let data = await getByUserId()
				this.userInfo = data
			},
			paymentWashOrder(){
				let flaws =[]
				this.orderDetail.ysWashOrderServiceList.forEach(item=>{
					if(item.flaws){
						flaws.push(item.flaws)
					}
					
				})
				
				let param ={
					"orderId":this.orderDetail.orderId,
					"originForm":"2",
					"payCode":"3",
					"platformBonusId":this.platformBonusId,
					"notes":this.notes,
					"userId":this.user.userId,
					"receiverId":this.userInfo.userId,
					"flaws":flaws
				}
				paymentWashOrder(param).then(res=>{
					if(res.notPay){
							uni.reLaunch({
								url:"/pages/paySuccess/index?isSuccess=1"
							})
							return false
					}
					let option ={
						"price":this.price,
						"url":res.codeUrl,
						"orderSn":res.orderSn
					}
					uni.setStorageSync("payParam",option)
					uni.navigateTo({
						url:`/pages/collection/index`
					})
				})
			},
			submit(){
				this.$refs.popup.close()
			},  
			confirmOrder(orderId){
				confirmOrder({"orderId":orderId}).then(res=>{
					this.balance = res.balance
				})	
			},
			changeCoupon(index){
				this.activeIndex = index
				if(index ==0){
					this.availableList =this.available
					
				}else{
					this.availableList =this.unavailable
				}
				console.log(this.availableList)
			},
			async detailsById(user){
				let data = await	detailsById({"ysUserId":user})
				this.user =data
			} ,
			orderServiceDetailList(orderId){
				let param ={
						"orderId":orderId,
						"type":"2",
						status:"1"
					}
				orderServiceDetailList(param).then(res=>{
					this.orderDetail = res
				})	
			},
			
			orderBonusList(userId,orderId){
				
				orderBonusList({"orderId":orderId,"userId":userId}).then(res=>{
					console.log(res)
					this.availableList =  res.data.available
					this.available =  res.data.available
					this.unavailable =  res.data.unavailable
				})
			},
			change() {
			
			},
			toggle() {
				this.$refs.popup.open()
			},
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
			}
		},
	};
</script>
<style lang="scss" scoped>
	.view-body{
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 80rpx;
	}
	.v-body100 {
		width: 750rpx;
		height: 146rpx;
		background: rgba(55, 123, 232, 1);
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		.header{
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
				display: flex;
				align-items: center;
				margin-top: 33rpx;
				.v-col1 {
					height: 42rpx;
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #ffffff;
					line-height: 42rpx;
					white-space: nowrap;

					margin-left: 0rpx;
					margin-right: 10rpx;
				}

				.sex {
					width: 30rpx;
					height: 30rpx;
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
		padding: 0 30rpx 30rpx 30rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: 30rpx;
		.goodsHead {	
			padding: 30rpx 0;
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
					justify-content: flex-start;
					
					.title {

						font-size: 26rpx;
						font-weight: 700;
						color: #333333;
					}

					.color {
						font-size: 24rpx;
						font-weight: 500;
						color: #999999;
					}

					.btn {
						width: 136rpx;
						height: 40rpx;
						background: rgba(250, 102, 37, 0.05);
						border: 1rpx solid #fa6625;
						border-radius: 5rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #fa6625;
						line-height: 40rpx;
						text-align: center;
						margin-top: 28rpx;
					}
				}
			}

			.goodsRight {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
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
	.remaker{
		padding-bottom: 20rpx !important;
	}
	.discountBox{
		width: calc(95% - 50rpx);
		padding: 0 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		.first{
			border-bottom: 1rpx solid #e1e1e1;
		}
		textarea {
			width:calc(100% - 30rpx);
			height: 112rpx;
			background: #f5f5f5;
			padding: 15rpx;
			margin-bottom: 20rpx;
		}
		.discountItem{
			line-height: 91rpx;
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
	.popup {
			.box {
				background-color: #FFFFFF;
					border-top-left-radius:25rpx ;
					border-top-right-radius:25rpx ;
					position: relative;
					padding-bottom: 120rpx;
					.title{
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #333333;
						padding: 20rpx;
					
				}
				.tabBox{
					display: flex;
					align-items: center;
					justify-content: space-around;
					view{
						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #999999;
						padding-bottom: 15rpx;
						
					}
						
					.active{
						color: #333333;
						border-bottom: 1rpx solid #377BE8;
					}
				}
				.couponBox{
					
					white-space: nowrap;
					background-color: #F5F5F5;
					max-height: 600rpx;
					.use{
							background-image: url(../../static/images/coupon/color.png);
					}
					.unUse{
							background-image: url(../../static/images/coupon/grey.png)
						
					}
					.couponItem{
						display: inline-block;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						width: 95%;
						height:160rpx;
						display:flex ;
						justify-content: space-between;
						align-items: center;
						margin:20rpx auto;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 30rpx;
						}
						view{
							display: flex;
							.left{
								width: 190rpx;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								text{
									font-size: 22rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									color: #ffffff;
								}
								.price{
									font-size: 30rpx;
									font-weight: 800;
									margin-bottom: 15rpx;
								}
							}
							.content{
								display: flex;
								flex-direction: column;
								text{
									font-size: 22rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
								}
								.title{
									font-size: 32rpx;
									font-family: PingFang SC, PingFang SC-Bold;
									font-weight: 700;
									color: #ff3636;
									padding: 0;
									margin-top: 10rpx;
								}
								.date{
									font-size: 22rpx;
									font-weight: 500;
									color: #999999;
									margin-top: 5rpx;
								}
								.type{
									display: flex;
									align-items: center;
									margin-top: 25rpx;
									.btn{
										background-color: #377BE8;
										font-size: 22rpx;
										font-weight: 500;
										color: #ffffff;
										padding: 5rpx;
										border-radius: 25rpx;
									}
									text{
										font-size: 22rpx;
										color: #999999;
									}
								}
							}
							
							
						}
							
					}
				}
				.submit{
					position: absolute;
					bottom: 30rpx;
					left: 2.5%;
					width: 95%;
					height: 88rpx;
					line-height: 88rpx;
					background: #377be8;
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #ffffff;
					
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
		z-index: 99;
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
	
	
	/* 验证码弹窗 */
	.pop-box .inner {
		padding: 30upx;
		width: 100%;
		position: relative;
		border-radius: 14upx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.pop-box .ttl {
		margin-bottom: 20upx;
		color: #141414;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
	}
	.pop-box .text {
		padding: 20upx 0;
		font-size: 30upx;
		color: #666;
		text-align: center;
	}
	.pop-box .enter-box {
		margin-bottom: 50upx;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.pop-box .code {
		display: flex;
		justify-content: space-between;
	}
	.pop-box .code text {
		width: 70upx;
		height: 48upx;
		line-height: 48upx;
		border-bottom: 6upx solid #F0F0F0;
		text-align: center;
		color: #141414;
		font-size: 32upx;
	}
	.pop-box .code text.focus {
		border-color: #3C70FF;
	}
	.pop-box .input {
		position: absolute;
		width: 100%;
		height: 48upx;
		left: 0;
		top: 0;
		opacity: 0;
	}
	/* 实际input高度 必须 > 显示input高度 */
	.pop-box .input input {
		width: 100%;
		height: 60upx;
		outline: none;
		border: none;
		background: none;
	}
	.pop-box .count button {
		color: #999;
		font-size: 32upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 8upx;
		background-color: #F0F0F0;
	}
	.pop-box .count button::after {
		display: none;
	}
	.pop-box .count .resend {
		color: #3C70FF;
	}
	.pop-box .close {
		padding: 10upx;
		position: absolute;
		right: 10upx;
		top: 10upx;
	}
	.pop-box .close image {
		width: 48upx;
		height: 48upx;
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
					z-index: 99;
					text {
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #333333;
					}
		
					.title {}
		
					.tips {
						width: 449rpx;
						text-align: left;
						font-size: 22rpx;
						font-weight: 400;
						color: #999999;
						margin-top: 20rpx;
					}
					.imgBox{
						width: 489rpx;
						margin-bottom: 20rpx;
						display: flex;
						flex-wrap: wrap;
						.imageBox{
							width: 100rpx;
							height: 100rpx;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
							position: relative;
							image{
								width: 100%;
								height: 100%;
							}
							.close{
								width: 20rpx;
								height: 20rpx;
								position: absolute;
								top: -10rpx;
								right: -10rpx;
								z-index: 9;
							}
						}
						.upBox{
							width: 100rpx;
							height: 100rpx;
							background: #ffffff;
							border: 1rpx dashed #cccccc;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
							image{
									width: 34rpx;
									height: 29rpx;
							}
						}
						
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
	
</style>
