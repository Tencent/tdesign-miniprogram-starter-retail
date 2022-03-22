/* eslint-disable no-param-reassign */
import { getSearchResult } from '../../../services/good/featchSearchResult';
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
    minSalePriceFocus: false,
    maxSalePriceFocus: false,
    layoutText: layoutMap[0],
    pageNum: 1,
    pageSize: 30,
    total: 0,
    filter: initFilters,
    hasLoaded: false,
    keywords: '',
    loadMoreStatus: 0,
    cartNum: 0,
    store: '',
    loading: true,
    sceneId: 2,
    pageLoaded: false,
    outerService: null,
  },

  onLoad(options) {
    const { searchValue = '' } = options || {};
    this.setData(
      {
        keywords: searchValue,
        pageLoaded: true,
      },
      () => {
        this.init(true);
      },
    );
  },

  generalQueryData(reset = false) {
    const { filter, pageNum, pageSize, keywords, minVal, maxVal } = this.data;
    const { sorts, overall } = filter;

    const params = {
      sort: 0, // 0 综合，1 价格
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
    params.minPrice = minVal ? minVal * 100 : 0;
    params.maxPrice = maxVal ? maxVal * 100 : undefined;

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

    if (loadMoreStatus !== 0) return;

    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      const result = await getSearchResult(params);
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
        _goodsList.forEach((v) => {
          v.tags = v.spuTagList.map((u) => u.title);
          v.hideKey = { desc: true };
        });
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

  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

  handleSubmit() {
    this.setData(
      {
        goodsList: [],
        loadMoreStatus: 0,
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

  tagClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击标签',
    });
  },

  gotoGoodsDetail(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  handleFilterChange(e) {
    const { layout, overall, sorts } = e.detail;
    const { filter, total } = this.data;
    const _filter = {
      sorts,
      overall,
      layout,
    };
    this.setData({
      filter: _filter,
      layout: layout,
      sorts,
      overall,
      layoutText: layoutMap[layout],
    });

    if (layout === filter.layout) {
      this.setData(
        {
          pageNum: 1,
          goodsList: [],
          loadMoreStatus: 0,
        },
        () => {
          total && this.init(true);
        },
      );
    }
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

  // 最小值
  onMinValAction(e) {
    const { value } = e.detail;
    this.setData({ minVal: value });
  },

  // 最大值
  onMaxValAction(e) {
    const { value } = e.detail;
    this.setData({ maxVal: value });
  },

  // 筛选重置
  reset() {
    this.setData({ minVal: '', maxVal: '' });
  },

  // 筛选确定
  confirm() {
    const { minVal, maxVal } = this.data;
    let message = '';

    if (minVal && !maxVal) {
      message = `价格最小是${minVal}`;
    } else if (!minVal && maxVal) {
      message = `价格范围是0-${minVal}`;
    } else if (minVal && maxVal && minVal <= maxVal) {
      message = `价格范围${minVal || 0}-${this.data.maxVal}`;
    } else {
      message = '请输入正确范围';
    }

    if (message) {
      Toast({
        context: this,
        selector: '#t-toast',
        message,
      });
    }

    this.setData(
      {
        show: false,
        minVal: '',
        goodsList: [],
        loadMoreStatus: 0,
        pageNum: 1,
        maxVal: '',
      },
      () => {
        this.init();
      },
    );
  },
});
