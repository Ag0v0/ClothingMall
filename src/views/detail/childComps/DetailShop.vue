<template>
  <div class="detail-shop" v-if="shop">
    <div class="header">
      <div class="shop-logo">
        <img :src="shop.logo" alt="" />
      </div>
      <h3 class="shop-name">{{ shop.name }}</h3>
    </div>
    <div class="shop-info">
      <div class="left">
        <div>
          <span>{{ shop.sells }}</span>
          <p>总销量</p>
        </div>
        <div>
          <span>{{ shop.goodsCount }}</span>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="right">
        <div>
          <div
            class="score-wrap"
            v-for="(item, index) in shop.score"
            :key="index">
            <span>{{ item.name }}</span>
            <span class="score" :class="{ 'better-score': item.isBetter }">
              {{ item.score }}
            </span>
            <span
              class="score-text"
              :class="{ 'better-score-text': item.isBetter }">
              {{ item.isBetter ? "高" : "低" }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="enter-shop">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.detail-shop {
  margin-top: 6px;
  padding: 10px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
}
.header .shop-logo {
  width: 65px;
  height: 65px;
  overflow: hidden;
  border-radius: 50%;
  border: 0.5px solid #ccc;
}
.header .shop-name {
  margin-left: 20px;
  font-size: 22px;
  font-weight: 400;
}

.shop-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: var(--font-size);
}
.shop-info .left,
.shop-info .right {
  flex: 1;
}
.shop-info .left {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-right: 1px solid #ddd;
}
.shop-info .left > div {
  text-align: center;
}
.shop-info .left span {
  font-size: 20px;
  line-height: 40px;
}
.shop-info .left p {
  font-size: var(--font-size);
}

.shop-info .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shop-info .right .score-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.shop-info .right .score-wrap span {
  margin-left: 10px;
}

.score {
  color: #5ea732;
}
.better-score {
  color: #f13e3a;
}
.score-text {
  background-color: #5ea732;
}
.better-score-text {
  background-color: #f13e3a;
}

.enter-shop {
  width: 30%;
  height: 30px;
  margin: 15px auto;
  text-align: center;
  line-height: 30px;
  font-size: var(--font-size);
  border-radius: 15px;
  background-color: #eee;
  box-shadow: 2px 2px 2px rgba(100, 100, 100, 0.1);
}



</style>