import {logout} from "@/components/auth/services/auth-helper";
import router from "@/router";


class ErrorHandler {

  handle(error){
    console.log(error)
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
