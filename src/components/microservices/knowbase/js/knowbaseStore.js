import {defineStore} from "pinia";


export const useKnowbaseStore = defineStore("knowbase", {
  state: () => ({
    searchValue: "",

    tags2: [
      {tagName: "Programming", subtags: ["Java", "Databases", "Vue3"]},
      {tagName: "IT", subtags: ["Design", "Vuetify", "Postgres"]},
    ],

    tags: ['Programming', 'IT'],
    selectedTags: null,
    subTags:['Design', 'Vue3', 'Vuetify', "Postgres", "Java"],
    selectedSubTags: null,

    cards:[
      {id: 0, tag:"Programming", subtag:"Java", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 1, tag:"Programming", subtag:"Java", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 2, tag:"Programming", subtag:"Java", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 3, tag:"Programming", subtag:"Java", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 4, tag:"Programming", subtag:"Databases", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 5, tag:"Programming", subtag:"Databases", title: "Programming", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 6, tag:"Programming", subtag:"Databases", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 7, tag:"Programming", subtag:"Vue3", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 8, tag:"Programming", subtag:"Vue3", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 9, tag:"Programming", subtag:"Vue3", title: "Design", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 10, tag:"IT", subtag:"Design", title: "Vue", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 11, tag:"IT", subtag:"Design", title: "Vue", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 12, tag:"IT", subtag:"Design", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 13, tag:"IT", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 14, tag:"IT", subtag:"Vuetify", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 15, tag:"IT", subtag:"Postgres", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
      {id: 16, tag:"IT", subtag:"Postgres", title: "Vuetify", subtitle: "CardSubtitle", text: "There is some card Text"},
    ]

  }),
  actions: {



  },

  getters: {
    filteredByTag(){
        return this.selectedTags!==null ? [...this.cards].filter(unit => this.selectedTags?.includes(unit.tag)) : [...this.cards]
    },
    filteredBySubTag(){
      return this.selectedSubTags!==null ? [...this.filteredByTag].filter(unit => this.selectedSubTags?.includes(unit.subtag)) : [...this.filteredByTag]
    }
  }

})
