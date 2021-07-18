import { ADD_TO_CART, ADD_COUNT } from './mutation-types'

export default {
  addCart({ commit, state }, product) {
    return new Promise((resolve, reject) => {

      // 查找数组中符合 iid 的商品
      const oldProduct = state.cartList.find(item => {
        return item.iid === product.iid && item.style === product.style && item.size === product.size;
      })
      if (oldProduct) {
        // 如果存在该 idd 的商品，数量相加
        commit(ADD_COUNT, { oldProduct, product })

        resolve('商品数量 +' + product.quantity)
        reject('ADD_COUNT -- erro')

      } else {
        // 如果不存在该 idd 的商品，把商品数据加入数组
        commit(ADD_TO_CART, product)

        resolve('加入购物车成功')
        reject('ADD_TO_CART -- erro')

      }
    })
  }
}