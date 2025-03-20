import axios from "axios";
import { ADD_TODO } from "../../constants";

export const addTodo = (data, onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadTodo());
  axios
    .post("todo/createToDo", data, config)
    .then((res) => {
      dispatch(setTodo(res));
      onSuccess(res.data.data);
    })
    .catch((err) => {
      dispatch(errorTodo(err.response));
      onError(err.response);
    });
};

export const loadTodo = () => ({
  type: ADD_TODO.LOAD,
});

export const setTodo = (data) => ({
  type: ADD_TODO.SUCCESS,
  payload: data,
});

export const errorTodo = (error) => ({
  type: ADD_TODO.FAIL,
  payload: error,
});
