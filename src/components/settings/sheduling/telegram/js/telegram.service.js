
import axios from "axios";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import {getGatewayUrl} from "@/store/app.service";
import {getAuthHeader, getUser} from "@/store/user.service";

const API_URL = 'api/telbot/'
const API_REG = 'api/telbot/reg'
const API_STATUS = 'api/telbot/status'
const API_DISABLE = 'api/telbot/disable'
const API_ENABLE = 'api/telbot/enable'
const API_TELBOT = 'api/telbot/actuator/health'

class TelegramService {

  async register() {
    let user = getUser();
    try {
      return await axios.post(getGatewayUrl() + API_REG, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async status() {
    let user = getUser();
    try {
      return await axios.post(getGatewayUrl() + API_STATUS, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async disable() {
    let user = getUser();
    try {
      return await axios.post(getGatewayUrl() + API_DISABLE, {
        userId: user.userId,
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async enable() {
    let user = getUser();
    try {
      return await axios.post(getGatewayUrl() + API_ENABLE, {
        userId: user.userId,
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

}

export default new TelegramService()
