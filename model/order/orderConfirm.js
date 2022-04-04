import { mockIp, mockReqId } from '../../utils/mock';

export const transformGoodsDataToConfirmData = (goodsDataList) => {
  const list = [];

  goodsDataList.forEach((goodsData) => {
    list.push({
      storeId: goodsData.storeId,
      spuId: goodsData.spuId,
      skuId: goodsData.skuId,
      goodsName: goodsData.title,
      image: goodsData.primaryImage,
      reminderStock: 119,
      quantity: goodsData.quantity,
      payPrice: goodsData.price,
      totalSkuPrice: goodsData.price,
      discountSettlePrice: goodsData.price,
      realSettlePrice: goodsData.price,
      settlePrice: goodsData.price,
      oriPrice: goodsData.originPrice,
      tagPrice: null,
      tagText: null,
      skuSpecLst: goodsData.specInfo,
      promotionIds: null,
      weight: 0.0,
      unit: 'KG',
      volume: null,
      masterGoodsType: 0,
      viceGoodsType: 0,
      roomId: goodsData.roomId,
      egoodsName: null,
    });
  });

  return list;
};

/** 生成结算数据 */
export function genSettleDetail(params) {
  const { userAddressReq, couponList, goodsRequestList } = params;

  const resp = {
    data: {
      settleType: 0,
      userAddress: null,
      totalGoodsCount: 3,
      packageCount: 1,
      totalAmount: '289997',
      totalPayAmount: '',
      totalDiscountAmount: '110000',
      totalPromotionAmount: '1100',
      totalCouponAmount: '0',
      totalSalePrice: '289997',
      totalGoodsAmount: '289997',
      totalDeliveryFee: '0',
      invoiceRequest: null,
      skuImages: null,
      deliveryFeeList: null,
      storeGoodsList: [
        {
          storeId: '1000',
          storeName: '云Mall深圳旗舰店',
          remark: null,
          goodsCount: 1,
          deliveryFee: '0',
          deliveryWords: null,
          storeTotalAmount: '0',
          storeTotalPayAmount: '179997',
          storeTotalDiscountAmount: '110000',
          storeTotalCouponAmount: '0',
          skuDetailVos: [],
          couponList: [
            {
              couponId: 11,
              storeId: '1000',
            },
          ],
        },
      ],
      inValidGoodsList: null,
      outOfStockGoodsList: null,
      limitGoodsList: null,
      abnormalDeliveryGoodsList: null,
      invoiceSupport: 1,
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 244,
    success: true,
  };

  const list = transformGoodsDataToConfirmData(goodsRequestList);

  // 获取购物车传递的商品数据
  resp.data.storeGoodsList[0].skuDetailVos = list;

  // 判断是否携带优惠券数据
  const discountPrice = [];

  if (couponList && couponList.length > 0) {
    couponList.forEach((coupon) => {
      if (coupon.status === 'default') {
        discountPrice.push({
          type: coupon.type,
          value: coupon.value,
        });
      }
    });
  }

  // 模拟计算场景

  // 计算总价
  const totalPrice = list.reduce((pre, cur) => {
    return pre + cur.quantity * Number(cur.settlePrice);
  }, 0);

  // 计算折扣
  const totalDiscountPrice =
    discountPrice.length > 0
      ? discountPrice.reduce((pre, cur) => {
          if (cur.type === 1) {
            return pre + cur.value;
          }
          if (cur.type === 2) {
            return pre + (Number(totalPrice) * cur.value) / 10;
          }

          return pre + cur;
        }, 0)
      : 0;

  resp.data.totalSalePrice = totalPrice;

  resp.data.totalCouponAmount = totalDiscountPrice;

  resp.data.totalPayAmount =
    totalPrice - totalDiscountPrice - Number(resp.data.totalPromotionAmount);

  if (userAddressReq) {
    resp.data.settleType = 1;
    resp.data.userAddress = userAddressReq;
  }
  return resp;
}
