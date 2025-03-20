import { ADD_TODO } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case ADD_TODO.LOAD:
      return {
        ...state,
        loading: true,
      };
    case ADD_TODO.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case ADD_TODO.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
