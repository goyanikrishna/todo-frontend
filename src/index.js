import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import setAuthToken from "./utils/setAuthToken";
import { errorLogin, setLogin } from "./redux/actions/authActions/login";
import store from "./redux/store";
import config from "./config";

const { dispatch } = store;
axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("jwtToken");
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      dispatch(errorLogin({}));
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userName");
      setAuthToken(false);
      dispatch(setLogin({}));
      window.location.replace("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
