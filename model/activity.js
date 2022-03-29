/**
 * @param {string|number} key 唯一值
 */
export function getActivity(key) {
  return {
    promotionId: `${key}`,
    title: `满减满折回归${key}`,
    description: null,
    promotionCode: 'MERCHANT',
    promotionSubCode: key % 2 === 0 ? 'MYJ' : 'MYG',
    tag: '满减',
    timeType: 1,
    startTime: '1588737710000',
    endTime: '1601467070000',
    teasingStartTime: null,
    activityLadder: [{ label: '满100元减99.9元' }],
  };
}
