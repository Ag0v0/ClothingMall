<template>
  <ul class="profile-function">
    <li>
      <span class="iconfont icon-letter"></span>
      <p>我的消息</p>
    </li>
    <li>
      <span class="iconfont icon-integral"></span>
      <p>积分商城</p>
    </li>
    <li>
      <span class="iconfont icon-vip"></span>
      <p>会员卡</p>
    </li>
    <li>
      <span class="iconfont icon-cart-full"></span>
      <p>我的购物车</p>
    </li>
    <li>
      <span class="iconfont icon-bag"></span>
      <p>下载购物APP</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProfileFunction",
};
</script>

<style scoped>
.profile-function {
  flex: 1;
  padding: 0 15px 10px 15px;
  margin-top: 15px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
}

.profile-function li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
}

.profile-function li .iconfont {
  color: var(--color-light-text);
}

.profile-function li > p {
  flex: 1;
  line-height: 50px;
  margin-left: 10px;
  border-bottom: .5px solid #ddd;
}
</style>