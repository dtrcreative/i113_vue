import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import userHelper from "@/components/auth/services/user.helper";
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";


const API_URL = 'api/panda/';

const API_ALL = 'all';
const API_PASSGEN = 'utils/passgen'
const API_SERVICE_TYPES = 'data/types'
const API_JSON_ADD = 'upload-add';
const API_JSON_REPLACE = 'upload-replace';

const SERVICE_NAME = 'Panda'

class PandaService {
  async getAccounts(){
    try {
      const responseAccounts = await axios.get(getServerUrl() + API_URL + API_ALL, {headers: authHeader()});
      const responseData = await axios.get(getServerUrl() + API_URL + API_SERVICE_TYPES, {headers: authHeader()});
      usePandaStore().setAccounts(responseAccounts.data)
      usePandaStore().setTypes(responseData.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async createAccount(account){
    let user = userHelper.getUser();
    try {
      return await axios.post(getServerUrl() + API_URL, {
        userId: user.userId,
        name: account.name,
        account: account.account,
        mail: account.mail,
        password: account.password,
        link: account.link,
        type: account.type,
        description: account.description,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async updateAccount(account){
    let user = userHelper.getUser();
    try {
      return await axios.put(getServerUrl() + API_URL, {
        id: account.id,
        userId: user.userId,
        name: account.name,
        account: account.account,
        mail: account.mail,
        password: account.password,
        link: account.link,
        type: account.type,
        description: account.description,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async uploadJSON(json, isReplace) {
    try {
      return await axios.post(getServerUrl() + API_URL + (isReplace ? API_JSON_REPLACE : API_JSON_ADD), json, {headers: authHeader()})
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  convertAndValidateJson(json) {
    //TODO
  }
  async removeSelectedAccounts(selected){
    try {
      return axios.post(getServerUrl() + API_URL + "/selected", selected, {headers: authHeader()})
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async generatePassword(){
    try{
      let result = await axios.get(getServerUrl() + API_URL + API_PASSGEN,  {headers: authHeader()})
      usePandaStore().setNewPassword(result.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  getTemplateObject() {

  }
  async getBackUp(){
    //TODO
  }
  getBackUpFileName(){
    return SERVICE_NAME + '_BackUp.json'
  }

}
export default new PandaService();
