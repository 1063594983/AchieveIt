/**
 * @author: zou
 * @description: 和Activity相关的RequestBody和ResponseResult格式
 */

import { ResultCommon, Authorization } from "../common";

interface Activity {
  activity_id: number;
  activity_name: string;
  activity_content: string;
}
/**
 * activity_name
 * [
      {
        prefix: "工程活动",
        activityList: ["需求开发", "设计", "编码", "单体测试", "集成测试", "系统测试", "交付", "维护"]
      },
      {
        prefix: "管理活动",
        activityList: ["范围管理", "计划与调整", "监控与分析", "联络与沟通"]
      },
      {
        prefix: "外包活动",
        activityList: ["外包管理", "外包验收", "外包支持"]
      },
      {
        prefix: "支持活动",
        activityList: ["配置管理", "QA 审计", "会议报告总结", "培训", "其他"]
      }
    ]
 */

// requestBody

// get /activity/:activiy_id
export interface ActivityGetBody extends Authorization {}

// post /activity
export interface ActivityPostBody extends Authorization {
  activity_name: string; // 0-0 --> 工程活动-需求开发
  activity_content?: string;
}

// put /activity/:activity_id
export interface ActivityPutBody extends Authorization {
  activity_name?: string;
  activity_content?: string;
}

// delete /activity/:activity_id
export interface ActivityDeleteBody extends Authorization {}

// responseResult
export interface GetActivityResult extends ResultCommon {
  activity: Activity;
}
