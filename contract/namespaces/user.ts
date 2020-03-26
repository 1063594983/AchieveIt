import { ResultCommon } from "../common";

// requestBody
export interface UserLoginBody {
  username: string;
  password: string;
}

export interface UserLoginResult extends ResultCommon {
  token?: string;
  member_id?: number;
}
