<template>
  <div class="hot-view">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/images/home/recommend_bg.jpg" alt="" @load="imgLoad">
    </a>
  </div>
</template>

<script>
export default {
  name: 'HomeHotView',
  methods: {
    imgLoad() {
      this.$emit('imgLoad');
    }
  }
};
</script>

<style scoped>
  .hot-view {
    width: 100%;
    margin-top: 6px;
    box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
  }
</style>