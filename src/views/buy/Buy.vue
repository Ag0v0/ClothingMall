<template>
  <div id="buy">
    <nav-bar class="nav-bar">
      <div slot="left">
        <span class="iconfont icon-back" @click="backClick()"></span>
      </div>
    </nav-bar>
    <buy-list :productList="productList" />
    <buy-bottom :totalPrice="totalPrice" @payClick="payClick" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
import BuyList from "./childComps/BuyList";
import BuyBottom from "./childComps/BuyBottom";

export default {
  name: "Buy",
  components: {
    NavBar,
    BuyList,
    BuyBottom,
  },
  data() {
    return {
      productList: [],
    };
  },
  activated() {
    // 获取购买清单
    this.getProduct();
  },
  mounted() {
    // 获取购买清单
    this.getProduct();
  },
  deactivated() {
    // 清空购买清单
    this.productList = [];

    // 恢复 购物车中已选择商品的 isPurchased 为 false
    this.cartList
      .filter((item) => item.isSelected)
      .forEach((item) => {
        item.isPurchased = false;
      });
  },
  computed: {
    // 获取 购物车数据
    ...mapGetters(["cartList"]),

    // 计算总价
    totalPrice() {
      return this.productList
        .reduce((total, item) => {
          return +item.price * item.quantity + total;
        }, 0)
        .toFixed(2);
    },
  },
  methods: {
    // 返回按钮点击
    backClick() {
      this.$router.back();
    },

    // 获取购买清单
    getProduct() {
      this.productList = this.$route.query.productList;
    },

    // 支付按钮点击
    payClick() {
      // 跳转支付成功页面
      this.$router.push("/pay");

      // 删除购物车中已确认购买的商品
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].isPurchased) {
          this.cartList.splice(i, 1);
          i--;
        }
      }

      // 清空购买清单
      this.productList = [];
    },
  },
};
</script>

<style scoped>
#buy {
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
</style>