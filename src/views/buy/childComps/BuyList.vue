<template>
  <ul class="buy-list" v-if="productList">
    <scroll class="scroll-content" ref="scroll">
      <li class="list-wrap" v-for="(item, index) in productList" :key="index">
        <div class="list-content">
          <div class="goods-img">
            <img :src="item.img" @load="imgLoad" />
          </div>
          <div class="goods-info">
            <p class="info-title">{{ item.title }}</p>
            <div class="style-size">
              <span>颜色/款式：{{ item.style }}</span>
              <span>尺码：{{ item.size }}</span>
            </div>
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
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "BuyList",
  components: {
    Scroll,
  },
  data() {
    return {
      count: 0,
    };
  },
  props: {
    productList: {
      type: Array,
      default: [],
    },
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    // 所有图片加载完成后 发送事件
    imgLoad() {
      if (++this.count === this.imgsLength) this.$emit("imgLoad");
    },
  },
};
</script>

<style scoped>
.buy-list {
  position: relative;
  height: calc(100vh - 44px - 110px);
  font-size: var(--font-size);
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
  height: 90px;
  padding: 5px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}

.list-content {
  flex: 1;
  display: flex;
  align-items: center;
  height: 80px;
}

.goods-img {
  width: 60px;
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
.style-size {
  display: flex;
  justify-content: space-between;
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