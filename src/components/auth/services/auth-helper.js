import {UserManager, WebStorageStateStore} from 'oidc-client';
import userHelper from "@/components/auth/services/user.helper";
import router from "@/router";

const KEYCLOAK_URL = "http://localhost:28080/";
const APP_URL = "http://localhost:3000/"

const settings = {
  authority: KEYCLOAK_URL + "realms/i113_realm/",
  client_id: "i113_frontend_client",
  redirect_uri: APP_URL + "/callback",
  response_type: 'code',
  scope: "openid profile message.read",
  post_logout_redirect_uri: APP_URL + "",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  stateStore: new WebStorageStateStore({ store: window.sessionStorage }),
  automaticSilentRenew: false,
  sessionMonitor: false
};

const userManager = new UserManager(settings);

export const login = () => {
  return userManager.signinRedirect();
}

export const logout = () => {
  return userManager.signoutRedirect();
}

export const redirectCallBack = () => {
  userManager.signinRedirectCallback("").then(function () {
    userHelper.fillLocalsStorageUser();
    window.location = "/home";
  }).catch(function (e) {
    console.error(e);
    window.location = "/";
  });
}

export const getAuthUser = () => {
  return userManager.getUser();
}

export const checkUser = () => {
  return userManager.getUser().then(user => !!(user && user.access_token));// ToRemove
}

