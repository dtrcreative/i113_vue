import {jwtDecode} from "jwt-decode";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";

const USER = "user"

export const saveUserData = (data) => {
  let tokenData = jwtDecode(data.token)
  if (tokenData !== undefined && tokenData !== "") {
    let userData = {
      uuid: tokenData.uuid,
      firstName: tokenData.firstname,
      lastName: tokenData.lastname,
      email: tokenData.email,
      status: tokenData.status,
      role: tokenData.role,
      token: data,
      expireAt: tokenData.exp
    }
    localStorage.setItem(USER, JSON.stringify(userData))
    return true;
  } else {
    return false;
  }
}

export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem(USER))
}

export const getAuthHeader = () => {
  let user = JSON.parse(localStorage.getItem(USER));
  if (user) {
    return {
      Accept: "application/json",
      Authorization: user.token,
      UserId: user.uuid
    };
  } else {
    exceptionHandler.handleAppError(
      {
        code: 0,
        message: "User not logged in"
      }
    )
  }
}

export const cleanUserData = () => {
  localStorage.removeItem(USER)
}

export const cleanStorage = () => {
  localStorage.clear()
  sessionStorage.clear()
}

export const isUserExist = () => {
  return !!localStorage.getItem(USER);
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER));
}


