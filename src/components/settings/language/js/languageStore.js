import { defineStore } from 'pinia'
import languageService from "@/components/settings/language/js/language.service";

export const useLanguageStore = defineStore('languages', {
  state: () => ({
    languageSelected: 0,
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    languageInUse: [],
    languages:[],
    paramToUpdate: '',
    selected: ''
  }),
  actions: {
    setUnits(units){
      this.languages = units;
      this.languageInUse = [...this.languages]
    },
    async create(){
      let response = await languageService.create(this.paramToUpdate)
      this.languages.push(response.data)
    },
    async update() {
      await languageService.update(this.unitToUpdate)
      await languageService.getUnits()
    },
    remove(){
      for (let i = 0; i < this.selected.length; i++) {
        this.languages = this.languages.filter(unit => unit.id !== this.selected[i])
      }
      languageService.remove(this.selected.id)
      this.selected = []
    }
  },
  getters: {
    changeLanguage(){

    }
  }
})
