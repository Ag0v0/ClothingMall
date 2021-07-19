<template>
  <div id="pay">
    <nav-bar class="nav-bar">
      <div slot="left">
        <span class="iconfont icon-back" @click="backClick()"></span>
      </div>
    </nav-bar>
    <div class="pay-content">
      <span>支付成功</span>
    </div>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Buy",
  components: {
    NavBar,
  },
  methods: {
    backClick() {
      this.$router.go(-2)
    }
  }
};
</script>

<style scoped>
#pay {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 99;
  height: 100vh;
  background-color: var(--color-background);
}

.nav-bar {
  height: 44px;
  line-height: 44px;
  text-align: left;
  padding-left: 20px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
  background-color: var(--color-tint);
  color: #fff;
}

.pay-content {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #fff;
}

.pay-content span {
  font-size: 28px;
  font-weight: 700;
  margin-top: 100px;
}
</style>