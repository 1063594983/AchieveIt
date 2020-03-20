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
    detail: RiskDetail
}

// requestBody
interface RiskGetBody extends Authorization {

}

interface RiskPostBody extends Authorization {
    detail: RiskDetail
}

interface RiskPutBody extends Authorization {
    detail: RiskDetail
}

interface RiskDeleteBody extends Authorization {

}

// responseResult
export interface GetRiskResult extends ResultCommon {
    risk: Risk
}
