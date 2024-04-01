import {UserManager, WebStorageStateStore} from 'oidc-client';
import userHelper from "@/components/auth/services/user.helper";
import {getKeycloakRealmUrl, getKeycloakUrl} from "@/components/auth/services/axios-helper"

const REDIRECT_URI = "/callback"
const RESPONSE_TYPE = "code"
const SCOPES = "openid profile message.read"
const CLIENT_ID = "i113_frontend_client"

const settings = {
  authority: getKeycloakRealmUrl(),
  client_id: CLIENT_ID.toString(),
  redirect_uri: getKeycloakUrl() + REDIRECT_URI,
  response_type: RESPONSE_TYPE.toString(),
  scope: SCOPES.toString(),
  post_logout_redirect_uri: getKeycloakUrl(),
  userStore: new WebStorageStateStore({store: window.localStorage}),
  stateStore: new WebStorageStateStore({store: window.sessionStorage}),
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

