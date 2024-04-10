import {logout} from "@/components/auth/services/auth.service";
import router from "@/router";
import {useExcStore} from "@/components/UI/exceptions/js/exceptionStore";

class ExceptionHandler {

  handle(error) {
    switch (error.response.status) {
      case 400 : //Bad Request
        this.handle400(error)
        break;
      case 401: //Unauthorized
        this.handle401(error)
        break;
      case 404: //Not Found
        this.handle404(error)
        break;
      case 409 : //Conflict
        this.handle409(error)
        break;
      case 500 : //Internal Server Error
        this.handle500(error)
        break;
      case 503 : //Service Unavailable
        this.handle503(error)
        break;
      default:
        this.handleDefault(error)
        break;
    }
  }

  handle400(error) {
    console.log("Bad Request")
    console.log(error)
  }

  handle401(error) {
    console.log("Unauthorized")
    console.log(error)
    logout().then(r => {
    })
    router.push("/")
  }

  handle404(error) {
    console.log("Not Found")
    useExcStore().setExceptionData(
      error.response.status,
      error.response.statusText,
      error.response.message,
    )
  }

  handle409(error) {
    console.log("Conflict")
    console.log(error.response.data)
  }

  handle500(error) {
    console.log("Internal Server Error")
    useExcStore().setExceptionData(
      error.response.status,
      error.response.statusText,
      error.response.message,
    )
  }

  handle503(error) {
    console.log("Service Unavailable")
    useExcStore().setExceptionData(
      error.response.status,
      error.response.statusText,
      error.response.message,
    )
  }

  handleDefault(error) {
    console.log('default')
    console.log(error)
  }

}

export default new ExceptionHandler();
