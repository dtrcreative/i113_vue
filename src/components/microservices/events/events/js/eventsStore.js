import {defineStore} from "pinia";
import eventsService from "@/components/microservices/events/events/js/events.service";
import birthdayService from "@/components/microservices/events/birthdays/js/birthday.service";

export const useEventsStore = defineStore('events', {
  state: () => ({
    units: [],
    selected: [],
    searchValue:"",
    showCUForm: false,

    uploadJSON: '',

    unitToUpdate: {
      id: '',
      eventName: '',
      date: {
        day: '',
        month: '',
        year: '',
      },
      description: '',
      notify: true
    },

  }),
  actions: {
    setUnits(units) {
      this.units = units;
    },
    async create() {
      let response = await eventsService.createEvent(this.reformatUnit(this.unitToUpdate))
      this.units.push(response.data)
    },
    //TO Update
    async update() {
      await eventsService.updateEvent(this.reformatUnit(this.unitToUpdate))
      await eventsService.getUnits()
    },
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.units = this.units.filter(unit => unit.id !== this.selected[i])
      }
      eventsService.removeSelectedEvents(this.selected) //TODO
      this.selected = []
    },

    reformatUnit(unit) {
      let formattedDate = unit.date.year.toString()
      if (unit.date.month < 10) {
        formattedDate = formattedDate + "-0" + unit.date.month
      } else {
        formattedDate = formattedDate + "-" + unit.date.month
      }
      if (unit.date.day < 10) {
        formattedDate = formattedDate + "-0" + unit.date.day
      } else {
        formattedDate = formattedDate + "-" + unit.date.day
      }
      return {
        id: this.unitToUpdate.id,
        eventName: unit.eventName,
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
