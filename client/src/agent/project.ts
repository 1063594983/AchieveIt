import {
  GetProjectResult,
  ProjectDeleteBody,
  ProjectGetBody,
  ProjectPostBody,
  ProjectPutBBody,
} from 'achieve-it-contract';
import { createCRUD } from '@/agent/index';

const projectAPI = createCRUD<ProjectGetBody, ProjectDeleteBody, ProjectPutBBody, ProjectPostBody, GetProjectResult>(
  'project'
);

export default projectAPI;
