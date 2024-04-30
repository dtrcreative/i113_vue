import {defineStore} from "pinia";

export const usePandaStore = defineStore('pandas', {
  state: () => ({
    selected: [],
    expanded: [],
    searchValue: "",
    showCUForm: false,

    types: ["SOCIALS",],
    allTypes: [],
    selectedType: 'ALL',

    accounts: [
      {
        id: 0,
        userId: "userID",
        name: "name",
        account: "account",
        password: "password",
        link: "link",
        mail: "DitarRogozhnikov@gmail.com",
        type: "type",
        description: "description",
      },
      {
        id: 1,
        userId: "userID",
        name: "name",
        account: "account",
        password: "password",
        link: "link",
        mail: "DitarRogozhnikov@gmail.com",
        type: "type",
        description: "description",
      }
    ],
    updateUnit: {
      id: '',
      userId: '',
      name: '',
      account: '',
      mail: '',
      password: '',
      link: '',
      type: 'TRASH',
      description: '',
    },
    headers: [
      { title: 'Service', align: 'center', sortable: false, key: 'name', class: 'bg-color' },
      { title: 'Account', align: 'center', sortable: false,  key: 'account' },
      { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
    ]
  }),
  actions: {
    clearUpdateUnit(){
      this.updateUnit = {
        id: null,
        name: null,
        account: null,
        mail: null,
        password: null,
        link: null,
        type: 'TRASH',
        description: null,
      };
    }
  },
  getters: {}
})
