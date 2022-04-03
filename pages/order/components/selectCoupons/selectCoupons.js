import dayjs from 'dayjs';
import { couponsData } from './mock';

const emptyCouponImg = `https://cdn-we-retail.ym.tencent.com/miniapp/coupon/ordersure-coupon-newempty.png`;

Component({
  properties: {
    storeId: String,
    promotionGoodsList: {
      type: Array,
      value: [],
    },
    orderSureCouponList: {
      type: Array,
      value: [],
    },
    couponsShow: {
      type: Boolean,
      value: false,
      observer(couponsShow) {
        if (couponsShow) {
          const { promotionGoodsList, orderSureCouponList, storeId } =
            this.data;
          const products =
            promotionGoodsList &&
            promotionGoodsList.map((goods) => {
              this.storeId = goods.storeId;
              return {
                skuId: goods.skuId,
                spuId: goods.spuId,
                storeId: goods.storeId,
                selected: true,
                quantity: goods.num,
                prices: {
                  sale: goods.settlePrice,
                },
              };
            });
          const selectedCoupons =
            orderSureCouponList &&
            orderSureCouponList.map((ele) => {
              return {
                promotionId: ele.promotionId,
                storeId: ele.storeId,
                couponId: ele.couponId,
              };
            });
          this.setData({
            products,
          });
          this.coupons({
            products,
            selectedCoupons,
            storeId,
          }).then((res) => {
            this.initData(res);
          });
        }
      },
    },
  },
  data: {
    emptyCouponImg,
    goodsList: [],
    selectedList: [],
    couponsList: [],
    orderSureCouponList: [],
    promotionGoodsList: [],
    storeId: String,
  },
  methods: {
    initData(data = {}) {
      const { couponResultList = [], reduce = 0 } = data;
      const selectedList = [];
      let selectedNum = 0;
      const couponsList =
        couponResultList &&
        couponResultList.map((coupon) => {
          const { status, couponVO } = coupon;
          const {
            couponId,
            condition = '',
            endTime = 0,
            name = '',
            startTime = 0,
            value,
            type,
          } = couponVO;
          if (status === 1) {
            selectedNum++;
            selectedList.push({
              couponId,
              promotionId: ruleId,
              storeId: this.storeId,
            });
          }
          const val = type === 2 ? value / 100 : value / 10;
          return {
            key: couponId,
            title: name,
            isSelected: false,
            timeLimit: `${dayjs(+startTime).format('YYYY-MM-DD')}-${dayjs(
              +endTime,
            ).format('YYYY-MM-DD')}`,
            value: val,
            status: status === -1 ? 'useless' : 'default',
            desc: condition,
            type,
            tag: '',
          };
        });
      this.setData({
        selectedList,
        couponsList,
        reduce,
        selectedNum,
      });
    },
    selectCoupon(e) {
      const { key } = e.currentTarget.dataset;
      const { couponsList } = this.data;
      couponsList.forEach((coupon) => {
        if (coupon.key === key) {
          coupon.isSelected = !coupon.isSelected;
        }
      });
      this.setData({
        couponsList: [...couponsList],
      });
      // const { selectedList, products, storeId } = this.data;
      // let newSelectedList = [];
      // if (coupon.isSelected) {
      //   newSelectedList = selectedList.filter((ele) => {
      //     return ele.promotionId !== coupon.ruleId;
      //   });
      // } else {
      //   newSelectedList = selectedList.concat({
      //     couponId: coupon.couponId,
      //     promotionId: coupon.ruleId,
      //     storeId: this.storeId,
      //   });
      // }
      // this.coupons({
      //   selectedCoupons: newSelectedList,
      //   products,
      //   storeId,
      // }).then((res) => {
      //   this.initData(res.data);
      // });
    },
    onSure() {
      const { selectedList, couponsList } = this.data;
      if (couponsList.length === 0) {
        this.hide();
        return;
      }
      this.triggerEvent('sure', {
        selectedList,
      });
    },
    hide() {
      this.setData({
        couponsShow: false,
      });
    },
    coupons(coupon = {}) {
      return new Promise((resolve, reject) => {
        if (coupon?.selectedCoupons) {
          resolve({
            couponResultList: couponsData.couponResultList,
            reduce: couponsData.reduce,
          });
        }
        return reject({
          couponResultList: [],
          reduce: undefined,
        });
      });
    },
  },
});
