import axios from "axios";
// import store from "./index";
export default () => {
  var apiObject = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      // eslint-disable-next-line no-undef
      Authorization: sessionStorage.getItem("accessToken")
    }
  });
  //   apiObject.interceptors.request.use(
  //     config => {
  //       store.commit("setSpinnerStatus", true);
  //       return config;
  //     },
  //     error => {
  //       store.commit("setSpinnerStatus", false);
  //       return Promise.reject(error);
  //     }
  //   );

  //   apiObject.interceptors.response.use(
  //     response => {
  //       store.commit("setSpinnerStatus", false);
  //       return response;
  //     },
  //     error => {
  //       store.commit("setSpinnerStatus", false);
  //       return Promise.reject(error);
  //     }
  //   );

  return apiObject;
};
