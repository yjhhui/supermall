<template>
  <div>
    <div class="content-category" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'TabContentCategory',
  props: {
    subcategories: {
      type: Object,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('cateImgLoad')
    }
  }
}
</script>

<style scoped>
  .content-category {
    overflow: hidden;
  }

  .item {
    float: left;
    margin: 20px 15px 5px;
    margin-right: 10px;
    font-size: 12px;
    text-align: center;
  }

  .item-img {
    width: 58px;
  }

  .item-text {
    margin-top: 15px;
  }
</style>