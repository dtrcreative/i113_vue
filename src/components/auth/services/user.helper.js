import {getUser} from "@/components/auth/services/auth-helper";

const USER = "userName"
const FIRSTNAME = "firstName"


class UserHelper {
  fillLocalsStorageUser(){
     getUser().then(user => {
       if(user){
         localStorage.setItem(FIRSTNAME, user.profile.family_name)
         localStorage.setItem(USER, user.profile.preferred_username)
       }
     });
  }
  cleanLocalStorage(){
    localStorage.removeItem(USER)
    localStorage.removeItem(FIRSTNAME)
  }
  isUserExist(){
    return !!localStorage.getItem(USER);
  }
  getUserFirstName(){
    return localStorage.getItem(FIRSTNAME)
  }

}

export default new UserHelper();
