<template>
  <div id="category">
    <!--基本导航组件-->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <!--商品分类菜单组件-->
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <!--封装的Scroll滚动组件-->
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @cateImgLoad="cateImgLoad"/>
          <tab-control :titles="['流行', '新款', '精选']" 
                        @tabClick="tabClick"
                        ref="tabControl"/>
          <good-list :goods="showGoods" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodList from '@/components/content/goods/GoodList'

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'

import {getCategory, getSubcategory, getCategoryDetail} from '@/network/category'

import Scroll from '@/components/common/scroll/Scroll'

import {itemListenerMixin} from '@/common/mixin'

export default {
  name: "Category",
  components: {
    NavBar,
    TabControl,
    GoodList,
    TabMenu,
    TabContentCategory,
    Scroll,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      categories:[],
      categoryData: {},
      currentIndex: -1,
      currentType: 'new'
    }
  },
  created() {
    this.getCategory() 
  },
  computed: {
    showSubcategory () {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showGoods() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    getCategory() {
      // 获取分类的数据
      getCategory().then(res => {
        this.categories = res.data.category.list
        // console.log(res)
        // 初始化每个类别的子数据
        for(let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
          // console.log(this.categoryData)
        }
        // console.log(this.categoryData[0].categoryDetail)
        this.getSubcategories(0)
      })
    },
    getSubcategories(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },
    getCategoryDetail (type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
        
    },
    // 事件响应相关的方法
    // 根据分类获取子分类
    selectItem(index) {
      this.getSubcategories(index)
    },
    cateImgLoad() {
      this.newRefresh()
    },
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      // this.$refs.tabControl.currentIndex = index;
      console.log(this.currentType)
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }

  
</style>