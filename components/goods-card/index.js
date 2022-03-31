Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
        if (this.properties.thresholds?.length) {
          this.createIntersectionObserverHandle();
        }
      },
    },
    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        /** 划线价是否有效 */
        let isValidityLinePrice = true;
        // 判断一次划线价格是否合理
        if (data.originPrice && data.price && data.originPrice < data.price) {
          isValidityLinePrice = false;
        }
        // 敲定换行数量默认值
        if (data.lineClamp === undefined || data.lineClamp <= 0) {
          // tag数组长度 大于0 且 可见
          // 指定换行为1行
          if ((data.tags?.length || 0) > 0 && !data.hideKey?.tags) {
            data.lineClamp = 1;
          } else {
            data.lineClamp = 2;
          }
        }

        this.setData({ goods: data, isValidityLinePrice });
      },
    },
    layout: {
      type: String,
      // 'horizontal' | 'horizontal-wrap' | 'vertical'
      value: 'horizontal',
    },
    thumbMode: {
      type: String,
      value: 'aspectFit',
    },
    thumbWidth: Number,
    thumbHeight: Number,
    priceFill: {
      type: Boolean,
      value: true,
    },
    currency: {
      type: String,
      value: '¥',
    },
    lazyLoad: Boolean,
    centered: Boolean,
    showCart: Boolean,
    pricePrefix: {
      type: String,
      value: '',
    },
    cartSize: {
      type: String,
      value: '48rpx',
    },
    cartColor: {
      type: String,
      value: '#FA550F',
    },
    /** 元素可见监控阈值, 数组长度大于0就创建 */
    thresholds: {
      type: Array,
      value: [],
      observer(thresholds) {
        if (thresholds && thresholds.length) {
          this.createIntersectionObserverHandle();
        } else {
          this.clearIntersectionObserverHandle();
        }
      },
    },
    specsIconClassPrefix: {
      type: String,
      value: 't',
    },
    specsIcon: {
      type: String,
      value: 'expand_more',
    },
    addCartIconClassPrefix: {
      type: String,
      value: 't',
    },
    addCartIcon: {
      type: String,
      value: 'cart',
    },
  },

  data: {
    independentID: '',
    goods: { id: '' },
    /** 保证划线价格不小于原价，否则不渲染划线价 */
    isValidityLinePrice: false,
  },

  lifetimes: {
    ready() {
      this.init();
    },
    detached() {
      this.clear();
    },
  },

  pageLifeTimes: {},

  methods: {
    clickHandle() {
      this.triggerEvent('click', { goods: this.data.goods });
    },

    clickThumbHandle() {
      this.triggerEvent('thumb', { goods: this.data.goods });
    },

    clickSpecsHandle() {
      this.triggerEvent('specs', { goods: this.data.goods });
    },

    // 加入购物车
    addCartHandle(e) {
      const { id } = e.currentTarget;
      const { id: cardID } = e.currentTarget.dataset;
      this.triggerEvent('add-cart', {
        ...e.detail,
        id,
        cardID,
        goods: this.data.goods,
      });
    },

    genIndependentID(id) {
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `goods-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({ independentID });
    },

    init() {
      const { thresholds, id } = this.properties;
      this.genIndependentID(id);
      if (thresholds && thresholds.length) {
        this.createIntersectionObserverHandle();
      }
    },

    clear() {
      this.clearIntersectionObserverHandle();
    },

    intersectionObserverContext: null,

    createIntersectionObserverHandle() {
      if (this.intersectionObserverContext || !this.data.independentID) {
        return;
      }
      this.intersectionObserverContext = this.createIntersectionObserver({
        thresholds: this.properties.thresholds,
      }).relativeToViewport();

      this.intersectionObserverContext.observe(
        `#${this.data.independentID}`,
        (res) => {
          this.intersectionObserverCB(res);
        },
      );
    },

    intersectionObserverCB() {
      this.triggerEvent('ob', {
        goods: this.data.goods,
        context: this.intersectionObserverContext,
      });
    },

    clearIntersectionObserverHandle() {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect();
        } catch (e) {}
        this.intersectionObserverContext = null;
      }
    },
  },
});
