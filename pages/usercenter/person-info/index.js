import dayjs from 'dayjs';
import { fetchPerson } from '../../../services/usercenter/fetchPerson';

Page({
  data: {
    personInfo: {},
    brithString: '',
    addressString: '',
    showUnbindConfirm: false,
    showDatePicker: false,
  },

  onLoad() {
    this.init();
  },

  init() {
    this.fetchData();
  },

  fetchData() {
    fetchPerson().then((personInfo) => {
      personInfo.brith = -1;
      this.setData({
        personInfo,
        brithString: '去设置',
        addressString: `${personInfo.address.provinceName} ${personInfo.address.cityName}`,
      });
    });
  },

  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;

    switch (dataset.type) {
      case 'brithString': {
        this.openDatePicker();
        break;
      }
      default: {
        break;
      }
    }
  },

  openUnbindConfirm() {
    this.setData({ showUnbindConfirm: true });
  },
  closeUnbindConfirm() {
    this.setData({ showUnbindConfirm: false });
  },
  unbindPhoneHandle() {
    this.setData({ 'personInfo.phoneNumber': '' });
  },

  openDatePicker() {
    if (this.data.personInfo.brith > -1) {
      return;
    }
    this.setData({ showDatePicker: true });
  },
  closeDatePicker() {
    this.setData({ showDatePicker: false });
  },
  confirmDatePicker({ detail: brith }) {
    this.closeDatePicker();
    this.setData({
      'personInfo.brith': brith,
      brithString: dayjs(brith).format('YYYY年MM月DD日'),
    });
  },
});
