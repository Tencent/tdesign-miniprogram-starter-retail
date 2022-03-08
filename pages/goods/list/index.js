import { fetchGoodsList } from '../../../services/good/fetchGoodsList';
import Toast from 'tdesign-miniprogram/toast/index';

const layoutMap = {
  0: 'vertical',
  1: 'horizontal',
};

const initFilters = {
  overall: 1,
  sorts: '',
  layout: 0,
};

Page({
  data: {
    goodsList: [],
    layout: 0,
    sorts: '',
    overall: 1,
    show: false,
    minVal: '',
    maxVal: '',
    minActive: false,
    maxActive: false,
    minSalePriceFocus: false,
    maxSalePriceFocus: false,
    layoutText: layoutMap[0],
    pageNum: 1,
    pageSize: 30,
    total: 0,
    filter: initFilters,
    hasLoaded: false,
    loadMoreStatus: 0,
    cartNum: 0,
    store: '',
    loading: true,
    sceneId: 2,
    pageLoaded: false,
    outerService: null,
  },

  handleFilterChange(e) {
    const { layout, overall, sorts } = e.detail;
    this.setData({
      layout,
      sorts,
      overall,
      pageSize: 1,
      loadMoreStatus: 0,
    });
    this.init(true);
  },

  generalQueryData(reset = false) {
    const { filter, pageNum, pageSize, keywords, minVal, maxVal } = this.data;
    const { sorts, overall } = filter;

    const params = {
      sort: 0, // 0 综合，1 价格
      // sortType: 0, // 0 顺序，1 倒序
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
    };

    if (sorts) {
      params.sort = 1;
      params.sortType = sorts === 'desc' ? 1 : 0;
    }

    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }

    // if (prices.length === 2) {
    //   params.minPrice = prices[0] * 100;
    //   params.maxPrice = prices[1] * 100;
    // }
    params.minPrice = minVal ? minVal * 100 : 0;
    params.maxPrice = maxVal ? maxVal * 100 : undefined;
    // 重置请求
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    const { loadMoreStatus, goodsList = [] } = this.data;
    const params = this.generalQueryData(reset);

    // 在加载中或者无更多数据，直接返回
    if (loadMoreStatus !== 0) return;

    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      const result = await fetchGoodsList(params);
      const code = 'Success';
      const data = result;
      if (code.toUpperCase() === 'SUCCESS') {
        const { spuList, totalCount = 0 } = data;
        if (totalCount === 0 && reset) {
          this.setData({
            emptyInfo: {
              tip: '抱歉，未找到相关商品',
            },
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
      } else {
        this.setData({
          loading: false,
        });
        wx.showToast({
          title: '查询失败，请稍候重试',
        });
      }
    } catch (error) {
      this.setData({
        loading: false,
      });
    }
    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  onLoad() {
    this.setData(
      {
        pageLoaded: true,
      },
      () => {
        this.init(true);
      },
    );
  },

  onReachBottom() {
    const { total = 0, goodsList } = this.data;
    if (goodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }

    this.init(false);
  },

  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  tagClickHandle(e) {
    console.log('点击标签: ', e);
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击标签',
    });
  },

  gotoGoodsDetail(e) {
    const { index } = e.detail;
    const spuId = this.data.goodsList[index].spuId;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  handleMinPriceFocus() {
    this.setData({
      minSalePriceFocus: true,
    });
  },

  handleMinPriceBlur() {
    this.setData({
      minSalePriceFocus: false,
    });
  },

  handleMaxPriceFocus() {
    this.setData({
      maxSalePriceFocus: true,
    });
  },

  handleMaxPriceBlur() {
    this.setData({
      maxSalePriceFocus: false,
    });
  },

  // 最小值
  onMinValAction(e) {
    const { value } = e.detail;
    this.setData({ minVal: value, minActive: value.length });
  },

  // 最大值
  onMaxValAction(e) {
    const { value } = e.detail;
    this.setData({ maxVal: value, maxActive: value.length });
  },

  // 筛选重置
  reset() {
    this.setData({ minVal: '', maxVal: '' });
  },

  // 筛选确定
  confirm() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: `价格范围${this.data.minVal}-${this.data.maxVal}`,
    });
    this.setData({
      show: false,
    });
  },
});
