<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div class="left-item shop">
        <span class="iconfont icon-shop"></span>
        <span>店铺</span>
      </div>
      <div class="left-item service">
        <span class="iconfont icon-service"></span>
        <span>客服</span>
      </div>
      <div class="left-item collection">
        <span class="iconfont icon-star"></span>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="right-item cart" @click="addToCart()">加入购物车</div>
      <div class="right-item buy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
};
</script>

<style scoped>
.detail-bottom-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 49px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.left-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.left-item span:first-child {
  font-size: 24px;
}

.icon-service {
  color: var(--color-light-text);
}

.right-item {
  flex: 1;
  height: 100%;
  line-height: 49px;
  text-align: center;
}

.right-item.cart {
  background-color: #FFECEE;
  color: var(--color-light-text);
}
.right-item.buy {
  background-color: var(--color-light-text);
  color: #fff;
}
</style>