import { combineReducers } from "redux";
// auth
import login from "./authReducer/login";
// user
import registerUser from "./authReducer/register";
import getUser from "./userReducer/getUser";
import updateUser from "./userReducer/updateUser";
import deleteUser from "./userReducer/deleteUser";
// todo
import addTodo from "./todoReducer/addTodo";
import listTodo from "./todoReducer/listTodo";
import updateTodo from "./todoReducer/updateTodo";
import deleteTodo from "./todoReducer/deleteTodo";

export default combineReducers({
  // auth
  registerUserData: registerUser,
  loginData: login,

  // user
  getUserData: getUser,
  updateUserData: updateUser,
  deleteUserData: deleteUser,

  // todo
  addTodoData: addTodo,
  listTodoData: listTodo,
  updateTodoData: updateTodo,
  deleteTodoData: deleteTodo,
});
