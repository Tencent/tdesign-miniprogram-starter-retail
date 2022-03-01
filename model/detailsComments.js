import { cdnBase } from '../config/index';

const imgPrefix = cdnBase;

/**
 * @param {number} spuId
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} commentsLevel
 * @param {boolean} hasImage
 */

export function getGoodsDetailsComments(spuId = 0) {
  return {
    homePageComments: [
      {
        spuId: '1722045',
        skuId: null,
        specInfo: null,
        commentContent: "da大块头mei没有da'hda'hi'zhui大会追",
        commentImageUrls: [`${imgPrefix}/common/apple.png`],
        commentScore: 4,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: null,
        isAutoComment: null,
      },
    ],
  };
}

export function getGoodsDetailsCommentsCount(spuId = 0) {
  return {
    commentCount: '47',
    badCount: '0',
    middleCount: '2',
    goodCount: '45',
    hasImageCount: '1',
    goodRate: 95.7,
    uidCount: '0',
  };
}
