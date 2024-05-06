import {defineStore} from 'pinia'

export const useNavStore = defineStore('navigation', {
  state: () => ({

    appPage: {
      home: {title: 'Home', value: "home", icon: 'mdi-view-dashboard', color: 'green', redirect: '/home'},
      about: {title: 'About', value: "about", icon: 'mdi-forum', color: 'white', redirect: '/home'},
    },

    microPages: [
      {title: 'Panda', value: "panda", icon: 'mdi-panda', color: 'yellow', redirect: '/panda/'},
      {title: 'Events', value: "events", icon: 'mdi-calendar-month', color: 'orange', redirect: '/events/'},
      {title: 'Knowbase', value: "knowbase", icon: 'mdi-book-open-page-variant-outline', color: 'blue', redirect: '/knowbase/'},
    ]

  }),
  actions: {}

})
