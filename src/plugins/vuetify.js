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
    background: '#FFFFFF',
    surface: '#dcdcdc',
    primary: 'rgb(48,185,58)',
    secondary: 'rgba(74,126,58,0.44)',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
const dark = {
  dark: true,
  colors: {
    background: 'rgba(0,0,0,0)',
    surface: 'rgba(30,38,30,0)',
    primary: 'rgba(0,128,11,0.28)',
    secondary: '#3c6c2a',
    error: '#B00020',
    info: '#50d5b2',
    success: '#4CAF50',
    warning: '#FB8C00',
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


