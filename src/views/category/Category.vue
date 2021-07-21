<template>
  <div id="category" class="clear-fix">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <category-nav-bar
      class="left category-nav"
      :categories="categories"
      @categoryClick="categoryClick"
    />
    <div class="right category-right">
      <scroll class="scroll-content" ref="scroll">
        <category-content :categoryList="categoryList" @imgLoad="imgLoad" />
        <category-screen :goods="categoryScreen" />
      </scroll>
    </div>
  </div>
</template>

<script>
import { getCategory, getSubcategory, getScreen } from "network/category";

import { POP, SELL, NEW } from "@/common/const";
import { itemImgListener_Mixin } from "@/common/mixin";

import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll";

import CategoryNavBar from "./childComps/CategoryNavBar";
import CategoryContent from "./childComps/CategoryContent";
import CategoryScreen from "./childComps/CategoryScreen";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategoryNavBar,
    CategoryContent,
    CategoryScreen,
  },
  data() {
    return {
      categories: [],
      currentIndex: 0,
      categoryList: [],
      categoryScreen: {
        pop: [],
        new: [],
        sell: [],
      },
      saveY: 0,
    };
  },
  mixins: [itemImgListener_Mixin],
  mounted() {
    // 请求分类数据
    this._getCategory();
    // 请求分类内容数据
  },
  activated() {
    // 进入页面 获取历史滚动高度
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 刷新组件
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
     * 事件处理
     */

    // 分类 点击事件
    categoryClick(index) {
      this.currentIndex = index;
      this._getSubcategory(index);
      this.$refs.scroll.scrollTo(0, 0, 0);
    },

    // 图片加载完成
    imgLoad() {
      // 刷新组件
      this.newRefresh();
    },
    /**
     * 网络请求
     */

    // 请求分类数据
    _getCategory() {
      getCategory().then((res) => {
        // 保存分类列表
        this.categories = res.data.category.list;

        // 请求第一个分类的内容数据
        this._getSubcategory(0);
      });
    },

    // 请求分类内容数据
    _getSubcategory(index) {
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        // 保存分类内容
        this.categoryList = res.data.list;

        // 请求筛选商品数据
        this._getScreen(POP);
        this._getScreen(SELL);
        this._getScreen(NEW);
      });
    },

    // 请求筛选商品数据
    _getScreen(type) {
      // 获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getScreen(miniWallkey, type).then((res) => {
        // 保存筛选商品数据
        this.categoryScreen[type] = res;
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  height: 44px;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
  background-color: var(--color-tint);
  color: #fff;
}

.category-nav {
  position: relative;
  width: 25%;
  height: calc(100vh - 44px - 49px);
  font-size: var(--font-size);
  background-color: #eee;
}

.category-right {
  position: relative;
  width: 75%;
  height: calc(100vh - 44px - 49px);
  font-size: var(--font-size);
  background-color: #fff;
}

.scroll-content {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>