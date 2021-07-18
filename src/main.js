import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加总线
Vue.prototype.$bus = new Vue();

// 解决移动端 300ms 点击延迟
FastClick.attach(document.body)

// 图片懒加载
// 占位图
const loadImage = require('assets/images/loading/loading.gif')
const errorImage = require('assets/images/loading/erro.jpeg')
// 安装和配置 VueLazyload
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  error: errorImage,
  attempt: 1
});

// 安装 toast 插件
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

