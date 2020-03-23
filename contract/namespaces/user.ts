import { ResultCommon } from "../common";

// requestBody
// /user/login
export interface UserLoginBody {
  username: string;
  password: string;
}

export interface UserLoginResult extends ResultCommon {
  token?: string;
  member_id?: number;
}
