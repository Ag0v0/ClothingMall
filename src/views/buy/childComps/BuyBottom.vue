<template>
  <div class="buy-bottom">
    <div class="total-price">
      <span>合计：{{ totalPrice }} 元</span>
    </div>
    <div class="pay">
      <span @click="payClick()">确认支付</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuyBottom",
  props: {
    totalPrice: {
      type: String,
      default: '',
    },
  },methods: {
    payClick() {
      this.$emit('payClick');
    },
  },
};
</script>

<style scoped>
.buy-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100;
  height: 110px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
}
.total-price,
.pay {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay span {
  display: block;
  width: 75%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  background-color: var(--color-tint);
  color: #fff;
}
</style>