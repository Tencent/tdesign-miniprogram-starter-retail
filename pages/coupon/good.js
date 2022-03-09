import { fetchCouponDetail } from '../../services/coupon/index';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    goods: [],
    detail: {},
    couponTypeDesc: '',
    showStoreInfoList: false,
  },

  id: '',

  onLoad(query) {
    let id = parseInt(query['id']);
    this.id = id;

    this.getCouponDetail(id);
    this.getGoodsList(id);
  },

  getCouponDetail(id) {
    fetchCouponDetail(id).then(({ detail }) => {
      this.setData({ detail });
      if (detail.type === 'discount') {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `满${detail.base / 100}元${detail.value / 100}折`,
          });
        } else {
          this.setData({ couponTypeDesc: `${detail.value}折` });
        }
      } else if (detail.type === 'price') {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `满${detail.base / 100}元减${detail.value / 100}元`,
          });
        } else {
          this.setData({ couponTypeDesc: `减${detail.value / 100}元` });
        }
      }
    });
  },

  getGoodsList(id) {
    fetchGoodsList(id).then((goods) => {
      this.setData({ goods });
    });
  },

  openStoreList() {
    // console.log('1');
    this.setData({
      showStoreInfoList: true,
    });
  },

  closeStoreList() {
    this.setData({
      showStoreInfoList: false,
    });
  },

  /** 点击商品 */
  goodClickHandle(e) {
    console.log('点击商品: ', e);

    const { index } = e.detail;
    const { spuId } = this.data.goods[index];

    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },

  tagClickHandle(e) {
    console.log('点击标签: ', e);
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击标签',
    });
  },

  /** 点击加购 */
  cardClickHandle(e) {
    console.log('点击加购: ', e);
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },
});
