<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" >
      <cart-list-item v-for="(item, index) in cartList" 
                      :key="index" 
                      :product="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    // 当切换到购物车页面时进行刷新可滚动区域
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>

