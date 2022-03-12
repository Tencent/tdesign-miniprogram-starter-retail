Page({
  data: {
    nameValue: '',
  },
  onLoad(options) {
    const { name } = options;
    this.setData({
      nameValue: name,
    });
  },
  onSubmit() {
    wx.navigateBack({ backRefresh: true });
  },
  clearContent() {
    this.setData({
      nameValue: '',
    });
  },
});
