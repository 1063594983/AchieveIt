import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import CommonModule from './common.module';
import DemoModule from './demo.module';
import { getModule } from 'vuex-module-decorators';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common: CommonModule,
    demo: DemoModule
  },
  plugins: [vuexLocal.plugin]
});

export const commonStore = getModule(CommonModule, store);
export const demoStore = getModule(DemoModule, store);
export default store;
