import {defineStore} from 'pinia'

export const useNavStore = defineStore('navigation', {
  state: () => ({

    appPage:{
      home: {title:'Home', value: "home", icon:'mdi-view-dashboard', color:'white', redirect:'/home'},
      about: {title:'About', value: "about", icon:'mdi-forum', color:'white', redirect:'/home'},
    },

    microPages: [
      {title:'Panda', value: "panda", icon:'mdi-panda', color:'white', redirect:'/panda/'},
      {title:'Events', value: "events", icon:'mdi-calendar', color:'white', redirect:'/events/'},
    ]

  }),
  actions: {}

})
