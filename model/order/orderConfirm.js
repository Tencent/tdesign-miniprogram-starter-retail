import { mockIp, mockReqId } from '../../utils/mock';

/** 生成结算数据 */
export function genSettleDetail({ userAddressReq }) {
  const resp = {
    data: {
      settleType: 0,
      userAddress: null,
      totalGoodsCount: 3,
      packageCount: 1,
      totalAmount: '289997',
      totalPayAmount: '179997',
      totalDiscountAmount: '110000',
      totalPromotionAmount: '110000',
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
          storeTotalAmount: '289997',
          storeTotalPayAmount: '179997',
          storeTotalDiscountAmount: '110000',
          storeTotalCouponAmount: '0',
          skuDetailVos: [
            {
              storeId: '1000',
              spuId: '135681622',
              skuId: '135676623',
              goodsName: '带帽午休毯虎年款多功能加厚加大',
              image:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
              reminderStock: 119,
              quantity: 2,
              payPrice: '29999',
              totalSkuPrice: '29999',
              discountSettlePrice: '29999',
              realSettlePrice: '29999',
              settlePrice: '29999',
              oriPrice: '39999',
              tagPrice: null,
              tagText: null,
              skuSpecLst: [
                {
                  specTitle: '颜色',
                  specValue: '浅灰色',
                },
                {
                  specTitle: '尺码',
                  specValue: 'M',
                },
              ],
              promotionIds: null,
              weight: 0.0,
              unit: 'KG',
              volume: null,
              masterGoodsType: 0,
              viceGoodsType: 0,
              roomId: null,
              egoodsName: null,
            },
            {
              storeId: '1000',
              spuId: '135681633',
              skuId: '135676634',
              goodsName: '简约餐盘耐热家用盘子菜盘套装多颜色',
              image: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
              reminderStock: 119,
              quantity: 1,
              payPrice: '129999',
              totalSkuPrice: '129999',
              discountSettlePrice: '129999',
              realSettlePrice: '129999',
              settlePrice: '129999',
              oriPrice: '219999',
              tagPrice: null,
              tagText: null,
              skuSpecLst: [
                { specTitle: '颜色', specValue: '奶黄色' },
                { specTitle: '尺码', specValue: '盘+碗' },
              ],
              promotionIds: null,
              weight: 0.0,
              unit: 'KG',
              volume: null,
              masterGoodsType: 0,
              viceGoodsType: 0,
              roomId: null,
              egoodsName: null,
            },
          ],
          couponList: [
            {
              couponId: 11,
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
  if (userAddressReq) {
    resp.data.settleType = 1;
    resp.data.userAddress = userAddressReq;
  }
  return resp;
}
