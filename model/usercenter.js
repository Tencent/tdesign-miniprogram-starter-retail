import dayjs from 'dayjs';

const userInfo = {
  avatarUrl:
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/06/18/10/avatar.jpg',
  name: '哇哇',
  phoneNumber: '13438358888',
  gender: 2,
  brith: dayjs().startOf('M').valueOf(),
};
const countsData = [
  {
    num: 22,
    name: '积分',
  },
  {
    num: 1000,
    name: '优惠券',
  },
];

const orderTagInfos = [
  {
    title: '待付款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '待发货',
    iconName: 'wuliu-1',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: '待收货',
    iconName: 'packaging',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: '退款/售后',
    iconName: 'money',
    orderNum: 0,
    tabType: 0,
    status: 1,
  },
];

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: '每周三至周五 9:00-12:00  13:00-15:00',
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo,
});
