import axios from "axios";
import {cleanUserData, saveUserData} from "@/store/user.service";
import {getGatewayUrl} from "@/store/app.service";
import router from "@/router";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";

const API_URL = "api/auth/"
const API_LOGIN = "api/auth/login"
const API_SIGNUP = "api/auth/signup"
class AuthService {

  async login(username, password) {
    try{
      let response = await axios.post(getGatewayUrl() + API_LOGIN, {
        username: username,
        password: password,
      })
      saveUserData(response.data);
      return await response
    }catch (e){
      exceptionHandler.handle(e)
    }
  }

  async logout() {
    cleanUserData()
    await router.push("./")
  }

  async signup(user) {
    try{
      return await axios.post(getGatewayUrl() + API_SIGNUP, {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      })
    }catch (e){
      exceptionHandler.handle(e)
    }
  }

  reinitPassword(email, password) {
    console.log("ReinitPass: ", email + " " + password);
  }

  sendMail(email) {
    console.log("UserRegistration: ", email);
  }

}

export default new AuthService()
