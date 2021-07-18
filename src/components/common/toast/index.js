import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // 1、创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  // 2、以 new 的方式，根据组件构造器，创建组件对象
  const toast = new toastConstructor();
  // 3、将组件对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'));
  // 4、此时，toast.$el 对应的就是创建出来的 div
  //   把它添加到body上
  document.body.appendChild(toast.$el);
  // 5、添加实例方法
  Vue.prototype.$toast = toast;
}

export default obj;
