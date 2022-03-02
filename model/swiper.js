const images = [
  'https://bl-material-online-1300977798.cos.ap-guangzhou.myqcloud.com/persist/10001/88888888/1000000/material/1/c1f3ffe065b64bc1a6a480cb0dced487-1586920684446-banner%20-%202.png',
  'https://bl-material-online-1300977798.cos.ap-guangzhou.myqcloud.com/persist/10001/88888888/1000000/material/1/a59baad86f5e4fdba4befff74ff70dc5-1586920684230-banner%20-%201.png',
];

export function genSwiperImage(index = 0) {
  return images[index % 3];
}

export function genSwiperImageList(len = 2) {
  return new Array(len).fill(0).map((_, idx) => genSwiperImage(idx));
}
