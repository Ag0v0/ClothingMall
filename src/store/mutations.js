import { ADD_TO_CART, ADD_COUNT } from './mutation-types'

export default {

  [ADD_COUNT](state, payload) {
    // 如果存在该 idd 的商品，数量相加
    payload.oldProduct.quantity += payload.product.quantity;
  },

  [ADD_TO_CART](state, payload) {
      // 添加购物车中选择属性
      payload.isSelected = false;
      payload.isPurchased = false;

      // 如果不存在该 idd 的商品，把商品数据加入数组
      state.cartList.push(payload)
  },
}