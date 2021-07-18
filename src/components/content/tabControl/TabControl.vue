<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" 
        class="tab-control-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  methods: {
    // 选项卡点击
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
};
</script>

<style scoped>
  .tab-control {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .tab-control-item span {
    padding: 4px 3px;
  }
  .tab-control-item.active {
    color: var(--color-light-text);
  }
  .tab-control-item.active span {
    border-bottom: 2px solid var(--color-light-text);
  }

</style>