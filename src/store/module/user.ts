import { ApiLogin } from "@/api/user";

export default {
  state: {
    userInfo: {}
  },
  actions: {
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
  },
  mutations: {
    change(state, params) {
      for (const key in params) {
        if (Reflect.has(state, key)) {
          state[key] = params[key];
        }
      }
    }
  }
};
