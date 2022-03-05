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
    const { nameValue } = this.data;
    wx.navigateBack({ backRefresh: true });
    console.log('nameValue: ', nameValue);
  },
  clearContent() {
    this.setData({
      nameValue: '',
    });
  },
});
