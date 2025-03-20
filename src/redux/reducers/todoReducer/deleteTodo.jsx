import { DELETE_TODO } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case DELETE_TODO.LOAD:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TODO.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case DELETE_TODO.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
