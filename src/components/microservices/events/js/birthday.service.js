import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import userHelper from "@/components/auth/services/user.helper";
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";

const API_URL = 'api/events/birthdays/';

const API_ALL = 'all';
const API_ADD = 'upload-add';
const API_REPLACE = 'upload-replace';

//TODO Check catch working

class BirthdayService {
  async getUnits() {
    try {
      const response = await axios.get(getServerUrl() + API_URL + API_ALL, {headers: authHeader()});
      // console.log(response.data)
      useBirthdaysStore().setUnits(response.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async createBirthday(unit) {
    let user = userHelper.getUser();
    try {
      return await axios.post(getServerUrl() + API_URL, {
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
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

  async updateBirthday(unit) {
    let user = userHelper.getUser();
    try {
      return await axios.put(getServerUrl() + API_URL, {
        id: unit.id,
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
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

  async removeBirthday(id) {
    try {
      return axios.delete(getServerUrl() + API_URL + id, {headers: authHeader()})
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async uploadJSON(json, isReplace) {
    try {
      return await axios.post(getServerUrl() + API_URL + (isReplace ? API_REPLACE : API_ADD), json, {headers: authHeader()})
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  convertAndValidateJson(json) {
    let unitNumber = 0;
    let objects = [];
    let failed = [];
    let user = userHelper.getUser();
    for (unitNumber; unitNumber < json.length; unitNumber++) {
      if (failed.length > 5) {
        break;
      }
      try {
        objects.push({
          userId: user.userId,
          firstName: json[unitNumber].firstName !== undefined ?
            json[unitNumber].firstName : failed.push("unit:" + (unitNumber + 1) + "-field:firstName"),
          lastName: json[unitNumber].lastName !== undefined ?
            json[unitNumber].lastName : failed.push("unit:" + (unitNumber + 1) + "-field:lastName"),
          date: json[unitNumber].date !== undefined ?
            json[unitNumber].date : failed.push("unit:" + (unitNumber + 1) + "-field:date"),
          notify: json[unitNumber].notify !== undefined ?
            json[unitNumber].notify : failed.push("unit:" + (unitNumber + 1) + "-field:notify"),
          description: json[unitNumber].description !== undefined ?
            json[unitNumber].description : failed.push("unit:" + (unitNumber + 1) + "-field:description"),
        })
      } catch (e) {
        console.log('ощибка')
      }
    }
    if (failed.length > 0) {
      return 'JSONTemplateError:' + failed
    } else {
      return objects
    }
  }

  // async removeSelectedBirthdays(selected){
  //   console.log(JSON.stringify(selected))
  //   try{
  //     return axios.delete(getServerUrl() + API_URL + "/selected", {
  //       units: selected
  //     }, {headers: authHeader()})
  //   }catch (e){
  //     errorHandler.handle(e)
  //   }
  // }
}

export default new BirthdayService();
