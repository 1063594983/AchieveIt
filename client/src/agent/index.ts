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
  GetMemberWorkTimeListResult,
  GetProjectResult,
  GetProjectRiskListResult,
  GetRiskResult,
  GetWorkTimeResult,
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
  UserLoginResult,
  WorkTimeDeleteBody,
  WorkTimeGetBody,
  WorkTimePostBody,
  WorkTimePutBody,
} from 'achieve-it-contract';
import { userStore } from '@/store';

function wrapToken(body: {}) {
  if ('token' in body) return body;
  return { ...body, token: userStore.currentUser?.token };
}

export type authBody = { token: string };
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
    delete: (id: string, body: Subtract<DeleteBody, authBody>) => axiosDelete(namespace, id, wrapToken(body)),
  };
}

// api user
const user = {
  login: (loginBody: UserLoginBody) => axiosPost<UserLoginResult>('user', 'login', loginBody),
};

// api member
const member = createCRUD<MemberGetBody, MemberDeleteBody, MemberPutBody, MemberPostBody, GetMemberResult>('member');

// api project
const project = createCRUD<ProjectGetBody, ProjectDeleteBody, ProjectPutBBody, ProjectPostBody, GetProjectResult>(
  'project'
);

// api risk
const riskCRUD = createCRUD<RiskGetBody, RiskDeleteBody, RiskPutBody, RiskPostBody, GetRiskResult>('risk');
const risk = {
  ...riskCRUD,
  ofProject: (projectId: number, body: ProjectRiskListGetBody) =>
    axiosGet<GetProjectRiskListResult>('risk', `getProjectRiskList/${projectId}`, body),
};

// api device
const device = createCRUD<DeviceGetBody, DeviceDeleteBody, DevicePutBody, DevicePostBody, GetDeviceResult>('device');

// api activity
const activity = createCRUD<ActivityGetBody, ActivityDeleteBody, ActivityPutBody, ActivityPostBody, GetActivityResult>(
  'activity'
);

// api workTime
const workTimeCRUD = createCRUD<
  WorkTimeGetBody,
  WorkTimeDeleteBody,
  WorkTimePutBody,
  WorkTimePostBody,
  GetWorkTimeResult
>('workTime');
const workTime = {
  ...workTimeCRUD,
  ofMember: (memberId: string) =>
    axiosGet<GetMemberWorkTimeListResult>('workTime', `getMemberWorkTimeList/${memberId}`, wrapToken({})),
};

const agent = {
  user,
  member,
  project,
  risk,
  device,
  activity,
  workTime,
};

export default agent;
