Component({
  properties: {
    imgUrl: {
      type: String,
      value: 'https://tdesign.gtimg.com/miniprogram/template/retail/template/empty-cart.png',
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
