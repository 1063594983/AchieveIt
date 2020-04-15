import {
  GetProjectRiskListResult,
  GetRiskResult,
  ProjectRiskListGetBody,
  RiskDeleteBody,
  RiskGetBody,
  RiskPostBody,
  RiskPutBody,
} from 'achieve-it-contract';
import { axiosGet, axiosPost } from '@/agent/utils';
import { createCRUD, baseURL } from '@/agent/utils';
import { wrapToken } from '@/agent/index';
import axios from 'axios';

const riskCRUD = createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('risk');
const riskAPI = {
  ...riskCRUD,
  ofProject: (projectId: string) =>
    axiosGet<GetProjectRiskListResult>('risk', `getProjectRiskList/${projectId}`, wrapToken({})),
  upload: async (project_id, fileData) => {
    const result = await axios.post(`${baseURL}/risk/uploadRisk/${project_id}`, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  },
  add: async (details) => {
    const result = await axios.post(`${baseURL}/risk/`, {
      ...details,
    });
    return result.data;
  },
  ofMember: (member_id) => axiosGet<any>('risk', `getRiskOfMember/${member_id}`),
};
export default riskAPI;
