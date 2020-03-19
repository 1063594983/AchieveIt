import { ResultCommon } from "./common";

// requestBody
interface UserPostBody {
    username: string,
    password: string
}

export interface UserResult extends ResultCommon {
    username?: string,
    member_id?: number,
    token?: string
}