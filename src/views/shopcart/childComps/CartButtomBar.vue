<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" 
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartButtomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      

      let all_count = 0;
      this.cartList.filter(item => {
        if (item.checked) {
          all_count += item.count
        }
      })
      return all_count
      
      // return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false

      // 1.使用filter()
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2.使用find()
      return !this.cartList.find(item => !item.checked)

      // 3.普通遍历
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .buttom-bar {
    position: relative;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .check-content span {
    margin-left: 5px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }

  .price {
    margin-left: 15px;
  }

  .calculate {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 90px;
    color: #fff;
    background-color: #ff5777;
    text-align: center;
  }
</style>