
Component({
  externalClasses: ['wr-class'],
  options: {
    multipleSlots: true,
  },
  properties: {
    userHeadUrl: {
      type: String,
      value: '',
    },
    userName: {
      type: String,
      default: '',
    },
    commentImageUrls: {
      type: Array,
      value: [],
    },
    commentContent: {
      type: String,
      value: '',
      observer(newVal) {
        this.authContent(newVal);
      },
    },
    hideWordCount: {
      type: Number,
      value: 240,
      observer(newVal) {
        this.setData({
          hideWordCount: newVal,
        });
      },
    },
    commentScore: {
      type: Array,
      value: [],
    },
    commentTime: {
      type: String,
      value: '',
    },
    headImgWidth: {
      type: Number,
      value: 38,
    },
    headImgHeight: {
      type: Number,
      value: 38,
    },
    autoPreview: {
      type: Boolean,
      value: true, // 是否开启默认点击展示图册, 默认开启，展示图片为缩略图
    },
  },
  data: {
    showMoreStatus: false,
    showContent: false,
    hideText: false,
    eleHeight: null,
    hideWordCount: 240,
    overText: false,
    isDisabled: true,
  },
  methods: {
    authContent(val) {
      if (this.getByteLen(val) > this.data.hideWordCount) {
        this.setData({
          hideText: true,
          overText: true,
        });
      }
    },
    getByteLen(val) {
      let len = 0;

      for (let i = 0; i < val.length; i++) {
        const a = val.charAt(i);

        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2;
        } else {
          len += 1;
        }
      }

      return len;
    },
    showText() {
      this.setData({
        hideText: false,
      });
    },
    packupText() {
      this.setData({
        hideText: true,
      });
    },
    showCurImg(e) {
      const { index } = e.currentTarget.dataset;
      const { commentImageUrls } = this.properties;
      const { autoPreview } = this.properties;
      if (autoPreview) {
        wx.previewImage({
          current: commentImageUrls[index],
          // @ts-ignore
          urls: commentImageUrls, // 需要预览的图片https链接列表
        });
      } else {
        this.triggerEvent('showPreview', {
          index,
        });
      }
    }
  }
})
