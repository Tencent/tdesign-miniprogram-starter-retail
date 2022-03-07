Component({
  properties: {
    show: {
      type: Boolean,
      observer(show) {
        console.log('show: ', show);
        if (!show) return;
        this.updateDivisions();
      },
    },
    title: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
      observer() {
        if (!this.data.show) return;
        this.updateDivisions();
      },
    },
    pickerOptions: {
      type: Array,
      value: [],
      observer() {
        if (!this.data.show) return;
        this.updateDivisions();
      },
    },
    headerVisible: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    pickerValue: [],
  },
  methods: {
    updateDivisions() {
      const { pickerOptions, value } = this.data;
      const index = (pickerOptions || []).findIndex(
        (item) => item.code === value,
      );

      // 使用setTimeout延迟到下个循环后复现概率降低
      setTimeout(() => {
        this.setData({ pickerValue: index >= 0 ? [index] : [0] });
      }, 0);
    },

    getAreaByIndex(indexes) {
      const { pickerOptions } = this.data;
      return pickerOptions[indexes.toString()];
    },

    onChange(e) {
      const currentValue = e.detail.value;
      const target = this.getAreaByIndex(currentValue);
      if (target === null) return;

      // 不可直接修改this.properties.value值，避免直接取消再次回填数据错误
      this.setData({ pickerValue: currentValue });
      this.triggerEvent('change', { value: target.code, target: target });
    },

    onConfirm() {
      // 需要通过pickerValue来获取value，而不是直接取data.value
      const target = this.getAreaByIndex(this.data.pickerValue);
      this.triggerEvent('confirm', { value: target?.code, target });
    },

    onClose() {
      this.triggerEvent('close');
    },
  },
});
