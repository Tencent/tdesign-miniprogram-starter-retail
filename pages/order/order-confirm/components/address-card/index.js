Component({
  externalClasses: ['wr-class'],
  properties: {
    addressData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onAddressTap() {
      this.triggerEvent('addressclick');
    },
    onAddTap() {
      this.triggerEvent('addclick');
    },
  },
});
