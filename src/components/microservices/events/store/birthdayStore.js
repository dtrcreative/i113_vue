import {defineStore} from "pinia";
import birthdayService from "@/components/microservices/events/js/birthday.service";

export const useBirthdaysStore = defineStore('birthdays',{
  state: () => ({
    units: null,
    selected: [],
    unitToUpdate: null,
  }),
  actions: {
    setUnits(units){
      this.units = units;
    },
    async create(unit) {
      let user = await birthdayService.createBirthday(unit)
      this.units.push(user.data)
    },
    update(unit){
      birthdayService.updateBirthday(unit)
    },
    removeSelected(){
      this.units = this.units.filter(unit => unit.id !== this.selected[0])
      birthdayService.removeBirthday(this.selected[0]) //TODO
      this.selected = []
    },
    selectAll(){
      if(this.selected.length !== 0){
        this.selected=[]
      } else if(this.selected.length === this.units.length){
        this.selected = []
      }else if(this.units.length>0 && this.selected.length !== this.units.length){
        for (let i = 0; i<this.units.length; i++) {
          this.selected.push(this.units[i].id)
        }
      }
    }
  },
  getters:{},
})
