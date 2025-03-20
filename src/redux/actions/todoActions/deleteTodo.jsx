import axios from "axios";
import { DELETE_TODO } from "../../constants";

export const deleteTodo = (id, onSuccess, onError) => (dispatch) => {
  const token = localStorage.jwtToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(loadDeleteTodo());
  axios
    .delete(`/todo/deleteToDo?todoId=${id}`, config)
    .then((res) => {
      dispatch(setDeleteTodo(res));
      onSuccess(res.data.data);
    })
    .catch((err) => {
      dispatch(errorDeleteTodo(err.response));
      onError(err.response);
    });
};

export const loadDeleteTodo = () => ({
  type: DELETE_TODO.LOAD,
});

export const setDeleteTodo = (data) => ({
  type: DELETE_TODO.SUCCESS,
  payload: data,
});

export const errorDeleteTodo = (error) => ({
  type: DELETE_TODO.FAIL,
  payload: error,
});
