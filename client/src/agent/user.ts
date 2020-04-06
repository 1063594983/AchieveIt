import { UserLoginBody, UserLoginResult } from 'achieve-it-contract';
import { axiosPost } from '@/agent/utils';

const userAPI = {
  login: (loginBody: UserLoginBody) => axiosPost<UserLoginResult>('user', 'login', loginBody),
};

export default userAPI;
