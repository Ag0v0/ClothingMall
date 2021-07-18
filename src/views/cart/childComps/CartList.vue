<template>
  <ul class="cart-list" v-if="cartList">
    <scroll class="scroll-content" ref="scroll">
      <li class="list-wrap" v-for="(item, index) in cartList" :key="index">
        <check-button :isSelected="item.isSelected" @click.native="checkClick(index)"/>
        <div class="list-content">
          <div class="goods-img">
            <img :src="item.img" @load="imgLoad" />
          </div>
          <div class="goods-info">
            <p class="info-title">{{ item.title }}</p>
            <span>颜色/款式：{{ item.style }}</span>
            <span>尺码：{{ item.size }}</span>
            <div class="info-price">
              <span class="price">￥{{ item.price }}</span>
              <span>x {{ item.quantity }}</span>
            </div>
          </div>
        </div>
      </li>
    </scroll>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll.vue";
import CheckButton from 'components/content/checkButton/CheckButton.vue';

export default {
  name: "CartList",
  components: {
    Scroll,
    CheckButton
  },
  data() {
    return {
      count: 0,
    };
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    // 获取购物车数据
    ...mapGetters(["cartList"]),
  },
  methods: {
    // 所有图片加载完成后 发送事件
    imgLoad() {
      if (++this.count === this.imgsLength) this.$emit("imgLoad");
    },
    // 选中状态切换
    checkClick(index) {
      this.cartList[index].isSelected = !this.cartList[index].isSelected;
      console.log(index + ':' +this.cartList[index].isSelected);
    }
  },
};
</script>

<style scoped>
.cart-list {
  position: relative;
  height: calc(100vh - 44px - 44px - 49px);
}
.scroll-content {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.list-wrap {
  display: flex;
  align-items: center;
  height: 130px;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}


.list-content {
  flex: 1;
  display: flex;
  align-items: center;
  height: 110px;
  margin-left: 10px;
}

.goods-img {
  width: 80px;
  height: 100%;
  overflow: hidden;
}
.goods-img img {
  display: inline-block;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 180px;
  height: 100%;
  padding: 0 10px;
}
.info-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}
.info-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.info-price .price {
  font-weight: 700;
  color: var(--color-light-text);
}
</style>