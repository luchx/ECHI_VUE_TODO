import Vue from "vue";
import Vuex from "vuex";
import { ApiGetTimes } from '@/api/basic';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timestamp: +new Date()
  },
  getters: {},
  actions: {
    getTimes({ commit }) {
      return new Promise(async (resolve, reject) => {
        const resp = await ApiGetTimes();
        if (resp.code === 0) {
          resolve(resp.data);
          commit("change", {
            timestamp: resp.data
          })
        } else {
          reject()
        }
      })
    }
  },
  mutations: {
    change(state, params) {
      for (const key in params) {
        if (state.hasOwnProperty(key)) {
          state[key] = params[key]
        }
      }
    }
  },
  modules: {}
});
