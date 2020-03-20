/**
 * @author: zou
 * @description: 和Risk相关的RequestBody和ResponseResult格式
 */

 import { ResultCommon, Authorization} from '../common';

interface RiskDetail {
    risk_time: string,
    risk_type?: string,
    risk_description?: string,
    risk_level?: string,
    risk_influence?: string,
    risk_strategy?: string,
    risk_state?: string,
    risk_owner?: number,    //member_id
    risk_tracking_frequency?: string,
    risk_stakeholder?: number[] //member_id[]
}

interface Risk {
    risk_id: number,
    project_id: string,
    detail: RiskDetail,
    solve_status: string    // ['未处理', '正在跟进', '已解决']
}

// requestBody

// get /risk/:risk_id
interface RiskGetBody extends Authorization {

}

// post /risk
interface RiskPostBody extends Authorization {
    detail: RiskDetail,
    project_id: string,
    solve_status?: 0 | 1 | 2
}

// put /risk/:risk_id
interface RiskPutBody extends Authorization {
    detail: RiskDetail,
    solve_status?: 0 | 1 | 2
}

// delete /risk/:risk_id
interface RiskDeleteBody extends Authorization {

}

// get /risk/getProjectRiskList/:project_id
interface ProjectRiskListGetBody extends Authorization {
    
}

// responseResult
export interface GetRiskResult extends ResultCommon {
    risk: Risk
}

export interface GetProjectRiskListResult extends ResultCommon {
    risk_list?: Risk[],
    project_id?: string
}
