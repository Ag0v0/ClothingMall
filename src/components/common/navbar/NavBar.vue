<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
  .nav-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .left,
  .right {
    width: 80px;
  }
  .center {
    flex: 1;
  }

</style>