<template>
    <view class="view-body">
        <view class="v-body100">
            <image class="v-col1" :src="imgUrl+user.avatar"></image>
            <view class="v-col2">
               <view class="v-row1">
                   <view class="name">{{ user.username }}</view>
                   <image v-if="user.sex==0" class="sex" src="@/static/images/tabbar/sex0.png"></image>
                   <image v-if="user.sex==1" class="sex" src="@/static/images/tabbar/sex1.png"></image>
               </view>
                <view class="v-row2">{{ user.mobile }}</view>
            </view>
            <button class="v-col3 icon iconfont icon-banka" type="primary" plain @click="goCard()">
                办卡
            </button>
            <button class="v-col4" type="primary" plain @click="again()">
                重新选择
            </button>
        </view>
        <view class="icon iconfont icon-banka">
            <view class="address-box">
                <view class="address-title">
                    <view class="address-title-left">
                        <img src="@/static/images/acquirers/acq-address.png">
                        <view class="title">选择<text class="type">配送</text>地址</view>
                    </view>
                    <view class="address-title-right">
                        <button type="primary" plain class="address-title-right" @click="fnAdd()">新增地址</button>
                    </view>
                </view>
                <view class="line"></view>
                <view v-for="(item,index) in addressList" :key="index" class="address-list" @click="selAddress(index)">
                    <view class="list-box-top">
                        <img v-if="selIndex == index" src="@/static/images/card/icon-select.png">
                        <img v-else src="@/static/images/card/icon-select-no.png">
                        <view class="name-mobile">{{item.consigneeName}} {{item.consigneePhone}}</view>
                    </view>
                    <view class="address-details">
                        {{item.allAddress}}
                    </view>
                </view>
            </view>
        </view>
		
		<view class="submit" @click="next()">下一步</view>
    </view>
</template>
<script>
// import CmdIcon from "@/components/cmd-icon.vue";
import { acqGetAddress,detailsById } from "@/api/index"
	import {imgUrl} from "@/plugins/config.js"
export default {
    // components: { CmdIcon },
    data: () => ({
        user: {},
        addressList: [],
		 selIndex:0,
		 doorInAddressId:"",
		 imgUrl:imgUrl,
		 userId:""
    }),
    onLoad(options) {
		
		this.doorInAddressId =options.doorInAddressId
		this.userId = 
		this.detailsById(options.user)
		this.getUserAddress(options.user)
    },
	onShow() {
		  this.getUserAddress(this.user);
	},
    methods: {
		async detailsById(user){
			let data = await	detailsById({"ysUserId":user})
			this.user =data
		} ,
        getUserAddress(user) {
            acqGetAddress({ "userId":user }).then(res => {
                console.log(res),
                    this.addressList = res.ysUserAddress
            })
        },
        fnAdd() {
            uni.navigateTo({
              url: `/pages/acqAddAddress/index?userId=${this.user.userId}`
            });
        },
        fnToChooseGoods(){
            uni.navigateTo({
              url: `/pages/acqChooseGoods/index?user=` + encodeURIComponent(JSON.stringify(this.user)),
            });
        },
		next(){
			if(this.addressList.length ==0){
				uni.showToast({
					icon:"none",
					title:"请添加地址"
				})
				return false
			}
			let  returnAddressId = this.addressList[this.selIndex].addressId
			uni.navigateTo({
			  url: `/pages/acqChooseGoods/index?user=${this.user.userId}&doorInAddressId=${this.doorInAddressId}&returnAddressId=${returnAddressId}`,
			});
		},
		again(){
			uni.switchTab({
			  url: `/pages/acquirers/index`,
			});
		},
		selAddress(index){
			this.selIndex = index
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
.v-body100 {
    width: 750rpx;
    height: 146rpx;
    background: rgba(55, 123, 232, 1);

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;

    .v-col1 {
        width: 86rpx;
        height: 86rpx;
		border-radius: 43rpx;
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
            justify-content: start;
            align-items: flex-start;

           .name {
               height: 42rpx;
               font-size: 30rpx;
               font-family: PingFang SC, PingFang SC-Medium;
               font-weight: 500;
               text-align: left;
               color: #ffffff;
               line-height: 42rpx;
               white-space: nowrap;
           
               margin-top: 33rpx;
               margin-left: 0rpx;
               margin-right: 10rpx;
           }
           
           .sex {
               width: 30rpx;
               height: 30rpx;
               margin-top: 39rpx;
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


.icon {
    padding: 0rpx 24rpx;

    .address-box {
        background: #ffffff;
        border-radius: 20rpx;
        margin-top: 30rpx;
        padding: 24rpx;

        .address-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 58rpx;
            line-height: 58rpx;

            .address-title-left {
                display: flex;
                align-items: center;
                font-size: 30rpx;
                font-family: PingFang SC, PingFang SC-Medium;

                img {
                    width: 30rpx;
                    height: 30rpx;
                }

                .title {
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                    margin-left: 5rpx;
					.type{
						color: #F0880E;
					}
                }

            }

            .address-title-right {
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
            }

        }

        .line {
            height: 1rpx;
            background: #e5e5e5;
            margin-top: 24rpx;
        }

        .address-list {
			padding: 30rpx 0;
            .list-box-top {
                display: flex;
                align-items: center;

                img {
                    width: 30rpx;
                    height: 30rpx;
                }

                .name-mobile {
                    font-size: 28rpx;
                    font-family: PingFang SC, PingFang SC-Bold;
                    font-weight: 700;
                    text-align: left;
                    color: #333333;
                    margin-left: 15rpx;
                }
            }

            .address-details {
                height: 33rpx;
                font-size: 24rpx;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: left;
                color: #666666;
                line-height: 33rpx;
                margin-left: 45rpx;
				margin-top: 10rpx;
            }
        }
    }
	
	
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