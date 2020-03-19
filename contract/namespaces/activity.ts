import { ResultCommon, Authorization } from "../common";

interface Activity {
    activity_id: number,
    activity_name: string   // 
}

// requestBody
interface ActivityGetBody extends Authorization {

}

interface ActivityPostBody extends Authorization {
    activity_name: string
}

interface ActivityPutBody extends Authorization {
    activity_id: number,
    activity_name: string
}

interface ActivityDeleteBody extends Authorization {

}

// responseResult
export interface GetActivityResult extends ResultCommon {
    activity?: Activity
}