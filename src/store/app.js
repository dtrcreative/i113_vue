// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    languageSelected: 0,
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    languageInUse: [],
    languages:[],
  }),
  actions: {
    setLanguages(fullLanguageArray){
      this.languages = fullLanguageArray;
    },
    async createLangVariable(){

    }
  },
  gateway_url: 'http://192.168.100.9:8080'
})
