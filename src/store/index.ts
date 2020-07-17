import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user";
import { ApiGetTimes } from "@/api/basic";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timestamp: +new Date()
  },
  getters: {},
  actions: {
    getTimes({ commit }) {
      return new Promise(async function(resolve, reject) {
        const resp = await ApiGetTimes();
        if (resp.code === 0) {
          resolve(resp.result);
          commit("change", {
            timestamp: resp.result
          });
        } else {
          reject();
        }
      });
    }
  },
  mutations: {
    change(state, params) {
      for (const key in params) {
        if (Reflect.has(state, key)) {
          state[key] = params[key];
        }
      }
    }
  },
  modules: {
    user
  }
});
