import {
  GetMemberWorkTimeListResult,
  GetWorkTimeResult,
  WorkTimeDeleteBody,
  WorkTimeGetBody,
  WorkTimePostBody,
  WorkTimePutBody,
} from 'achieve-it-contract';
import { axiosGet, axiosPost, createCRUD } from '@/agent/utils';
import { wrapToken } from '@/agent/index';

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
};

export default workTimeAPI;
