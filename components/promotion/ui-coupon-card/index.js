Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  externalClasses: ['coupon-class'],

  properties: {
    mask: {
      type: Boolean,
      value: false, // 是否添加遮罩
    },
    superposable: {
      type: Boolean,
      value: false, // 是否可叠加
    },
    type: {
      type: String,
      value: '', // 优惠券类型：CouponType
    },
    value: {
      type: String,
      value: '', // 优惠金额
    },
    tag: {
      type: String,
      value: '', // 优惠标签，优惠券名字标签，img
    },
    desc: {
      type: String,
      value: '', // 优惠金额描述，金额下方
    },
    title: {
      type: String, // 优惠券名称
      value: '',
    },
    timeLimit: {
      type: String, // 优惠券时限
      value: '',
    },
    ruleDesc: {
      type: String, // 优惠券适用规则描述
      value: '',
    },
    currency: {
      type: String,
      value: '¥', // 优惠货币
    },
    status: {
      type: String,
      value: 'default',
    },
    image: {
      type: String,
      value: '',
    },
  },

  data: {
    CouponType: {
      MJ_COUPON: 1,
      ZK_COUPON: 2,
      MJF_COUPON: 3,
      GIFT_COUPON: 4,
    },
    theme: 'primary',
  },

  observers: {
    status: function (value) {
      let theme = 'primary';
      // 已过期或已使用的券 颜色置灰
      if (value === 'useless' || value === 'disabled') {
        theme = 'weak';
      }

      this.setData({ theme });
    },
  },

  attached() {
    this.setData({
      color: `color${this.properties.colorStyle}`,
    });
  },
});
