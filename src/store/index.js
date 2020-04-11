import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import api from "./api";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "basicData",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    user_id: null,
    type: null,
    token: null,
    products: [],
    models: [],
    brands: [],
    categories: [],
    cart: []
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
    },
    getProducts(state) {
      return state.products;
    },
    getBrands(state) {
      return state.brands;
    },
    getModels(state) {
      return state.models;
    },
    getCategories(state) {
      return state.categories;
    },
    getCart(state) {
      return state.cart;
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
      state.cart = [];
    },
    setProducts(state, value) {
      state.products = value;
    },
    setBrands(state, value) {
      state.brands = value;
    },
    setCategories(state, value) {
      state.categories = value;
    },
    setModels(state, value) {
      state.models = value;
    },
    addToCart(state, obj) {
      state.cart.push(obj);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    async fetchProducts(context) {
      await api()
        .get(`products/getallProducts`)
        .then(res => {
          if (res.data.status == "success") {
            context.commit("setProducts", res.data.data);
          }
        })
        .catch(err => console.log(err));
    },
    async fetchCategories(context) {
      await api()
        .get(`categories/getCategories`)
        .then(res => {
          if (res.data.status == "success") {
            context.commit("setCategories", res.data.data);
          }
        })
        .catch(err => console.log(err));
    },
    async fetchBrands(context) {
      await api()
        .get(`brands/getBrands`)
        .then(res => {
          if (res.data.status == "success") {
            context.commit("setBrands", res.data.data);
          }
        })
        .catch(err => console.log(err));
    },
    async fetchModels(context) {
      await api()
        .get(`models/getModels`)
        .then(res => {
          console.log(res.data);
          if (res.data.status == "success") {
            context.commit("setModels", res.data.data);
          }
        })
        .catch(err => console.log(err));
    }
  },
  plugins: [vuexLocal.plugin]
});
