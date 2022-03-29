Component({
  externalClasses: ['wr-class'],
  properties: {
    position: {
      type: String,
      value: 'static',
    },
    noMask: Boolean,
    type: {
      type: String,
      value: 'circular',
    },
    vertical: Boolean,
    size: {
      type: String,
      value: '50rpx',
    },
    backgroundColor: {
      type: String,
      value: 'rgba(0, 0, 0, .6)',
    },
  },
});
