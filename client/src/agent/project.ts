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
  getStatus: async (project_id) => {
    const result = await axios.get(`${baseURL}/project/getStatus/${project_id}`);
    return result.data.pro_status;
  },
  setStatus: async (project_id, details) => {
    const result = await axios.put(`${baseURL}/project/changeStatus/${project_id}`, {
      ...details
    })
    return result;
  },
  update: async (project_id, details) => {
    const result = await axios.put(`${baseURL}/project/${project_id}`, {
      ...details
    });
    return result.data;
  }
};
export default projectAPI;
