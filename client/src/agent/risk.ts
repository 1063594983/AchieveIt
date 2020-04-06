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

const riskCRUD = createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('risk');
const riskAPI = {
  ...riskCRUD,
  ofProject: (projectId: number, body: ProjectRiskListGetBody) =>
    axiosGet<GetProjectRiskListResult>('risk', `getProjectRiskList/${projectId}`, body),
};
export default riskAPI;
