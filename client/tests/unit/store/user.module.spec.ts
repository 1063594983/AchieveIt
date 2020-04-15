import { userStore } from '@/store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { baseURL } from '@/agent/utils';

describe('test user store', () => {
  const mock = new MockAdapter(axios);
  mock.onPost(`${baseURL}/user/login`).reply(200, {
    status: 'ok',
    msg: '登陆成功',
    token: 'mock_token',
    member_id: '1',
  });
  mock.onPost(`${baseURL}/user/login`, { params: [{ password: 'wrong' }] }).reply(200, {
    status: 'ok',
    msg: '登陆成功',
    token: 'mock_token',
    member_id: '1',
  });

  it('should login action correctly', async function () {
    await userStore.login({ username: 'xyy', password: '1' });
    expect(userStore.currentUser).toEqual({
      username: 'xyy',
      token: 'mock_token',
      member_id: '1',
    });
  });

  it('should login action with wrong password or username show correct Error', async function () {
    try {
      await userStore.login({ username: 'xyy', password: 'wrong' });
    } catch (e) {
      expect(e.raw.msg).toBe('用户名或密码错误');
      expect(userStore.currentUser).toBe(null);
    }
  });

  it('should logout action correctly', async function () {
    await userStore.login({ username: 'xyy', password: '1' });
    await userStore.logout();
    expect(userStore.currentUser).toBe(null);
  });
});
