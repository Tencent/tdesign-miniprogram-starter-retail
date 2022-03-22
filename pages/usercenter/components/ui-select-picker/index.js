Component({
  properties: {
    show: {
      type: Boolean,
      observer(show) {
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

      this.setData({ pickerValue: currentValue });
      this.triggerEvent('change', { value: target.code, target: target });
    },

    onConfirm() {
      const target = this.getAreaByIndex(this.data.pickerValue);
      this.triggerEvent('confirm', { value: target?.code, target });
    },

    onClose() {
      this.triggerEvent('close');
    },
  },
});
