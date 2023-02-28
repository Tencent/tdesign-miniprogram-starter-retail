import { areaData } from '../config/index';

const addressParse = (provinceName, cityName, countryName) => {
  return new Promise((resolve, reject) => {
    try {
      const province = areaData.find((v) => v.label === provinceName);
      const { value: provinceCode } = province;
      const city = province.children.find((v) => v.label === cityName);
      const { value: cityCode } = city;
      const country = city.children.find((v) => v.label === countryName);
      const { value: districtCode } = country;
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
