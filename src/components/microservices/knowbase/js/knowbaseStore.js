import {defineStore} from "pinia";


export const useKnowbaseStore = defineStore("knowbase", {
  state: () => ({
    searchValue: "",

    tags: ['Programming'],
    selectedTag: [],

    subTags:['Design', 'Vue', 'Vuetify'],
    selectedSubTag: [],

    cards:[
      {id: 0, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 1, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 2, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 3, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 4, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 5, tag:"Programming", subtag:"Design", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 6, tag:"Programming", subtag:"Vue", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 7, tag:"Programming", subtag:"Vue", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 8, tag:"Programming", subtag:"Vue", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 9, tag:"Programming", subtag:"Vue", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 10, tag:"Programming", subtag:"Vuetify", title: "Vue", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 11, tag:"Programming", subtag:"Vuetify", title: "Vue", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 12, tag:"Programming", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 13, tag:"Programming", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 14, tag:"Programming", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 15, tag:"Programming", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 16, tag:"Programming", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
    ]

  }),
  actions: {



  },

  getters: {
    filteredByTag(){
      if(this.selectedTag.length>0){
        return [...this.cards].filter(unit => this.selectedTag.includes(unit.tag))
      }else{
        return [...this.cards]
      }
    },
    filteredBySubtag(){
      if(this.selectedSubTag.length>0){
        return [...this.filteredByTag].filter(unit => this.selectedSubTag.includes(unit.subtag))
      }else{
        return [...this.filteredByTag]
      }
    }
  }

})
