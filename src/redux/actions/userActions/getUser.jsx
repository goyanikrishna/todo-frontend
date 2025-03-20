import axios from "axios";
import { GET_USER } from "../../constants";

export const getUser = (onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch(loadUserList());
  axios
    .get(`/user/getUser`, config)
    .then((res) => {
      dispatch(setUserList(res.data.data));
    })
    .catch((err) => {
      dispatch(errorUserList(err.response));
      onError(err.response);
    });
};

export const loadUserList = () => ({
  type: GET_USER.LOAD,
});

export const setUserList = (data) => ({
  type: GET_USER.SUCCESS,
  payload: data,
});

export const errorUserList = (error) => ({
  type: GET_USER.FAIL,
  payload: error,
});
