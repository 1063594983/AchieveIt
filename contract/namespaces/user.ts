import { ResultCommon } from "../common";


/**
 * api: post /user/login
 */

//  request
export interface UserLoginBody {
  username: string;
  password: string;
}

// result
export interface UserLoginResult extends ResultCommon {
  token?: string;
  member_id?: number;
}
