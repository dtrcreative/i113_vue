import {defineStore} from "pinia";
import eventService from "@/components/microservices/events/events/js/event.service";

export const useEventStore = defineStore('events', {
  state: () => ({

    selected: [],
    expanded: [],
    searchValue: "",
    showCUForm: false,

    uploadJSON: '',

    showSnackBar: false,
    snackbarMessage: "",

    loading: false,

    units: [],

    updateUnit: {
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

    headers: [
      {title: 'Event', align: 'center', sortable: false, key: 'eventName'},
      {title: 'Date', align: 'center', sortable: false, key: 'date'},
      {title: 'Via', align: 'center', sortable: false, key: 'daysLeft'},
      {title: 'Notify', align: 'center', sortable: false, key: 'mail'},
      {title: 'Actions', align: 'center', sortable: false, key: 'actions'},
    ]

  }),
  actions: {
    setUnits(units) {
      this.units = units;
    },
    async create() {
      let response = await eventService.createEvent(this.reformatUnit(this.updateUnit))
      this.units.push(response.data)
    },
    //TO Update
    async update() {
      await eventService.updateEvent(this.reformatUnit(this.updateUnit))
      await eventService.getUnits()
    },
    async updateShedule(unit) {
      await eventService.updateBirthday(this.reformatUnit(unit))
    },
    //Method used in ConfirmRemoveDialog
    removeSelected() {
      for (let i = 0; i < this.selected.length; i++) {
        this.units = this.units.filter(unit => unit.id !== this.selected[i])
      }
      eventService.removeSelectedEvents(this.selected) //TODO
      this.selected = []
    },

    reformatUnit(unit) {
      let formattedDate = unit.date.year.toString()
      if (unit.date.month.toString().length === 1) {
        formattedDate = formattedDate + "-0" + unit.date.month
      } else {
        formattedDate = formattedDate + "-" + unit.date.month
      }
      if (unit.date.day.toString().length === 1) {
        formattedDate = formattedDate + "-0" + unit.date.day
      } else {
        formattedDate = formattedDate + "-" + unit.date.day
      }
      return {
        id: this.updateUnit.id,
        eventName: unit.eventName,
        date: (formattedDate),
        description: unit.description,
        notify: unit.notify
      }
    },

    clearUpdateUnit() {
      this.updateUnit = {
        id: null,
        eventName: null,
        date: {
          day: null,
          month: null,
          year: null,
        },
        description: '',
        notify: true
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

    getFirstTenUnits() {
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
