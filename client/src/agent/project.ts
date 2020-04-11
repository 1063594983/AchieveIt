import {
  GetProjectResult,
  ProjectDeleteBody,
  ProjectGetBody,
  ProjectList,
  ProjectPostBody,
  ProjectPutBBody,
} from 'achieve-it-contract';
import { axiosGet, createCRUD } from '@/agent/utils';

const projectAPI = {
  ...createCRUD<ProjectGetBody, ProjectDeleteBody, ProjectPutBBody, ProjectPostBody, GetProjectResult>('project'),
  getAll: () => axiosGet<ProjectList>('project', 'getAllProjects'),
  refuse: (projectId: string) => axiosGet('project', `refuseProject/${projectId}`),
  accept: (projectId: string) => axiosGet('project', `acceptProject/${projectId}`),
};
export default projectAPI;
