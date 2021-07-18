import { request } from "./request";

// 请求 分类菜单数据
export function getCategory() {
  return request({
    url: '/category',
  })
}

// 请求 分类内容数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

// 请求 分类页筛选商品数据
export function getScreen(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}