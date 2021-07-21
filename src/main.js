import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 点击延迟处理插件 FastClick
import FastClick from 'fastclick'

// 图片懒加载插件 vue-lazyload
import VueLazyload from 'vue-lazyload'

// 自定义 弹出提示插件 Toast
import Toast from 'components/common/toast'

Vue.config.productionTip = false

// 解决移动端 300ms 点击延迟
FastClick.attach(document.body)

// 图片懒加载插件
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

// 安装 Toast 插件
Vue.use(Toast);

// 添加总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

