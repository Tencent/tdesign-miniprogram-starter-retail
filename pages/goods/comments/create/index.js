import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import { get } from '../../../../utils/util';
Page({
  data: {
    commentList: [],
    freightScore: 0,
    serviceScore: 0,
    orderLoading: false,
    error: '',
    dirty: false,
    submmiting: false,
    isFinished: true,
    skuId: '',
    spuId: '',
    orderNo: '',
    recomment: false,
    _submmiting: false,
  },

  onLoad(options) {
    const { orderNo = '', recomment = false, skuId = '', spuId = '' } = options;
    this.setData({
      orderNo,
      skuId,
      spuId,
      recomment,
    });
    this.init();
  },

  init() {
    this.queryComment();
  },
  async queryComment() {
    try {
      this.setData({ orderLoading: true });
      const { skuId, spuId, orderNo } = this.data;
      const comment = await getCommentDetail({
        skuId,
        spuId,
        orderNo,
      }).then((res) => res);
      console.log('comment:', comment);
      const { commentInfos = [] } = comment || {};

      const goodsTitle = get(commentInfos, '[0].commentIdName');
      console.log('goodsTitle:', goodsTitle);
      const image = get(commentInfos, '[0].commentIdImageUrl');
      const specs = get(commentInfos, '[0].specification');
      // const commentStage = get(commentInfos, '[0].commentStage');
      console.log('xxxxxppppppp');
      const commentList = commentInfos.map((v) => ({
        title: goodsTitle,
        image,
        specs,
        spuId: v.commentId,
        skuId: v.commentExtendId,
        score: 0,
        comment: '',
        files: [],
        anonymous: false,
        id: v.id,
      }));
      console.log('commentList:', commentList);
      this.setData(
        {
          commentList,
          orderLoading: false,
          freightScore: get(commentInfos, '[0].freightScore') || 0,
          serviceScore: get(commentInfos, '[0].serviceScore') || 0,
          isFinished:
            get(commentInfos, '[0].freightScore') &&
            get(commentInfos, '[0].serviceScore'),
        },
        () => {
          console.log('error');
        },
      );
    } catch (e) {
      this.setData({ orderLoading: false });
      console.log('error:', e);
      // showError({ message: e.msg || '获取评论失败' });
    }
  },

  onFieldChange(e) {
    const fieldKey = get(e, 'currentTarget.dataset.field');
    fieldKey &&
      this.setData({ [fieldKey]: e.detail.value, dirty: true }, () => {
        console.log('error');
      });
  },

  //获取表单错误信息和应该滚动锚点元素的类名
  getErrorWithAnchor() {
    const { commentList, freightScore, serviceScore } = this.data;
    const len = commentList.length;
    for (let i = 0; i < len; i++) {
      const { comment, score } = commentList[i];
      const anchor = `.sku-comment-${i}`;
      if (!score) {
        return { error: '请给商品评分', anchor };
      }
      if (!(comment && comment.trim())) {
        return { error: '请输入商品评价', anchor };
      }
    }
    const storeCommentCls = '.store-comment';
    if (!freightScore) {
      return { error: '请给物流评分', anchor: storeCommentCls };
    }
    if (!serviceScore) {
      return { error: '请给服务评分', anchor: storeCommentCls };
    }
    return { error: '', anchor: '' };
  },

  async onBackTap() {
    const { dirty } = this.data;
    if (dirty) {
      await dialog.confirm({
        title: '是否退出评价？',
        message: '已编辑的信息将不保存',
      });
    }
    // Navigator.navigateBack();
  },

  //提交评论
  //   async onSubmmitComment() {
  //     const { error, anchor } = this.getErrorWithAnchor();
  //     if (error) {
  //       wx.pageScrollTo({ selector: anchor, duration: 0 });
  //       toast({ text: error, icon: 'tips' });
  //       return;
  //     }
  //     if (this._submmiting) return;
  //     this._submmiting = true;
  //     this.setData({ submmiting: true });

  //     const { commentList, freightScore, serviceScore } = this.data;
  //     const commonScores = [
  //       { score: freightScore, scoreType: EnumCommentScoreType.LOGISTICS },
  //       { score: serviceScore, scoreType: EnumCommentScoreType.SERVICE },
  //     ];
  //     const comments = commentList.map((v) => {
  //       const medias = v.files.map(({ url, type, thumb }) => ({
  //         url,
  //         coverUrl: thumb,
  //         type:
  //           type === 'image'
  //             ? EnumCommentMediaType.IMAGE
  //             : EnumCommentMediaType.VIDEO,
  //       }));
  //       const scores = [
  //         { score: v.score, scoreType: EnumCommentScoreType.GOODS },
  //       ].concat(commonScores);
  //       return {
  //         commentId: v.spuId,
  //         commentExtendId: v.skuId,
  //         commentIdType: EnumCommentIdType.GOODS,
  //         commentPrimaryId: v.id,
  //         content: v.comment,
  //         isAnonymous: v.anonymous ? 1 : 2,
  //         specification: v.specs,
  //         medias,
  //         scores,
  //       };
  //     });
  //     const params = {
  //       outerId: this.orderNo,
  //       isReComment: Boolean(this.recomment),
  //       comments,
  //       commentSource: 4,
  //     };

  //     try {
  //       const res = await apis.comment.create(params, {
  //         level: EnumRequestLevel.Negligible,
  //       });
  //       this.setData({ submmiting: false });
  //       if (isSuccess(res)) {
  //         toast({ text: '评价审核中' });
  //         setTimeout(() => {
  //           this._submmiting = false;
  //         //   setRefreshFlag([
  //         //     'supermarket/pages/order/orderList/index',
  //         //     'supermarket/pages/order/orderDetail/index',
  //         //   ]); // 标记订单详情、订单列表刷新
  //           // Navigator.navigateBack();
  //         }, 1800);
  //       } else {
  //         this._submmiting = false;
  //         toast({ text: res.msg || '评价失败，请稍后重试', icon: 'tips' });
  //       }
  //     } catch (e) {
  //       this.setData({ submmiting: false });
  //       this._submmiting = false;
  //     }
  //   }
});
