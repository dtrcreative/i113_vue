import userHelper from "@/components/auth/services/user.helper";

// const ActiveProfile = "dev"
const ActiveProfile = "prod"

const GATEWAY_URL_TEST = 'http://localhost:8080/';
const GATEWAY_URL_PROD = 'http://192.168.100.9:8080/';

const KEYCLOAK_URL_TEST = "http://localhost:3000/";
const KEYCLOAK_URL_PROD = "http://192.168.100.9:3000/";

const KEYCLOAK_URL_REALM_TEST = "http://localhost:28080/realms/i113_realm";
const KEYCLOAK_URL_REALM_PROD = "http://192.168.100.9:28080/realms/i113_realm_prod";

export const getGatewayUrl = () => {
  return ActiveProfile === "prod" ? GATEWAY_URL_PROD : GATEWAY_URL_TEST;
}

export const getKeycloakUrl = () => {
  return ActiveProfile === "prod" ? KEYCLOAK_URL_PROD : KEYCLOAK_URL_TEST;
}

export const getKeycloakRealmUrl = () => {
  return ActiveProfile === "prod" ? KEYCLOAK_URL_REALM_PROD : KEYCLOAK_URL_REALM_TEST;
}

export const authHeader = () => {
  let user = userHelper.getUser();
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

