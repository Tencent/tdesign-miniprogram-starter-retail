Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isAllSelected: {
      type: Boolean,
      value: false,
    },
    totalAmount: {
      type: Number,
      value: 1,
    },
    totalGoodsNum: {
      type: Number,
      value: 0,
      observer(num) {
        const isDisabled = num == 0;
        setTimeout(() => {
          this.setData({
            isDisabled,
          });
        });
      },
    },
    totalDiscountAmount: {
      type: Number,
      value: 0,
    },
    bottomHeight: {
      type: Number,
      value: 100,
    },
    fixed: Boolean,
  },
  data: {
    isDisabled: false,
  },

  methods: {
    handleSelectAll() {
      this.triggerEvent('handleSelectAll', {
        isAllSelected: !this.properties.isAllSelected,
      });
    },

    handleToSettle() {
      if (this.data.isDisabled) return;
      this.triggerEvent('handleToSettle');
    },
  },
});
