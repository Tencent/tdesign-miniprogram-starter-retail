Component({
  externalClasses: ['wr-class'],

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
        this.setData({
          independentID: `goods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
