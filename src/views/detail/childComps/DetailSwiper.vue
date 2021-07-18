<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in images" :key="item">
      <img :src="item" alt="" @load="imgLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("imgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 450px;
}
</style>