import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import axios from "axios";
import {getGatewayUrl} from "@/store/app.service";
import {getAuthHeader} from "@/store/user.service";

const API_URL = 'api/resources/language/'
const API_ALL = 'api/resources/language/all'
const API_JSON_ADD = 'api/resources/language/upload-add'
const API_JSON_REPLACE = 'api/resources/language/upload-replace'
const API_RESOURCE_HEALTH = 'api/resources/actuator/health'

const SERVICE_NAME = 'Languages'

class LanguagesService {

  async init() {
    try {
      const response = await axios.get(getGatewayUrl() + API_ALL);
      return response.data;
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_ALL);
      return response.data;
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async create(unit) {
    try {
      return await axios.post(getGatewayUrl() + API_URL, {
        id: unit.id,
        param: unit.param,
        type: unit.type,
        eng: unit.eng,
        rus: unit.rus,
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async update(unit) {
    try {
      return await axios.put(getGatewayUrl() + API_URL, {
        id: unit.id,
        param: unit.param,
        type: unit.type,
        eng: unit.eng,
        rus: unit.rus,
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async remove(id) {
    try {
      return axios.delete(getGatewayUrl() + API_URL + id, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async uploadJSON(json, isReplace) {
    try {
      return await axios.post(getGatewayUrl() + (isReplace ? API_JSON_REPLACE : API_JSON_ADD), json, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  convertAndValidateJson(json) {
    let unitNumber = 0;
    let objects = [];
    let failed = [];
    for (unitNumber; unitNumber < json.length; unitNumber++) {
      if (failed.length > 5) {
        break;
      }
      try {
        objects.push({
          param: json[unitNumber].param !== undefined ?
            json[unitNumber].param : failed.push("unit:" + (unitNumber + 1) + "-field:param"),
          eng: json[unitNumber].eng !== undefined ?
            json[unitNumber].eng : failed.push("unit:" + (unitNumber + 1) + "-field:eng"),
          rus: json[unitNumber].rus !== undefined ?
            json[unitNumber].rus : failed.push("unit:" + (unitNumber + 1) + "-field:rus"),
        })
      } catch (e) {

        exceptionHandler.handleAppException(e,{
          code:0,
          message: "Parse JSON exception"
        })

      }
    }
    if (failed.length > 0) {
      return 'JSONTemplateError:' + failed
    } else {
      return objects
    }
  }

  getTemplateObject() {
    let template = [];
    for (let i = 0; i < 2; i++) {
      template.push({
          param: '',
          eng: '',
          rus: '',
        }
      )
    }
    return template;
  }

  async getBackUp() {
    let backUpObjects = []
    try {
      let response = await axios.get(getGatewayUrl() + API_ALL, {headers: getAuthHeader()});
      let values = response.data
      for (let i = 0; i < values.length; i++) {
        backUpObjects.push(
          {
            param: values[i].param,
            eng: values[i].eng,
            rus: values[i].rus,
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
}

export default new LanguagesService();
