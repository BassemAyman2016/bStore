import axios from "axios";
import { Loading } from "quasar";
import store from "./index";
// default options
// import store from "./index";
export default () => {
  var apiObject = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      // eslint-disable-next-line no-undef
      Authorization: store.getters.getToken
    }
  });
  apiObject.interceptors.request.use(
    config => {
      Loading.show();
      return config;
    },
    error => {
      Loading.hide();
      return Promise.reject(error);
    }
  );

  apiObject.interceptors.response.use(
    response => {
      Loading.hide();
      return response;
    },
    error => {
      Loading.hide();
      return Promise.reject(error);
    }
  );

  return apiObject;
};
