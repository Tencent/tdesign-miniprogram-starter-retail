/** 地址 */
export function genAddress(id) {
  return {
    saasId: '88888888',
    uid: `8888888820550${id}`,
    authToken: null,
    id: `${id}`,
    addressId: `${id}`,
    phone: '17612345678',
    name: `测试用户${id}`,
    countryName: '中国',
    countryCode: 'chn',
    provinceName: '甘肃省',
    provinceCode: '620000',
    cityName: '甘南藏族自治州',
    cityCode: '623000',
    districtName: '碌曲县',
    districtCode: '623026',
    detailAddress: `松日鼎盛大厦${id}层${id}号`,
    isDefault: `${id}` === '0' ? 1 : 0,
    addressTag: id === 0 ? '' : '公司',
    latitude: '34.59103',
    longitude: '102.48699',
    storeId: null,
  };
}

/** 地址列表 */
export function genAddressList(len = 10) {
  return new Array(len).fill(0).map((_, idx) => genAddress(idx));
}
