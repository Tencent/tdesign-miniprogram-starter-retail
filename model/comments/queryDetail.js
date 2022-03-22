const queryDetail = {
  commentInfos: [
    {
      id: '647984992708380600',
      uid: '',
      userName: 'Dean Cheng',
      userHeadUrl:
        'https://bizmid-material-qa-1302115263.cos.ap-guangzhou.myqcloud.com/comment/default_head.png',
      commentId: '1937712',
      commentIdName: '小鹿商品',
      commentIdImageUrl:
        'https://bizmid-material-qa-1302115263.file.myqcloud.com/persist/4bf2ded7-1759-4821-919c-cc4960e14120/1078823925183295617/100000114727/material/1/cdbeb389be64427b8c165627895ff0bc-1610425563793-%E5%A4%B4%E5%83%8F.png',
      commentStage: 1,
      commentCheckStatus: 2,
      commentIdType: 1,
      content: '',
      commentInfo: {
        score: null,
        content: '',
        medias: [],
        commentTime: '1617872404000',
      },
      isAgainComment: 0,
      commentHasAgainComment: 0,
      isAnonymous: 0,
      replyList: [],
      specification: '颜色:白色 ',
      specificationJson: '{"颜色":"白色"}',
      commentExtendId: '1937713',
      commentTime: '1617872404000',
      score: 0,
      goodsScore: null,
      freightScore: null,
      serviceScore: null,
      medias: [],
      againCommentList: null,
    },
  ],
  logisticsScore: null,
  serviceScore: null,
};

/**
 * @param {string} skuId
 * @param {string} spuId
 * @param {string} orderNo
 */
export function queryCommentDetail() {
  return queryDetail;
}
