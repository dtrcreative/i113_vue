import {defineStore} from "pinia";
import birthdayService from "@/components/microservices/events/js/birthday.service";

export const useBirthdaysStore = defineStore('birthdays',{
  state: () => ({
    units: null,
    selected: [],
    test: "testJOJO"
  }),
  actions: {
    setUnits(units){
      this.units = units;
    },
    create(unit){
      console.log(unit)
      this.units.push(birthdayService.createBirthday(unit).data)
    },
    update(unit){
      birthdayService.updateBirthday(unit)

    },
    removeSelected(){
      this.units = this.units.filter(unit => unit.id !== this.selected[0])
      birthdayService.removeBirthday(this.selected[0]) //TODO
      this.selected = []
    }
  },
  getters:{},
})
