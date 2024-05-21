import {defineStore} from "pinia";
import pandaService from "@/components/microservices/panda/js/panda.service";

export const usePandaStore = defineStore('pandas', {
  state: () => ({
    selected: [],
    expanded: [],
    searchValue: "",
    showCUForm: false,

    types: [],
    allTypes: [],
    selectedType: 'ALL',

    uploadJSON: '',

    showSnackBar: false,
    snackbarMessage: "",

    loading: false,

    accounts: [],

    updateUnit: {
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
    headers: [
      {title: 'Service', align: 'center', sortable: false, key: 'name'},
      {title: 'Account', align: 'center', sortable: false, key: 'account'},
      {title: 'Mail', align: 'center', sortable: false, key: 'mail'},
      {title: 'Actions', align: 'center', sortable: false, key: 'actions'},
    ]
  }),
  actions: {
    setAccounts(accounts) {
      this.accounts = accounts;
    },
    setTypes(types) {
      this.types = types
      this.allTypes = [...types]
      this.allTypes.push('ALL')
      this.types.sort()
      this.allTypes.sort()
    },
    async create() {
      let response = await pandaService.createAccount(this.updateUnit)
      this.accounts.push(response.data)
    },
    async update() {
      await pandaService.updateAccount(this.updateUnit)
      await pandaService.getUnits()
    },
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.accounts = this.accounts.filter(unit => unit.id !== this.selected[i])
      }
      pandaService.removeSelectedAccounts(this.selected)
      this.selected = []
    },
    setNewPassword(password) {
      this.updateUnit.password = password
    },
    clearUpdateUnit() {
      this.updateUnit = {
        id: null,
        name: null,
        account: null,
        mail: null,
        password: null,
        link: null,
        type: 'TRASH',
        description: null,
      };
    }
  },
  getters: {
    filterByName() {
      return [...this.accounts].sort((unit1, unit2) => unit1.name?.localeCompare(unit2.name))
    },
    searchByType() {
      if (this.selectedType !== 'ALL') {
        return [...this.accounts].filter(unit1 => unit1.type?.includes(this.selectedType))
      } else {
        return [...this.filterByName]
      }
    },
    searchUnits() {
      return [...this.searchByType].filter(unit =>
        unit.name.toLowerCase().includes(this.searchValue !== null ? this.searchValue.toLowerCase() : '') |
        unit.password.toLowerCase().includes(this.searchValue !== null ? this.searchValue.toLowerCase() : '')
      )
    },
  }
})
