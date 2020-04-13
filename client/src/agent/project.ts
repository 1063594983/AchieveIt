import {
  GetProjectResult,
  ProjectDeleteBody,
  ProjectGetBody,
  ProjectList,
  ProjectPostBody,
  ProjectPutBBody,
} from 'achieve-it-contract';
import { axiosGet, createCRUD, baseURL } from '@/agent/utils';
import axios from 'axios';

const projectAPI = {
  ...createCRUD<ProjectGetBody, ProjectDeleteBody, ProjectPutBBody, ProjectPostBody, GetProjectResult>('project'),
  getAll: () => axiosGet<ProjectList>('project', 'getAllProjects'),
  refuse: (projectId: string) => axiosGet('project', `refuseProject/${projectId}`),
  accept: (projectId: string) => axiosGet('project', `acceptProject/${projectId}`),
  getJoinProjects: async (member_id: any) => {
    const result = await axios.get(`${baseURL}/project/getJoinProjects/${member_id}`);
    return result.data;
  },
  isEPG: async (project_id) => {
    const result = await axios.get(`${baseURL}/project/hasEPG/${project_id}`);
    if (result.data.status == 'ok') {
      return true;
    } else {
      return false;
    }
  },
  isQA: async (project_id) => {
    const result = await axios.get(`${baseURL}/project/hasQA/${project_id}`);
    if (result.data.status == 'ok') {
      return true;
    } else {
      return false;
    }
  },
  update: async (project_id, details) => {
    const result = await axios.put(`${baseURL}/project/${project_id}`, {
      ...details
    });
    return result.data;
  }
};
export default projectAPI;
