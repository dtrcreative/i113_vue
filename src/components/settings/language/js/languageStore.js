import {defineStore} from 'pinia'
import languageService from "@/components/settings/language/js/language.service";

export const useLangStore = defineStore('languages', {
  state: () => ({
    languageSelected: 0,
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    languageInUse: {},
    languages: [],
    searchValue: '',
    paramToUpdate: '',
    showCUForm: false,
  }),
  actions: {
    setUnits(units) {
      this.languages = units;
      this.languageInUse = [...this.languages]
    },
    async create() {
      let response = await languageService.create(this.paramToUpdate)
      this.languages.push(response.data)
    },
    async update() {
      await languageService.update(this.paramToUpdate)
      await languageService.getUnits()
    },
    remove(item) {
      this.languages = this.languages.filter(unit => unit.id !== item.id)
      languageService.remove(item.id)
    },
    changeLanguage(langValue) {
      this.languageSelected = langValue;
      this.languageInUse = new Map();
      this.languages.forEach((line) =>{
        switch(this.languageSelected){
          case 0 :
            this.languageInUse.set(line.param, line.eng)
            break
          case 1:
            this.languageInUse.set(line.param, line.rus)
        }
      })
    },
  },
  getters: {
    get(name){
      return this.languageInUse.get(name)
    },
    filterByParamName() {
      return [...this.languages].sort((unit1, unit2) => unit1.param?.localeCompare(unit2.param))
    },
    searchUnits() {
      return [...this.filterByParamName].filter(unit =>
        unit.param.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    },
  }
})
