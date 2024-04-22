import {defineStore} from 'pinia'

export const useExcStore = defineStore('exception', {
  state: () => ({
    isException: false,
      exCode: '',
      exStatus: '',
      exMessage: '',
  }),
  actions: {

  },
  getters: {

  }
})
