import {defineStore} from 'pinia'

export const useNavStore = defineStore('navigation', {
  state: () => ({

    appPage: {
      home: {title: 'Home', value: "home", icon: 'mdi-view-dashboard', color: 'green', redirect: '/home'},
      about: {title: 'About', value: "about", icon: 'mdi-forum', color: 'white', redirect: '/home'},
    },

    microPages: [
      {title: 'Panda', value: "panda", icon: 'mdi-panda', color: 'orange', redirect: '/panda/'},
      {title: 'Events', value: "events", icon: 'mdi-calendar', color: 'red', redirect: '/events/'},
      {title: 'Events_new', value: "events", icon: 'mdi-calendar', color: 'purple', redirect: '/events_new/'},
    ]

  }),
  actions: {}

})
