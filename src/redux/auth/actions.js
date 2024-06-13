import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(
  token,
  user,
  userId,
  role,
  getAllApprove,
  getAllReject
) {
  return {
    type: USER_LOGIN,
    token,
    user,
    userId,
    role,
    getAllApprove,
    getAllReject,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
