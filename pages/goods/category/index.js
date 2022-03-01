// import { fullList, goodsList } from "./data.js";
import { getCategoryList } from '../../../services/good/fetchCategoryList';
import { fetchGoodsList } from '../../../services/good/fetchGoodsList';
Page({
  data: {
    goodsList: [],
    list: [],
    initActive: [0, 0],
    show: false,
    loading: false,
    datatype: '0',
    pageSize: 10,
    pageNum: 1,
    loadMoreStatus: 0,
    totalCount: 0,
    loading: false,
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
    const { datatype } = this.data;
    if (datatype === '0') {
      try {
        const result = await getCategoryList();
        this.setData({
          list: result,
        });
      } catch (error) {
        console.error('err:', error);
      }
    } else if (datatype === '2') {
      try {
        const { loadMoreStatus, goodsList } = this.data;
        const params = this.generalQueryData(reset);
        // 在加载中或者无更多数据，直接返回
        if (loadMoreStatus !== 0) return;

        this.setData({
          loadMoreStatus: 1,
          loading: true,
        });
        const code = 'Success';
        const data = await fetchGoodsList();
        if (code.toUpperCase() === 'SUCCESS') {
          const { totalCount = 0, spuList = [] } = data;
          if (totalCount === 0 && reset) {
            this.setData({
              hasLoaded: true,
              loadMoreStatus: 0,
              loading: false,
              total: totalCount,
              goodsList: [],
            });
            return;
          }
          const _goodsList = reset ? spuList : goodsList.concat(spuList);
          const _loadMoreStatus = _goodsList.length === totalCount ? 2 : 0;
          this.setData({
            goodsList: _goodsList,
            pageNum: params.pageNum || 1,
            total: totalCount,
            loadMoreStatus: _loadMoreStatus,
          });
        }
        this.setData({
          hasLoaded: true,
          loading: false,
        });
      } catch (error) {
        console.error('err:', error);
      }
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
  async changeType(e) {
    const { datatype } = e.currentTarget.dataset;
    this.setData({
      datatype,
      show: false,
    });
    this.init(true);
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
  onReachBottom() {
    const { total = 0, goodsList, datatype } = this.data;
    if (datatype === '2') {
      if (goodsList.length === total) {
        this.setData({
          loadMoreStatus: 2,
        });
        return;
      }

      this.init(false);
    }
  },
});
