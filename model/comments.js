import { cdnBase } from '../config/index';

const imgPrefix = cdnBase;

/**
 * @param {number} spuId
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} commentsLevel
 * @param {boolean} hasImage
 */
export function getGoodsAllComments(params) {
  const { hasImage } = params.queryParameter;
  if (hasImage) {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: '1',
      pageList: [
        {
          spuId: '1722045',
          skuId: '0',
          specInfo: '',
          commentContent: '女装大佬穿起来真好看',
          commentResources: [{ src: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/goods/goods-details-swiper-img.png', type: 'image' }, { src: 'https://upload-dianshi-1255598498.file.myqcloud.com/IMG_5005-b8774e3f58fedde7a7974776d61d8df91c7146b2.mp4', type: 'video', coverSrc: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/goods/goods-details-swiper-img.png' }, { src: 'https://upload-dianshi-1255598498.file.myqcloud.com/IMG_5005-b8774e3f58fedde7a7974776d61d8df91c7146b2.mp4', type: 'video', coverSrc: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/goods/goods-details-swiper-img.png' }, { src: 'https://upload-dianshi-1255598498.file.myqcloud.com/IMG_5005-b8774e3f58fedde7a7974776d61d8df91c7146b2.mp4', type: 'video', coverSrc: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/goods/goods-details-swiper-img.png' }],
          commentScore: 4,
          uid: '88881048075',
          userName: 'Dean',
          userHeadUrl:
            'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
          isAnonymity: false,
          commentTime: '1591953561000',
          isAutoComment: false,
          sellerReply: '亲，你好，我们会联系商家和厂商给您一个满意的答复请一定妥善保管好发票',
          goodsDetailInfo: '颜色:纯净白  尺码:S码'
        },
      ],
    };
  }
  return {
    pageNum: 1,
    pageSize: 10,
    totalCount: '47',
    pageList: [
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '很不错',
        commentContent: 'S1 SKU2',
        commentImageUrls: null,
        commentScore: 1,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592224320000',
        isAutoComment: false,
        sellerReply: '亲，你好，我们会联系商家和厂商给您一个满意的答复请一定妥善保管好发票',
        goodsDetailInfo: '颜色:纯净白  尺码:S码'
      },
      {
        spuId: '1722045',
        skuId: '1697693',
        specInfo: '很适合',
        commentContent: 'S1 SKU1',
        commentImageUrls: null,
        commentScore: 1,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592224320000',
        isAutoComment: false,
        sellerReply: '亲，你好，我们会联系商家和厂商给您一个满意的答复请一定妥善保管好发票',
        goodsDetailInfo: '颜色:纯净白  尺码:S码'
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: 'NICE',
        commentContent: 'spu1 sku2',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592218074000',
        isAutoComment: true,
        sellerReply: '亲，你好，我们会联系商家和厂商给您一个满意的答复请一定妥善保管好发票'
      },
      {
        spuId: '1722045',
        skuId: '0',
        specInfo: '',
        commentContent: 'spu1 sku2',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592218074000',
        isAutoComment: false,
        goodsDetailInfo: '颜色:纯净白  尺码:S码'
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '测试dr超长:dr专用超长;bwtgg01:fff',
        commentContent: '18didiadian点39ffen分',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592217607000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697693',
        specInfo: '测试dr超长:超长测试超长测试1;bwtgg01:bbb',
        commentContent: '18dian点39ffen分',
        commentImageUrls: null,
        commentScore: 4,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592217607000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '测试dr超长:dr专用超长;bwtgg01:fff',
        commentContent: '下午3dia点19分2',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592205599000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '测试dr超长:dr专用超长;bwtgg01:fff',
        commentContent: "第二条gugui'ge规格9999",
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
        isAnonymity: false,
        commentTime: '1592188822000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '测试dr超长:dr专用超长;bwtgg01:fff',
        commentContent: '',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881055835',
        userName: 'no more',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/5mKrvn3ibyDNaDZSZics3aoKlz1cv0icqn4EruVm6gKjsK0xvZZhC2hkUkRWGxlIzOEc4600JkzKn9icOLE6zjgsxw/132',
        isAnonymity: false,
        commentTime: '1593792002000',
        isAutoComment: true,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: '测试dr超长:dr专用超长;bwtgg01:fff',
        commentContent: '',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881055835',
        userName: 'no more',
        userHeadUrl:
          'https://wx.qlogo.cn/mmopen/vi_32/5mKrvn3ibyDNaDZSZics3aoKlz1cv0icqn4EruVm6gKjsK0xvZZhC2hkUkRWGxlIzOEc4600JkzKn9icOLE6zjgsxw/132',
        isAnonymity: false,
        commentTime: '1593792001000',
        isAutoComment: true,
      },
    ],
  };
}

export function getGoodsCommentsCount(spuId) {
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
