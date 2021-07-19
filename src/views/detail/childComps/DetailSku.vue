<template>
  <transition name="detail-sku">
    <div class="detail-sku" v-if="sku && isShowSku">
      <div class="mask" @click="offSku()"></div>
      <div class="content">
        <div class="head">
          <div class="goods-img">
            <img :src="imgSrc" />
          </div>
          <div class="price-wrap">
            <span class="price">{{ realPrice }}</span>
            <span class="discount" v-if="discountShow">{{ discount }} 折</span>
          </div>
          <div class="off">
            <span class="iconfont icon-off" @click="offSku()"></span>
          </div>
        </div>
        <scroll class="scroll-content">
          <div class="style">
            <p>{{ sku.color.label }}</p>
            <div class="items">
              <span
                v-for="(item, index) in sku.color.list"
                :key="index"
                @click="styleItemClick(index)"
                :class="{ active: index === styleIndex }"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="sizes">
            <p>{{ sku.sizes.label }}</p>
            <div class="items">
              <span
                v-for="(item, index) in sku.sizes.list"
                :key="index"
                @click="sizeItemClick(index)"
                :class="{ active: index === sizeIndex }"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="counter-wrap">
            <div class="left">
              <p>购买数量</p>
              <span class="stock">库存 {{ totalStock }} 件</span>
            </div>
            <div class="counter">
              <button @click="decrement" :disabled="count <= 1">-</button>
              <span>{{ count }}</span>
              <button @click="increment">+</button>
            </div>
          </div>
        </scroll>
        <div class="confirm-wrap">
          <div class="confirm" @click="confirmClick()">确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";

import Scroll from "components/common/scroll/Scroll";

export default {
  components: {
    Scroll,
  },
  name: "DetailSku",
  data() {
    return {
      styleIndex: null,
      sizeIndex: null,
      styleId: null,
      sizeId: null,
      list: [],
      img: "",
      price: null,
      nowPrice: null,
      discount: null,
      discountShow: false,
      stock: null,
      count: 1,
      buyProduct: [],
    };
  },
  props: {
    sku: {
      type: Object,
      default() {
        return {};
      },
    },
    isShowSku: {
      type: Boolean,
      default: false,
    },
    skuType: {
      type: Number,
      required: true,
    },
    goodsId: {
      type: String,
      default: "",
    },
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    imgSrc() {
      return this.img || this.sku.skus[0].img;
    },
    realPrice() {
      return this.nowPrice || this.sku.priceRange;
    },
    totalStock() {
      return this.stock || this.sku.totalStock;
    },
  },
  methods: {
    // Action 映射
    ...mapActions(["addCart"]),
    // 关闭 sku
    offSku() {
      this.$emit("offSku");
    },
    // 颜色/款式 点击事件
    styleItemClick(index) {
      // 点击切换 active 类名
      this.styleIndex = index;
      // 获取真实数据中的 styleId
      this.styleId = this.sku.color.list[index].styleId;
      // 获取 styleId 对应的数据
      this.getList();
    },
    // 尺码 点击事件
    sizeItemClick(index) {
      // 点击切换 active 类名
      this.sizeIndex = index;
      // 获取真实数据中的 sizeId
      this.sizeId = this.sku.sizes.list[index].sizeId;
      this.getList();
    },
    // 获取满足 styleId 和 sizeId 的数据
    getList() {
      if (this.styleId && this.sizeId) {
        this.list = this.sku.skus.filter((item) => {
          return item.styleId === this.styleId && item.sizeId === this.sizeId;
        });
      } else if (this.styleId || this.sizeId) {
        this.list = this.sku.skus.filter((item) => {
          return item.styleId === this.styleId || item.sizeId === this.sizeId;
        });
      }
      // 头部图片
      this.img = this.list[0].img;
      // 原价
      this.price = (this.list[0].price / 100).toFixed(2);
      // 现价
      this.nowPrice = (this.list[0].nowprice / 100).toFixed(2);
      // 折扣
      this.discount = (
        (this.list[0].nowprice / this.list[0].price) *
        10
      ).toFixed(1);
      // 显示折扣
      this.discountShow = true;
      // 库存
      this.stock = this.list[0].stock;
    },
    // 购买数量 +
    increment() {
      return this.count++;
    },
    // 购买数量 -
    decrement() {
      if (this.count <= 1) return;
      return this.count--;
    },
    // 点击确认
    confirmClick() {
      // 如果没有选择颜色和尺码，弹出提示，并退出事件
      if (this.list.length === 0 || !this.styleId || !this.sizeId) {
        this.$toast.show("请选择 颜色/款式 尺码");
        return;
      }
      // 获取 购物车/购买 所需商品信息
      const product = {};
      product.iid = this.goodsId;
      product.title = this.goodsInfo.title;
      product.img = this.img;
      product.price = this.nowPrice;
      product.style = this.list[0].style;
      product.size = this.list[0].size;
      product.quantity = this.count;

      if (this.skuType === 0) {
        // 将商品添加到购物车
        this.addCart(product).then((res) => {
          // 弹出加入购物车提示
          this.$toast.show(res);
        });
      } else if (this.skuType === 1) {
        console.log("立即购买");
        // 创建购买清单
        const productList = [];
        productList.push(product);
        // 跳转路由
        this.$router.push({
          path: '/buy',
          query: {
            productList
          }
        })
      }

      // 清空选择状态
      this.styleIndex = null;
      this.sizeIndex = null;
      this.styleId = null;
      this.sizeId = null;
      this.count = 1;
    },
  },
};
</script>

