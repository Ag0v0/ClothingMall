<template>
  <ul class="category-nav-bar">
    <scroll class="scroll-content">
      <li
        v-for="(item, index) in categories"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)">
        {{ item.title }}
      </li>
    </scroll>
  </ul>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CategoryNavBar",
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 分类项点击事件
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('categoryClick', index);
    },
  },
};
</script>

<style scoped>
.scroll-content {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}

.category-nav-bar li {
  position: relative;
  width: 100%;
  padding: 12px 15px;
}
.category-nav-bar li.active {
  color: var(--color-light-text);
  background-color: #fff;
}
.category-nav-bar li.active::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  border-left: 2px solid var(--color-light-text);
}

</style>