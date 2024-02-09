import {defineStore} from 'pinia'
import languageService from "@/components/settings/language/js/language.service";
import {computed} from "vue";

export const useLangStore = defineStore('languages', {
  state: () => ({
    languageSelected: 0,
    languages: {},
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    searchValue: '',
    paramToUpdate: '',
    showCUForm: false,
    inuse: {}
  }),
  actions: {

    async init(){
      //TODO user init languageSelected
      this.languages = await languageService.getUnits();
      this.fillLanguageInUse()
    },

    setUnits() {
      this.languages = languageService.getUnits();
      this.fillLanguageInUse()
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
    async changeLanguage(langValue) {
      this.languageSelected = langValue;
      this.languages = await languageService.getUnits()
      this.fillLanguageInUse();
    },
    fillLanguageInUse(){
      if(this.languages!== undefined && this.languages.length !== 0){
        this.languages.forEach((line) =>{
          if(this.languageSelected===0){
            this.inuse[line.param] = line.eng
          }else{
            this.inuse[line.param] = line.rus
          }
        })
      }else{
        console.log("Languages is Empty")
      }
    }
  },
  getters: {
    getParam(name){
      return this.inuse[name]
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
