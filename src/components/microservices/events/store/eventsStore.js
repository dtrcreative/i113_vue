import {defineStore} from "pinia";
import eventsService from "@/components/microservices/events/js/events.service";

export const useEventsStore = defineStore('events', {
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
      let user = await eventsService.createEvent(unit)
      this.units.push(user.data)
    },
    update(unit) {
      eventsService.updateEvent(unit)
    },
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.units = this.units.filter(unit => unit.id !== this.selected[i])
      }
      eventsService.removeEvent(this.selected[0]) //TODO
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

    filterByEventName() {
      return [...this.units].sort((unit1, unit2) => unit1.eventName?.localeCompare(unit2.eventName))
    },

    filterByDaysLeft() {
      return [...this.filterByEventName].sort((unit1, unit2) => unit1.daysLeft - unit2.daysLeft)
    },

    getFirstTenUnits(){
      return [...this.filterByDaysLeft].slice(0, 10)
    },

    searchUnits() {
      return [...this.filterByDaysLeft].filter(unit =>
        unit.eventName.toLowerCase().includes(this.searchValue.toLowerCase()) |
        unit.date.includes(this.searchValue)
      )
    },

  },
})
