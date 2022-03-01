import Dialog from '../../../../miniprogram_npm/@tencent/retailwe-ui-dialog/dialog';
import Toast from '../../../../miniprogram_npm/@tencent/retailwe-ui-toast/toast';
import { cancelRights } from '../../after-service-detail/api';
import { ServiceButtonTypes } from '../../config';

Component({
  properties: {
    service: {
      type: Object,
      observer(service) {
        const buttonsRight = service.buttons || service.buttonVOs || [];
        this.setData({
          buttons: {
            left: [],
            right: buttonsRight,
          },
        });
      },
    },
  },

  data: {
    service: {},
    buttons: {
      left: [],
      right: [],
    },
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onServiceBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case ServiceButtonTypes.REVOKE:
          this.onConfirm(this.data.service);
          break;
        case ServiceButtonTypes.FILL_TRACKING_NO:
          this.onFillTrackingNo(this.data.service);
          break;
        case ServiceButtonTypes.CHANGE_TRACKING_NO:
          this.onChangeTrackingNo(this.data.service);
          break;
      }
    },

    onFillTrackingNo(service) {
      console.log('service', service);
      // Toast({text: '你点击了填写运单号'});
      wx.navigateTo({
        url: '/pages/order/fill-tracking-no/index?rightsNo=' + service.id,
      });
    },

    onChangeTrackingNo(service) {
      console.log('service', service);
      // Toast({text: '你点击了修改运单号'});
      wx.navigateTo({
        url:
          '/pages/order/fill-tracking-no/index?rightsNo=' +
          service.id +
          '&logisticsNo=' +
          service.logisticsNo +
          '&logisticsCompanyName=' +
          service.logisticsCompanyName +
          '&logisticsCompanyCode=' +
          service.logisticsCompanyCode +
          '&remark=' +
          service.remark,
      });
    },

    onConfirm(service) {
      Dialog.confirm({
        title: '是否撤销退货申请？',
        message: '',
        confirmButtonText: '撤销申请',
        cancelButtonText: '不撤销',
      }).then(() => {
        const params = { rightsNo: this.data.service.id };
        return cancelRights(params).then((res) => {
          console.log('res', res);
          Toast({ text: '你确认撤销申请' });
        });
      });
    },
  },
});
