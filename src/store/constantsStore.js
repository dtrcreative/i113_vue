import {defineStore} from "pinia";

export const useConstStore = defineStore("constants",{
  state: () => ({
    mask:{
      // https://beholdr.github.io/maska/v3/#/tokens
      // '#' - any number
      // '@' - any letter
      // '*' - any letter or number
      unp:"#########",
      phone:"+375-##-###-##-##",
      ttn:"#########"
    },
    rules:{
      required: value => !!value || 'Не заполнено',
      unp: value => value.length === 9 || "Неверный формат УНП",
      phone: value => value.length === 17 || "Неверный формат номера телефона",
      email: value => value.includes("@") || "Неверный формат почты",
      passwordMin: value => value.length > 8 || 'Неверный формат пароля. Пароль должен содеражать не менее 8 символов, включая латинские буквы и цифры',
      maxValue: value => value <= 9999999 || "Превышено максимально возможное количество тоавра"
    }
  }),

  actions: {},
  getters: {}
})
