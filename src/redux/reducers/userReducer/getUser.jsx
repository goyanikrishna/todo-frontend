import { GET_USER } from "../../constants";

const initialState = {
  data: [],
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case GET_USER.LOAD:
      return {
        ...state,
        loading: true,
      };
    case GET_USER.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case GET_USER.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
