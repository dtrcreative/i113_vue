import {logout} from "@/components/auth/services/auth-helper";
import router from "@/router";


class ErrorHandler {

  handle(error){
    console.log("here")
    // router.push("/")
    if(error.response.status === 503){
      console.log(error.message)
    }
    if(error.response.status === 500){
      console.log(error.message)
    }
    if(error.response.status === 401){
      logout().then(r => {})
      router.push("/")
    }
    else{
      console.log(error.response.data)
    }
  }

}

export default new ErrorHandler();
