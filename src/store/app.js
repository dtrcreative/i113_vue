// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    languageSelected: 0,
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    languageInUse: [],
    language:[],
  }),
  actions: {

  },
  gateway_url: 'http://192.168.100.9:8080'
})
