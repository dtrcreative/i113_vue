import {defineStore} from "pinia";
import authService from "@/components/auth2/js/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({

    email: '',
    password: '',
    confirmPassword: '',

    rules: {
      //TODO password regex
      required: value => !!value || 'Не заполнено',
      email: value => value.includes("@") || "Неверный формат почты",
      passwordMatch: value => value === useAuthStore().password || "Пароли не совпадают",
      range: {
        passwordMin: value => value.length > 8 || 'Неверный формат пароля. Пароль должен содеражать не менее 8 символов, включая латинские буквы и цифры',
      },
    }
  }),
  actions: {
    login() {
      //TODO validation and login process
      authService.login(this.email, this.password)
    },
    register(){
      authService.registration(this.email, this.password)
    },
    sendEmail(){
      //TODO check email and save it if valid
      authService.sendMail(this.email)
    },
    reinitPass(){
      authService.reinitPassword(this.email, this.password)
    },
    clearFieldsData(){
      this.email = ""
      this.password = ""
      this.confirmPassword = ""
    }
  },
  getters: {}
})
