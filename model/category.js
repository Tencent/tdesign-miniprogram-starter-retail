import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

export function getCategoryList() {
  return [
    {
      groupId: '24948',
      name: '极速达',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '生鲜',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '热带水果',
              thumbnail: `${imgPrefix}/goods/meat/meat1.png`,
            },
            {
              groupId: '249480',
              name: '车厘子',
              thumbnail: `${imgPrefix}/goods/meat/meat2.png`,
            },
            {
              groupId: '249480',
              name: '莓类/奇异果',
              thumbnail: `${imgPrefix}/goods/meat/meat3.png`,
            },
            {
              groupId: '249480',
              name: '海参/礼盒',
              thumbnail: `${imgPrefix}/goods/meat/meat4.png`,
            },
            {
              groupId: '249480',
              name: '虾',
              thumbnail: `${imgPrefix}/goods/meat/meat5.png`,
            },
            {
              groupId: '249480',
              name: '肉制品',
              thumbnail: `${imgPrefix}/goods/meat/meat6.png`,
            },
            {
              groupId: '249480',
              name: '牛/羊肉',
              thumbnail: `${imgPrefix}/goods/meat/meat8.png`,
            },
            {
              groupId: '249480',
              name: '蟹/贝',
              thumbnail: `${imgPrefix}/goods/meat/meat10.png`,
            },
            {
              groupId: '249480',
              name: '鲜蛋/蛋制品',
              thumbnail: `${imgPrefix}/goods/meat/meat11.png`,
            },
            {
              groupId: '249480',
              name: '禽类',
              thumbnail: `${imgPrefix}/goods/meat/meat13.png`,
            },
            {
              groupId: '249480',
              name: '鱼类',
              thumbnail: `${imgPrefix}/goods/meat/meat17.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24949',
      name: '素食面点',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '饼干',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '钙芝',
              thumbnail: `${imgPrefix}/goods/biscuits/biscuits1.png`,
            },
            {
              groupId: '249480',
              name: '美心',
              thumbnail: `${imgPrefix}/goods/biscuits/biscuits2.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '249450',
      name: '粮油干货',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '食用油',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '鲁花',
              thumbnail: `${imgPrefix}/goods/cofe/cofe1.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24950',
      name: '个人清洁',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '男性护肤',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '控油',
              thumbnail: `${imgPrefix}/goods/health/health2.png`,
            },
          ],
        },
        {
          groupId: '249481',
          name: '洗发护发',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '洗发水',
              thumbnail: `${imgPrefix}/goods/health/health1.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24951',
      name: '零食乳品',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '糖果',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '香口胶',
              thumbnail: `${imgPrefix}/goods/suggar/suggar.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24952',
      name: '酒水饮料',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '白酒',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '五粮液',
              thumbnail: `${imgPrefix}/goods/wine/wine1.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24953',
      name: '男装/男鞋',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '男鞋',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '运动鞋',
              thumbnail: `${imgPrefix}/goods/shoe/shoe1.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24954',
      name: '手机数码',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '5G手机',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '三星',
              thumbnail: `${imgPrefix}/goods/phone/phone1.png`,
            },
            {
              groupId: '249480',
              name: 'OPPO',
              thumbnail: `${imgPrefix}/goods/phone/phone2.png`,
            },
          ],
        },
      ],
    },
    {
      groupId: '24955',
      name: '礼品鲜花',
      thumbnail:
        'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
      children: [
        {
          groupId: '249481',
          name: '礼品',
          thumbnail:
            'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
          children: [
            {
              groupId: '249480',
              name: '工艺礼',
              thumbnail: `${imgPrefix}/goods/gift/gift1.png`,
            },
          ],
        },
      ],
    },
  ];
}
