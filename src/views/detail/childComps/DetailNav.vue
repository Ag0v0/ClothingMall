<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="detail-nav-left">
      <span class="iconfont icon-back" @click="backClick()"></span>
    </div>
    <div slot="center" class="tab">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="tab-item"
        :class="{ active: index === tabIndex }"
        @click="tabClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNav",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      tabIndex: 0,
    };
  },
  methods: {
    // 返回按钮点击
    backClick() {
      this.$router.back();
    },
    // 选项卡点击
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.detail-nav {
  height: 40px;
  font-size: var(--font-size);
  color: var(--color-text);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.detail-nav-left {
  line-height: 40px;
  text-align: left;
  margin-left: 20px;
}
.icon-back {
  font-size: var(--font-size);
  color: var(--color-text);
}

.tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.tab-item.active {
  color: var(--color-light-text);
}

</style>