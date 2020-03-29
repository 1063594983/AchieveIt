import { ResultCommon, Authorization } from "../common";

interface Project {
  project_id: number;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  manager: number;
  important_events: string[];
  technology: string[];
  business: string;
  status: string; //  ['申请立项', '已立项', '立刻驳回', '进行中', '已交付', '结束', '已归档']
}

// requestBody

// get /project/:project_id
export interface ProjectGetBody extends Authorization {}

// put /project/:project_id
export interface ProjectPutBBody extends Authorization {
  project_name?: string;
  client_info?: string;
  start_time?: string;
  end_time?: string;
  manager?: number;
  important_events?: Array<string>;
  technology?: Array<string>;
  business?: string;
  status?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

// post /project
/**
 * 申请立项，后端自动向项目上级，EPGLeader，QA Manager，配置管理员发送邮件
 * 只有项目经理可以申请立项
 */
export interface ProjectPostBody extends Authorization {
  project_id: string;
  project_name?: string;
  client_info?: string;
  start_time?: string;
  end_time?: string;
  manager?: number;
  important_events?: Array<string>;
  technology?: Array<string>;
  business?: Array<string>;
  status: 0;
}

// delete /project/:project_id
export interface ProjectDeleteBody extends Authorization {}

// put /project/acceptProject/:project_id
// 批准立项 只有项目经理才能批准立项
export interface AcceptProjectPutBody extends Authorization {}

// responseResult
export interface GetProjectResult extends ResultCommon {
  project: Project;
}
