/*
 * @Author: oliverppeng
 * @LastEditors: oliverppeng
 * @Date: 2021-12-01 17:33:43
 * @LastEditTime: 2021-12-26 21:39:48
 * @Description: 
 * @FilePath: /retail-mp/pages/usercenter/address/edit/index.js
 */
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
  updateValue(e) {
    const content = e.detail;
    const detail = {
      ...this.data.detail,
      ...content,
    }
    this.setData({ 
      detail,
    })
  },
  formSubmit({ detail }) {
    const { locationState } = detail;
    this.hasSava = true;

    resolveAddress({
      saasId: '88888888',
      uid: `88888888205500`,
      authToken: null,
      id: locationState.addressId,
      addressId: locationState.addressId,
      phone: locationState.phone,
      name: locationState.name,
      countryName: locationState.countryName,
      countryCode: locationState.countryCode,
      provinceName: locationState.provinceName,
      provinceCode: locationState.provinceCode,
      cityName: locationState.cityName,
      cityCode: locationState.cityCode,
      districtName: locationState.districtName,
      districtCode: locationState.districtCode,
      detailAddress: locationState.detailAddress,
      isDefault: locationState.isDefault === 1 ? 1 : 0,
      addressTag: locationState.addressTag,
      latitude: locationState.latitude,
      longitude: locationState.longitude,
      storeId: null,
    });

    wx.navigateBack({ delta: 1 });
  },
});
