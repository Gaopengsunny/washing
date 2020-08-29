<template>
	<view class="content">
		<view class="user-info">
			<view class="contact">
				<view class="contact-logo">
					<image class="v-col1" src="@/static/images/acquirers/acq-add-name.png"></image>
				</view>
				<view class="left">发件人：</view>
				<input placeholder="请输入发件人姓名" class="right" v-model="param.consigneeName" />
			</view>
			<view class="contact">
				<view class="contact-logo">
					<image class="v-col1" src="@/static/images/acquirers/acq-add-mobile.png"></image>
				</view>
				<view class="left">手机号码：</view>
				<input placeholder="请输入发件人手机号码" class="right" type="number" v-model="param.consigneePhone" />
			</view>
			<view class="contact">
				<view class="contact-logo">
					<image class="v-col1" src="@/static/images/acquirers/acq-add-city.png"></image>
				</view>
				<view class="left"  data-layer="3">所在地区：</view>
				<input placeholder="省市区县、乡镇等" class="right" disabled="" type="number" @click.stop="showPicker($event)" v-model="user_city" />
				<image class="v-col1" src="@/static/images/acquirers/acq-add-more.png"></image>
			</view>
			<view class="contact">
				<view class="contact-logo">
					<image class="v-col1" src="@/static/images/acquirers/acq-add-city.png"></image>
				</view>
				<view class="left"  data-layer="3">街道：</view>
				  <picker @change="bindPickerChange" :value="index" :range="streeList" range-key="name">
				         <view class="uni-input" v-if="streeList[index]">{{streeList[index].name}}</view>
						 <view class="uni-input" v-else>请选择</view>
				   </picker>
				<image class="v-col1" src="@/static/images/acquirers/acq-add-more.png"></image>
			</view>
			<view class="contact">
				<view class="contact-logo">
					<image class="v-col1" src="@/static/images/acquirers/acq-add-address.png"></image>
				</view>
				<view class="left">详情地址：</view>
				<input placeholder="请输入详细地址" class="right"  v-model="param.address" />
			</view>
		</view>
		<view class="submit" @click="acqAddAddress()">增加</view>
		
		<aui-picker 
			ref="picker" 
			:title="auiPicker.title"
			:layer="auiPicker.layer"
			:cityData="auiPicker.data"
			@callback="pickerCallback"
		></aui-picker>
	</view>
</template>
<script>
	import {
		getArea,
		acqAddAddress
	} from "@/api/index"
	import {aui} from '@/components/aui/js/aui.js';
import { mapMutations, mapState } from 'vuex'
	import {cityData} from './components/aui-picker/city.data.js'; //城市数据
	console.log(cityData)
	// import auiHeader from './components/aui-header/aui-header.vue';
	import auiPicker from './components/aui-picker/aui-picker.vue';
	export default {
		components: {
			auiPicker
		},
		data: () => ({
			param:{
				consigneeName:"",
				consigneePhone:"",
				address:"","isDefault":0 ,
				street:"",
				district:""
			},
				contentHeight: null,
				auiPicker: {
					title: '选择地址',
					layer: null,
					data: []
				},
				user_city:"",
				streeList:[],
				index:0
			
		}),
		onLoad(option) {
			this.param.userId = option.userId
		},
		methods: {openWin(url, opts){
				aui.openWin(url, opts)
			},
			closeWin(){
				aui.closeWin()
			},
			headerHeight(e){
				//console.log(e);
				const { windowWidth, windowHeight } = uni.getSystemInfoSync();
				// #ifdef APP-PLUS
					this.contentHeight = windowHeight - e + 'px';				
				// #endif
			},
			//显示picker多级联动弹窗
			showPicker(e){
					const _this = this;
					_this.auiPicker.layer = 3;_this.auiPicker.data = cityData;
					_this.$refs.picker.open().then(function(){
						console.log('picker打开');
					});
			},
			//显示picker多级联动弹窗
			pickerCallback(e){
				let result =""
				e.data.forEach(item=>{
					result =result+ item.name+ " "
					
				})
				this.user_city =result
				console.log(this.user_city)
				this.param.province=e.data[0].id
				this.param.provinceName=e.data[0].name
				this.param.city=e.data[1].id
				this.param.cityName=e.data[1].name
				this.param.district=e.data[2].id
				this.param.districtName=e.data[2].name
				this.getArea(e.data[2].id)
			},
			getArea(id){
				getArea({"parentId":id}).then(res=>{
					this.streeList =res
				})
			},
			 bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						this.param.street = this.streeList[ e.target.value].id
						this.param.streetName = this.streeList[ e.target.value].name
			        },
			fnAddAddress() {
				// uni.navigateTo({
				// 	url: `/pages/acqChooseGoods/index`,
				// });
			},
			acqAddAddress(){
				if(this.param.consigneeName == ''){
					uni.showToast({
						icon:"none",
						title:"请输入发件人"
					})
					return false
				}
				if(this.param.consigneePhone == ''){
					uni.showToast({
						icon:"none",
						title:"请输入手机号"
					})
					return false
				}
				if(this.param.district== ''){
					uni.showToast({
						icon:"none",
						title:"请选择省市区"
					})
					return false
				}
				if(this.param.street== ''){
					uni.showToast({
						icon:"none",
						title:"请选择街道"
					})
					return false
				}
				if(this.param.address == ''){
					uni.showToast({
						icon:"none",
						title:"请输入详细地址"
					})
					return false
				}
				acqAddAddress(this.param).then(res=>{
					uni.navigateBack({
						delta:1
					})
				})
			}
		},
	};
</script>
<style lang="scss" scoped>
	/*每个页面公共css */
	.user-info {
		background: #ffffff;
		border-radius: 20rpx;
		margin: 24rpx;
		padding: 0 20rpx;
		height: 398rpx;
	}

	.contact {
		display: flex;
		align-items: center;
		padding-left: 10rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 24rpx;
		padding: 24rpx;
	}

	.contact image {
		width: 30rpx;
		height: 30rpx;
	}

	.left {
		width: 120rpx;
		margin-left: 10rpx;
	}

	.right {
		padding-left: 20rpx;
		flex: 1;
	}

	.right-gender {
		display: flex;
		align-items: center;
	}

	.right-gender-image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 56rpx;
	}

	.right-gender-text {
		margin-left: 10rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
	}

	.submit {
		width: 700rpx;
		height: 88rpx;
		background: #377be8;
		border-radius: 20rpx;
		position: absolute;
		bottom: 80rpx;
		left: 50%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 88rpx;
		margin-left: -350rpx
	}
</style>
