import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import {useEventsStore} from "@/components/microservices/events/store/eventsStore";
import userHelper from "@/components/auth/services/user.helper";
const API_URL = 'api/events/';

class EventService {

  async getEvents() {
    try {
      const response = await axios.get( getServerUrl() + API_URL + 'all', { headers: authHeader() });
      useEventsStore().setUnits(response.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async createEvent(unit){
    let user = userHelper.getUser();
    try{
      return await axios.post(getServerUrl() + API_URL,{
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      },{ headers: authHeader()
      })
    }catch (e) {
      errorHandler.handle(e)
    }
  }

  async updateEvent(unit){
    let user = userHelper.getUser();
    console.log(unit.id)
    try{
      return await axios.put(getServerUrl() + API_URL,{
        id: unit.id,
        userId: user.userId,
        eventName: unit.eventName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      },{ headers: authHeader()
      })
    }catch (e) {
      errorHandler.handle(e)
    }
  }

  async removeEvent(id){
    try{
      return axios.delete(getServerUrl() + API_URL + id, {headers: authHeader()})
    }catch (e){
      errorHandler.handle(e)
    }
  }

  validateUploadJson(json){
    console.log("EventsValidateJson")
  }


}

export default new EventService();
