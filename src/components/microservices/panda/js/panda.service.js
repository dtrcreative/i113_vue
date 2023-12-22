import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import errorHandler from "@/components/microservices/utils/error-handler";
import userHelper from "@/components/auth/services/user.helper";
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";

const API_URL = 'api/events/birthdays/';

const API_ALL = 'all';
const API_ADD = 'upload-add';
const API_REPLACE = 'upload-replace';

const SERVICE_NAME = 'Panda'

class PandaService {
  async getUnits(){

  }
  async createAccount(account){

  }
  async updateAccount(account){

  }
  async uploadJSON(json, isReplace) {

  }
  convertAndValidateJson(json) {

  }
  async removeSelectedAccounts(selected){

  }
  getTemplateObject() {

  }
  async getBackUp(){

  }
  getBackUpFileName(){

  }

}
export default new PandaService();
