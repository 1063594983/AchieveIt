import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'common' })
export default class CommonModule extends VuexModule {
  isDarkMode = false;

  @Mutation
  setDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }
}
