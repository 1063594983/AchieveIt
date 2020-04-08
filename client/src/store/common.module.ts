import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { commonStore } from "@/store/index";

@Module({ name: 'common' })
export default class CommonModule extends VuexModule {
  isDarkMode = false;
  showHello = true;

  @Mutation
  setDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }
  @Mutation
  setShowHello(showHello: boolean) {
    this.showHello = showHello;
  }

  get bgColor() {
    return this.isDarkMode ? '#222933' : 'white';
  }
}
