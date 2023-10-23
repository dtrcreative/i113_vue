import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import userHelper from "@/components/auth/services/user.helper";
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";
const API_URL = '/api/events/birthdays/';

class BirthdayService {
  async getBirthdays() {
    try {
      const response = await axios.get( getServerUrl() + API_URL + 'all', { headers: authHeader() });
      // console.log(response.data)
      useBirthdaysStore().setUnits(response.data)
      // return response.data;
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async createBirthday(unit){
    let user = userHelper.getUser();
    try{
      return await axios.post(getServerUrl() + API_URL,{
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      },{ headers: authHeader()
      })
    }catch (e) {
      errorHandler.handle(e)
    }
  }

  async updateBirthday(unit){
    let user = userHelper.getUser();
    console.log(unit.id)
    try{
      return await axios.put(getServerUrl() + API_URL,{
        id: unit.id,
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
        date: unit.date,
        notify: unit.notify,
        description: unit.description
      },{ headers: authHeader()
      })
    }catch (e) {
      errorHandler.handle(e)
    }
  }

  async removeBirthday(id){
    try{
      return axios.delete(getServerUrl() + API_URL + id, {headers: authHeader()})
    }catch (e){
      errorHandler.handle(e)
    }
  }

  // async removeSelectedBirthdays(selected){
  //   console.log(JSON.stringify(selected))
  //   try{
  //     return axios.dleete(getServerUrl() + API_URL + "/selected", {
  //       units: selected
  //     }, {headers: authHeader()})
  //   }catch (e){
  //     errorHandler.handle(e)
  //   }
  // }
}

export default new BirthdayService();
