import { LOGIN } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: {},
      };
    case LOGIN.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOGIN.LOAD:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
