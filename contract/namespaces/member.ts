import { ResultCommon, Authorization } from "../common";

interface Member {
  member_id: number,
  member_name: string,
  email: string,
  department: string,
  leader_email: string,
  phone: string,
  job: string // ['项目经理', '项目上级', '组织级配置管理员', 'EPG Leader', 'QA Manager', '普通员工']
}

// requestBody
interface MemberGetBody extends Authorization {

}

interface MemberPostBody extends Authorization {
  member_name: string,
  email?: string,
  department?: string,
  leader_email?: string,
  phone?: string,
  job?: 0 | 1 | 2 | 3 | 4 | 5
}

interface MemberPutBody extends Authorization {
  member_name: string,
  email?: string,
  department?: string,
  leader_email?: string,
  phone?: string,
  job?: 0 | 1 | 2 | 3 | 4 | 5    
}

interface MemberDeleteBody extends Authorization {

}

// responseResult
export interface GetMemberResult extends ResultCommon {
  member: Member;
}
