<template>
  <div id="detail">
    <detail-nav class="detail-nav" @tabClick="tabClick" ref="nav" />
    <scroll
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <detail-swiper :images="bannerImages" @imgLoad="imgLoad" />
      <detail-base :goodsInfo="goodsInfo" />
      <detail-shop :shop="shop" />
      <detail-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-params :goodsParams="goodsParams" ref="params" />
      <detail-comment :comment="comment" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backTopClick()" v-show="backTopShow" />
    <detail-bottom-bar @addToCart="addToCart()" />
    <detail-sku
      ref="sku"
      :sku="sku"
      :isClickCart="isClickCart"
      :goodsId="goodsId"
      :goodsInfo="goodsInfo"
      @offSku="offSku"
    />
  </div>
</template>

<script>
import {
  getDetail,
  getRecommendGoods,
  Goods,
  Shop,
  GoodsParam,
  Comment,
  Sku,
} from "network/detail";

import { itemImgListener_Mixin, backTop_Mixin } from "@/common/mixin";
import { debounce } from "@/common/utils";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBase from "./childComps/DetailBase";
import DetailShop from "./childComps/DetailShop";
import DetailInfo from "./childComps/DetailInfo";
import DetailParams from "./childComps/DetailParams";
import DetailComment from "./childComps/DetailComment";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailSku from "./childComps/DetailSku";

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    DetailNav,
    DetailSwiper,
    DetailBase,
    DetailShop,
    DetailInfo,
    DetailParams,
    DetailComment,
    DetailBottomBar,
    DetailSku,
  },
  data() {
    return {
      goodsId: null,
      bannerImages: null,
      goodsInfo: null,
      shop: null,
      detailInfo: null,
      goodsParams: null,
      comment: null,
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      tabIndex: 0,
      isClickCart: false,
      sku: null,
    };
  },
  mixins: [itemImgListener_Mixin, backTop_Mixin],
  created() {
    this.getGoodsId();
    this._getDetail();
    this._getRecommendGoods();

    // 获取每个主体的 offsetTop
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
    }, 100);
  },
  destroyed() {
    // 取消全局总线上的事件
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 事件处理
     */

    // 图片加载完成
    imgLoad() {
      // 刷新组件
      this.newRefresh();
      // 获取每个主体的 offsetTop
      this.getThemeTopY();
    },
    // 监听 内容 滚动
    contentScroll(position) {
      // 判断 backTop 是否显示
      this.listenShowBackTop(position);

      // 滚动时内容与tab联动
      const positionY = -position.y;
      const length = this.themeTopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.tabIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.tabIndex = i;
          this.$refs.nav.tabIndex = this.tabIndex;
        }
      }
    },
    // 选项点击事件
    tabClick(index) {
      // 滚动到对应主体所在高度
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500);
    },
    // 点击加入购物车
    addToCart() {
      this.isClickCart = true;
    },
    // 关闭sku
    offSku() {
      this.isClickCart = false;
    },

    /**
     * 网络请求
     */

    // 获取商品 id
    getGoodsId() {
      this.goodsId = this.$route.params.id;
    },
    // 获取 详情页数据
    _getDetail() {
      getDetail(this.goodsId).then((res) => {
        const data = res.result;
        // 1、顶部轮播图数据
        this.bannerImages = data.itemInfo.topImages;
        // 2、商品基本信息
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3、店铺信息
        this.shop = new Shop(data.shopInfo);
        // 4、商品详情信息
        this.detailInfo = data.detailInfo;
        // 5、商品参数信息
        this.goodsParams = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6、用户评论信息
        this.comment = new Comment(data.rate.list[0]);
        // 7、sku 信息
        this.sku = new Sku(data.skuInfo);
      });
    },
    // 获取 推荐商品 数据
    _getRecommendGoods() {
      getRecommendGoods().then((res) => {
        this.recommends = res.data.list;
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  height: 100vh;
  background-color: var(--color-background);
}
.detail-nav {
  position: relative;
  z-index: 99;
}
.scroll-content {
  overflow: hidden;
  position: absolute;
  top: 40px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>