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
                // itemId: goods.
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
                code: ele.code,
              };
            });
          this.setData({
            products,
          });
          coupons({
            products,
            selectedCoupons,
            storeId,
          }).then((res) => {
            this.initData(res.data);
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
    initData(data) {
      const { couponResultList, reduce } = data;
      const selectedList = [];
      let selectedNum = 0;
      const couponsList =
        couponResultList &&
        couponResultList.map((coupon) => {
          const { status, couponVO } = coupon;
          const {
            code,
            name,
            expireStart,
            expireEnd,
            ruleId,
            couponType,
            promotion,
          } = couponVO;
          if (status == 1) {
            selectedNum++;
            selectedList.push({
              code,
              promotionId: ruleId,
              storeId: this.storeId,
            });
          }
          const tag = tagList[couponType - 1];
          let desc = '';
          const { condition, discount } = promotion;
          if (condition.value == 0) {
            desc = '无门槛使用';
          } else {
            desc =
              condition.type == 1
                ? `满${condition.value / 100}元`
                : `满${condition.value}件`;
          }
          const value =
            couponType == 1 ? discount.value / 100 : discount.value / 10;
          const type = couponType == 2 ? 'discount' : 'mon';
          return {
            code,
            title: name,
            isSelected: status == 1,
            expireStart,
            expireEnd,
            value,
            ruleId,
            tag,
            status: status == -1 ? 'useless' : '',
            desc,
            type,
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
      const { coupon } = e.currentTarget.dataset;
      const { selectedList, products, storeId } = this.data;
      let newSelectedList = [];
      if (coupon.isSelected) {
        newSelectedList = selectedList.filter((ele) => {
          return ele.promotionId != coupon.ruleId;
        });
      } else {
        newSelectedList = selectedList.concat({
          code: coupon.code,
          promotionId: coupon.ruleId,
          storeId: this.storeId,
        });
      }
      coupons({
        selectedCoupons: newSelectedList,
        products,
        storeId,
      }).then((res) => {
        this.initData(res.data);
      });
    },
    onSure() {
      const { selectedList, couponsList } = this.data;
      if (couponsList.length == 0) {
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
  },
});
