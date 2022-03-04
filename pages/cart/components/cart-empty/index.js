Page({
  properties: {
    imgUrl: {
      type: String,
      value:
        'https://cdn-we-retail.ym.tencent.com/miniapp/cart/cart.png?20200410',
    },
    tip: {
      type: String,
      value: '你的购物车是空的',
    },
    btnText: {
      type: String,
      value: '逛一逛',
    },
  },
  data: {},
  handleClick() {
    this.triggerEvent('btnclick');
  },
});
