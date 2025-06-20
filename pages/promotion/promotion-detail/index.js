import Toast from 'tdesign-miniprogram/toast/index';
import { fetchPromotion } from '../../../services/promotion/detail';

Page({
  data: {
    list: [],
    banner: '',
    time: 0,
    showBannerDesc: false,
    statusTag: '',
  },

  onLoad(query) {
    const promotionID = parseInt(query.promotion_id);
    this.getGoodsList(promotionID);
  },

  getGoodsList(promotionID) {
    fetchPromotion(promotionID).then(({ list, banner, time, showBannerDesc, statusTag }) => {
      const goods = list.map((item) => ({
        ...item,
        tags: item.tags.map((v) => v.title),
      }));
      this.setData({
        list: goods,
        banner,
        time,
        showBannerDesc,
        statusTag,
      });
    });
  },

  goodClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.list[index];
    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },

  cardClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  bannerClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击规则详情',
    });
  },
});
