import { getPermission } from '../../../../utils/getPermission';
import { phoneRegCheck } from '../../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
import { addressParse } from '../../../../utils/addressParse';

Component({
  externalClasses: ['t-class'],
  properties: {
    title: {
      // 按钮显示文本
      type: String,
    },
    navigator: {
      // 导航到地址编辑页面
      type: Boolean,
    },
    isCustomStyle: {
      // 是否我的收货地址的定制样式
      type: Boolean,
      value: false,
    },
    isDisabledBtn: {
      // 是否禁用按钮
      type: Boolean,
      value: false,
    },
    isOrderSure: {
      // 结算页面进来的, 定制化开发,减少逻辑
      type: Boolean,
      value: false,
    },
  },
  methods: {
    // 获取微信地址
    getWxLocation() {
      if (this.properties.isDisabledBtn) return;
      // 获取微信收货地址
      getPermission({ code: 'scope.address', name: '通讯地址' }).then(() => {
        wx.chooseAddress({
          success: async (options) => {
            const {
              provinceName,
              cityName,
              countyName,
              detailInfo,
              userName,
              telNumber,
            } = options;

            // 微信添加地址未添加手机号校验，因此需要先校验手机号
            // if (!phoneRegCheck(telNumber)) {
            //   Toast({
            //     context: this,
            //     selector: '#t-toast',
            //     message: '请填写正确的手机号',
            //   });
            //   return;
            // }

            const target = {
              name: userName,
              phone: telNumber,
              countryName: '中国',
              countryCode: 'chn',
              detailAddress: detailInfo,
              provinceName: provinceName,
              cityName: cityName,
              districtName: countyName,
              isDefault: false,
              isOrderSure: this.properties.isOrderSure,
            };
            console.log([provinceName, cityName, countyName]);

            addressParse(provinceName, cityName, countyName);

            try {
              const { provinceCode, cityCode, districtCode } =
                await addressParse(provinceName, cityName, countyName);

              const params = Object.assign(target, {
                provinceCode,
                cityCode,
                districtCode,
              });
              console.log('params: ', params);
              // 如果是结算页面进来的,简化逻辑，直接提交地址
              if (this.properties.isOrderSure) {
                this.onHandleSubmit(params);
              } else if (this.properties.navigator) {
                // 选择收获地址页面点击微信地址导入,成功后跳转地址详情页面
                Navigator.gotoPage('/address-detail', params);
              } else {
                console.log('xxx');
                // 其他情况触发change事件
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

    // 通过addressId查询地址
    async queryAddress(addressId) {
      try {
        const { data } = await apis.userInfo.queryAddress({ addressId });
        return data.userAddressVO;
      } catch (err) {
        console.error('查询地址错误', err);
        throw err;
      }
    },

    // 返回结算页面
    findPage(pageRouteUrl) {
      const currentPages = getCurrentPages();
      const pageRoute = getRouterPath(pageRouteUrl);
      if (pageRoute) {
        const pageRoutePath = pageRoute.path.replace(/^\//, '');
        for (let i = 0; i < currentPages.length; i++) {
          if (currentPages[i].route === pageRoutePath) {
            return currentPages.length - i - 1;
          }
        }
      }
      return -1;
    },

    // 结算页面进入定制化开发，直接提交
    async onHandleSubmit(params) {
      try {
        const res = await apis.userInfo.addressAdd(dataConvertAddress(params));
        const addressId = res.data?.addressId;
        const addressData = await this.queryAddress(addressId);
        // 自动将该地址作为当前结算地址
        setReceiptAddress(addressData);
        try {
          // 结算页新增地址成功后自动选择该地址并跳转回结算页
          const orderPageDeltaNum = this.findPage('/order/sure');
          if (orderPageDeltaNum > -1) {
            Navigator.navigateBack({ backRefresh: true }, orderPageDeltaNum);
            return;
          }
        } catch (err) {
          console.error(err);
        }

        try {
          // 视频落地页新增地址成功后自动选择该地址并跳转回视频落地页
          const videoLandingPageDeltaNum = this.findPage('/videoLandingPage');
          if (videoLandingPageDeltaNum > -1) {
            Navigator.navigateBack(
              { backRefresh: true },
              videoLandingPageDeltaNum,
            );
            return;
          }
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        if (err.msg) toast({ text: err.msg });
        // console.error(err);
      }
    },
  },
});
