import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import { get } from '../../../../utils/util';
Page({
  data: {
    serviceRateValue: 1,
    goodRateValue: 1,
    conveyRateValue: 1,
    isAnonymous: false,
    uploadFiles: [],
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
    const { files } = e.detail;

    this.setData({
      uploadFiles: files,
    });
  },

  handleRemove(e) {
    const { index } = e.detail;
    const { uploadFiles } = this.data;
    uploadFiles.splice(index, 1);
    this.setData({
      uploadFiles,
    });
  },
});
