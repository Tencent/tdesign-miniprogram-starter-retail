export function getGoods() {
  return {
    goods: [
      {
        squid: '1',
        checkItems: [
          {
            name: '匿名评价',
            value: 'anonymous',
            checked: false,
          },
        ],
        detail: {
          image:
            'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
          title: '',
        },
        goodComment: {
          /** 商品评价 */
          rate: 0,
          /** 评价内容 */
          label: '123',
          /** 上传图片 */
          images: [],
        },
      },
      {
        squid: '2',
        checkItems: [
          {
            name: '匿名评价',
            value: 'anonymous',
            checked: false,
          },
        ],
        detail: {
          image:
            'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
          title: '评价内容 山姆智利进口',
        },
        goodComment: {
          /** 商品评价 */
          rate: 0,
          /** 评价内容 */
          label: '山姆智利进口',
          /** 上传图片 */
          images: [],
        },
      },
    ],
    storeComment: {
      /** 物流评价 */
      logisticsRate: 0,
      /** 服务评价 */
      servicesRate: 0,
    },
  };
}
