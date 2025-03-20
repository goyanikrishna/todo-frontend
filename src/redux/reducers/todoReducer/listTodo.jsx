import { LIST_TODO } from "../../constants";

const initialState = {
  data: [],
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case LIST_TODO.LOAD:
      return {
        ...state,
        loading: true,
      };
    case LIST_TODO.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case LIST_TODO.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
