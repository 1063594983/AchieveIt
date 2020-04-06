import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/agent/utils';
import { Subtract } from 'utility-types';
import { Authorization, ResultCommon } from 'achieve-it-contract';
import { userStore } from '@/store';
import userAPI from '@/agent/user';
import memberAPI from '@/agent/member';
import projectAPI from '@/agent/project';
import riskAPI from '@/agent/risk';
import deviceAPI from '@/agent/device';
import activityAPI from '@/agent/activity';
import workTimeAPI from '@/agent/worktime';
import featureAPI from '@/agent/feature';
import configAPI from '@/agent/config';

export function wrapToken(body: {}) {
  if ('token' in body) return body;
  return { ...body, token: userStore.currentUser?.token };
}

export type authBody = { token: string };
export function createCRUD<
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

const agent = {
  user: userAPI,
  member: memberAPI,
  project: projectAPI,
  risk: riskAPI,
  device: deviceAPI,
  activity: activityAPI,
  workTime: workTimeAPI,
  feature: featureAPI,
  config: configAPI,
};

export default agent;
