import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";

const API_URL = '/api/events/';

class EventService {

  async getEvents() {
    try {
      const response = await axios.get( getServerUrl() + API_URL + '/all', { headers: authHeader() });
      console.log(response.data)
      return response.data;
    } catch (e) {
      errorHandler.handle(e)
    }
  }


}

export default new EventService();
