import { ResultCommon } from "./common";

interface Member {
  member_id: number;
  member_name: string;
  email: string;
  department: string;
  leader_email: string;
  phone: string;
  job: string;
}

export interface MemberResult extends ResultCommon {
  member: Member;
}
