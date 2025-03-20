import axios from "axios";
import { UPDATE_USER } from "../../constants";

export const updateUser = (data, onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadUpdateUser());
  axios
    .put(`/user/updateUser`, data, config)
    .then((res) => {
      dispatch(setUpdateUser(res));
      onSuccess(res.data.data.message);
    })
    .catch((err) => {
      dispatch(errorUpdateUser(err.response));
      onError(err.response);
    });
};

export const loadUpdateUser = () => ({
  type: UPDATE_USER.LOAD,
});

export const setUpdateUser = (data) => ({
  type: UPDATE_USER.SUCCESS,
  payload: data,
});

export const errorUpdateUser = (error) => ({
  type: UPDATE_USER.FAIL,
  payload: error,
});
