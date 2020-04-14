import {
  GetMemberWorkTimeListResult,
  GetWorkTimeResult,
  WorkTimeDeleteBody,
  WorkTimeGetBody,
  WorkTimePostBody,
  WorkTimePutBody,
} from 'achieve-it-contract';
import { axiosGet, axiosPost, createCRUD, baseURL, axiosPut } from '@/agent/utils';
import { wrapToken } from '@/agent/index';
// import axios from 'axios';

const workTimeCRUD = createCRUD<
  WorkTimeGetBody,
  WorkTimeDeleteBody,
  WorkTimePutBody,
  WorkTimePostBody,
  GetWorkTimeResult
>('workTime/');
const workTimeAPI = {
  ...workTimeCRUD,
  insert: (memberId: string, body: WorkTimePostBody) => axiosPost('workTime', memberId, wrapToken(body)),
  ofMember: (memberId: string) =>
    axiosGet<GetMemberWorkTimeListResult>('workTime', `getMemberWorkTimeList/${memberId}`, wrapToken({})),
  check: (work_time_id) =>
    axiosPut<any>('workTime', `checkWorkTime/${work_time_id}`, wrapToken({})),
  getAll: () =>
    axiosGet('workTime', 'getAll')
};

export default workTimeAPI;
