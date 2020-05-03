<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" 
                    @titleClick="titleClick" 
                    ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" 
      @detailImageLoad="detailImageLoad" />
      <detail-param-info  ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodList'
import BackTop from '@/components/content/backTop/BackTop'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '../../network/detail'
import {debounce} from '@/common/utils'
import {itemListenerMixin} from '@/common/mixin'

// import了Vuex里面的mapActions 可以映射方法到实例上直接调用
import {mapActions} from 'vuex' 



export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      
    }
  },
  created() {
    // 保存iid数据
    this.iid = this.$route.params.iid

    
    getDetail(this.iid).then(res => {
      // console.log(res)
      // 1.获取数据 对res.result作一层中转
      const data =  res.result

      // 2.获取顶部的图片数据
      this.topImages = data.itemInfo.topImages

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods)

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo)

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // console.log(this.paramInfo)

      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
          
        }

      /* 1.第一次获取，值不对
        值不对的原因： this.$refs.params.$el还没有渲染
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs)*/


      /*  详情页点击顶部按钮跳转对应位置
      created()的时候拿到值，组件不会马上渲染，所以拿到的$el.offsetTop可能是空
          所以在created()进行的DOM操作一定要放在$nextTick()的回调函数中

      在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无
      异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之
      对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，
      此时在该钩子函数中进行任何DOM操作都不会有问题 */

      /* this.$nextTick(() => {
        // 2.第二次获取：值不对
        // 值不对的原因： 图片没有计算在内
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
      })*/
    })

    // 请求商品推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs)
      },300)
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // import了Vuex里面的mapActions 可以映射方法到实例上直接调用
    ...mapActions(['addCart']),
    detailImageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // 监听DetailNavBar的点击事件
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    // 滚动到内容显示对应的的标题 
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y
      
      // 2.positionY和主题中值进行对比
      // [0, 9302, 10060, 10273, Number.MAX_VALUE]

      // positionY 在 0 和 9302 之间， index = 0
      // positionY 在 9302 和 10060 之间， index = 1
      // positionY 在 10060 和 10273 之间， index = 2
      // positionY 在 10273 和 非常大的值之间， index = 3

      let length = this.themeTopYs.length
      for(let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && 
        (positionY > this.themeTopYs[i] 
        && positionY <= this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.isShowBackTop = (-position.y) > 1000


      // 方法一

      // 2.positionY和主题中值进行对比
      // [0, 9302, 10060, 10273]
      // positionY 在 0 和 9302 之间， index = 0
      // positionY 在 9302 和 10060 之间， index = 1
      // positionY 在 10060 和 10273 之间， index = 2
      // positionY 超过 10273， index = 3

      // for(let i = 0; i < length; i++) {
      //   if (this.currrentIndex !== i && 
      //   ((i < length - 1 && positionY >= this.themeTopYs[i] 
      //   && positionY < this.themeTopYs[i+1]) 
      //   || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //         this.currentIndex = i;
      //         // console.log(this.currentIndex)
      //         this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品加入到购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)

      // import了Vuex里面的mapActions 可以映射方法到实例上直接调用
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res)
      })

      // 这里接收了Vuex里Promise 
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      
    }
  }
}
</script>

<style scoped>

  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  
  
</style>