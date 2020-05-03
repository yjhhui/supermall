<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img class="feature-img" src="@/assets/img/home/recommend_bg.jpg" alt="" @load="imgaeLoad">
    </a>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  methods: {
    imgaeLoad() {
      this.$emit('fetureImgLoad')
    }
  }
}
</script>

<style>
  .feature-img {
    width: 100%;
  }
</style>