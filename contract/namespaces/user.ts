import { ResultCommon } from "../common";

export interface UserLoginResult extends ResultCommon {
  token: string;
  member_id: number;
}
