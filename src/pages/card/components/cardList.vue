<template>
    <view class="card-list-box">
            <ul>
                <li  @click="fnToCreatOrder(item)">
                    <view class="card-list">
                        <view class="card-list-content">
                            <view class="card-logo">
                                 <image class="v-col1" src="@/static/images/card/card-logo.png"></image>
								<text class="logoPrice">￥{{parseInt(item.saleAmount)  /100}}</text>
								<image class="penguin" src="@/static/images/card/card-penguin.png"></image>
							</view>
                            <view class="card-name">
                                <text>{{parseInt(item.amount)/100}}元</text>{{item.typeName}}
                            </view>
                        </view>
                        <view class="card-price">￥{{parseInt(item.saleAmount)  /100}}</view>
                    </view>
                </li>
            </ul>
        </view>
</template>
<script>
export default {
    props:["cardList"],
    data() {
        return {}
    },
	props:{
		item:{}	
	},
    methods: {
        // ...mapActions(['addGoodsCount', 'subGoodsCount', 'removeGoodsItem']),
        fnSelectGoods(index) {
			
            // this.$store.commit('cart/selectGoodsItem', index)
        },
    }
}
</script>
<style scoped lang="scss">
		

	
</style>