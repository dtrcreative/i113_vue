import {defineStore} from "pinia";
import birthdayService from "@/components/microservices/events/js/birthday.service";

export const useBirthdaysStore = defineStore('birthdays', {
  state: () => ({
    units: [],
    selected: [],
    unitToUpdate: null,
    searchValue:""
  }),
  actions: {
    setUnits(units) {
      this.units = units;
    },
    async create(unit) {
      let user = await birthdayService.createBirthday(unit)
      this.units.push(user.data)
    },
    update(unit) {
      birthdayService.updateBirthday(unit)
    },
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.units = this.units.filter(unit => unit.id !== this.selected[i])
      }
      birthdayService.removeBirthday(this.selected[0]) //TODO
      this.selected = []
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

    searchUnits() {
      return [...this.filterByDaysLeft].filter(unit =>
        unit.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) |
        unit.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) |
        unit.date.includes(this.searchValue)
      )
    },

  },
})
