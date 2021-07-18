<template>
  <div class="category-screen">
    <tab-control class="tab-control" ref="tabControl" :titles="titles" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "CategoryScreen",
  components: {
    TabControl,
    GoodsList,
  },
  data() {
    return {
      currentType: 'pop',
      titles: ["综合", "新品", "销量"],
    };
  },
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
    computed: {
    showGoods() {
      return this.goods[this.currentType];
    },
  },
  methods: {
    tabClick(index) {
      // 选项切换
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.category-screen {
  width: 100%;
  padding: 10px;
}
.tab-control {
  font-size: var(--font-size);
  height: 40px;
  margin-top: 6px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}
</style>