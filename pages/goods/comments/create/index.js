import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import { get } from '../../../../utils/util';
Page({
  data: {
    serviceRateValue: 1,
    goodRateValue: 1,
    conveyRateValue: 1,
    isAnonymous: false,
    originFiles: [],
    gridConfig: {
      width: 218,
      height: 218,
      column: 3
    }
  },

  onRateChange(e) {
    const { value } = e.detail;
    const item = e?.currentTarget?.dataset?.item;
    this.setData({ [item]: value })
  },

  onAnonymousChange(e) {
    const status = !!e?.detail?.checked;
    this.setData({ isAnonymous: status });
  },

  handleSuccess(e) {
    const { originFiles } = this.data;

    // 图片上传处理
    const { files } = e.detail;

    files.forEach((temp) => {
      const name = temp.name;
      originFiles.push(temp);
    });

    this.setData({
      originFiles,
    });
  },

});
