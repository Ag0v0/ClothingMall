<template>
  <div class="detail-base" v-if="goodsInfo">
    <div class="title">
      <p>{{ goodsInfo.title }}</p>
    </div>
    <div class="price">
      <span class="new-price">{{ goodsInfo.newPrice }}</span>
      <span class="old-price">{{ goodsInfo.oldPrice }}</span>
      <span class="discount" :style="bgColor">{{ goodsInfo.discount }}</span>
    </div>
    <div class="columns">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[goodsInfo.services.length-1].name }}</span>
    </div>
    <div class="services">
      <div class="services-item" v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{ goodsInfo.services[index-1].name }}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBase",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    bgColor() {
      return { 'background-color': this.goodsInfo.discountBgColor }
    }
  }
};
</script>

<style scoped>
.detail-base {
  padding: 10px 10px 0 10px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.price{
  padding: 10px 0;
}
.price .new-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-light-text);
}
.price .old-price {
  text-decoration: line-through;
  margin-left: 5px;
  color: #888;
}
.price .discount {
  font-size: var(--font-size);
  color: #fff;
  border-radius: 5px;
  vertical-align: super;
  margin-left: 5px;
}

.columns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size);
  color: #888;
  padding: 5px 0 8px 0;
  border-bottom: 1px solid #ddd;
}

.services {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.services .services-item {
  font-size: var(--font-size);
}
.services .services-item img {
  display: inline-block;
  width: 12px;
  height: 12px;
}
</style>