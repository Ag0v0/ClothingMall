import { request } from "./request";

// 请求 详情页数据
export function getDetail(id) {
  return request({
    url: '/detail',
    params: {
      iid: id
    }
  })
}

// 请求 推荐商品 数据
export function getRecommendGoods() {
  return request({
    url: '/recommend'
  })
}

// 商品信息 整合
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}

// 店铺信息 整合
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品参数 整合
export class GoodsParam {
  constructor(info, rule) {
    this.images = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

// 评论参数 整合
export class Comment {
  constructor(list) {
    this.content = list.content;
    this.images = list.images;
    this.date = list.created;
    this.style = list.style;
    this.uName = list.user.uname;
    this.uAvatar = list.user.avatar;
  }
}

// sku信息整合
export class Sku {
  constructor(skuInfo) {
    this.priceRange = skuInfo.priceRange;
    this.color = skuInfo.props[0];
    this.sizes = skuInfo.props[1];
    this.skus = skuInfo.skus;
    this.totalStock = skuInfo.totalStock;
  }
}
