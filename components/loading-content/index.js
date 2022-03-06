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
    textSize: {
      type: String,
      value: '24rpx',
    },
    color: {
      type: String,
      value: '#c8c9cc',
    },
    textColor: {
      type: String,
      value: '#969799',
    },
    backgroundColor: {
      type: String,
      value: 'rgba(0, 0, 0, .6)',
    },
  },
});
