let ARRAY = [];
Component({
  externalClasses: ['wr-class'],

  options: {
    multipleSlots: true,
  },
  properties: {
    disabled: Boolean,
    leftWidth: {
      type: Number,
      value: 0,
    },
    rightWidth: {
      type: Number,
      value: 0,
    },
    asyncClose: Boolean,
  },
  attached() {
    ARRAY.push(this);
  },

  detached() {
    ARRAY = ARRAY.filter((item) => item !== this);
  },

  /**
   * Component initial data
   */
  data: {
    wrapperStyle: '',
    asyncClose: false,
    closed: true,
  },

  /**
   * Component methods
   */
  methods: {
    open(position) {
      this.setData({ closed: false });
      this.triggerEvent('close', {
        position,
        instance: this,
      });
    },

    close() {
      this.setData({ closed: true });
    },

    closeOther() {
      ARRAY.filter((item) => item !== this).forEach((item) => item.close());
    },

    noop() {
      return;
    },

    onClick(event) {
      const { key: position = 'outside' } = event.currentTarget.dataset;
      this.triggerEvent('click', position);

      if (this.data.closed) {
        return;
      }

      if (this.data.asyncClose) {
        this.triggerEvent('close', {
          position,
          instance: this,
        });
      } else {
        this.close();
      }
    },
  },
});
