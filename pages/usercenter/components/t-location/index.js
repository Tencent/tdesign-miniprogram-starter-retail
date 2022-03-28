import { getPermission } from '../../../../utils/getPermission';
import { phoneRegCheck } from '../../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
import { addressParse } from '../../../../utils/addressParse';
import { resolveAddress, rejectAddress } from '../../address/list/util';

Component({
  externalClasses: ['t-class'],
  properties: {
    title: {
      type: String,
    },
    navigator: {
      type: Boolean,
    },
    isCustomStyle: {
      type: Boolean,
      value: false,
    },
    isDisabledBtn: {
      type: Boolean,
      value: false,
    },
    isOrderSure: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    getWxLocation() {
      if (this.properties.isDisabledBtn) return;
      getPermission({ code: 'scope.address', name: '通讯地址' }).then(() => {
        wx.chooseAddress({
          success: async (options) => {
            const {
              provinceName,
              cityName,
              countryName,
              detailInfo,
              userName,
              telNumber,
            } = options;

            if (!phoneRegCheck(telNumber)) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: '请填写正确的手机号',
              });
              return;
            }

            const target = {
              name: userName,
              phone: telNumber,
              countryName: '中国',
              countryCode: 'chn',
              detailAddress: detailInfo,
              provinceName: provinceName,
              cityName: cityName,
              districtName: countryName,
              isDefault: false,
              isOrderSure: this.properties.isOrderSure,
            };

            addressParse(provinceName, cityName, countryName);

            try {
              const { provinceCode, cityCode, districtCode } =
                await addressParse(provinceName, cityName, countryName);

              const params = Object.assign(target, {
                provinceCode,
                cityCode,
                districtCode,
              });
              if (this.properties.isOrderSure) {
                this.onHandleSubmit(params);
              } else if (this.properties.navigator) {
                Navigator.gotoPage('/address-detail', params);
              } else {
                this.triggerEvent('change', params);
              }
            } catch (error) {
              wx.showToast({ title: '地址解析出错，请稍后再试', icon: 'none' });
            }
          },
          fail(err) {
            console.warn('未选择微信收货地址', err);
          },
        });
      });
    },

    async queryAddress(addressId) {
      try {
        const { data } = await apis.userInfo.queryAddress({ addressId });
        return data.userAddressVO;
      } catch (err) {
        console.error('查询地址错误', err);
        throw err;
      }
    },

    findPage(pageRouteUrl) {
      const currentRoutes = getCurrentPages().map((v) => v.route);
      return currentRoutes.indexOf(pageRouteUrl);
    },

    async onHandleSubmit(params) {
      try {
        const orderPageDeltaNum = this.findPage(
          'pages/order/order-confirm/index',
        );
        if (orderPageDeltaNum > -1) {
          wx.navigateBack({ delta: 1 });
          resolveAddress(params);
          return;
        }
      } catch (err) {
        rejectAddress(params);
        console.error(err);
      }
    },
  },
});
