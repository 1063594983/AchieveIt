/**
 * @author: zou
 * @description: 和work_time相关的RequestBody和ResponseResult格式
 */

import { ResultCommon, Authorization } from "../common";

interface WorkTime {
  work_time_id: number;
  member_id: number;
  feature_name: string;
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
export interface GetMemberWorkTimeListResult extends ResultCommon {
  member_id: number,
  work_time_list: WorkTime[]
}

/**
 * api: get /workTime/:work_time_id
 */
// request
export interface WorkTimeGetBody extends Authorization {}

// result
export interface GetWorkTimeResult extends ResultCommon {
  work_time?: WorkTime;
}

/**
 * api: post /workTime
 */

// request
export interface WorkTimePostBody extends Authorization {
  member_id: number;
  feature_name: string;
  activity_content: string;
  project_id: string;
  start_time: string;
  end_time: string;
}


/**
 * api: put /workTime/:work_time_id
 */

// request
export interface WorkTimePutBody extends Authorization {
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
export interface WorkTimeDeleteBody extends Authorization {}

