import axios from "axios";
import { ADD_USER } from "../../constants";

export const registerUser = (data, onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadUser());
  axios
    .post("auth/registerUser", data, config)
    .then((res) => {
      dispatch(setUser(res.data));
      onSuccess(res.data);
    })
    .catch((err) => {
      dispatch(errorUser(err.response));
      onError(err.response);
    });
};

export const loadUser = () => ({
  type: ADD_USER.LOAD,
});

export const setUser = (data) => ({
  type: ADD_USER.SUCCESS,
  payload: data,
});

export const errorUser = (error) => ({
  type: ADD_USER.FAIL,
  payload: error,
});
