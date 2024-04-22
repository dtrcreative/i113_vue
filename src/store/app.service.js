const ActiveProfile = "dev"
// const ActiveProfile = "prod"

const GATEWAY_URL_DEV =         'http://localhost:8080/';
const GATEWAY_URL_PROD =        'http://192.168.192.81:18080/';

export const getGatewayUrl = () => {
  return ActiveProfile === "prod" ? GATEWAY_URL_PROD : GATEWAY_URL_DEV;
}
