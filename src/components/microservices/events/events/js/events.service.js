import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";
import userHelper from "@/components/auth/services/user.helper";

const API_URL = 'api/events/';

class EventService {

  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_URL + 'all', {headers: authHeader()});
      useEventsStore().setUnits(response.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async createEvent(unit) {
    let user = userHelper.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL, {
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      }, {
        headers: authHeader()
      })
    } catch (e) {
      console.log(e)
      errorHandler.handle(e)
    }
  }

  async updateEvent(unit) {
    let user = userHelper.getUser();
    try {
      return await axios.put(getGatewayUrl() + API_URL, {
        id: unit.id,
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async removeSelectedEvents(selected) {
    try {
      return axios.post(getGatewayUrl() + API_URL + "/selected", selected, {headers: authHeader()})
    } catch (e) {
      errorHandler.handle(e)
    }
  }

}

export default new EventService();
