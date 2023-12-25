import {defineStore} from "pinia";
import pandaService from "@/components/microservices/panda/js/panda.service";

export const usePandaStore = defineStore('pandas', {
  state: () => ({
    accounts: [],
    selected: [],
    searchValue: "",
    showCUForm: false,

    types: [],
    allTypes: [],
    selectedType: 'ALL',

    uploadJSON: '',

    unitToUpdate: {
      id: '',
      userId: '',
      name: '',
      account: '',
      mail: '',
      password: '',
      link: '',
      type: 'TRASH',
      description: '',
    },
  }),
  actions: {
    setAccounts(accounts) {
      this.accounts = accounts;
    },
    setTypes(types){
      this.types = types
      this.allTypes = [...types]
      this.allTypes.push('ALL')
      this.types.sort()
      this.allTypes.sort()
    },
    setNewPassword(password){
      this.unitToUpdate.password = password
    },
    async create() {
      let response = await pandaService.createAccount(this.unitToUpdate)
      this.accounts.push(response.data)
    },
    async update() {
      await pandaService.updateAccount(this.unitToUpdate)
      await pandaService.getUnits()
    },
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.accounts = this.accounts.filter(unit => unit.id !== this.selected[i])
      }
      pandaService.removeSelectedAccounts(this.selected)
      this.selected = []
    },
    selectAll() {
      if (this.selected.length !== 0) {
        this.selected = []
      } else if (this.selected.length === this.accounts.length) {
        this.selected = []
      } else if (this.accounts.length > 0 && this.selected.length !== this.accounts.length) {
        for (let i = 0; i < this.accounts.length; i++) {
          this.selected.push(this.accounts[i].id)
        }
      }
    },
  },
  getters: {
    filterByName() {
      return [...this.accounts].sort((unit1, unit2) => unit1.name?.localeCompare(unit2.name))
    },
    searchUnits() {
      return [...this.filterByName].filter(unit =>
        unit.name.toLowerCase().includes(this.searchValue.toLowerCase()) |
        unit.password.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    },
  },
})
