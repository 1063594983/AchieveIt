import {
  GetProjectRiskListResult,
  GetRiskResult,
  ProjectRiskListGetBody,
  RiskDeleteBody,
  RiskGetBody,
  RiskPostBody,
  RiskPutBody,
} from 'achieve-it-contract';
import { axiosGet } from '@/agent/utils';
import { createCRUD } from "@/agent/utils";
import { wrapToken } from "@/agent/index";

const riskCRUD = createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('risk');
const riskAPI = {
  ...riskCRUD,
  ofProject: (projectId: string) =>
    axiosGet<GetProjectRiskListResult>('risk', `getProjectRiskList/${projectId}`, wrapToken({})),
};
export default riskAPI;
