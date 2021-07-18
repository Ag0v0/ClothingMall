<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <div class="recommend-img">
          <img :src="item.image" alt="" @load="imgLoad" />
        </div>
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: Array,
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}
.recommend-item {
  width: 70px;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  margin-top: 10px;
}
.recommend-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
}
</style>