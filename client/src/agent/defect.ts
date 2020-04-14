import {
    GetProjectRiskListResult,
    GetRiskResult,
    ProjectRiskListGetBody,
    RiskDeleteBody,
    RiskGetBody,
    RiskPostBody,
    RiskPutBody,
  } from 'achieve-it-contract';
  
  import { axiosGet, baseURL} from '@/agent/utils';
  import { createCRUD } from "@/agent/utils";
  import { wrapToken } from "@/agent/index";
  import axios from 'axios';
  
  const defectCRUD = createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('defect');
  const riskAPI = {
    ...defectCRUD,
    ofProject: async (projectId: string) => {
        const result = await axios.get(`${baseURL}/defect/getProjectDefectList/:projectId`);
        return result;
    },
    getAll: async () => {
        const result = await axios.get(`${baseURL}/defect/getAllDefect`);
        return result;
    },
    getAllOfMember: async (member_id) => {
      const result = await axios.get(`${baseURL}/defect/getAllOfMember/${member_id}`);
      return result.data;
    },
    postDefect: async (form) => {
      const result = await axios.post(`${baseURL}/defect`, {
        project_id: form.project_id,
        defect_content: form.defect_content,
        status: 0
      })
      return result;
    },
    solve: async (defect_id) => {
      const result = await axios.put(`${baseURL}/defect/${defect_id}`, {
        status: 1
      })
    }
  };
  export default riskAPI;
  