import { areaData } from '../config/index';

const addressParse = (provinceName, cityName, countyName) => {
  return new Promise((resolve, reject) => {
    try {
      const province = areaData.find((v) => v.name === provinceName);
      const { code: provinceCode } = province;
      const city = province.children.find((v) => v.name === cityName);
      const { code: cityCode } = city;
      const county = city.children.find((v) => v.name === countyName);
      const { code: districtCode } = county;
      resolve({
        provinceCode,
        cityCode,
        districtCode,
      });
    } catch (error) {
      reject('地址解析失败');
    }
  });
};

module.exports = {
  addressParse,
};
