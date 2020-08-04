import { GetterTree, ActionTree, MutationTree } from "vuex";

export interface State {
  userInfo: Record<string, any>;
}

const state: State = {
  userInfo: {}
};

const getters: GetterTree<State, any> = {};

const actions: ActionTree<State, any> = {
  updateUser({ commit }, result) {
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
