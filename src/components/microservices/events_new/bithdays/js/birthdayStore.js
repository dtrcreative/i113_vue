import {defineStore} from "pinia";
import birthdayService from "@/components/microservices/events_new/bithdays/js/birthday.service";

export const useBirthdayStore = defineStore("birthdays", {
  state: () => ({
    selected: [],
    expanded: [],
    searchValue: "",
    showCUForm: false,

    uploadJSON: '',

    showSnackBar: false,
    snackbarMessage: "",

    loading:false,

    units: [],

    updateUnit: {
      id: '',
      firstName: '',
      lastName: '',
      date: {
        day: '',
        month: '',
        year: ''
      },
      description: '',
      notify: true
    },

    headers: [
      { title: 'First name', align: 'center', sortable: false, key: 'firstName'},
      { title: 'Last name', align: 'center', sortable: false,  key: 'lastName' },
      { title: 'Date', align: 'center', sortable: false,  key: 'date' },
      { title: 'Via', align: 'center', sortable: false,  key: 'daysLeft' },
      { title: 'Notify', align: 'center', sortable: false,  key: 'mail' },
      { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
    ]
  }),
  actions: {
    setUnits(units) {
      this.units = units;
    },
    async create() {
      let response = await birthdayService.createBirthday(this.reformatUnit(this.updateUnit))
      this.units.push(response.data)
    },
    async update() {
      await birthdayService.updateBirthday(this.reformatUnit(this.updateUnit))
      await birthdayService.getUnits()
    },
    async updateShedule(unit) {
     await birthdayService.updateBirthday(this.reformatUnit(unit))
    },
    //Method used in ConfirmRemoveDialog
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.units = this.units.filter(unit => unit.id !== this.selected[i])
      }
      birthdayService.removeSelectedBirthdays(this.selected)
      this.selected = []
    },

    reformatUnit(unit) {
      let formattedDate = unit.date.year.toString()
      if (unit.date.month.toString().length === 1) {
        formattedDate = formattedDate + "-0" + unit.date.month
      } else {
        formattedDate = formattedDate + "-" + unit.date.month
      }
      console.log(unit.date.day.toString().length)
      if (unit.date.day.length === 1) {
        formattedDate = formattedDate + "-0" + unit.date.day
      } else {
        formattedDate = formattedDate + "-" + unit.date.day
      }
      return {
        id: this.updateUnit.id,
        firstName: unit.firstName,
        lastName: unit.lastName,
        date: (formattedDate),
        description: unit.description,
        notify: unit.notify
      }
    },

    selectAll() {
      if (this.selected.length !== 0) {
        this.selected = []
      } else if (this.selected.length === this.units.length) {
        this.selected = []
      } else if (this.units.length > 0 && this.selected.length !== this.units.length) {
        for (let i = 0; i < this.units.length; i++) {
          this.selected.push(this.units[i].id)
        }
      }
    },

    clearUpdateUnit(){
      this.updateUnit = {
        id: null,
        firstName: null,
        lastName: null,
        date: {
          day: null,
          month: null,
          year: null
        },
        description: '',
        notify: true
      };
    }

  },
  getters: {

    filterByFirstName() {
      return [...this.units].sort((unit1, unit2) => unit1.firstName?.localeCompare(unit2.firstName))
    },

    filterByLastName() {
      return [...this.filterByFirstName].sort((unit1, unit2) => unit1.lastName?.localeCompare(unit2.lastName))
    },

    filterByDaysLeft() {
      return [...this.filterByLastName].sort((unit1, unit2) => unit1.daysLeft - unit2.daysLeft)
    },

    getFirstTenUnits() {
      return [...this.filterByDaysLeft].slice(0, 10)
    },

    searchUnits() {
      return [...this.filterByDaysLeft].filter(unit =>
        unit.firstName.toLowerCase().includes(this.searchValue !== null ? this.searchValue.toLowerCase() : '') |
        unit.lastName.toLowerCase().includes(this.searchValue !== null ? this.searchValue.toLowerCase() : '') |
        unit.date.includes(this.searchValue)
      )
    },
  },

})
