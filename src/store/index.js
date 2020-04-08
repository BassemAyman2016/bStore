import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "basicData",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    user_id: null,
    type: null,
    token: null
  },
  getters: {
    getUserId(state) {
      return state.user_id;
    },
    getUserType(state) {
      return state.type;
    },
    getToken(state) {
      return state.token;
    }
  },
  mutations: {
    setUserId(state, value) {
      state.user_id = value;
    },
    setUserType(state, value) {
      state.type = value;
    },
    setToken(state, value) {
      state.token = value;
    },
    logout(state) {
      state.user_id = null;
      state.token = null;
      state.type = null;
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
});
