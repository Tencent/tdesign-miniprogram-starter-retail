import { fetchCouponDetail } from '../../services/coupon/index';

Page({
  data: {
    detail: null,
    storeInfoList: [],
    storeInfoStr: '',
    showStoreInfoList: false,
  },

  id: '',

  onLoad(query) {
    let id = parseInt(query['id']);
    this.id = id;
    this.getGoodsList(id);
  },

  getGoodsList(id) {
    fetchCouponDetail(id).then(({ detail, storeInfoList }) => {
      this.setData({
        detail,
        storeInfoList,
        storeInfoStr: storeInfoList.map((i) => i.storeName).join('、'),
      });
    });
  },

  openStoreList() {
    this.setData({
      showStoreInfoList: true,
    });
  },

  closeStoreList() {
    this.setData({
      showStoreInfoList: false,
    });
  },

  navGoodListHandle() {
    wx.navigateTo({
      url: `/pages/coupon/good?id=${this.id}`,
    });
  },
});
