import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    info: null
  },
  mutations: {
    modifyCount(state, payload) {
      state.count = payload;
    },
    modifyInfo(state, obj) {
      state.info = obj;
    }
  },
  actions: {
    setInfo({ commit }, obj) {
      commit('modifyInfo', obj);
    },
    setCount({ commit }, val) {
      commit('count', val);
    }
  },
  modules: {}
});
