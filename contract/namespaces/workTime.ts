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


// requestBody

// get /workTime/getMemberWorkTimeList/:member_id
export interface MemberWorkTimeListGetBody extends Authorization {}

// get /workTime/:work_time_id
interface workTimeGetBody extends Authorization {}

// post /workTime
interface workTimePostBody extends Authorization {
  member_id: number;
  feature_id: number;
  activity_content: string;
  project_id: string;
  start_time: string;
  end_time: string;
}

// responseResult
export interface GetMemberWorkTimeListResul extends ResultCommon {
    member_id: number,
    work_time_list: WorkTime[]
}

// put /workTime/:work_time_id
interface workTimePutBody extends Authorization {
  member_id?: number;
  feature_id?: number;
  activity_content?: string;
  project_id?: string;
  start_time?: string;
  end_time?: string;
}

// delete /workTime/:work_time_id
interface workTimeDeleteBody extends Authorization {}

// get /workTime/:work_time_id
export interface getWorkTimeResult extends ResultCommon {
  work_time?: WorkTime;
}

