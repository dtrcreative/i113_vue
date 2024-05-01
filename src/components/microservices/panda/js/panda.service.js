import axios from "axios";

import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";

import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import {getGatewayUrl} from "@/store/app.service";
import {getAuthHeader, getUser} from "@/store/user.service";

const API_URL = 'api/panda/';
const API_ALL = 'api/panda/all';
const API_REMOVE_SELECTED = 'api/panda/selected'
const API_PASSGEN = 'api/panda/utils/passgen'
const API_SERVICE_TYPES = 'api/panda/data/types'
const API_JSON_ADD = 'api/panda/utils/upload-add';
const API_JSON_REPLACE = 'api/panda/utils/upload-replace';

const API_PANDA_HEALTH = 'api/panda/actuator/health'

const SERVICE_NAME = 'Panda'

class PandaService {

  async getUnits() {
    try {
      const responseAccounts = await axios.get(getGatewayUrl() + API_ALL, {headers: getAuthHeader()});
      const responseData = await axios.get(getGatewayUrl() + API_SERVICE_TYPES, {headers: getAuthHeader()});
      usePandaStore().setAccounts(responseAccounts.data)
      usePandaStore().setTypes(responseData.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async createAccount(account) {
    let user = getUser();
    try {
      return await axios.post(getGatewayUrl() + API_URL, {
        userId: user.uuid,
        name: account.name,
        account: account.account,
        mail: account.mail,
        password: account.password,
        link: account.link,
        type: account.type,
        description: account.description,
      }, {
        headers: getAuthHeader()
      })
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async updateAccount(account) {
    let user = getUser();
    try {
      return await axios.put(getGatewayUrl() + API_URL, {
        id: account.id,
        userId: user.uuid,
        name: account.name,
        account: account.account,
        mail: account.mail,
        password: account.password,
        link: account.link,
        type: account.type,
        description: account.description,
      }, {
        headers: getAuthHeader()
      })
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
    let user = getUser();
    for (unitNumber; unitNumber < json.length; unitNumber++) {
      if (failed.length > 5) {
        break;
      }
      try {
        objects.push({
          userId: user.uuid,
          name: json[unitNumber].name !== undefined ?
            json[unitNumber].name : failed.push("unit:" + (unitNumber + 1) + "-field:name"),
          account: json[unitNumber].account !== undefined ?
            json[unitNumber].account : failed.push("unit:" + (unitNumber + 1) + "-field:account"),
          mail: json[unitNumber].mail !== undefined ?
            json[unitNumber].mail : failed.push("unit:" + (unitNumber + 1) + "-field:mail"),
          password: json[unitNumber].password !== undefined ?
            json[unitNumber].password : failed.push("unit:" + (unitNumber + 1) + "-field:password"),
          link: json[unitNumber].link !== undefined ?
            json[unitNumber].link : failed.push("unit:" + (unitNumber + 1) + "-field:link"),
          type: json[unitNumber].type !== undefined ?
            json[unitNumber].type : failed.push("unit:" + (unitNumber + 1) + "-field:type"),
          description: json[unitNumber].description !== undefined ?
            json[unitNumber].description : failed.push("unit:" + (unitNumber + 1) + "-field:description"),
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

  async removeSelectedAccounts(selected) {
    try {
      return axios.post(getGatewayUrl() + API_REMOVE_SELECTED, selected, {headers: getAuthHeader()})
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  async generatePassword() {
    let user = getUser();
    try {
      let result = await axios.post(getGatewayUrl() + API_PASSGEN,{
        userId: user.userId,
      }, {headers: getAuthHeader()})
      console.log(result.data)
      usePandaStore().setNewPassword(result.data)
    } catch (e) {
      exceptionHandler.handle(e)
    }
  }

  getTemplateObject() {
    let template = [];
    for (let i = 0; i < 2; i++) {
      template.push({
          name: '',
          account: '',
          mail: '',
          password: '',
          link: '',
          type: 'TRASH',
          description: '',
        }
      )
    }
    return template
  }

  async getBackUp() {
    let backUpObjects = []
    try {
      let response = await axios.get(getGatewayUrl() + API_ALL, {headers: getAuthHeader()});
      let values = response.data
      for (let i = 0; i < values.length; i++) {
        backUpObjects.push(
          {
            name: values[i].name,
            account: values[i].account,
            mail: values[i].mail,
            password: values[i].password,
            link: values[i].link,
            type: values[i].type,
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

}

export default new PandaService();
