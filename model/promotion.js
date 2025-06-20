import { getGoodsList } from './goods';

export function getPromotion(baseID = 0, length = 10) {
  return {
    list: getGoodsList(baseID, length).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => ({ title: tag.title })),
      };
    }),
    banner: 'https://tdesign.gtimg.com/miniprogram/template/retail/promotion/banner-promotion.png',
    time: 1000 * 60 * 60 * 20,
    showBannerDesc: true,
    statusTag: 'running',
  };
}
