/**
 * @author: zou
 */

import { Authorization, ResultCommon } from "..";

 interface WorkTime {
     work_time_id: number,
     member_id: number,
     function_id: number,
     activity_content: string,
     project_id: string,
     start_time: string,
     end_time: string
 }

// requestBody

// get /workTime/getMemberWorkTimeList/:member_id
export interface MemberWorkTimeListGetBody extends Authorization {}

// post /workTime/:member_id
export interface WorkTimePostBody extends Authorization {
    function_id: number,
    activity_content: string,
    project_id: string,
    start_time: string,
    end_time: string
}

// responseResult
export interface GetMemberWorkTimeListResul extends ResultCommon {
    member_id: number,
    work_time_list: WorkTime[]
}