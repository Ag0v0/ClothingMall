<template>
  <li class="goods-item" @click="itemClick()" v-if="goodsItem">
    <div class="goods-img">
      <img v-lazy="showImg" alt="" @load="imgLoad" />
    </div>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="goods-price">￥{{ goodsItem.price }}</span>
      <i class="iconfont icon-star"></i>
      <span>{{ goodsItem.cfav }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    showImg() {
      return  this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    // 图片加载完成
    imgLoad() {
      // 发送到总线
      this.$bus.$emit("itemImgLoad");
    },
    // 商品点击
    itemClick() {
      const goodsId = this.goodsItem.iid || this.goodsItem.item_id;
      this.$router.push("/detail/" + goodsId);
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 50%;
  padding: 6px 4px;
}
.goods-img {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
}
.goods-info {
  width: 100%;
  margin-top: 5px;
  text-align: center;
  font-size: 12px;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 6px 0;
  padding: 0 2px;
}
.goods-info .goods-price {
  color: var(--color-light-text);
}
.goods-info .icon-star {
  margin-left: 6px;
  font-size: 10px;
}
</style>