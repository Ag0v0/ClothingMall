<template>
  <nav-bar class="bottom-bar">
    <check-button
      slot="left"
      @click.native="checkClick()"
      :isSelected="isSelectedAll"
    >
      <span slot="checktext" class="check-text">全选</span>
    </check-button>
    <div slot="center" class="totalPrice" v-if="+totalPrice !== 0">
      <span>合计: ￥{{ totalPrice }}</span>
    </div>
    <div
      slot="right"
      class="settlement"
      v-if="!deleteShow"
      @click="settlement()"
    >
      <span>去结算({{ totalQuantity }})</span>
    </div>
    <div slot="right" class="delete" v-else @click="deleteClick()">
      <span>删除</span>
    </div>
  </nav-bar>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    NavBar,
    CheckButton,
  },
  data() {
    return {};
  },
  props: {
    deleteShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 获取 购物车数据
    ...mapGetters(["cartList"]),
    // 计算 总价
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => item.isSelected)
        .reduce((total, item) => +item.price * item.quantity + total, 0)
        .toFixed(2);
    },
    // 计算 已选总件数
    totalQuantity() {
      return this.$store.state.cartList
        .filter((item) => item.isSelected)
        .reduce((total, item) => item.quantity + total, 0);
    },
    // 全选按钮点击
    isSelectedAll() {
      if (this.cartList.length === 0) return false;
      else return !this.cartList.find((item) => !item.isSelected);
    },
  },
  methods: {
    // 点击选项按钮
    checkClick() {
      if (this.isSelectedAll) {
        // 全不选
        this.cartList.forEach((item) => (item.isSelected = false));
      } else {
        // 全选
        this.cartList.forEach((item) => (item.isSelected = true));
      }
    },
    // 点击删除按钮，删除选中的商品
    deleteClick() {
      // 没有选择商品，弹出提示
      if (!this.cartList.find((item) => item.isSelected)) {
        this.$toast.show("请选择商品！");
        return;
      }
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].isSelected) {
          this.cartList.splice(i, 1);
          i--;
        }
      }
    },
    settlement() {
      // 没有选择商品，弹出提示
      if (!this.cartList.find((item) => item.isSelected)) {
        this.$toast.show("请选择商品！");
        return;
      }
      // 设置购物车中已选择商品的 isPurchased 为 true
      this.cartList
        .filter((item) => item.isSelected)
        .forEach((item) => {
          item.isPurchased = true;
        });

      // 创建购买清单
      const productList = [];
      const product = this.cartList.filter((item) => item.isSelected);
      productList.push(...product);
      console.log(productList);

      // 跳转购买页面
      this.$router.push({
        path: "/buy",
        query: {
          productList,
        },
      });
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 44px;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
  background-color: #ddd;
  font-size: 16px;
  color: var(--color-text);
}

.totalPrice {
  text-align: left;
  margin-left: 8px;
}

.settlement {
  background-color: var(--color-tint);
  color: #fff;
}

.delete {
  background-color: var(--color-light-text);
  color: #fff;
}
</style>