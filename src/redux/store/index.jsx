import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "../reducers";

const middleware = [thunk];

const middlewareApply = applyMiddleware(...middleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore((state, action) => {
  if (action.type === "FAIL_LOGIN") {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
}, 
composeEnhancers(middlewareApply)
);

export default store;
