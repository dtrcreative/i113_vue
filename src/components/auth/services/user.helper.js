import {getUser} from "@/components/auth/services/auth-helper";

const USER = "userName"
const USERROLE = "role"
const FIRSTNAME = "firstName"
const FAMILYNAME = "familyName"
const FULLNAME = "fullname"
const EMAIL = "email"

class UserHelper {
  fillLocalsStorageUser(){
     getUser().then(user => {
       if(user){
         localStorage.setItem(USER, user.profile.preferred_username)
         localStorage.setItem(USERROLE, user.profile.resource_access)
         localStorage.setItem(FIRSTNAME, user.profile.given_name)
         localStorage.setItem(FAMILYNAME, user.profile.family_name)
         localStorage.setItem(FULLNAME, user.profile.name)
         localStorage.setItem(EMAIL, user.profile.email)
       }
     });
  }
  cleanLocalStorage(){
    localStorage.removeItem(USER)
    localStorage.removeItem(USERROLE)
    localStorage.removeItem(FIRSTNAME)
    localStorage.removeItem(FAMILYNAME)
    localStorage.removeItem(FULLNAME)
    localStorage.removeItem(EMAIL)
  }
  isUserExist(){
    return !!localStorage.getItem(USER);
  }
  getUserFirstName(){
    return localStorage.getItem(FIRSTNAME)
  }
  getUserLastName(){
    return localStorage.getItem(FAMILYNAME)
  }
  getFullName(){
    return localStorage.getItem(FULLNAME)
  }
  getUserRole(){
    return localStorage.getItem(USERROLE)
  }
  getUserEmail(){
    return localStorage.getItem(EMAIL)
  }


}

export default new UserHelper();
