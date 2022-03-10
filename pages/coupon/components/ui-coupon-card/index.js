Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
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
    oper: {
      type: String,
      value: 'none', // 优惠券操作类型：none, seeDetail, select
    },
    value: {
      type: String,
      value: '',
    }, // 优惠金额
    tag: String, // 优惠标签，优惠券名字标签，img
    desc: String, // 优惠金额描述，金额下方
    title: String, // 优惠券名称
    timeLimit: String, // 优惠券时限
    ruleDesc: String, // 优惠券适用规则描述
    unEnableReason: String, // 不可用原因
    currency: {
      type: String,
      value: '¥', // 优惠货币
    },
    colorStyle: {
      type: String,
      value: '1',
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
    type: '', // 优惠金额
    value: '', // 优惠券金额
    color: '',
  },

  attached() {
    this.setData({
      color: `color${this.properties.colorStyle}`,
    });
  },
});
