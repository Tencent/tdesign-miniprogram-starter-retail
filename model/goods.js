import { genGood } from './good';

export function getGoodsList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genGood(idx + baseID));
}

export const goodsList = getGoodsList();
