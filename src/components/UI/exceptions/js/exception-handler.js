// import {logout} from "@/components/auth/services/auth.service";
import router from "@/router";
import {useExcStore} from "@/components/UI/exceptions/js/exceptionStore";
import {cleanUserData} from "@/store/user.service";

class ExceptionHandler {
  handle(error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400 : //Bad Request
          this.handle400(error)
          break;
        case 401: //Unauthorized
          this.handle401(error)
          break;
        case 403: //BadRequest
          this.handle403(error)
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
    } else {
      if(error.code !== 0){
        this.handleAppError(error)
      }else{
        this.handleAppException(error)
      }
    }
  }

  handleAppError(error){
    let exceptionTitle = 'App Exception'
    console.log(error)
    this.showSnackBar(error.code, exceptionTitle, error.message)
  }

  handleAppException(error, appError) {
    let exceptionTitle = 'App Exception'
    console.log(error)
    this.showSnackBar(appError.code, exceptionTitle, appError.message)
  }

  handle400(error) {
    console.log("Bad Request")
    console.log(error)
  }

  handle401(error) {
    let exceptionTitle = 'Unauthorized'
    console.log(error)
    cleanUserData()
    router.push("./")
  }

  handle403(error) {
    let exceptionTitle = 'Bad Request'
    console.log(error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.data)
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
    console.log(error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  handle503(error) {
    let exceptionTitle = 'Service Unavailable'
    console.log(error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  handleDefault(error) {
    console.log('default')
    console.log(error)
  }

  handleNotLogin(error) {
    let exceptionTitle = 'Response Undefined'
    console.log(error)
    this.showSnackBar(error.response.status, exceptionTitle, error.response.message)
  }

  showSnackBar(exCode, exStatus, exMessage) {
    useExcStore().isException = true;
    useExcStore().exCode = exCode
    useExcStore().exStatus = exStatus
    useExcStore().exMessage = exMessage
  }

}

export default new ExceptionHandler();
