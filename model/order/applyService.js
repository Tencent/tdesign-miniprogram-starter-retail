import { mockIp, mockReqId } from '../../utils/mock';

const orderResps = [
  {
    data: {
      saasId: '88888888',
      uid: '88888888205468',
      storeId: '1000',
      skuId: '135691625',
      numOfSku: 1,
      numOfSkuAvailable: 1,
      refundableAmount: '26900',
      refundableDiscountAmount: '0',
      shippingFeeIncluded: '0',
      paidAmountEach: '26900',
      boughtQuantity: 1,
      orderNo: '132222623132329291',
      goodsInfo: {
        goodsName: '迷你便携高颜值蓝牙无线耳机立体声',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
        specInfo: [
          {
            specId: '50456',
            specTitle: '颜色',
            specValue: '黑色',
          },
          {
            specId: '50459',
            specTitle: '尺码',
            specValue: '简约款',
          },
        ],
      },
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 36,
    success: true,
  },
  {
    data: {
      saasId: '88888888',
      uid: '88888888205468',
      storeId: '1000',
      skuId: '135676631',
      numOfSku: 1,
      numOfSkuAvailable: 1,
      refundableAmount: '26900',
      refundableDiscountAmount: '0',
      shippingFeeIncluded: '0',
      paidAmountEach: '26900',
      boughtQuantity: 1,
      orderNo: '132222623132329291',
      goodsInfo: {
        goodsName: '白色短袖连衣裙荷叶边裙摆宽松韩版休闲',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
        specInfo: [
          {
            specId: '50456',
            specTitle: '颜色',
            specValue: '米色荷叶边',
          },
          {
            specId: '50459',
            specTitle: '尺码',
            specValue: 'S',
          },
        ],
      },
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 36,
    success: true,
  },
  {
    data: {
      saasId: '88888888',
      uid: '88888888205468',
      storeId: '1000',
      skuId: '135691622',
      numOfSku: 1,
      numOfSkuAvailable: 1,
      refundableAmount: '26900',
      refundableDiscountAmount: '0',
      shippingFeeIncluded: '0',
      paidAmountEach: '26900',
      boughtQuantity: 1,
      orderNo: '132222623132329291',
      goodsInfo: {
        goodsName: '腾讯极光盒子4智能网络电视机顶盒',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
        specInfo: [
          {
            specId: '50456',
            specTitle: '颜色',
            specValue: '经典白',
          },
          {
            specId: '50459',
            specTitle: '类型',
            specValue: '经典套装',
          },
        ],
      },
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 36,
    success: true,
  },
  {
    data: {
      saasId: '88888888',
      uid: '88888888205468',
      storeId: '1000',
      skuId: '135676629',
      numOfSku: 1,
      numOfSkuAvailable: 1,
      refundableAmount: '26900',
      refundableDiscountAmount: '0',
      shippingFeeIncluded: '0',
      paidAmountEach: '26900',
      boughtQuantity: 1,
      orderNo: '132222623132329291',
      goodsInfo: {
        goodsName: '带帽午休毯虎年款多功能加厚加大',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
        specInfo: [
          {
            specId: '50456',
            specTitle: '颜色',
            specValue: '浅灰色',
          },
          {
            specId: '50459',
            specTitle: '尺码',
            specValue: 'S',
          },
        ],
      },
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 36,
    success: true,
  },
  {
    data: {
      saasId: '88888888',
      uid: '88888888205468',
      storeId: '1000',
      skuId: '135686631',
      numOfSku: 1,
      numOfSkuAvailable: 1,
      refundableAmount: '26900',
      refundableDiscountAmount: '0',
      shippingFeeIncluded: '0',
      paidAmountEach: '26900',
      boughtQuantity: 1,
      orderNo: '132222623132329291',
      goodsInfo: {
        goodsName: '运动连帽拉链卫衣休闲开衫长袖',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
        specInfo: [
          {
            specId: '50456',
            specTitle: '颜色',
            specValue: '军绿色',
          },
          {
            specId: '50459',
            specTitle: '尺码',
            specValue: 'XS',
          },
        ],
      },
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 36,
    success: true,
  },
];

export function genRightsPreview(params) {
  const { orderNo, skuId } = params;
  const resp = orderResps.find(
    (r) => r.data.orderNo === orderNo && r.data.skuId === skuId,
  );
  return resp;
}

export function genApplyReasonList(params) {
  const resp = {
    data: {
      saasId: '70000001',
      rightsReasonList: [
        { id: '1', desc: '实际商品与描述不符' },
        { id: '2', desc: '质量问题' },
        { id: '3', desc: '少件/漏发' },
        { id: '4', desc: '包装/商品/污迹/裂痕/变形' },
        { id: '5', desc: '发货太慢' },
        { id: '6', desc: '物流配送太慢' },
        { id: '7', desc: '商家发错货' },
        { id: '8', desc: '不喜欢' },
      ],
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 6,
    success: true,
  };
  // 未收货对应的原因列表
  if (params.rightsReasonType === 'REFUND_MONEY') {
    resp.data.rightsReasonList = [
      { id: '9', desc: '空包裹' },
      { id: '10', desc: '快递/物流一直未送到' },
      { id: '11', desc: '货物破损已拒签' },
      { id: '12', desc: '不喜欢' },
    ];
  }
  return resp;
}

export function applyService() {
  const resp = {
    data: {
      rightsNo: '123123423',
      saasId: '70000001',
      uid: '700000011070005',
      storeId: '542',
      result: null,
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 269,
    success: true,
  };
  return resp;
}
