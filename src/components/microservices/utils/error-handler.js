import {logout} from "@/components/auth/services/auth-helper";
import router from "@/router";


class ErrorHandler {

  handle(error) {
    console.log("ErrorHandler")
    console.log(error)
    switch (error.response.status) {
      case 503 :
        console.log(503)
        break;
      case 500 :
        console.log(500)
        console.log(error.message)
        break;
      case 400 :
        console.log(400)
        return error.response.data
      case 409 :
        console.log(409)
        console.log(error.response.data)
        break;
      case 401:
        console.log(401)
        logout().then(r => {
        })
        router.push("/")
        break;
      default:
        console.log('default')
        console.log(error.response.data)
        break;
    }
  }

}

export default new ErrorHandler();
