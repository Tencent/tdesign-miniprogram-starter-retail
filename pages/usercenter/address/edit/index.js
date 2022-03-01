import { fetchDeliveryAddress } from '../../../../services/address/fetchAddress';
import { areaData } from '../../../../config/index';

import { resolveAddress, rejectAddress } from './util';

Page({
  data: {
    detail: {},
    areaData: areaData,
  },

  onLoad(query) {
    const { id } = query;
    this.init(id);
  },

  onUnload() {
    if (!this.hasSava) {
      rejectAddress();
    }
  },

  hasSava: false,

  init(id) {
    if (id) {
      this.getAddressDetail(Number(id));
    }
  },
  getAddressDetail(id) {
    fetchDeliveryAddress(id).then((detail) => {
      this.setData({ detail });
    });
  },
  formSubmit({ detail }) {
    this.hasSava = true;

    resolveAddress({
      saasId: '88888888',
      uid: `88888888205500`,
      authToken: null,
      id: detail.addressId,
      addressId: detail.addressId,
      phone: detail.phone,
      name: detail.name,
      countryName: detail.countryName,
      countryCode: detail.countryCode,
      provinceName: detail.provinceName,
      provinceCode: detail.provinceCode,
      cityName: detail.cityName,
      cityCode: detail.cityCode,
      districtName: detail.districtName,
      districtCode: detail.districtCode,
      detailAddress: detail.detailAddress,
      isDefault: detail.isDefault === 1 ? 1 : 0,
      addressTag: detail.addressTag,
      latitude: detail.latitude,
      longitude: detail.longitude,
      storeId: null,
    });

    wx.navigateBack({ delta: 1 });
  },
});
