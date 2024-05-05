import {defineStore} from 'pinia'
import languagesService from "@/components/settings/languages/js/languages.service";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";

export const useLangsStore = defineStore('languages', {
  state: () => ({
    selected: [],
    searchValue: "",
    showCUForm: false,

    showSnackBar: false,
    snackbarMessage: "",

    loading:false,

    languages: [],

    updateUnit: '',

    languageSelected: 0,
    languageTypes: [{title: 'Eng', value: 0}, {title: 'Rus', value: 1}],
    inuse: {},

    headers: [
      { title: 'Param', align: 'center', sortable: false, key: 'param'},
      { title: 'Eng', align: 'center', sortable: false,  key: 'eng' },
      { title: 'Rus', align: 'center', sortable: false,  key: 'rus' },
      { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
    ]
  }),
  actions: {

    async init() {
      //TODO user init languageSelected
      this.languages = await languagesService.getUnits();
      this.fillLanguageInUse()
    },

    setUnits() {
      this.languages = languagesService.getUnits();
      this.fillLanguageInUse()
    },
    async create() {
      let response = await languagesService.create(this.updateUnit)
      this.languages.push(response.data)
    },
    async update() {
      await languagesService.update(this.updateUnit)
      await languagesService.getUnits()
    },
    remove(item) {
      this.languages = this.languages.filter(unit => unit.id !== item.id)
      languagesService.remove(item.id)
    },
    async changeLanguage(langValue) {
      this.languageSelected = langValue;
      this.languages = await languagesService.getUnits()
      this.fillLanguageInUse();
    },
    fillLanguageInUse() {
      if (this.languages !== undefined && this.languages.length !== 0) {
        this.languages.forEach((line) => {
          if (this.languageSelected === 0) {
            this.inuse[line.param] = line.eng
          } else {
            this.inuse[line.param] = line.rus
          }
        })
      } else {
        exceptionHandler.handleAppError({code: 0, message: "No language lines"})
      }
    },

    clearUpdateUnit(){
      this.updateUnit = {
        id: null,
        param: null,
        eng: null,
        rus: null,
      };
    }
  },
  getters: {
    getParam(name) {
      return this.inuse[name]
    },
    filterByParamName() {
      return [...this.languages].sort((unit1, unit2) => unit1.param?.localeCompare(unit2.param))
    },
    searchUnits() {
      return [...this.filterByParamName].filter(unit =>
        unit.param.toLowerCase().includes(this.searchValue !== null ? this.searchValue.toLowerCase() : '')
      )
    },
  }
})
