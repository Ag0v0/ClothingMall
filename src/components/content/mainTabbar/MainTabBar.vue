<template>
  <div>
    <tab-bar tabBarColor="#ececec">
      <tab-bar-item path="/home" activeColor="var(--color-light-text)">
        <span slot="item-icon" class="iconfont icon-home"></span>
        <p slot="item-text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="var(--color-light-text)">
        <span slot="item-icon" class="iconfont icon-category"></span>
        <p slot="item-text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="var(--color-light-text)">
        <span slot="item-icon" class="iconfont icon-cart"></span>
        <p slot="item-text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="var(--color-light-text)">
        <span slot="item-icon" class="iconfont icon-user"></span>
        <p slot="item-text">我的</p>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import { TabBar, TabBarItem } from "components/common/tabbar/index";

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  }
};
</script>

<style scoped>

</style>