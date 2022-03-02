import { getSearchHistory } from '../../../services/good/fetchSearchHistory';

// import {
//     getSearchHistory,
//     removeSearchHistory,
//     clearSearchHistory,
//   } from '@/services/modules/search';
Page({
  data: {
    searchWords: [],
    keywords: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
    },
    deleteType: 0,
    deleteIndex: '',
    dialogShow: false,
    loading: false,
  },
  onShow() {
    // 查询搜索历史
    this.queryHistory();
  },

  async queryHistory() {
    this.setData({
      loading: true,
    });
    try {
      const data = await getSearchHistory();
      const code = 'Success';
      if (String(code).toUpperCase() === 'SUCCESS') {
        const { searchWord: searchWords = [] } = data;
        this.setData({
          searchWords,
        });
      }
    } catch (error) {
      console.error(error);
    }
    this.setData({
      loading: false,
    });
  },

  // 清空搜索历史
  confirm() {
    const { deleteType, deleteIndex, searchWords } = this.data;
    if (deleteType === 0) {
      // 单个删除
      removeSearchHistory({
        searchWord: searchWords[deleteIndex],
      }).then(() => {
        this.queryHistory();
      });
    } else {
      clearSearchHistory().then(() => {
        this.setData({ searchWords: [] });
      });
    }
  },

  handleClearHistory() {
    const { dialog } = this.data;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除所有历史记录',
      },
      dialogShow: true,
      deleteType: 1,
    });
  },
  // 长按删除单个历史记录
  deleteCurr(e) {
    const { index } = e.currentTarget.dataset;
    const { dialog } = this.data;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除当前历史记录',
        deleteType: 0,
      },
      dialogShow: true,
      deleteIndex: index,
    });
  },
  // 输入框输入值
  focusAction(e) {
    this.setData({ val: e.detail.value });
  },
  // 清空输入框的值
  clearAction() {
    this.setData({
      searchWords: [],
    });
    clearSearchHistory();
  },
  handleHistoryTap(e) {
    const { searchWords } = this.data;
    const { dataset } = e.currentTarget;
    const _keywords = searchWords[dataset.index || 0] || '';
    if (_keywords) {
      this.setData(
        {
          keywords: searchWords[dataset.index || 0] || '',
        },
        () => {
          // 搜索埋点上报 - 点击历史记录标签搜索
          // search({ keyword: _keywords }, this);
          wx.navigateTo({
            url: `/pages/goods/result/index?keywords=${_keywords}`,
          });
        },
      );
    }
  },

  // 输入完成
  handleSubmit(e) {
    const { value } = e.detail;
    if (value.length === 0) return;
    // 搜索埋点上报 - 输入完成情况
    // search({ keyword: value }, this);
    this.setData(
      {
        keywords: value,
      },
      () => {
        wx.navigateTo({
          url: `/pages/goods/result/index?keywords=${this.data.keywords}`,
        });
      },
    );
  },

  handleCancel() {
    wx.navigateTo({
      url: '/pages/goods/search/index',
    });
  },
});
