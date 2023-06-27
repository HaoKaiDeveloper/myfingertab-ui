import axios from "axios";
import store from "../store/index";

const url = "https://s.intella.co/myfingertab/api";

const basicFetch = axios.create({
  baseURL: url,
});

const authFetch = axios.create({
  baseURL: url,
});

authFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit("member/setTokenExpired", true);
    }
    return Promise.reject(error);
  }
);

export { basicFetch, authFetch };
