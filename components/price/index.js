Component({
  externalClasses: ['wr-class', 'symbol-class', 'decimal-class'],
  useStore: [],
  properties: {
    priceUnit: {
      type: String,
      value: 'fen',
    }, // 价格单位，分 | 元, fen，yuan
    price: {
      type: null,
      value: '',
      observer(price) {
        this.format(price);
      },
    }, // 价格, 以分为单位
    type: {
      type: String,
      value: '', //
    }, //  main 粗体, lighter 细体, mini 黑色, del 中划线, delthrough 中划线，包括货币符号
    symbol: {
      type: String,
      value: '¥', // '￥',
    }, // 货币符号，默认是人民币符号￥
    fill: Boolean, // 是否自动补齐两位小数
    decimalSmaller: Boolean, // 小数字号小一点
    lineThroughWidth: {
      type: null,
      value: '0.12em',
    }, // 划线价线条高度
  },

  data: {
    pArr: [],
  },

  methods: {
    format(price) {
      price = parseFloat(`${price}`);
      const pArr = [];
      if (!isNaN(price)) {
        const isMinus = price < 0;
        if (isMinus) {
          price = -price;
        }
        if (this.properties.priceUnit === 'yuan') {
          const priceSplit = price.toString().split('.');
          pArr[0] = priceSplit[0];
          pArr[1] = !priceSplit[1]
            ? '00'
            : priceSplit[1].length === 1
            ? `${priceSplit[1]}0`
            : priceSplit[1];
        } else {
          price = Math.round(price * 10 ** 8) / 10 ** 8; // 恢复精度丢失
          price = Math.ceil(price); // 向上取整
          pArr[0] = price >= 100 ? `${price}`.slice(0, -2) : '0';
          pArr[1] = `${price + 100}`.slice(-2);
        }
        if (!this.properties.fill) {
          // 如果 fill 为 false， 不显示小数末尾的0
          if (pArr[1] === '00') pArr[1] = '';
          else if (pArr[1][1] === '0') pArr[1] = pArr[1][0];
        }
        if (isMinus) {
          pArr[0] = `-${pArr[0]}`;
        }
      }
      this.setData({ pArr });
    },
  },
});
