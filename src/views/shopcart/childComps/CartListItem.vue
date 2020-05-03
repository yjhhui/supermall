<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" 
                    @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="shop-info">
      <div class="info-title">{{product.title}}</div>
      <div class="info-desc">商品描述：{{product.desc}}</div>
      <div class="info-bottom">
        <div class="info-price left">￥{{product.price}}</div>
        <div class="info-count right">
          <button @click="decrement" :disabled="product.count <= 1">-</button>
          x{{product.count}}
          <button @click="increment">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    },
    decrement() {
      this.product.count--
    },
    increment() {
      this.product.count++
    }
  }
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-title, .info-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .shop-info {
    font-size: 17px;
    color: #333;
    overflow: hidden;
    position: relative;
    padding: 5px 10px;
  }

  .shop-info .info-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .info-price {
    color: orangered;
    font-weight: 500;
  }

  .right button {
    width: 20px;
    height: 20px;
  }
</style>