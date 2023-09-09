import axios from 'axios';
import { getUser } from './auth-helper';


const _callApi = (token) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token
  };
  const response = axios.get("http://localhost:8080/api/panda/", { headers });
  console.log(response);
  return response;
}

export const callApi = () => {
  return getUser().then(user => {
    if (user && user.access_token) {
      console.log(user.access_token);
      return _callApi(user.access_token).catch(error => {
        throw error;
      });
    } else {
      throw new Error('user is not logged in');
    }
  });
}
