import axios from "axios";
import { LIST_TODO } from "../../constants";

export const listTodo = (data, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  data = {
    page_number: data.page_number || 1,
    page_size: data.page_size || 10,
  };

  dispatch(loadTodoList());
  axios
    .post(`/todo/listToDos`, data, config)
    .then((res) => {
      dispatch(setTodoList(res.data.data));
    })
    .catch((err) => {
      dispatch(errorTodoList(err.response));
      onError(err.response);
    });
};

export const loadTodoList = () => ({
  type: LIST_TODO.LOAD,
});

export const setTodoList = (data) => ({
  type: LIST_TODO.SUCCESS,
  payload: data,
});

export const errorTodoList = (error) => ({
  type: LIST_TODO.FAIL,
  payload: error,
});
