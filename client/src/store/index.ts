import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import CommonModule from './common.module';
import UserModule from './user.module';
import { getModule } from 'vuex-module-decorators';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

const store = new Vuex.Store<any>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common: CommonModule,
    user: UserModule
  },
  plugins: [vuexLocal.plugin]
});

export const commonStore = getModule(CommonModule, store);
export const userStore = getModule(UserModule, store);
export default store;
