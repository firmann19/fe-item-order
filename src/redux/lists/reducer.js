import {
  ERROR_FETCHING_LISTS_GROUP,
  START_FETCHING_LISTS_GROUP,
  SUCCESS_FETCHING_LISTS_GROUP,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  groups: [],
  statusGroups: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_GROUP:
      return { ...state, statusDates: statuslist.process };

    case ERROR_FETCHING_LISTS_GROUP:
      return { ...state, statusDates: statuslist.error };

    case SUCCESS_FETCHING_LISTS_GROUP:
      return {
        ...state,
        statusGroups: statuslist.success,
        groups: action.groups,
      };

    default:
      return state;
  }
}
