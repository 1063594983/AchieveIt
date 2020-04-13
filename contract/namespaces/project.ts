import { ResultCommon, Authorization } from "../common";

export interface Project {
  project_id: string;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  manager: number;
  important_events: string[];
  technology: string[];
  business: string[];
  status: string; //  ['申请立项', '已立项', '立刻驳回', '进行中', '已交付', '结束', '已归档']
}

/**
 * api: get /project/getAllProjects
 */

// request
export interface ProjectListGetBodyy extends Authorization{}

// response
export interface ProjectList extends ResultCommon {
  project_list: Project []
}



/**
 * api: get /project/:project_id
 */

// request
export interface ProjectGetBody extends Authorization {}

// result
export interface GetProjectResult extends ResultCommon {
  project: Project;
}

/**
 * api: get /project/getJoinProjects/:member_id
 */
// request
export interface JoinProjectsGetBody extends Authorization {}

// result
export interface GetJoinProjectsResult extends ResultCommon {
  project_list?: Project [];
}


/**
 * api: post /project
 * description: 项目经理申请立项，后端自动向项目上级，EPGLeader，QA Manager，配置管理员发送邮件(由后端实现)
 */

// request
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

/**
 * api: put /project/:project_id
 */

// request
export interface ProjectPutBBody extends Authorization {
  project_name?: string;
  client_info?: string;
  start_time?: string;
  end_time?: string;
  manager?: number;
  important_events?: Array<string>;
  technology?: Array<string>;
  business?: string[];
  status?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}


/**
 * api: delete /project/:project_id
 */

// request
export interface ProjectDeleteBody extends Authorization {}

