import axios from "axios";

import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";
import {getGatewayUrl} from "@/store/app.service";
import {getAuthHeader, getUser} from "@/store/user.service";


const API_URL = 'api/events/';
const API_ALL = 'api/events/all'
const API_REMOVE_SELECTED = 'api/events/selected'
const API_EVENTS_HEALTH = 'api/events/actuator/health'

class EventService {

  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_ALL, {headers: getAuthHeader()});
      useEventsStore().setUnits(response.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async createEvent(unit) {
    let user = getUser();
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
    let user = getUser();
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
      return axios.post(getGatewayUrl() + API_REMOVE_SELECTED, selected, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

}

export default new EventService();
