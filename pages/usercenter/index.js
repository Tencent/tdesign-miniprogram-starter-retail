import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import { cdnBase } from '../../config/index';

const menuData = [
  [
    {
      title: '收货地址',
      tit: '收货地址管理',
      url: '',
      type: 'address',
    },
  ],
  [
    {
      title: '个人信息',
      tit: '',
      url: '',
      type: 'userinfo',
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
    },
  ],
];
const orderTagInfos = [
  {
    title: '待付款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '待发货',
    iconName: 'wuliu-1',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: '待收货',
    iconName: 'packaging',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: '退款/售后',
    iconName: 'money',
    orderNum: 0,
    tabType: 0,
    status: 1,
  },
];

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: `${cdnBase}/usercenter/avatar.png`,
    name: '正在登录...',
    phoneNumber: '',
  },
  countsData: [],
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
});

Page({
  /**
   * Page initial data
   */
  data: getDefaultData(),
  /**
   * Lifecycle function--Called when page load
   */
  // onLoad: function (options) {
  //   const {
  //     statusBarHeight,
  //     windowHeight,
  //     screenHeight,
  //   } = wx.getSystemInfoSync();
  //   this.setData({
  //     topDist: screenHeight - windowHeight,
  //   });
  // },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.fetUseriInfoHandle();
  },

  fetUseriInfoHandle() {
    // this.setData(getDefaultData());

    fetchUserCenter().then(
      ({ userInfo, countsData, orderTagInfos, customerServiceInfo }) => {
        this.setData({
          userInfo,
          countsData,
          menuData,
          orderTagInfos: this.data.orderTagInfos.map((orderTagInfo, idx) => {
            return {
              ...orderTagInfo,
              orderNum: (orderTagInfos[idx] || {}).orderNum || 0,
            };
          }),
          customerServiceInfo,
        });

        // 关闭自带的loading效果
        wx.stopPullDownRefresh();
      },
    );
  },

  onClickCell: function ({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        wx.navigateTo({ url: '/pages/usercenter/address/list/index' });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'userinfo': {
        wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
        break;
      }
      default: {
        console.log('未知跳转', type);
      }
    }
  },

  jumpNav(e) {
    // const status =e.detail.tabType;
    const status = e.currentTarget.dataset.item.tabType;
    if (status === 0) {
      wx.navigateTo({ url: '/pages/order/after-service-list/index' });
    } else {
      wx.navigateTo({ url: '/pages/order/order-list/index?status=' + status });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  tapCountDetailHandle(e) {
    /** @todo 这里暂时使用中文名称来进行跳转适配，但理应使用key/id等固定的名称来进行跳转 */
    const { item } = e.currentTarget.dataset;

    switch (item.name) {
      case '优惠券': {
        wx.navigateTo({ url: '/pages/coupon/list' });
        break;
      }
      default: {
        console.log('未知跳转', item);
      }
    }
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },
  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },
});
