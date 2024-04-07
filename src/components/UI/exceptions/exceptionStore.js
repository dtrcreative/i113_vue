import {defineStore} from 'pinia'

export const useExcStore = defineStore('exception', {
  state: () => ({
    isException: false,
    exception: {
      exCode: '',
      exTitle: '',
      exText: '',
    }
  }),
  actions: {
    setExceptionData(exCode, exTitle, exText) {
      this.isException = true
      this.exception.exCode = exCode === '' ? '' : exCode
      this.exception.exTitle = exTitle === '' ? '' : exTitle
      this.exception.exText = exText === '' ? '' : exText
    }
  },
  getters: {
    getExceptionText(){
      return this.exception.exCode + ": " + this.exception.exTitle
    }
  }
})
