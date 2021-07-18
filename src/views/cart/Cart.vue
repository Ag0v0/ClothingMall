<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="nav-title">购物车({{ totalQuantity }})</div>
      <div slot="right" class="edit-wrap">
        <div :class="{ edit: deleteShow }" @click="editClick()">
          <span>管理 </span>
          <span class="iconfont icon-off" v-if="deleteShow"></span>
        </div>
      </div>
    </nav-bar>
    <cart-list @imgLoad="imgLoad" />
    <cart-bottom-bar :deleteShow="deleteShow"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  NavBarname: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  data() {
    return {
      deleteShow: false,
    };
  },
  computed: {
    ...mapGetters(["totalQuantity"]),
  },
  methods: {
    // 图片加载完成
    imgLoad() {
      // 刷新组件
      this.newRefresh();
    },
    // 管理按钮 点击事件
    editClick() {
      // 删除按钮 显示/隐藏
      this.deleteShow = !this.deleteShow;
    },
  },
};
</script>

<style>
#cart {
  font-size: var(--font-size);
}
.nav-bar {
  height: 44px;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
  background-color: var(--color-tint);
  color: #fff;
}
.nav-title {
  font-size: 16px;
}

.edit-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
}
.edit-wrap .edit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  padding: 0 6px;
  border-radius: 13px;
  background-color: var(--color-light-text);
}
.edit-wrap .edit .icon-off {
  margin-left: 2px;
  font-size: 14px;
}
</style>

