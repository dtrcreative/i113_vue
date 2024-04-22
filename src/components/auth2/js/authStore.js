import {defineStore} from "pinia";
import authService from "@/components/auth2/js/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({

    user:{
      username: 'master',
      firstname: 'Дмитрий',
      lastname: 'Рогожников',
      email: 'Ditar@gmail.com',
      password: '4180',
      confirmPassword: '4180',
    },

    rules: {
      //TODO password regex
      required: value => !!value || 'Не заполнено',
      email: value => value.includes("@") || "Неверный формат почты",
      passwordMatch: value => value === useAuthStore().user.password || "Пароли не совпадают",
      range: {
        passwordMin: value => value.length > 3 || 'Неверный формат пароля. Пароль должен содеражать не менее 8 символов, включая латинские буквы и цифры',
      },
    }
  }),
  actions: {
    async login() {
      //TODO validation and login process
      return await authService.login(this.user.username, this.user.password) !== undefined
    },
    signup(){
      authService.signup(this.user)
    },
    sendEmail(){
      //TODO check email and save it if valid
      authService.sendMail(this.user.email)
    },
    reinitPass(){
      authService.reinitPassword(this.user)
    },
    clearFieldsData(){
      this.user = {
          username: 'master',
          firstname: 'Дмитрий',
          lastname: 'Рогожников',
          email: 'Ditar@gmail.com',
          password: '4180',
          confirmPassword: '4180',
      }
    }
  },
  getters: {}
})
