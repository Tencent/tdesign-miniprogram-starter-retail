import Toast from 'tdesign-miniprogram/toast/index';
import { fetchPromotion } from '../../services/promotion/detail';

Page({
  data: {
    list: [],
    banner: '',
    time: 0,
    showBannerDesc: false,
    statusTag: '',
  },

  onLoad(query) {
    let promotionID = parseInt(query['promotion_id']);
    this.getGoodsList(promotionID);
  },

  getGoodsList(promotionID) {
    fetchPromotion(promotionID).then(
      ({ list, banner, time, showBannerDesc, statusTag }) => {
        const goods = list.map((item) => ({
          ...item,
          tags: item.tags.map((v) => v.title),
        }));
        console.log('statusTag: ', list);
        this.setData({
          list: goods,
          banner,
          time,
          showBannerDesc,
          statusTag,
        });
      },
    );
  },

  /** 点击desc */
  bannerDescClickHandle(e) {
    console.log('点击desc: ', e);

    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击desc',
    });
  },
  /** 点击商品 */
  goodClickHandle(e) {
    console.log('点击商品: ', e);

    const { index } = e.detail;
    const { spuId } = this.data.list[index];

    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },
  /** 点击加购 */
  cardClickHandle(e) {
    console.log('点击加购: ', e);

    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });

    // 加购动画
    const { cardID, index, callback } = e.detail;
    const systemInfo = wx.getSystemInfoSync();

    this.createSelectorQuery()
      // 这里一定要起一个父容器选择器，方便写 >>> 这个跨组件选择器
      .select(`#js-page-wrap >>> #${cardID} >>> .wr-goods-card__img`)
      .boundingClientRect((res) => {
        if (!res) {
          return;
        }
        callback({
          startPos: { x: res.left, y: res.top },
          endPos: {
            x: systemInfo.windowWidth * (5 / 8),
            y: systemInfo.windowHeight - 30,
          },
          image: {
            url: this.data.list[index].thumb,
            width: res.width,
            height: res.height,
          },
        });
      })
      .exec();
  },
});
