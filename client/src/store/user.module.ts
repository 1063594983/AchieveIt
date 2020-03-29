import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

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

  @Action({ commit: 'modifyUser' })
  login(user: User) {
    return user;
  }

  @Action({ commit: 'modifyUser' })
  logout() {
    return null;
  }
}
