import {defineStore} from 'pinia'

export const useNavStore = defineStore('navigation', {
  state: () => ({

    appPage: {
      home: {title: 'Home', value: "home", redirect: '/home', icon: 'mdi-view-dashboard', color: 'green'},
      about: {title: 'About', value: "about", redirect: '/home', icon: 'mdi-forum', color: 'white'},
    },

    microPages: [
      {title: 'Panda', value: "panda", redirect: '/panda/', visible: true, icon: 'mdi-panda', color: 'yellow'},
      {title: 'Events', value: "events", redirect: '/events/', visible: true, icon: 'mdi-calendar-month', color: 'orange'},
      {title: 'Knowbase', value: "knowbase", redirect: '/knowbase/', visible: false, icon: 'mdi-book-open-page-variant-outline', color: 'blue'},
    ]

  }),
  actions: {}

})
