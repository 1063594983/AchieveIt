/**
 * @author: zou
 * @description: 和member相关的RequestBody和ResponseResult格式
 */
import { ResultCommon, Authorization } from "../common";

interface Member {
  member_id: number;
  member_name: string;
  email: string;
  department: string;
  leader_email: string;
  phone: string;
  job: string; // ['项目经理', '项目上级', '组织级配置管理员', 'EPG Leader', 'QA Manager', '普通员工']
}

// requestBody

// get /member/:member_id
export interface MemberGetBody extends Authorization {}

// post /member
export interface MemberPostBody extends Authorization {
  member_name: string,
  email?: string,
  department?: string,
  leader_email?: string,
  phone?: string,
  job?: 0 | 1 | 2 | 3 | 4 | 5
}

// put /member/:member_id
export interface MemberPutBody extends Authorization {
  member_name: string,
  email?: string,
  department?: string,
  leader_email?: string,
  phone?: string,
  job?: 0 | 1 | 2 | 3 | 4 | 5    
}

// delete /member/:member_id
export interface MemberDeleteBody extends Authorization {}

// get /member/getProjectMemberList/:project_id
interface ProjectMemberListGetBody extends Authorization {
  
}

// get /member/getMemberRoleInProject/:project_id
interface ProjectMemberRoleGetBody extends Authorization {
  member_id: number
}

/**
 * role:
 * ["开发 Leader", "测试 Leader", "开发人员", "测试人员", "配置管理人员", "QA", "EPG"]
 */

// post /member/addMemberToProject/:project_id
interface AddMemberToProjectPostBody extends Authorization {
  member_id: number,
  role: number[], // [0, 1, 2] --> ["开发 Leader", "测试 Leader", "开发人员"]
  authority: string[] //[git.read, git.write, project.read, project.write, in_email_list.receive, in_email_list.send, in_work_time_register]
}

// put /member/changeMemberRole/:project_id
interface ProjectMemberRolePutBody extends Authorization {
  member_id: number,
  role?: number[],  // [0, 1, 2] --> ["开发 Leader", "测试 Leader", "开发人员"]
  authority?: string[]  //[git.read, git.write, project.read, project.write, in_email_list.receive, in_email_list.send, in_work_time_register]
}


// responseResult
export interface GetMemberResult extends ResultCommon {
  member: Member;
}

export interface GetMemberRoleResult extends ResultCommon {
  member_role: {
    role: string[],
    authority: string[],
    project_id: string,
    member_id: number
  }
}

export interface getProjectMemberListResult extends ResultCommon {
  member_list?: {
    member_id: number,
    role: string[], //["开发 Leader", "测试 Leader", "开发人员", "测试人员", "配置管理人员", "QA", "EPG"]
    authority: string[]
  } []
}


