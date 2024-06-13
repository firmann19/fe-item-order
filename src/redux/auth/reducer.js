import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      token: null,
      user: null,
      role: null,
      userId: null,
      getAllApprove: null,
      getAllReject: null,
    };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        user: action.user,
        userId: action.userId,
        role: action.role,
        getAllApprove: action.getAllApprove,
        getAllReject: action.getAllReject,
      };

    case USER_LOGOUT:
      return {
        token: null,
        user: null,
        role: null,
        getAllApprove: null,
        getAllReject: null,
      };

    default:
      return state;
  }
}
