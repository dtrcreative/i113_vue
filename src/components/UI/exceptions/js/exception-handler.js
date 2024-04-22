// import {logout} from "@/components/auth/services/auth.service";
import router from "@/router";
import {useExcStore} from "@/components/UI/exceptions/js/exceptionStore";
import {cleanUserData} from "@/store/user.service";

class ExceptionHandler {

  handle(error) {
    if(error.response !== undefined){
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
    // this.handleNotLogin(error)
  }

  handle400(error) {
    console.log("Bad Request")
    console.log(error)
  }

  handle401(error) {
    let exceptionTitle = 'Unauthorized'
    console.log(exceptionTitle + ":" + error)
    cleanUserData()
    router.push("./")
  }

  handle404(error) {
    let exceptionTitle = 'Not Found'
    console.log(exceptionTitle + ":" + error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  handle409(error) {
    let exceptionTitle = 'Conflict'
    console.log(error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.data)
  }

  handle500(error) {
    let exceptionTitle = 'Internal Server Error'
    console.log(exceptionTitle + ":" + error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  handle503(error) {
    let exceptionTitle = 'Service Unavailable'
    console.log(exceptionTitle + ":" + error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  handleDefault(error) {
    console.log('default')
    console.log(error)
  }

  handleNotLogin(error){
    let exceptionTitle = 'Response Undefined'
    console.log(exceptionTitle + ":" + error)
    // this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  showSnackBar(exCode, exStatus, exMessage){
    useExcStore().isException = true;
    useExcStore().exCode = exCode
    useExcStore().exStatus = exStatus
    useExcStore().exMessage = exMessage
  }

}

export default new ExceptionHandler();
