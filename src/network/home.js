import { request } from "./request";

// 请求 首页 轮播图 和 推荐 数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求 首页 商品 数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}