/*
 * @Author: rileycai
 * @Date: 2022-03-14 14:21:26
 * @LastEditTime: 2022-03-14 15:05:39
 * @LastEditors: rileycai
 * @Description: webp-image组件对t-image包裹了一层，主要实现图片裁剪、webp压缩功能
 * @FilePath: /tdesign-miniprogram-starter/components/webp-image/index.js
 */
const systemInfo = wx.getSystemInfoSync();
Component({
  externalClasses: ['t-class', 't-class-load'],
  properties: {
    loadFailed: {
      type: String,
      value: 'default',
    },
    loading: {
      type: String,
      value: 'default',
    },
    src: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'aspectFill',
    },
    webp: {
      type: Boolean,
      value: true,
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    thumbHeight: 375,
    thumbWidth: 375,
    systemInfo,
  },
  lifetimes: {
    ready() {
      const { mode } = this.properties;
      // 获取容器的真实宽高，设置图片的裁剪宽度
      this.getRect('.J-image').then((res) => {
        if (res) {
          const { width, height } = res;
          this.setData(
            mode === 'heightFix'
              ? {
                  thumbHeight: this.px2rpx(height) || 375,
                }
              : {
                  thumbWidth: this.px2rpx(width) || 375,
                },
          );
        }
      });
    },
  },
  methods: {
    onLoad(e) {
      this.triggerEvent('load', e.detail);
    },
    onError(e) {
      this.triggerEvent('error', e.detail);
    },
  },
});
