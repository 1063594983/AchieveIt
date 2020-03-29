import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'common' })
export default class CommonModule extends VuexModule {
  isDarkMode = false;

  @Mutation
  private modifyDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }

  @Action({ commit: 'modifyDarkMode' })
  public setDarkMode(darkMode: boolean) {
    return darkMode;
  }
}
