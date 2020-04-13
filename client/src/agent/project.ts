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
  }};
export default projectAPI;
