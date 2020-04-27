import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import api from "./api";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "basicData",
  storage: window.sessionStorage
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
    cart: [],
    selectedProduct: {}
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
    },
    getSelectedProduct(state) {
      return state.selectedProduct;
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
    },
    setSelectedProduct(state, value) {
      state.selectedProduct = value;
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
          if (res.data.status == "success") {
            context.commit("setModels", res.data.data);
          }
        })
        .catch(err => console.log(err));
    },
    async createOrder(context) {
      const cart = { products: context.getters.getCart };
      return api()
        .post("orders/createOrder", cart)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async payOrder(context, orderId) {
      return api()
        .put(`orders/payOrder/${orderId}`)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async cancelOrder(context, orderId) {
      return api()
        .put(`orders/cancelOrder/${orderId}`)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async getCustomerProfile() {
      return api()
        .get(`customers/viewProfile`)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async deactivateProfile(context) {
      var user_id = context.getters.getUserId;
      return api()
        .delete(`customers/deactivateProfile/${user_id}`)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async editProfile(context, apiObject) {
      return api()
        .put(`customers/editProfile`, apiObject)
        .then(res => {
          if (res.data.status == "success") {
            return res.data;
          }
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async deleteProduct(context, product_id) {
      return api()
        .delete(`products/deleteProduct/${product_id}`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          return err.response.data;
        });
    },
    async fetchCurrentProduct(context, product_id) {
      await api()
        .get(`products/getSingleProduct/${product_id}`)
        .then(res => {
          if (res.data.status && res.data.status == "success") {
            context.commit("setSelectedProduct", res.data.product);
          }
        });
    }
  },
  plugins: [vuexLocal.plugin]
});
