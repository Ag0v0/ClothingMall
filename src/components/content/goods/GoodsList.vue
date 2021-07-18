<template>
  <ul class="goods" v-if="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    />
    <div class="pullup-tips" v-if="isPullUpLoad">
      <div v-if="!isPullUpLoad">
        <span>上拉加载更多</span>
      </div>
      <div v-else>
        <span>Loading...</span>
      </div>
    </div>
  </ul>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
    isPullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  padding: 6px;
  background-color: #fff;
}

.pullup-tips {
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>