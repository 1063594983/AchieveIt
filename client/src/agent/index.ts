import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/agent/utils';
import { Subtract } from 'utility-types';

import {
  ActivityDeleteBody,
  ActivityGetBody,
  ActivityPostBody,
  ActivityPutBody,
  Authorization,
  DeviceDeleteBody,
  DeviceGetBody,
  DevicePostBody,
  DevicePutBody,
  GetActivityResult,
  GetDeviceResult,
  GetMemberResult,
  GetProjectResult,
  GetProjectRiskListResult,
  GetRiskResult,
  MemberDeleteBody,
  MemberGetBody,
  MemberPostBody,
  MemberPutBody,
  ProjectDeleteBody,
  ProjectGetBody,
  ProjectPostBody,
  ProjectPutBBody,
  ProjectRiskListGetBody,
  ResultCommon,
  RiskDeleteBody,
  RiskGetBody,
  RiskPostBody,
  RiskPutBody,
  UserLoginBody,
  UserLoginResult
} from 'achieve-it-contract';
import { userStore } from '@/store';

function wrapToken(body: {}) {
  if ('token' in body) return body;
  return { ...body, token: userStore.currentUser?.token };
}

type authBody = { token: string };
function createCRUD<
  GetBody extends Authorization,
  DeleteBody extends Authorization,
  PutBody extends Authorization,
  PostBody extends Authorization,
  GetResult extends ResultCommon
>(namespace: string) {
  return {
    get: (id: string, body: Subtract<GetBody, authBody>) => axiosGet<GetResult>(namespace, id, wrapToken(body)),
    insert: (body: Subtract<PostBody, authBody>) => axiosPost(namespace, '', wrapToken(body)),
    update: (id: string, body: Subtract<PutBody, authBody>) => axiosPut(namespace, id, wrapToken(body)),
    delete: (id: string, body: Subtract<DeleteBody, authBody>) => axiosDelete(namespace, id, wrapToken(body))
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
