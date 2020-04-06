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
