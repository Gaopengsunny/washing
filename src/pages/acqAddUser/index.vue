<template>
    <view class="content">
        <view class="user-info">
            <view class="contact">
                <view class="contact-logo">
                    <image class="v-col1" src="@/static/images/card/icon-name.png"></image>
                </view>
                <view class="left">姓名  ：</view>
                <input placeholder="请输入姓名" class="right" v-model="username" />
            </view>
            <view class="contact">
                <view class="contact-logo">
                    <image class="v-col1" src="@/static/images/card/icon-phone.png"></image>
                </view>
                <view class="left">手机号码：</view>
                <input placeholder="请输入手机号码" class="right" type="number" v-model="mobile" />
            </view>
            <view class="contact">
                <view class="contact-logo">
                    <image class="v-col1" src="@/static/images/card/icon-phone.png"></image>
                </view>
                <view class="left">性别  ：</view>
                <view class="right-gender">
                    <view class="right-gender-image" @click="chooseGender(1)" v-if="sex == 1">
                        <image class="v-col1" src="@/static/images/card/icon-select.png"></image>
                    </view>
                    <view class="right-gender-image" @click="chooseGender(1)" v-if="sex == 0">
                        <image class="v-col1" src="@/static/images/card/icon-select-no.png"></image>
                    </view>
                    <view class="right-gender-text">男</view>
                </view>
                <view class="right-gender">
                    <view class="right-gender-image" @click="chooseGender(0)" v-if="sex == 0">
                        <image src="@/static/images/card/icon-select.png">
                    </view>
                    <view class="right-gender-image" @click="chooseGender(0)" v-if="sex == 1">
                        <image src="@/static/images/card/icon-select-no.png">
                    </view>
                    <view class="right-gender-text">女</view>
                </view>
            </view>
        </view>
        <view class="submit" @click="fnAddUser()">增加</view>
    </view>
</template>
<script>
import { acqAddUser } from "@/api/index"
export default {
    data() {
        return {
            username: "",
            mobile: "",
            sex: 1,
            url1: "@/static/images/card/icon-select.png",
            url2: "@/static/images/card/icon-select-no.png",
			cardId:false
        }
    },
    onLoad(option) {
		if(option.isNext){
			 this.cardId =option.isNext
		}
    },
    methods: {
        fnAddUser() {
			if(this.username ==""){
				uni.showToast({
					icon:"none",
					title:"请输入姓名"
				})
				return false
			}
			if(this.mobile ==""){
				uni.showToast({
					icon:"none",
					title:"请输入手机号"
				})
				return false
			}
            acqAddUser({ "username": this.username, "mobile": this.mobile, "sex": this.sex}).then(res => {
               uni.showToast({
               	icon:"none",
				title:"操作成功"
               })
			   if(this.cardId){
				   res.cardId =this.cardId
				   uni.navigateTo({
				   	url: `/pages/settlementCard/index?user=` + encodeURIComponent(JSON.stringify(res)),
				   })
				   return false
			   }
			   
			   uni.navigateBack({
			   	delta:1
			   })
			 
			   
                // if(res.code == 200){
                //     uni.navigateTo({
                //         url: `/pages/acqChooseAddress/index?user=` + encodeURIComponent(JSON.stringify(user)),
                //     });
                // }
            })
        },

        chooseGender(type) {
            if (type == 0) {
                this.sex = 0
            } else if (type == 1) {
                this.sex = 1;
            }
        }
    }
}
</script>
<style>
.user-info {
    height: 300rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 24rpx;
    padding: 0 20rpx;
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
    margin-left: 20rpx;
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