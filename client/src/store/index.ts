import Vue from 'vue';
import Vuex from 'vuex';
import CommonModule from './common.module';
import { getModule } from 'vuex-module-decorators';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { common: CommonModule }
});

export const commonState = getModule(CommonModule, store);
export default store;
