/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const light = {
  dark: false,
  colors: {
    primary: '#00800BFF',
    secondary: '#3c6c2a',
    error: '#B00020',
    info: '#50d5b2',
    success: '#4CAF50',
    warning: '#FB8C00',

    transparent: 'rgba(0,0,0,0)',
    surface: 'rgba(27,59,27)',
    background: 'rgb(0,0,0)',
  },
}
const dark = {
  dark: true,
  colors: {
    primary: '#00800BFF',
    secondary: '#3c6c2a',
    error: '#B00020',
    info: '#50d5b2',
    success: '#4CAF50',
    warning: '#FB8C00',

    transparent: 'rgba(0,0,0,0)',
    surface: 'rgba(35,73,35,0.4)',
    background: 'rgb(0,0,0)',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark, light
    },
    icons: {
      defaultSet: 'mdi'
    }
  },
})


