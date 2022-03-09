import { fetchCouponDetail } from '../../services/coupon/index';
import { fetchGoodsList } from '../../services/good/fetchGoods';

Page({
  data: {
    goods: [],
    detail: {},
    couponTypeDesc: '',
    showStoreInfoList: false,
  },

  id: '',

  onLoad(query) {
    const id = parseInt(query.id);
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
  /** 点击加购 */
  cardClickHandle(e) {
    console.log('点击加购: ', e);

    /** @todo inori 下边的动画需要等goods-list发版后才能获取到相关参数 */

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
            url: this.data.goods[index].thumb,
            width: res.width,
            height: res.height,
          },
        });
      })
      .exec();
  },
});
