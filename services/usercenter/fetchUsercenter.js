/*
 * @Author: oliverppeng
 * @LastEditors: Please set LastEditors
 * @Date: 2021-12-01 17:33:43
 * @LastEditTime: 2021-12-11 16:26:32
 * @Description:
 * @FilePath: /retail-mp/services/usercenter/fetchUsercenter.js
 */
import { config } from '../../config/index';

/** 获取个人中心信息 */
function mockFetchUserCenter() {
  const { delay } = require('../_utils/delay');
  const { genUsercenter } = require('../../model/usercenter');
  return delay(200).then(() => genUsercenter());
}

/** 获取个人中心信息 */
export function fetchUserCenter() {
  if (config.useMock) {
    return mockFetchUserCenter();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
