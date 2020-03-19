import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

interface IUser {
  username: string;
  token: string;
  member_id: number;
}

@Module({ name: 'common' })
export default class CommonModule extends VuexModule {
  currentUser: IUser | null = null;

  @Mutation
  private modifyUser(user: IUser | null) {
    this.currentUser = user;
  }

  get isAuth() {
    return this.currentUser !== null;
  }

  @Action({ commit: 'modifyUser' })
  login(user: IUser) {
    return user;
  }

  @Action({ commit: 'modifyUser' })
  logout() {
    return null;
  }
}
