import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module({ name: 'demo' })
export default class DemoModule extends VuexModule {
  demo = '';

  @Mutation
  modifyDemo(value: string) {
    this.demo = value;
  }
}
