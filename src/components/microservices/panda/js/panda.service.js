import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import userHelper from "@/components/auth/services/user.helper";
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";


const API_URL = 'api/panda/';

const API_ALL = 'all';
const API_ADD = 'upload-add';
const API_REPLACE = 'upload-replace';

const SERVICE_NAME = 'Panda'

class PandaService {
  async getAccounts(){
    try {
      const response = await axios.get(getServerUrl() + API_URL + API_ALL, {headers: authHeader()});
      usePandaStore().setAccounts(response.data)
      console.log(response.data)
    } catch (e) {
      errorHandler.handle(e)
    }
  }
  async createAccount(account){
    let user = userHelper.getUser();
    try {
      return await axios.post(getServerUrl() + API_URL, {
        userId: account.userId,
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
        userId: account.userId,
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
      return await axios.post(getServerUrl() + API_URL + (isReplace ? API_REPLACE : API_ADD), json, {headers: authHeader()})
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
