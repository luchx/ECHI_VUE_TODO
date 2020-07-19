import {
  GetterTree,
  ActionTree,
  MutationTree
} from 'vuex';
import { ApiLogin } from "@/api/user";

export interface State {
  userInfo: Object;
}

const state: State = {
  userInfo: {}
};

const getters: GetterTree<State, any> = {};

const actions: ActionTree<State, any> = {
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      ApiLogin(params)
        .then(resp => {
          if (resp.code === 0) {
            commit("change", {
              userInfo: resp.result
            });
            resolve(resp.result);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
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

export default {
  state,
  getters,
  actions,
  mutations,
}
