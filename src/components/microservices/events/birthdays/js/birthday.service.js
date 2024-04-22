import axios from "axios";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import userService from "@/components/auth/services/user.service";
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";

const API_URL = 'api/events/birthdays/';

const API_ALL = 'all';
const API_JSON_ADD = 'upload-add';
const API_JSON_REPLACE = 'upload-replace';

const SERVICE_NAME = 'Birthdays'

class BirthdayService {
  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_URL + API_ALL, {headers: getAuthHeader()});
      useBirthdaysStore().setUnits(response.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async createBirthday(unit) {
    let user = userService.getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL, {
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
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

  async updateBirthday(unit) {
    let user = userService.getUser();
    try {
      return await axios.put(getGatewayUrl() + API_URL, {
        id: unit.id,
        userId: user.userId,
        firstName: unit.firstName,
        lastName: unit.lastName,
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

  async uploadJSON(json, isReplace) {
    try {
      return await axios.post(getGatewayUrl() + API_URL + (isReplace ? API_JSON_REPLACE : API_JSON_ADD), json, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  convertAndValidateJson(json) {
    let unitNumber = 0;
    let objects = [];
    let failed = [];
    let user = userService.getUser();
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
        console.log(e)
      }
    }
    if (failed.length > 0) {
      return 'JSONTemplateError:' + failed
    } else {
      return objects
    }
  }

  async removeSelectedBirthdays(selected) {
    try {
      return axios.post(getGatewayUrl() + API_URL + "/selected", selected, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  getTemplateObject() {
    let template = [];
    for (let i = 0; i < 2; i++) {
      template.push({
          firstName: '',
          lastName: '',
          date: '',
          notify: '',
          description: ''
        }
      )
    }
    return template
  }

  async getBackUp() {
    let backUpObjects = []
    try {
      let response = await axios.get(getGatewayUrl() + API_URL + API_ALL, {headers: getAuthHeader()});
      let values = response.data
      for (let i = 0; i < values.length; i++) {
        backUpObjects.push(
          {
            firstName: values[i].firstName,
            lastName: values[i].lastName,
            date: values[i].date,
            notify: values[i].notify,
            description: values[i].description
          }
        )
      }
      return backUpObjects;
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  getBackUpFileName() {
    return SERVICE_NAME + '_BackUp.json'
  }

  async checkServiceStatus() {
    try {
      let response = await axios.get("http://localhost:8080/actuator/health", {headers: getAuthHeader()});
      console.log(response.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

}

export default new BirthdayService();
