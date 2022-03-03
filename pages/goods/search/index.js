import {
  getSearchHistory,
  getSearchPopular,
} from '../../../services/good/fetchSearchHistory';

Page({
  data: {
    historyWords: [],
    popularWords: [],
    searchValue: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
    },
    deleteType: 0,
    deleteIndex: '',
    dialogShow: false,
  },

  onShow() {
    this.queryHistory();
    this.queryPopular();
  },

  // 获取历史搜索记录
  async queryHistory() {
    try {
      const data = await getSearchHistory();
      const code = 'Success';
      if (String(code).toUpperCase() === 'SUCCESS') {
        const { historyWords = [] } = data;
        this.setData({
          historyWords,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 搜索热门搜索记录
  async queryPopular() {
    try {
      const data = await getSearchPopular();
      const code = 'Success';
      if (String(code).toUpperCase() === 'SUCCESS') {
        const { popularWords = [] } = data;
        this.setData({
          popularWords,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 清空搜索历史
  confirm() {
    const { deleteType, deleteIndex, historyWords } = this.data;
    historyWords.splice(deleteIndex, 1);
    if (deleteType === 0) {
      // 单个删除
      this.setData({
        historyWords,
        dialogShow: false,
      });
    } else {
      this.setData({ historyWords: [], dialogShow: false });
    }
  },

  close() {
    this.setData({ dialogShow: false });
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

  handleHistoryTap(e) {
    const { historyWords } = this.data;
    const { dataset } = e.currentTarget;
    const _searchValue = historyWords[dataset.index || 0] || '';
    if (_searchValue) {
      wx.navigateTo({
        url: `/pages/goods/result/index?searchValue=${_searchValue}`,
      });
    }
  },

  // 输入完成
  handleSubmit(e) {
    const { value } = e.detail.value;
    if (value.length === 0) return;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });
  },
});
