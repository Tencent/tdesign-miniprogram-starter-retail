import { fetchDeliveryAddressList } from '../../../../services/address/fetchAddress';
import Toast from 'tdesign-miniprogram/toast/index';
import { resolveAddress, rejectAddress } from './util';
import { getAddressPromise } from '../edit/util';

Page({
  data: {
    addressList: [],
    deleteID: '',
    showDeleteConfirm: false,
  },

  /** 选择模式 */
  selectMode: false,
  /** 是否已经选择地址，不置为true的话页面离开时会触发取消选择行为 */
  hasSelect: false,

  onLoad(query) {
    // 传空字符串或者不传 就 等同 false
    // 否则都是true（注意 !!'false' === true ）
    const { selectMode = '' } = query;
    this.selectMode = !!selectMode;
    this.init();
  },

  init() {
    this.getAddressList();
  },
  onUnload() {
    if (this.selectMode && !this.hasSelect) {
      rejectAddress();
    }
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/usercenter/address/edit/index',
    });
  },
  onEdit(e) {
    console.log('e: ', e);
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?id=${e.detail.id}`,
    });
  },
  async onSelect(e) {
    console.log('e: ', e);
    try {
      const item = e.detail;

      // 选择地址时首先进行电话号校验
      if (!phoneRegCheck(item.phoneNumber)) {
        throw new Error('请填写正确的手机号');
      }

      // 订单选择收货地址 的点击事件
      if (this.data.isOrderDetail) {
        await changeOrderAddress(item, this.orderNo);
        Navigator.navigateBack({ backRefresh: true });
      } else if (this.data.isExchange) {
        // 检查地址是否在配送范围
        const params = {
          addressId: item.addressId,
          goodsList: this.data.exchangeGoodsList,
        };
        const isCanDelivery = await checkDeliveryScope(params).then(
          (res) => res.data?.result,
        );
        if (isCanDelivery) {
          // 返回，并传递所选地址数据
          const {
            name: receiverName,
            phoneNumber: receiverPhone,
            address: receiverAddress,
            addressId,
          } = item;
          Navigator.navigateBack({
            address: {
              receiverName,
              receiverPhone,
              receiverAddress,
              addressId,
            },
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '收货地址超过可配送范围',
            icon: '',
            duration: 1000,
          });
        }
      } else if (this.data.isOrderSure) {
        setReceiptAddress(item);
        //切换收货地址，用户选择的临时地址（行政区域）生命周期结束
        storage.removeSync(STORAGE_KEY.TEMP_ADDRESS);
        Navigator.navigateBack({ backRefresh: true, selectedAddress: item });
      } else if (this.data.chooseAddressSource) {
        Navigator.navigateBack({
          chooseAddressSource: this.data.chooseAddressSource,
          selectedAddress: item,
        });
      }
    } catch (e) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: e ? e.msg || e.message || `${e}` : '未知错误',
        icon: '',
        duration: 1000,
      });
    }
  },
  getAddressList() {
    fetchDeliveryAddressList().then((addressList) => {
      this.setData({ addressList });
    });
  },
  getWXAddressHandle() {
    wx.chooseAddress({
      success: (res) => {
        if (res.errMsg.indexOf('ok') === -1) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.errMsg,
            icon: '',
            duration: 1000,
          });
          return;
        }
        Toast({
          context: this,
          selector: '#t-toast',
          message: '添加成功',
          icon: '',
          duration: 1000,
        });
        const { length: len } = this.data.addressList;
        this.setData({
          [`addressList[${len}]`]: {
            name: res.userName,
            phoneNumber: res.telNumber,
            address: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`,
            isDefault: 0,
            tag: '微信地址',
            id: len,
          },
        });
      },
    });
  },
  confirmDelteHandle({ detail }) {
    const { id } = detail || {};
    if (id !== undefined) {
      this.setData({ deleteID: id, showDeleteConfirm: true });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '地址删除成功',
        theme: 'success',
        duration: 1000,
      });
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '需要组件库发新版才能拿到地址ID',
        icon: '',
        duration: 1000,
      });
    }
  },
  deleteAddressHandle() {
    const { deleteID: id } = this.data;
    this.setData({
      addressList: this.data.addressList.filter((address) => address.id !== id),
      deleteID: '',
      showDeleteConfirm: false,
    });
  },
  editAddressHandle({ detail }) {
    this.waitForNewAddress();

    const { id } = detail || {};
    wx.navigateTo({ url: '/pages/usercenter/address/edit/index?id=' + id });
  },
  selectHandle({ detail }) {
    if (this.selectMode) {
      this.hasSelect = true;
      resolveAddress(detail);
      wx.navigateBack({ delta: 1 });
    } else {
      this.editAddressHandle({ detail });
    }
  },
  createHandle() {
    this.waitForNewAddress();
    wx.navigateTo({ url: '/pages/usercenter/address/edit/index' });
  },

  waitForNewAddress() {
    getAddressPromise()
      .then((newAddress) => {
        let addressList = [...this.data.addressList];

        newAddress.phoneNumber = newAddress.phone;
        newAddress.address = `${newAddress.provinceName}${newAddress.cityName}${newAddress.districtName}${newAddress.detailAddress}`;
        newAddress.tag = newAddress.addressTag;

        if (!newAddress.addressId) {
          newAddress.id = `${addressList.length}`;
          newAddress.addressId = `${addressList.length}`;

          if (newAddress.isDefault === 1) {
            addressList = addressList.map((address) => {
              address.isDefault = 0;

              return address;
            });
          } else {
            newAddress.isDefault = 0;
          }

          addressList.push(newAddress);
        } else {
          addressList = addressList.map((address) => {
            if (address.addressId === newAddress.addressId) {
              return newAddress;
            } else {
              return address;
            }
          });
        }

        addressList.sort((prevAddress, nextAddress) => {
          if (prevAddress.isDefault && !nextAddress.isDefault) {
            return -1;
          } else if (!prevAddress.isDefault && nextAddress.isDefault) {
            return 1;
          } else {
            return 0;
          }
        });

        this.setData({
          addressList: addressList,
        });
      })
      .catch((e) => {
        if (e.message === 'cancel') {
          console.log('用户取消选择');
        } else {
          console.log('地址编辑发生错误: ', e);
        }
      });
  },
});
