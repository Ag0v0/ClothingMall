<template>
  <div class="tab-bar" :style="bgColor">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    props: {
      tabBarColor: String
    },
    computed: {
      bgColor() {
        return { 'background-color': this.tabBarColor }
      }
    }
  };
</script>

<style scoped>
  .tab-bar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 49px;
    box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
  }
</style>