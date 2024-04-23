import {jwtDecode} from "jwt-decode";
const USER = "user"

export const saveUserData = (data) => {
  let tokenData = jwtDecode(data.token)
  if (tokenData !== undefined && tokenData !== "") {
    cleanUserData()
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
  }else{
    return false;
  }
}

export const getAuthUser = () => {
  return localStorage.getItem(USER)
}

export const getAuthHeader = () => {
  let user = localStorage.getItem(USER);
  if (user) {
    return {
      // Accept: "application/json",
      // Authorization: "Bearer " + user.token,
      // UserId: user.userId
      Authorization: user.token,
      User: user.username
    };
  } else {
    throw new Error('user is not logged in');
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


