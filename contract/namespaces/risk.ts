/**
 * @author: zou
 * @description: 和Risk相关的RequestBody和ResponseResult格式
 */

import { ResultCommon, Authorization } from "../common";

interface RiskDetail {
  risk_time: string;
  risk_type?: string;
  risk_description?: string;
  risk_level?: string;
  risk_influence?: string;
  risk_strategy?: string;
  risk_state?: string;
  risk_owner?: number; //member_id
  risk_tracking_frequency?: string;
  risk_stakeholder?: number[]; //member_id[]
}

export interface Risk {
  risk_id: number;
  project_id: string;
  detail: RiskDetail;
  solve_status: string; // ['未处理', '正在跟进', '已解决']
}


/**
 * api: get /risk/:risk_id
 */

// request
export interface RiskGetBody extends Authorization {}

// result
export interface GetRiskResult extends ResultCommon {
  risk: Risk;
}


/**
 * api: get /risk/getProjectRiskList/:project_id
 */

//  request
export interface ProjectRiskListGetBody extends Authorization {}

// result
export interface GetProjectRiskListResult extends ResultCommon {
  risk_list?: Risk[];
  project_id?: string;
}


/**
 * api: post /risk
 */

// request
export interface RiskPostBody extends Authorization {
  detail: RiskDetail;
  project_id: string;
  solve_status?: 0 | 1 | 2;
}


/**
 * api: put /risk/:risk_id
 */

// request
export interface RiskPutBody extends Authorization {
  detail: RiskDetail;
  solve_status?: 0 | 1 | 2;
}


/**
 * api: delete /risk/:risk_id
 */

// request
export interface RiskDeleteBody extends Authorization {}

