<template>
  <div class="detail-info" v-if="detailInfo">
    <div class="info-desc clear-fix">
      <div class="start">○▷</div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end">◁○</div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="detail-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  data() {
    return {
      count: 0,
      imgsLength: 0,
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    // 监听 detailInfo 发生改变
    detailInfo() {
      this.imgsLength = this.detailInfo.detailImage[0].list.length
    }
  },
  methods: {
    // 所有图片加载完成后 发送事件
    imgLoad() {
      if(++this.count === this.imgsLength) this.$emit('imgLoad');
    }
  }
};
</script>

<style scoped>
.detail-info {
  margin-top: 6px;
  padding: 10px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.info-desc .start {
  float: left;
}
.info-desc .desc {
  clear: both;
  padding: 5px 20px;
  font-size: var(--font-size);
}
.info-desc .end {
  float: right;
}

.info-key {
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: 700;
}

</style>