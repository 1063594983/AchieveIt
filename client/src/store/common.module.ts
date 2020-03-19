import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module({ name: 'common' })
export default class CommonModule extends VuexModule {
  count = 0;
  demo = '';

  @Mutation
  modifyCount(valueFn: (n: number) => number) {
    this.count = valueFn(this.count);
  }

  @Mutation
  modifyDemo(value: string) {
    this.demo = value;
  }
}
