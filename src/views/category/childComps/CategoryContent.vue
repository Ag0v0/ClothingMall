<template>
  <ul class="content-list" v-if="categoryList.length !== 0">
    <li v-for="(item, index) in categoryList" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad"/>
        <span>{{ item.title }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CategoryContent",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    categoryList: {
      type: Array,
      default: [],
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
.content-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
}
.content-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  margin: 10px 0;
}

.content-list li > a {
  display: block;
  width: 60px;
  text-align: center;
}
.content-list li img {
  margin-bottom: 10px;
}
</style>