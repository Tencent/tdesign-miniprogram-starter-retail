Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      observer(newVal) {
        this.setData({ 'goods.title': newVal });
      },
    },
    price: {
      type: String,
      value: '',
      observer(newVal) {
        this.setData({ 'goods.price': newVal });
      },
    },
    thumb: {
      type: String,
      value: '',
      observer(newVal) {
        this.setData({ 'goods.thumb': newVal });
      },
    },
    thumbMode: {
      type: String,
      value: 'aspectFit',
    },
    zIndex: {
      type: Number,
      value: 99,
    },
    specs: {
      type: Array,
      value: [],
    },
  },

  data: {
    goods: {
      title: '',
      thumb: '',
      price: '',
      hideKey: {
        originPrice: true,
        tags: true,
        specs: true,
        num: true,
      },
    },
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },

    onCloseOver() {
      this.triggerEvent('closeover');
    },
  },
});
