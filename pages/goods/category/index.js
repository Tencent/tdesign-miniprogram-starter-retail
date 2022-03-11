import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    goodsList: [],
    list: [],
    show: false,
    pageSize: 10,
    pageNum: 1,
    loadMoreStatus: 0,
    totalCount: 0,
    hasLoaded: false,
  },
  generalQueryData(reset = false) {
    const { pageNum, pageSize } = this.data;

    const params = {
      pageNum: 1,
      pageSize: 30,
    };
    // 重置请求
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },
  async init(reset = true) {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(e) {
    wx.navigateTo({
      url: '/pages/goods/list/index',
    });
  },
  showButton() {
    this.setData({
      show: true,
    });
  },
  hideOverlay() {
    this.setData({
      show: false,
    });
  },

  handleAddCart() {
    wx.showToast({
      title: '加入购物车成功',
    });
  },
  onLoad() {
    this.init(true);
    wx.getStorage({
      key: 'cartNum',
      success: (res) => {
        if (res.data) {
          this.setData({
            num: res.num,
          });
        }
      },
    });
  },
});
