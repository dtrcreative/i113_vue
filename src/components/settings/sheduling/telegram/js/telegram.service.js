import userService from "@/components/auth/services/user.service";
import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios.service";
import exceptionHandler from "@/components/UI/exceptions/exception-handler";

const API_URL = 'api/telbot/';
const API_REG = 'reg'
const API_STATUS = 'status'
const API_DISABLE = 'disable'
const API_ENABLE = 'enable'

class TelegramService {

  async register() {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_REG, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: authHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }
  async status() {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_STATUS, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: authHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async disable() {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_DISABLE, {
        userId: user.userId,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }
  async enable() {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_ENABLE, {
        userId: user.userId,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async test(){
    try {
      const response = await axios.get(getGatewayUrl() + 'api/events/' + 'alltest', {headers: authHeader()});
      return response;
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }
}

export default new TelegramService()
