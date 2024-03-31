import userHelper from "@/components/auth/services/user.helper";
import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";

const API_URL = 'api/telbot/';
const API_REG = 'reg'
const API_STATUS = 'status'

class TelegramService {

  async register() {
    let user = userHelper.getUser();
    try {
      return await axios.post(getServerUrl() + API_URL + API_REG, {
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
      return await axios.post(getServerUrl() + API_URL + API_STATUS, {
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
      const response = await axios.get(getServerUrl() + 'api/events/' + 'alltest', {headers: authHeader()});
      return response;
    } catch (e) {
      errorHandler.handle(e)
    }
  }
}

export default new TelegramService()
