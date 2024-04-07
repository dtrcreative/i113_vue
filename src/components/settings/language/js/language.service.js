import exceptionHandler from "@/components/UI/exceptions/exception-handler";
import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios.service";

const API_URL = 'api/resource/language/';
const API_ALL = 'all';
const API_JSON_ADD = 'upload-add';
const API_JSON_REPLACE = 'upload-replace';

const SERVICE_NAME = 'Languages'

class LanguageService {

  async init() {
    try {
      const response = await axios.get(getGatewayUrl() + API_URL + API_ALL, {headers: authHeader()});
      return response.data;
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async getUnits() {
    try {
      const response = await axios.get(getGatewayUrl() + API_URL + API_ALL, {headers: authHeader()});
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
        headers: authHeader()
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
        headers: authHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async remove(id) {
    try {
      return axios.delete(getGatewayUrl() + API_URL + id, {headers: authHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async uploadJSON(json, isReplace) {
    try {
      return await axios.post(getGatewayUrl() + API_URL + (isReplace ? API_JSON_REPLACE : API_JSON_ADD), json, {headers: authHeader()})
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
      let response = await axios.get(getGatewayUrl() + API_URL + API_ALL, {headers: authHeader()});
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

export default new LanguageService();
