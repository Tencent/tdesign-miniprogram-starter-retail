const images = [
  'https://cdn-we-retail.ym.tencent.com/tsr/home/banner1.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/banner2.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/banner3.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/banner4.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/banner5.png',
];

export function genSwiperImageList(len = 5) {
  return new Array(len).fill(0).map((_, idx) => images[idx]);
}
