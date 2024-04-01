import userHelper from "@/components/auth/services/user.helper";
import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";

const API_URL = 'api/telbot/';
const API_REG = 'reg'
const API_STATUS = 'status'

class TelegramService {

  async register() {
    let user = userHelper.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_REG, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async status() {
    let user = userHelper.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL + API_STATUS, {
        userId: user.userId,
        userSecretKey: ''
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async test(){
    try {
      const response = await axios.get(getGatewayUrl() + 'api/events/' + 'alltest', {headers: authHeader()});
      return response;
    } catch (e) {
      errorHandler.handle(e)
    }
  }
}

export default new TelegramService()
