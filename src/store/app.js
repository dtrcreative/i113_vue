// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
  gateway_url: 'http://192.168.100.9:8080'
})
