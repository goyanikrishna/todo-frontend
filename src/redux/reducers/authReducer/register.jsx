import { ADD_USER } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case ADD_USER.LOAD:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case ADD_USER.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
