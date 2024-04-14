import userService from "@/components/auth/services/user.service";

// const ActiveProfile = "dev"
const ActiveProfile = "prod"

const GATEWAY_URL_DEV =         'http://localhost:8080/';
const KEYCLOAK_URL_DEV =        'http://localhost:3000/';
const KEYCLOAK_URL_REALM_DEV =  'http://localhost:28080/realms/i113_realm';

const GATEWAY_URL_PROD =        'http://192.168.192.81:18080/';
const KEYCLOAK_URL_PROD =       'http://192.168.100.8:23000/';
const KEYCLOAK_URL_REALM_PROD = 'http://192.168.192.81:28080/realms/i113_realm_prod/';

// const GATEWAY_URL_PROD =         'http://192.168.100.9:18080/';
// const KEYCLOAK_URL_PROD =        'http://192.168.100.9:23000/';
// const KEYCLOAK_URL_REALM_PROD =  'http://192.168.100.9:28080/realms/i113_realm_prod/';

export const getGatewayUrl = () => {
  return ActiveProfile === "prod" ? GATEWAY_URL_PROD : GATEWAY_URL_DEV;
}

export const getKeycloakUrl = () => {
  return ActiveProfile === "prod" ? KEYCLOAK_URL_PROD : KEYCLOAK_URL_DEV;
}

export const getKeycloakRealmUrl = () => {
  return ActiveProfile === "prod" ? KEYCLOAK_URL_REALM_PROD : KEYCLOAK_URL_REALM_DEV;
}

export const authHeader = () => {
  let user = userService.getUser();
  if (user) {
    return {
      Accept: "application/json",
      Authorization: "Bearer " + user.token,
      UserId: user.userId
    };
  } else {
    throw new Error('user is not logged in');
  }
}

