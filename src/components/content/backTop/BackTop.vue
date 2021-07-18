<template>
  <div class="back-top">
    <span class="iconfont icon-top"></span>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
  };
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 6px;
    bottom: 70px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    box-shadow: 2px 2px 2px rgba(100, 100, 100, 0.4);
  }
  .icon-top {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-light-text);
  }
</style>