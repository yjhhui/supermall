import {request} from './request';

// 获取detail详情页的数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


// 获取recommend商品推荐的数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}


// 创建类对获取的数据进行整合 
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

// ES6创建类
// class Person {

    //构造函数
//   constructor(name, age) {
//     this.name = name;
//     this.age = age; 
//   }
// }

// const p = new Person('why', 18)
// console.log(p.name, p.age); // why, 18

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}