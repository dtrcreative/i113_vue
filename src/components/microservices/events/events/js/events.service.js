import axios from "axios";
import {getAuthHeader, getGatewayUrl} from "@/components/auth/services/axios.service";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";
import userService from "@/components/auth/services/user.service";

const API_URL = 'api/events/';

class EventService {

  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_URL + 'all', {headers: getAuthHeader()});
      useEventsStore().setUnits(response.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async createEvent(unit) {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL, {
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      console.log(e)
      exceptionHandler.handle(e)
    }
  }

  async updateEvent(unit) {
    let user = userService.getUser();
    try {
      return await axios.put(getGatewayUrl() + API_URL, {
        id: unit.id,
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async removeSelectedEvents(selected) {
    try {
      return axios.post(getGatewayUrl() + API_URL + "/selected", selected, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

}

export default new EventService();
