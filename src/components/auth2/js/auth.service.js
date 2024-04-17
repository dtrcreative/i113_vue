
class AuthService {

  registration(email, password){
    console.log("UserRegistration: ", email + " " + password);
  }
  login(email, password){
    console.log("Login: ", email + " " + password);
  }
  reinitPassword(email, password){
    console.log("ReinitPass: ", email + " " + password);
  }
  sendMail(email){
    console.log("UserRegistration: ", email);
  }
}

export default new AuthService()
