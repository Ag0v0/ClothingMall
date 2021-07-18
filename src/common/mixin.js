// 监听图片加载完成后 刷新组件
import { debounce } from "./utils";

/**
 * 监听图片加载完成
 */
export const itemImgListener_Mixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    };
  },
  mounted() {
    // 刷新组件
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    
    // 商品图片加载完成
    this.itemImgListener = () => {
      this.newRefresh();
    };
    // 执行总线上的事件
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
}

/**
 * 回到顶部
 */

import BackTop from "components/content/backTop/BackTop";
import { BACKTOP_DISTANCE } from "@/common/const";

export const backTop_Mixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      backTopShow: false,
    };
  },
  methods: {

    // 点击 回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenShowBackTop(position) {
      // 判断 backTop 是否显示
      this.backTopShow = -position.y > BACKTOP_DISTANCE;
    }
  }
}

