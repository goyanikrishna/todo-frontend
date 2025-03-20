import axios from "axios";
import { UPDATE_TODO } from "../../constants";

export const updateTodo = (data, onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadUpdateTodo());
  axios
    .put(`/todo/updateToDo`, data, config)
    .then((res) => {
      dispatch(setUpdateTodo(res));
      onSuccess(res.data.data.message);
    })
    .catch((err) => {
      dispatch(errorUpdateTodo(err.response));
      onError(err.response);
    });
};

export const loadUpdateTodo = () => ({
  type: UPDATE_TODO.LOAD,
});

export const setUpdateTodo = (data) => ({
  type: UPDATE_TODO.SUCCESS,
  payload: data,
});

export const errorUpdateTodo = (error) => ({
  type: UPDATE_TODO.FAIL,
  payload: error,
});
