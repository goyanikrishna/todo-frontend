import { UPDATE_TODO } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case UPDATE_TODO.LOAD:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TODO.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case UPDATE_TODO.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
