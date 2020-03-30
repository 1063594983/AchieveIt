import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import agent from '@/agent';

interface User {
  username: string;
  token: string;
  member_id: number;
}

@Module({ name: 'user' })
export default class UserModule extends VuexModule {
  currentUser: User | null = null;

  @Mutation
  private modifyUser(user: User | null) {
    this.currentUser = user;
  }

  get isAuth() {
    return this.currentUser !== null;
  }

  @Action({ commit: 'modifyUser', rawError: true })
  async login(form: { username: string; password: string }) {
    const result = await agent.user.login(form);
    return { token: result.token, member_id: result.member_id, username: form.username };
  }

  @Action({ commit: 'modifyUser' })
  logout() {
    return null;
  }
}
