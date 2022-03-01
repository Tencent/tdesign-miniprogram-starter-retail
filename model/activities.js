import { getActivity } from './activity';

export function getActivityList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => getActivity(idx + baseID));
}

export const activityList = getActivityList();