<style scoped>
.detail-sku {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 100vh;
  font-size: var(--font-size);
}

.detail-sku-enter-active,
.detail-sku-leave-active {
  transition: all 0.3s ease;
}
.detail-sku-enter,
.detail-sku-leave-to {
  transform: translateY(100vh);
}

.mask {
  height: 20%;
  background-color: transparent;
}

.content {
  position: relative;
  height: 80%;
  background-color: #fff;
  padding: 0 10px 10px 10px;
}

.head,
.style,
.sizes,
.counter-wrap {
  padding: 10px 0;
  border-top: 0.5px solid #ddd;
}
.head {
  position: relative;
  z-index: 999;
  display: flex;
  align-items: center;
  height: 80px;
  border: none;
  background-color: #fff;
}

.head .goods-img {
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.head .price-wrap {
  flex: 1;
  margin-left: 15px;
}
.head .price-wrap .price {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-light-text);
}
.head .price-wrap .discount {
  margin-left: 5px;
  padding: 2px;
  border-radius: 5px;
  font-size: 12px;
  vertical-align: top;
  color: #fff;
  background-color: #f13e3a;
}
.head .off {
  width: 30px;
  height: 100%;
  text-align: center;
}
.head .off .icon-off {
  font-size: 22px;
}

.scroll-content {
  overflow: hidden;
  position: absolute;
  top: 80px;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 0 10px;
}

.style p,
.sizes p,
.counter-wrap p {
  font-weight: 700;
}

.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}
.items span {
  margin: 0 10px 10px 0;
  line-height: 26px;
  text-align: center;
  padding: 2px 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: #f0f0f0;
}
.items span.active {
  border: 1px solid var(--color-light-text);
  color: var(--color-light-text);
}

.counter-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}

.counter-wrap .left {
  display: flex;
  align-items: center;
}
.counter-wrap .left .stock {
  margin-left: 10px;
  font-size: 12px;
  color: #888;
}
.counter-wrap .counter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.counter-wrap .counter button {
  width: 26px;
  height: 26px;
  border: none;
  outline: none;
  font-size: 18px;
  background-color: #f7f7f7;
}
.counter-wrap .counter button:nth-of-type(1) {
  border-radius: 5px 0 0 5px;
}
.counter-wrap .counter button:nth-of-type(2) {
  border-radius: 0 5px 5px 0;
}
.counter-wrap .counter span {
  display: inline-block;
  width: 40px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-weight: 700;
  margin: 0 1px;
  background-color: #f0f0f0;
}

.confirm-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background-color: #fff;
}
.confirm {
  width: 85%;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  background-color: var(--color-tint);
  color: #fff;
}
</style>