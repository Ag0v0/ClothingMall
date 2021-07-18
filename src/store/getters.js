export default {
  totalQuantity(state) {
    if(state.cartList) {
      // 购物车数组里的商品数量累加
      return state.cartList.reduce((total, item) => {
        return total + item.quantity;
      }, 0)
    }else {
      return 0;
    }
  },
  cartList(state) {
    return state.cartList;
  }
}
