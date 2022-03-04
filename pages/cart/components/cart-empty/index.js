Component({
  properties: {
    imgUrl: {
      type: String,
      value:
        'https://cdn-we-retail.ym.tencent.com/miniapp/template/empty-cart.png',
    },
    tip: {
      type: String,
      value: '购物车是空的',
    },
    btnText: {
      type: String,
      value: '去首页',
    },
  },
  data: {},
  methods: {
    handleClick() {
      this.triggerEvent('handleClick');
    },
  },
});
