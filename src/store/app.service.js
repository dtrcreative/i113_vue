// const ActiveProfile = "dev"
const ActiveProfile = "prod"

const GATEWAY_URL_DEV =         'http://localhost:8080/';
const GATEWAY_URL_PROD =        'http://192.168.192.81:18080/';



export const getCurentDateString = () => {
  let currentDate = new Date().toString().split(" ")
  return currentDate[0] + " " +
        currentDate[1] + " " +
        currentDate[2] + " " +
        currentDate[3]
}
