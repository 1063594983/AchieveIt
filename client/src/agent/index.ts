import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/agent/utils';
import {
  UserLoginResult,
  UserLoginBody,
  GetMemberResult,
  MemberPostBody,
  MemberPutBody,
  GetProjectResult,
  ProjectPostBody,
  ProjectPutBBody,
  MemberGetBody,
  MemberDeleteBody,
  ProjectGetBody,
  ProjectDeleteBody,
  GetProjectRiskListResult,
  GetRiskResult,
  ProjectRiskListGetBody,
  RiskDeleteBody,
  RiskGetBody,
  RiskPostBody,
  RiskPutBody,
  ResultCommon,
  DeviceGetBody,
  DeviceDeleteBody,
  DevicePutBody,
  DevicePostBody,
  GetDeviceResult,
  ActivityPostBody,
  ActivityDeleteBody,
  GetActivityResult,
  ActivityGetBody,
  ActivityPutBody
} from 'achieve-it-contract';

function createCRUD<GetBody, DeleteBody, PutBody, PostBody, GetResult extends ResultCommon>(namespace: string) {
  return {
    get: (id: number, body: GetBody) => axiosGet<GetResult>(namespace, id.toString(), body),
    insert: (body: PostBody) => axiosPost(namespace, '', body),
    update: (id: number, body: PutBody) => axiosPut(namespace, id.toString(), body),
    delete: (id: number, body: DeleteBody) => axiosDelete(namespace, id.toString(), body)
  };
}
const user = {
  login: (loginBody: UserLoginBody) => axiosPost<UserLoginResult>('user', 'login', loginBody)
};

const member = createCRUD<MemberGetBody, MemberDeleteBody, MemberPutBody, MemberPostBody, GetMemberResult>('member');

const project = createCRUD<ProjectGetBody, ProjectDeleteBody, ProjectPutBBody, ProjectPostBody, GetProjectResult>(
  'project'
);

const risk = {
  ...createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('risk'),
  ofProject: (projectId: number, body: ProjectRiskListGetBody) =>
    axiosGet<GetProjectRiskListResult>('risk', `getProjectRiskList/${projectId}`, body)
};
const device = createCRUD<DeviceGetBody, DeviceDeleteBody, DevicePutBody, DevicePostBody, GetDeviceResult>('device');

const activity = createCRUD<ActivityGetBody, ActivityDeleteBody, ActivityPutBody, ActivityPostBody, GetActivityResult>(
  'activity'
);

const agent = {
  user,
  member,
  project,
  risk,
  device,
  activity
};

export default agent;
