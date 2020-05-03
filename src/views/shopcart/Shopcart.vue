<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部的汇总 -->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartButtomBar from './childComps/CartButtomBar'

import {mapGetters} from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartButtomBar
  },
  computed: {
    // mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性中
    // 两种语法
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
