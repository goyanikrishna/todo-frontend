import axios from "axios";
import { DELETE_USER } from "../../constants";

export const deleteUser = (onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadDeleteUser());
  axios
    .delete(`/user/deleteUser`, config)
    .then((res) => {
      dispatch(setDeleteUser(res));
      onSuccess(res.data.data);
    })
    .catch((err) => {
      dispatch(errorDeleteUser(err.response));
      onError(err.response);
    });
};

export const loadDeleteUser = () => ({
  type: DELETE_USER.LOAD,
});

export const setDeleteUser = (data) => ({
  type: DELETE_USER.SUCCESS,
  payload: data,
});

export const errorDeleteUser = (error) => ({
  type: DELETE_USER.FAIL,
  payload: error,
});
