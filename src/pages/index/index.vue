<template>
  <view class="page">
    <image class="logo" src="@/static/images/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import { home } from '@/api'

export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = await home()
      if (!data) return
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include flex(flex-start, $fd: column);
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
