
export const PROD = "prod"
export const DEV = "develop"

export const PROFILES = new Map([
  [PROD,    {gatewayUrl: "http://192.168.192.81:18080/", security: true}],
  [DEV,     {gatewayUrl: "http://localhost:8080/",       security: true}],
])

let ActiveProfile = PROD
// let ActiveProfile = DEV

export const getGatewayUrl = () => {
  return PROFILES.get(ActiveProfile).gatewayUrl
}

export const getCurentDateString = () => {
  let currentDate = new Date().toString().split(" ")
  return currentDate[0] + " " +
    currentDate[1] + " " +
    currentDate[2] + " " +
    currentDate[3]
}

export const profilesList = () => {
  return PROFILES
}

export const getActiveProfile = () => {
  return ActiveProfile.toString()
}
