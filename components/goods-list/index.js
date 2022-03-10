Component({
  externalClasses: [
    'wr-class',
    'title-class',
    'desc-class',
    'num-class',
    'thumb-class',
    'specs-class',
    'price-class',
    'origin-price-class',
    'price-prefix-class',
  ],

  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    priceFill: {
      type: Boolean,
      value: false,
    },
    showCart: {
      type: Boolean,
      value: true,
    },
    cartSize: {
      type: String,
      value: '48rpx',
    },
    cartColor: {
      type: String,
      value: '#FA550F',
    },
    lazyLoad: {
      type: Boolean,
      value: true,
    },
    id: {
      type: String,
      // `gl-88888888`
      // 不能在这里写生成逻辑，如果在这里写，那么假设有多个goods-list时，他们将共享这个值
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    /** 元素可见监控阈值, 数组长度大于0就创建 */
    thresholds: {
      type: Array,
      value: [],
    },
    thumbWidth: {
      type: null,
    },
    thumbHeight: {
      type: null,
    },
    addCartIconClassPrefix: {
      type: String,
      value: 'wr',
    },
    addCartIcon: {
      type: String,
      value: 'add-cart',
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {
    onClickGoods(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('click', { ...e.detail, index });
    },

    onAddCart(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('addcart', { ...e.detail, index });
    },

    onClickGoodsThumb(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('thumb', { ...e.detail, index });
    },

    onClickGoodsSpecs(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('specs', { ...e.detail, index });
    },

    onClickGoodsTag(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('tag', { ...e.detail, index });
    },

    onOB(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('ob', { ...e.detail, index });
    },

    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({ independentID: id });
      } else {
        // `gl-88888888`
        this.setData({
          independentID: `goods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
