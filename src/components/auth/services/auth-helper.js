import {UserManager} from 'oidc-client';
import userHelper from "@/components/auth/services/user.helper";

const KEYCLOAK_URL = "http://localhost:28080/";
const APP_URL = "http://localhost:3000/"

const settings = {
  authority: KEYCLOAK_URL + "realms/i113_realm/",
  client_id: "i113_frontend_client",
  redirect_uri: APP_URL + "callback",
  response_type: 'code',
  scope: "openid profile message.read",
  post_logout_redirect_uri: APP_URL + ""
};

const userManager = new UserManager(settings);

export const getUser = () => {
  return userManager.getUser();
}

export const login = () => {
  return userManager.signinRedirect();
}

export const redirectCallBack = () => {
  userManager.signinRedirectCallback("").then(function () {
    userHelper.fillLocalsStorageUser();
    window.location = "/";
  }).catch(function (e) {
    console.error(e);
  });
}

export const logout = () => {
  userHelper.cleanLocalStorage()
  return userManager.signoutRedirect();
}

export const checkUser = () => {
  return userManager.getUser().then(user => !!(user && user.access_token));// ToRemove
}

export const isUser = () => {
  if(!userHelper.isUserExist()){
    console.log("try to fill LocalStorage")
    userHelper.fillLocalsStorageUser()
  }
  return userHelper.isUserExist();
}
