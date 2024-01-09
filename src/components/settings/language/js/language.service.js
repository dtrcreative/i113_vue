import errorHandler from "@/components/microservices/utils/error-handler";
import axios from "axios";
import {authHeader, getServerUrl} from "@/components/auth/services/axios-helper";
import {useAppStore} from "@/store/app";

const API_URL = 'api/resource/language/';

class LanguageService {

  async getUnits(){
    try{
      const response = await axios.get(getServerUrl() + API_URL + API_ALL, {headers: authHeader()});
      useAppStore().setLanguages(response.data)
    }catch (e){
      errorHandler.handle(e)
    }
  }

  async create(unit){
    try {
      return await axios.post(getServerUrl() + API_URL, {
        id: unit.id,
        param: unit.param,
        type: unit.type,
        eng: unit.eng,
        rus: unit.rus,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async update(unit){
    try {
      return await axios.put(getServerUrl() + API_URL, {
        id: unit.id,
        param: unit.param,
        type: unit.type,
        eng: unit.eng,
        rus: unit.rus,
      }, {
        headers: authHeader()
      })
    } catch (e) {
      errorHandler.handle(e)
    }
  }

  async remove(id){
    try {
      return axios.delete(getServerUrl() + API_URL + "/selected", id)
    } catch (e) {
      errorHandler.handle(e)
    }
  }
}

export default new LanguageService();
