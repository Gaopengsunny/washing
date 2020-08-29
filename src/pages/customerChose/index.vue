<template>
  <view class="view-body">
    <view class="v-body100">
      <image class="v-col1" :src="user.avatar"></image>
      <view class="v-col2">
        <view class="v-row1">
          <view class="v-col1">{{ user.username }}</view>
          <image class="v-col2" :src="user.seximg"></image>
        </view>
        <view class="v-row2">{{ user.userphone }}</view>
      </view>
      <button class="v-col3 icon iconfont icon-banka" type="primary" plain>
        <!-- <cmd-icon type="credit-card" color="#ffffff" size="14"></cmd-icon> -->
        办卡
      </button>

      <button class="v-col4" type="primary" plain>
        重新选择
      </button>
    </view>
    <view class="icon iconfont icon-banka">asf</view>
  </view>
</template>

<script>

// import CmdIcon from "@/components/cmd-icon.vue";

export default {
  // components: { CmdIcon },
  data: () => ({
    user: {},
  }),
  onLoad(options) {
    const user = JSON.parse(decodeURIComponent(options.user));
    this.user = user;
    // this.$set(this.user, 0, user);
  },
  onNavigationBarButtonTap(e) {
    console.log(e);
    const index = e.index;
    console.log(this);
    console.log(this.$mp.page);
    if (index === 0) {
      if (e.text === "编辑") {
        var currentWebview = this.$mp.page.$getAppWebview();
        currentWebview.setTitleNViewButtonStyle(0, {
          text: "完成",
        });
        // this.titleNViewWebview()
        this.showChecked = true;
      } else {
        var currentWebview = this.$mp.page.$getAppWebview();
        currentWebview.setTitleNViewButtonStyle(0, {
          text: "编辑",
        });
        // this.titleNViewWebview()
        this.showChecked = false;
      }
    }
  },
  methods: {},
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
      width: 149rpx;
      display: flex;
      justify-content: start;
      align-items: flex-start;

      .v-col1 {
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

      .v-col2 {
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

    ::after {
    }
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

    // margin-top: 44rpx;
    // margin-right: 24rpx;
  }
}
</style>
