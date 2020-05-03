import {debounce} from '@/common/utils'

export const itemListenerMixin = {
  components: {

  },
  methods: {
    
  },
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)
    // 3.监听item中图片加载完成
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}