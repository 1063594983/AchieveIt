import { axiosPost } from '@/agent/utils';
import { UserLoginResult } from 'achieve-it-contract';

const user = {
  login: (username: string, password: string) => axiosPost<UserLoginResult>('user', 'login', { username, password })
};

export default user;
