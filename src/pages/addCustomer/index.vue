<template>
   <view class="content">
       <view class="top-bar">
           <view class="left-button" @click="fnAddUser()">{{leftButton}}</view>
           <view class="center-title">{{title}}</view>
           <view class="right-button">{{leftButton}}</view>
        </view>
       <view class="user-info">
           <view class="contact">
               <view class="contact-logo">
                     <image class="v-col1" src="@/static/images/card/icon-name.png"></image>
                   </view>
               <view class="left">姓名：</view>
                <input placeholder="请输入姓名" class="right" v-model="user_name" />
            </view>
           <view class="contact">
               <view class="contact-logo">
                     <image class="v-col1" src="@/static/images/card/icon-phone.png"></image>
                   </view>
               <view class="left">手机号码：</view>
                <input placeholder="请输入手机号码" class="right" type="number" v-model="user_phone" />
            </view>
           <view class="contact">
               <view class="contact-logo">
                     <image class="v-col1" src="@/static/images/card/icon-phone.png"></image>
                  
                   </view>
               <view class="left">性别：</view>
               <view class="right-gender">
                   <view class="right-gender-image" @click="chooseGender('1')" v-if="gender === '1'">
                    <image class="v-col1" src="@/static/images/card/icon-select.png"></image>
                    </view>
                   <view class="right-gender-image" @click="chooseGender('1')" v-if="gender === '2'">
                    <image class="v-col1" src="@/static/images/card/icon-select-no.png"></image>
                    </view>
                   <view class="right-gender-text">男</view>
                </view>
               <view class="right-gender">
                   <view class="right-gender-image" @click="chooseGender('2')" v-if="gender === '2'"><image src="@/static/images/card/icon-select.png"> </view>
                   <view class="right-gender-image" @click="chooseGender('2')" v-if="gender === '1'"><image src="@/static/images/card/icon-select-no.png"> </view>
                   <view class="right-gender-text">女</view>
                </view>
            </view>
        </view>
       <view class="submit" @click="fnAddUser()">增加</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            leftButton: "",
            title: "增加新顾客",
            gender: "1",
            url1: "@/static/images/card/icon-select.png",
            url2: "@/static/images/card/icon-select-no.png",
        }
    },
    onLoad() {

    },
    methods: {
        fnAddUser() {
            const url = '/subPages/apply/add/index';
            uni.navigateTo({
                url
            });
        },

        chooseGender(type) {
            if (type === "1") {
                this.gender = "1"
            } else if (type === "2") {
                this.gender = "2";
            }
        }
    }
}
</script>
<style>
.top-bar {
    width: 100%;
    height: 86rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 42rpx;
    background: #377be8;
    color: #ffffff;
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