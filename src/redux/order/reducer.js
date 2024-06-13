import {
  ERROR_FETCHING_ORDERS,
  START_FETCHING_ORDERS,
  SUCCESS_FETCHING_ORDERS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORDERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORDERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORDERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.orders,
      };

    default:
      return state;
  }
}
