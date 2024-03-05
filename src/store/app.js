// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    languageSelected: "EN",
    languageTypes: [
      {title: 'Eng', name: "EN"},
      {title: 'Rus', name: "RU"}],
    languageInUse: [],
    languages: [],
  }),
  actions: {
    setLanguages(fullLanguageArray) {
      this.languages = fullLanguageArray;
    },
    async createLangVariable() {

    }
  },
  gateway_url: 'http://192.168.100.9:8080'
})
