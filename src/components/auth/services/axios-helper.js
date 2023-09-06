import axios from 'axios';
import { getUser } from './auth-helper';


const _callApi = (token) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token
  };
  // const response = axios.get("http://localhost:8080/api/panda/", { headers });
  const response = axios.post("http://localhost:28080/realms/i113_realm/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/", { headers });
  console.log(response);
  return response;
}

export const callApi = () => {
  return getUser().then(user => {
    if (user && user.access_token) {
      console.log(user.profile.preferred_username);
      return _callApi(user.access_token).catch(error => {
        throw error;
      });
    } else {
      throw new Error('user is not logged in');
    }
  });
}
