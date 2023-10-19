import {getAuthUser} from "@/components/auth/services/auth-helper";

const USER = "user"

class UserHelper {
  fillLocalsStorageUser(){
    getAuthUser().then(user => {
       if(user){
         let userData = {
           userId: user.profile.sub,
           token: user.access_token,
           refresh_token: user.refresh_token,
           userName: user.profile.preferred_username,
           userRole: user.profile.resource_access,
           firstName: user.profile.given_name,
           lastName: user.profile.family_name,
           fullName: user.profile.name,
           email: user.profile.email,
           expires_at: user.expires_at,
         }
         localStorage.setItem(USER, JSON.stringify(userData))
       }
     });
  }
  cleanLocalStorage(){
    localStorage.removeItem(USER)
  }
  isUserExist(){
    return !!localStorage.getItem(USER);
  }
  getUser(){
    return JSON.parse(localStorage.getItem(USER));
  }

}

export default new UserHelper();
