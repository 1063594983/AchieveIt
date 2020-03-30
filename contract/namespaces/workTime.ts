/**
 * @author: zou
 * @description: 和work_time相关的RequestBody和ResponseResult格式
 */

import { ResultCommon, Authorization } from "../common";

interface WorkTime {
  work_time_id: number;
  member_id: number;
  feature_id: number;
  activity_content: string;
  project_id: string;
  start_time: string;
  end_time: string;
}

/**
 * api: get /workTime/getMemberWorkTimeList/:member_id
 */

//  request
export interface MemberWorkTimeListGetBody extends Authorization {}

// result
export interface GetMemberWorkTimeListResul extends ResultCommon {
  member_id: number,
  work_time_list: WorkTime[]
}

/**
 * api: get /workTime/:work_time_id
 */
// request
interface workTimeGetBody extends Authorization {}

// result
export interface getWorkTimeResult extends ResultCommon {
  work_time?: WorkTime;
}

/**
 * api: post /workTime
 */

// request
export interface WorkTimePostBody extends Authorization {
  member_id: number;
  feature_id: number;
  activity_content: string;
  project_id: string;
  start_time: string;
  end_time: string;
}


/**
 * api: put /workTime/:work_time_id
 */

// request
interface workTimePutBody extends Authorization {
  member_id?: number;
  feature_id?: number;
  activity_content?: string;
  project_id?: string;
  start_time?: string;
  end_time?: string;
}

/**
 * api: delete /workTime/:work_time_id
 */

// request
interface workTimeDeleteBody extends Authorization {}

