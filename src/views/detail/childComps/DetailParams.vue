<template>
  <div class="detail-params" v-if="goodsParams">
    <table
      class="sizes"
      v-for="(table, index) in goodsParams.sizes"
      :key="index"
    >
      <tr v-for="(tr, id) in table" :key="id">
        <td v-for="(td, i) in tr" :key="i">{{ td }}</td>
      </tr>
    </table>

    <table class="param">
      <tr v-for="(info, index) in goodsParams.infos" :key="index">
        <td class="param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParams.image">
      <img :src="goodsParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.detail-params {
  margin-top: 6px;
  padding: 10px 10px 30px 10px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.detail-params table {
  width: 100%;
  border-collapse: collapse;
}
.detail-params table tr {
  height: 42px;
}
.detail-params table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.detail-params .sizes {
  padding: 5px 0;
  border-bottom: 2px solid #ddd;
}

.param {
  margin-top: 5px;
}
.param-key {
  width: 95px;
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
  padding: 5px 0;
}
</style>