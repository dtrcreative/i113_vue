import {UserManager} from 'oidc-client';

const settings = {
  authority: "http://localhost:28080/realms/i113_realm/",
  client_id: "i113_frontend_client",
  redirect_uri: "http://localhost:3000/signin-callback.html", //TODO: change if check or build on server
  response_type: 'code',
  scope: "openid profile message.read",
  post_logout_redirect_uri: "http://localhost:3000/"
};

const userManager = new UserManager(settings);

export const getUser = () => {
  return userManager.getUser();
}

export const checkUser = () => {
  return userManager.getUser().then(user => !!(user && user.access_token));
}

export const login = () => {
  return userManager.signinRedirect();
}

export const logout = () => {
  return userManager.signoutRedirect();
}
