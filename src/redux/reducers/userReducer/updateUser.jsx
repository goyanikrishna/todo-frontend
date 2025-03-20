import { UPDATE_USER } from "../../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function (state = initialState, { type, payload } = {}) {
  switch (type) {
    case UPDATE_USER.LOAD:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER.SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case UPDATE_USER.FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
