import Vue from "vue";
import user from "./module/user";
import { ApiGetTimes } from "@/api/basic";

import Vuex, { GetterTree, ActionTree, MutationTree } from "vuex";

Vue.use(Vuex);

export interface State {
  timestamp: number;
}

const state: State = {
  timestamp: +new Date()
};

const getters: GetterTree<State, any> = {};

const actions: ActionTree<State, any> = {
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
};

const mutations: MutationTree<State> = {
  change(state, params) {
    for (const key in params) {
      if (Reflect.has(state, key)) {
        state[key] = params[key];
      }
    }
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user
  }
});
