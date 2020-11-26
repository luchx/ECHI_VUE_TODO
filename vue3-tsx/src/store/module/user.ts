import { GetterTree, ActionTree, MutationTree } from "vuex";
import { local } from '/@/utils/storage';

export interface State {
  userInfo: Record<string, any>;
}

const state: State = {
  userInfo: {}
};

const getters: GetterTree<State, any> = {};

const actions: ActionTree<State, any> = {
  updateUser({ commit }, result) {
    local.set("userInfo", result);
    commit("change", {
      userInfo: result
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
  mutations
};
