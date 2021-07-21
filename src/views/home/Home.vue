<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl_2"
      class="tab-control-fixed"
      v-show="isTabFixed"
      :titles="tabControls"
      @tabClick="tabClick"
    />
    <scroll
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore()"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad()"
        @imgLoad="imgLoad"
      />
      <home-recommend-view :recommends="recommends" @imgLoad="imgLoad" />
      <home-hot-view @imgLoad="imgLoad" />
      <tab-control
        ref="tabControl_1"
        class="home-tab-control"
        :titles="tabControls"
        @tabClick="tabClick"
      />
      <goods-list
        :goods="showGoods"
        :isPullUpLoad="isPullUpLoad"
        ref="goodsList"
      />
    </scroll>
    <back-top @click.native="backTopClick()" v-show="backTopShow" />
  </div>
</template>

<script>
import { itemImgListener_Mixin, backTop_Mixin } from "@/common/mixin";
import { POP, NEW, SELL } from "@/common/const";

import { getHomeMultidata, getHomeGoods } from "network/home";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeHotView from "./childComps/HomeHotView";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    HomeHotView,
  },
  data() {
    return {
      isPullUpLoad: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      banners: [],
      recommends: [],
      tabControls: ["流行", "新款", "优选"],
      currentType: POP,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  mixins: [itemImgListener_Mixin, backTop_Mixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted() {
    // 获取 轮播图 和 推荐 数据
    this._getHomeMultidata();

    // 获取 商品 数据
    this._getHomeGoods(POP);
    this._getHomeGoods(NEW);
    this._getHomeGoods(SELL);
  },
  activated() {
    // 进入页面 获取历史滚动高度
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开页面 记录滚动高度
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局总线上的事件
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 事件监听 相关方法
     */

    // 图片加载完成
    imgLoad() {
      // 刷新组件
      this.newRefresh();
    },

    // 商品选项卡 点击事件
    tabClick(index) {
      // 选项切换
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 固定当前点击选项，使两个 tabControl 的 currentIndex 保持一致
      this.$refs.tabControl_1.currentIndex = index;
      this.$refs.tabControl_2.currentIndex = index;
    },
    // 监听 内容 滚动
    contentScroll(position) {
      // 判断 backTop 是否显示
      this.listenShowBackTop(position);
      // 判断 tabControls 是否吸顶
      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },

    // 上拉加载更多
    loadMore() {
      this.isPullUpLoad = true;
      this._getHomeGoods(this.currentType);
    },

    // 监听 轮播图图片 加载完成
    swiperImageLoad() {
      // 获取 tabControl 的 offsetTop，并赋值给 tabOffsetTop
      this.tabOffsetTop = this.$refs.tabControl_1.$el.offsetTop;
    },

    /**
     * 网络请求 相关方法
     */

    // 获取 轮播图 和 推荐 数据
    _getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 获取 商品 数据
    _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 结束上拉加载
        this.$refs.scroll.finishPullUp();
        this.isPullUpLoad = false;
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
  background-color: var(--color-background);
}
.nav-bar {
  height: 44px;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
  background-color: var(--color-tint);
  color: #fff;
}

.scroll-content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.home-tab-control,
.tab-control-fixed {
  font-size: var(--font-size);
  height: 40px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}
.home-tab-control {
  margin-top: 6px;
}
.tab-control-fixed {
  position: relative;
  z-index: 9;
}
</style>