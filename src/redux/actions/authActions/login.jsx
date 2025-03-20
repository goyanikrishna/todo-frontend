import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import { LOGIN } from "../../constants";

export const login = (loginData, onSuccess, onError) => (dispatch) => {
  dispatch(loadLogin());
  axios
    .post("auth/login", loginData)
    .then((res) => {
      const { token, name, _id } = res.data.data;

      setAuthToken(token);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("id", _id);
      onSuccess(res.data.data);
      dispatch(setLogin(res.data.data));
    })
    .catch((err) => {
      dispatch(errorLogin(err.response));
      onError(err.response);
    });
};

export const loadLogin = () => ({
  type: LOGIN.LOAD,
});

export const setLogin = (data) => ({
  type: LOGIN.SUCCESS,
  payload: data,
});

export const errorLogin = (error) => ({
  type: LOGIN.FAIL,
  payload: error,
});

export const logout = (navigate) => (dispatch) => {
  dispatch(errorLogin({}));
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userName");
  setAuthToken(false);
  dispatch(setLogin({}));
  if (navigate) navigate("/login");
};
