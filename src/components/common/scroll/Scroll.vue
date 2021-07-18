<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      tepe: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
    this.isScroll();
    this.pullUp();
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: false,
        mouseWheel: true,
      });
    },
    // 监听滚动
    isScroll() {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    },
    // 监听上拉事件
    pullUp() {
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp');
      });
    },
    // 滚动到指定位置
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 结束上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新组件 
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 获取滚动高度
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>


<style scoped>
</style>