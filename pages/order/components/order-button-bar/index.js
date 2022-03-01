import Dialog from '../../../../miniprogram_npm/@tencent/retailwe-ui-dialog/dialog';
import Toast from '../../../../miniprogram_npm/@tencent/retailwe-ui-toast/toast';

import { OrderButtonTypes } from '../../config';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    order: {
      type: Object,
      observer(order) {
        // 判定有传goodsIndex ，则认为是商品button bar, 仅显示申请售后按钮
        if (this.properties.goodsIndex !== null) {
          const goods = order.goodsList[this.properties.goodsIndex];
          this.setData({
            buttons: {
              left: [],
              right: (goods.buttons || []).filter(
                (b) => b.type == OrderButtonTypes.APPLY_REFUND,
              ),
            },
          });
          return;
        }
        // 订单的button bar 不显示申请售后按钮
        const buttonsRight = (order.buttons || [])
          .filter((b) => b.type !== OrderButtonTypes.APPLY_REFUND)
          .map((button) => {
            //邀请好友拼团按钮
            if (
              button.type === OrderButtonTypes.INVITE_GROUPON &&
              order.groupInfoVo
            ) {
              const {
                groupInfoVo: { groupId, promotionId, remainMember, groupPrice },
                goodsList,
              } = order;
              const goodsImg = goodsList[0] && goodsList[0].imgUrl;
              const goodsName = goodsList[0] && goodsList[0].name;
              return {
                ...button,
                openType: 'share',
                dataShare: {
                  goodsImg,
                  goodsName,
                  groupId,
                  promotionId,
                  remainMember,
                  groupPrice,
                  storeId: order.storeId,
                },
              };
            }
            return button;
          });
        // 删除订单按钮单独挪到左侧
        const deleteBtnIndex = buttonsRight.findIndex(
          (b) => b.type === OrderButtonTypes.DELETE,
        );
        let buttonsLeft = [];
        if (deleteBtnIndex > -1) {
          buttonsLeft = buttonsRight.splice(deleteBtnIndex, 1);
        }
        this.setData({
          buttons: {
            left: buttonsLeft,
            right: buttonsRight,
          },
        });
      },
    },
    goodsIndex: {
      type: Number,
      value: null,
    },
  },

  data: {
    order: {},
    buttons: {
      left: [],
      right: [],
    },
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onOrderBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case OrderButtonTypes.DELETE:
          this.onDelete(this.data.order);
          break;
        case OrderButtonTypes.CANCEL:
          this.onCancel(this.data.order);
          break;
        case OrderButtonTypes.CONFIRM:
          this.onConfirm(this.data.order);
          break;
        case OrderButtonTypes.PAY:
          this.onPay(this.data.order);
          break;
        case OrderButtonTypes.APPLY_REFUND:
          this.onApplyRefund(this.data.order);
          break;
        case OrderButtonTypes.VIEW_REFUND:
          this.onViewRefund(this.data.order);
          break;
        case OrderButtonTypes.COMMENT:
          this.onAddComent(this.data.order);
          break;
        case OrderButtonTypes.INVITE_GROUPON:
          //分享邀请好友拼团
          break;
      }
    },

    onCancel(order) {
      Toast({ text: '你点击了取消订单' });
    },

    onConfirm(order) {
      Dialog.confirm({
        title: '确认是否已经收到货？',
        message: '',
        confirmButtonText: '确认收货',
      }).then(() => {
        Toast({ text: '你确认收货了' });
      });
    },

    onPay(order) {
      Toast({ text: '你点击了去支付' });
    },

    onApplyRefund(order) {
      const goods = order.goodsList[this.properties.goodsIndex];
      const params = {
        orderNo: order.orderNo,
        skuId: goods.skuId,
        spuId: goods.spuId,
        orderStatus: order.status,
        logisticsNo: order.logisticsNo,
        price: goods.price,
        num: goods.num,
        createTime: order.createTime,
        orderAmt: order.totalAmount,
        payAmt: order.amount,
        canApplyReturn: true,
      };
      const paramsStr = Object.keys(params)
        .map((k) => `${k}=${params[k]}`)
        .join('&');
      wx.navigateTo({ url: `/pages/order/apply-service/index?${paramsStr}` });
    },

    onViewRefund(order) {
      Toast({ text: '你点击了查看退款' });
    },

    /** 添加订单评论 */
    onAddComent(order) {
      wx.navigateTo({
        url: `/pages/order/comments/index?orderNo=${order.orderNo}`,
      });
    },
  },
});
