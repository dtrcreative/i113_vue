import axios from "axios";

const auth_api = "http://192.168.100.8:8080/api/auth/"
const USER = "user"
class AuthService {

  async login(username, email, password) {
    let response = await axios.post(auth_api + "login", {
      username: username,
      password: password,
    })
    this.saveUserData(response.data)
  }

  registration(email, password) {
    console.log("UserRegistration: ", email + " " + password);
  }

  reinitPassword(email, password) {
    console.log("ReinitPass: ", email + " " + password);
  }

  sendMail(email) {
    console.log("UserRegistration: ", email);
  }

  saveUserData(data){
    let tokenData = JSON.parse(atob(data.token.split('.')[1]));
    if(tokenData !== undefined){
      let userData = {
        userId : tokenData.uuid,
        userName : tokenData.sub,
        userStatus : tokenData.status,
        userRole : tokenData.role,
        userToken : data,
        expireAt : tokenData.exp
      }
      localStorage.setItem(USER, JSON.stringify(userData))
    }
  }

}

export default new AuthService()
