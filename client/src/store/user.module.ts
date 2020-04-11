import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import agent from '@/agent';
import { Member } from 'achieve-it-contract';
import { Md5 } from 'md5-typescript';

interface User {
  username: string;
  token: string;
  member_id: string;
}

@Module({ name: 'user' })
export default class UserModule extends VuexModule {
  currentUser: User | null = null;
  member: Member | null = null;

  @Mutation
  private modifyUser(user: User | null) {
    this.currentUser = user;
  }
  @Mutation
  private modifyMember(member: Member | null) {
    this.member = member;
  }

  get gavatar() {
    return 'https://www.gravatar.com/avatar/' + Md5.init(this.member!.email);
  }

  get isAuth() {
    return this.currentUser !== null;
  }

  @Action({ commit: 'modifyUser', rawError: true })
  async login(form: { username: string; password: string }) {
    const result = await agent.user.login(form);
    return { token: result.token, member_id: result.member_id, username: form.username };
  }
  @Action({ commit: 'modifyMember', rawError: true })
  async loadMember() {
    if (!this.currentUser) return;
    const result = await agent.member.get(this.currentUser.member_id, {});
    return result.member;
  }

  @Action({ commit: 'modifyUser' })
  logout() {
    return null;
  }
}
