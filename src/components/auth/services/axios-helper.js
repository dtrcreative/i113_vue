import userHelper from "@/components/auth/services/user.helper";

const SERV_URL = 'http://localhost:8080/';
// const SERV_URL = 'http://192.168.100.9:8080';

export const getServerUrl = () => {
  return SERV_URL;
}

export const authHeader = () => {
  let user = userHelper.getUser();
  if(user){
    return {
      Accept: "application/json",
      Authorization: "Bearer " + user.token,
      UserId: user.userId
    };
  }else{
    throw new Error('user is not logged in');
  }
}

