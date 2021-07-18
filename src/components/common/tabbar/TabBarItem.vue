<template>
  <div class="tab-bar-item" :style="activeStyle" @click="itemClik">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#00FFFF'
    }
  },
  computed: {
    // TabBarItem 被点击
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 设置 active 样式
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    // 路由切换
    itemClik() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tab-bar-item > p {
  font-size: 12px;
}
.tab-bar-item > span {
  font-size: 24px;
}

</style>